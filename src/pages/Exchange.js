import React, { Component } from 'react'
import { Pane, majorScale, Card, Heading } from 'evergreen-ui'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ExchangeWallets from '../components/ExchangeWallets'
import ExchangeTokens from '../components/ExchangeTokens'
import TransactionsExplorer from '../components/TransactionsExplorer'
import { withRouter } from 'react-router-dom'
import { getExchangeAssets } from '../utils/ajax'

class Exchange extends Component {
  state = {
    exchange_name: this.props.match.params.exchange,
    tokens: []
  }

  componentDidUpdate = prevProps => {
    let { exchange } = this.props.match.params
    if (exchange !== prevProps.match.params.exchange)
      this.getExchange(exchange)
  }

  componentDidMount = () => {
    let { exchange } = this.props.match.params
    this.getExchange(exchange)
  }

  getExchange = exchange =>  {
    getExchangeAssets(exchange)
    .then(exchange => this.setState({ exchange }))
  }

  render = () => {
    let { exchange } = this.props.match.params
    if (!this.state.exchange) return null

    let { tokens } = this.state.exchange
    return (
      <Pane minWidth={1150}>
        <Header title={exchange} />
        <Card
          display="flex"
          justifyContent="space-around"
          paddingBottom={majorScale(2)}
          paddingX={majorScale(10)}
        >
        {this.state.exchange &&
          <ExchangeWallets
            marginRight={majorScale(2)}
            exchange={this.state.exchange}
            width={tokens.length > 0 ? '50%' : '100%'}
          />
        }
        {tokens && tokens.length > 0
          ? <ExchangeTokens tokens={tokens} width="50%" />
          : null
        }
        </Card>
        <Card paddingX={majorScale(10)}>
          <Heading textAlign="left" marginBottom={majorScale(3)}>Exchange Transactions</Heading>
            <TransactionsExplorer
              withChart
              withFilters
              exchange={exchange}
              isExchange
            />
        </Card>
        <Footer />
      </Pane>
    )
  }
}

export default withRouter(Exchange)
