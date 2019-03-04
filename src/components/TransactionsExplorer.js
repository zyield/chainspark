import React, { Component, Fragment } from 'react'
import { Pane, Paragraph, Table, Badge, majorScale, Link as UILink } from 'evergreen-ui'
import { Link } from 'react-router-dom'
import TransactionFilters from './TransactionFilters'
import LoadingSpinner from './LoadingSpinner'
import PageController from './PageController'
import SortableHeading from './SortableHeading'
import ExchangeTxChart from './ExchangeTxChart'
import TxLineChart from './TxLineChart'
import WalletAside from './WalletAside'
import ComingSoonDialog from './ComingSoonDialog'
import { filterIncomingTx, markFresh } from '../utils'
import { withComas, toUSD, formatTime  } from '../utils/formatters'
import { getTxs, getExchanges, getExchangeTxs, getTokens, getEntities,
         getCoinTxs, getWalletTxs, getPage, getWallet } from '../utils/ajax'
import phxConnect from '../utils/websockets'

const { TextCell, Head, Row, Body } = Table

class TransactionsExplorer extends Component {
  state = {
    exchanges: [],
    transactions: [],
    tokens: [],
    type: this.props.type || 'btc',
    exchange: this.props.exchange || 'All Wallets',
    token: this.props.token || 'all',
    threshold: this.props.threshold || 100000000,
    wallet: this.props.wallet || null,
    timeframe: '1d',
    offset: 25,
    isLoading: false,
    links: {},
    page: 1,
    orderedColumn: 'time',
    ordering: 'desc',
    isBackDisabled: true,
    isDialogShown: false
  }

  isEmbeddedExplorer = () => this.props.isExchange || this.props.isCoin || this.props.isWallet

  handleIncomingTx = ({ data: tx }) => {
    let filteredTx = filterIncomingTx(tx.attributes, this.state)

    if (filteredTx) {
      let txs = [ markFresh(filteredTx) ].concat(this.state.transactions)
      this.setState({ transactions: txs })
    }
  }

  componentDidMount = () => this.updateTxs(this.state)
    .then(() => {
      if(!this.isEmbeddedExplorer())
        this.setState({ channel: phxConnect(this.handleIncomingTx) })
    })

  componentWillUnmount = () => this.state.channel && this.state.channel.leave()

  componentDidUpdate = prevProps => {
    if (this.props.wallet !== prevProps.wallet)
      this.setState({
        wallet: this.props.wallet
      }, () => this.updateTxs(this.state))
    else if (this.props.exchange !== prevProps.exchange)
      this.setState({
        exchange: this.props.exchange
      }, () => this.updateTxs(this.state))
  }

  startLoading = () => this.setState({ isLoading: true })

  getRelevantTxs = ({ isExchange, isCoin, isWallet }) => {
    if (isExchange) return getExchangeTxs
    if (isWallet) return getWalletTxs
    if (isCoin) return getCoinTxs
    return getTxs
  }

  updateTxs = filters => {
    this.startLoading()

    return Promise.all([
        getTokens(),
        getEntities(),
        this.getRelevantTxs(this.props)(filters)
      ]).then(([tokens, exchanges, [transactions, links]]) =>
        this.setState({
          tokens,
          links,
          exchanges,
          transactions,
          isLoading: false
        })
      ).then(this.updatePageButtons)
      .catch(err => console.log("[AJAX error]", err))
  }

  txDirection = tx => {
    let exchange = this.props.exchange
    if (tx['from-name'] === exchange && tx['to-name'] === exchange)
      return <Badge color="purple">INTERNAL</Badge>
    if (tx['from-name'] === exchange)
      return <Badge color="red">OUT</Badge>
    if (tx['to-name'] === exchange)
      return <Badge color="green">IN</Badge>
  }

  filterChangeHandler = ({ filter, value }) =>
    this.setState({ [filter]: value, transactions: [] }, () =>
      this.updateTxs({ ...this.state, [filter]: value })
    )

  sortChangeHandler = ({ column, direction}) =>
    this.setState({
      orderedColumn: column,
      ordering: direction
    }, () => this.updateTxs(this.state))

  closeAside = () => this.setState({ isAsideShown: false })

  updatePageButtons = () => {
    let isNextDisabled = !this.state.links.next
    let isBackDisabled = !this.state.links.prev

    this.setState({ isNextDisabled, isBackDisabled })
  }

  pageMoveTo = link => link &&
    getPage(link)
    .then(([transactions, links]) => this.setState({ transactions, links }))
    .then(this.updatePageButtons)

  pageFirst = () => this.pageMoveTo(this.state.links.first)

  pageForward = () => this.pageMoveTo(this.state.links.next)

  pageBack = () => this.pageMoveTo(this.state.links.prev)

  pageLast = () => this.pageMoveTo(this.state.links.last)

  pageOffsetChange = offset => this.setState({ offset, transactions: [] },
    () => this.updateTxs(this.state)
  )

  openDialog = () => this.setState({ isDialogShown: true })
  closeDialog = () => this.setState({ isDialogShown: false })

  renderCoinLink = coin =>
    <Link className="router-link" to={{ pathname: `/coin/${coin}`, state: { coin }}}>
      {coin}
    </Link>

  renderWalletLink = (wallet, address) => {
    if (this.state.exchanges.find(({ name }) => name === wallet))
      return (
        <Link
            intent="none"
            color="neutral"
            className="router-link"
            appearance="minimal"
            to={{ pathname: `/exchange/${wallet}` }}
          >
            {wallet}
          </Link>
      )
    return (
      <UILink
          href="#"
          size={300}
          intent="none"
          color="neutral"
          appearance="minimal"
          onClick={() => this.loadWalletAside(address) }
        >
          {wallet}
        </UILink>
    )
  }

  loadWalletAside = wallet => {
    this.setState({ isWalletAsideShown: true, selectedWallet: null })
    getWallet(wallet)
    .then(wallet => this.setState({ selectedWallet: wallet }))
  }

  renderFilters = () => this.props.withFilters &&
    <TransactionFilters
      isCoin={this.props.isCoin}
      isExchange={this.props.isExchange}
      exchanges={this.state.exchanges}
      changeHandler={this.filterChangeHandler}
      type={this.state.type}
      tokens={this.state.tokens}
      exchange={this.state.exchange}
      threshold={this.state.threshold}
      timeframe={this.state.timeframe}
      onCSVClick={this.openDialog}
    />

  renderTableHead = () => this.props.isExchange
    ? <TextCell>Type</TextCell>
    : <Fragment>
        <TextCell>From</TextCell>
        <TextCell>To</TextCell>
      </Fragment>

  renderTransactions = () => this.state.transactions
    .map((tx, i) =>
      <Row key={tx.hash} height={30} className={tx.fresh ? "fresh-row" : ""}>
        <TextCell>{formatTime(tx.timestamp)}</TextCell>
        {(this.state.type === 'erc20' || this.props.isExchange || this.props.isWallet) &&
          <TextCell>{this.renderCoinLink(tx.symbol)}</TextCell>
        }
        <TextCell>{withComas(tx['token-amount'])}</TextCell>
        <TextCell>{toUSD(tx['cents-value'] / 100)}</TextCell>
        {this.props.isExchange
          ? <TextCell>{this.txDirection(tx)}</TextCell>
          : <Fragment>
              <TextCell>{this.renderWalletLink(tx['from-name'], tx['from'])}</TextCell>
              <TextCell>{this.renderWalletLink(tx['to-name'], tx['to'])}</TextCell>
            </Fragment>
        }
        <TextCell>
          {tx.symbol === 'BTC'
            ? <UILink
                target="_blank"
                size={300}
                color="neutral"
                href={`https://blockchain.info/tx/${tx.hash}`}
              >
                Blockchain.info
              </UILink>
            : <UILink
                target="_blank"
                size={300}
                color="neutral"
                href={`https://etherscan.io/tx/${tx.hash}`}
              >
                Etherscan
              </UILink>
          }
        </TextCell>
      </Row>
    )

  renderPageController = () =>
    <PageController
      isBackDisabled={this.state.isBackDisabled}
      isNextDisabled={this.state.isNextDisabled}
      onOffsetChange={this.pageOffsetChange}
      first={this.state.links.first}
      last={this.state.links.last}
      offset={this.state.offset}
      onFirst={this.pageFirst}
      onLast={this.pageLast}
      onForward={this.pageForward}
      onBack={this.pageBack}
    />

  renderTxChart = () => {
    if (this.state.transactions.length < 1) return

    if (this.props.withChart && this.props.isExchange)
      return (
        <Pane>
          <ExchangeTxChart
            exchange={this.state.exchange}
            transactions={[...this.state.transactions].reverse()}
          />
        </Pane>
      )
    if (this.props.withChart && this.props.isCoin)
      return (
        <Pane>
          <TxLineChart
            chartKey="token-amount"
            label="Coin Amount"
            color="rgba(75, 192, 192, 1)"
            transactions={[...this.state.transactions].reverse()}
          />
        </Pane>
      )
    }

  closeWalletAside = () => this.setState({ isWalletAsideShown: false })

  render = () =>
    <Pane
      is="section"
      width="100%"
      paddingBottom={majorScale(5)}
      display="flex"
      flexGrow={0}
      alignItems="center"
      justifyContent="flex-start"
      flexDirection="column"
    >
      {this.renderTxChart()}
      {this.renderFilters()}
      <Table width="100%" flex={1} display="flex" flexDirection="column">
        <Head>
          <SortableHeading
            changeHandler={this.sortChangeHandler}
            orderedColumn={this.state.orderedColumn}
            column='time'
            title='Date' />
          {(this.state.type === 'erc20' || this.props.isExchange || this.props.isWallet) &&
            <TextCell>Coin</TextCell>
          }
          <SortableHeading
            changeHandler={this.sortChangeHandler}
            orderedColumn={this.state.orderedColumn}
            column='amount'
            title='Amount' />
          <SortableHeading
            changeHandler={this.sortChangeHandler}
            orderedColumn={this.state.orderedColumn}
            column='value'
            title='Value (USD)' />
          {this.renderTableHead()}
          <TextCell>Link</TextCell>
        </Head>
        {this.state.isLoading && <LoadingSpinner />}
        <Body flex={1} overflowY="visible">
          {this.renderTransactions()}
        </Body>
      </Table>
      {this.state.transactions.length < 1 && !this.state.isLoading &&
        <Paragraph size={500} paddingY={majorScale(15)}>
          No transactions based on the selected filters. Please change the filtering and try again
        </Paragraph>
      }
      {this.renderPageController()}
      <WalletAside
        type={this.state.type}
        selectedWallet={this.state.selectedWallet}
        isShown={this.state.isWalletAsideShown}
        close={this.closeWalletAside}
        />
      <ComingSoonDialog close={this.closeDialog} isShown={this.state.isDialogShown} />
    </Pane>
}

export default TransactionsExplorer
