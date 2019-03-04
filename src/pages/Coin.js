import React, { Component } from 'react'
import { Pane, Card, Heading, IconButton, majorScale } from 'evergreen-ui'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TransactionsExplorer from '../components/TransactionsExplorer'
import CoinDetails from '../components/CoinDetails'
import CoinHolders from '../components/CoinHolders'
import CoinHoldersChart from '../components/CoinHoldersChart'
import { getCoin } from '../utils/ajax'

class Coin extends Component {
  state = {
    details: {},
    holders: [],
    displayType: 'table'
  }

  componentDidMount = () => {
    let { coin } = this.props.match.params

    getCoin(coin)
    .then(({ holders, ...details }) =>
      this.setState({ holders, details, coin }))
  }

  getType = coin => {
    if (coin === 'ETH') return 'eth'
    if (coin === 'BTC') return 'btc'
    return 'erc20'
  }

  render = () => {
    let { coin } = this.props.match.params
    return (
      <Pane minWidth={1150}>
        <Header title={coin} />
        <Card
          display="flex"
          justifyContent="space-between"
          marginTop={majorScale(2)}
          paddingX={majorScale(10)}
        >
          <CoinDetails width="30%" details={this.state.details} />
          <Card width="65%" display="flex" flexDirection="row" alignItems="center">
            <Card width={40} height={70}>
              <IconButton
                appearance="minimal"
                onClick={() => this.setState({ displayType: 'table' })}
                icon="panel-table"
              />
              <IconButton
                appearance="minimal"
                onClick={() => this.setState({ displayType: 'chart' })}
                icon="pie-chart"
              />
            </Card>
            {this.state.displayType === 'table'
              ? <CoinHolders
                  width="100%"
                  coin={this.state.coin}
                  holders={this.state.holders}
                  price={this.state.details.price}
                />
              : <CoinHoldersChart
                  width="80%"
                  coin={this.state.coin}
                  holders={this.state.holders}
                  price={this.state.details.price}
                />
            }
          </Card>
        </Card>
        <Card marginTop={majorScale(5)} paddingX={majorScale(10)}>
          <Heading marginBottom={majorScale(3)}>Coin Transactions Volume</Heading>
            <TransactionsExplorer
              withFilters
              withChart
              isCoin
              type={this.getType(coin)}
              token={coin}
            />
        </Card>
        <Footer />
      </Pane>
    )
  }
}

export default withRouter(Coin)
