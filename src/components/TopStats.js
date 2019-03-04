import React, { Component } from 'react'
import { Card, Pane, Paragraph, Link, majorScale } from 'evergreen-ui'
import { getHighestTxns } from '../utils/ajax'
import { toUSD, withComas } from '../utils/formatters'

class TopStats extends Component {
  state = {
    highestETH: { "cents-value": 0 },
    highestBTC: { "cents-value": 0 }
  }

  componentDidMount = () => getHighestTxns().then(txns => {
    let highestBTC = txns.find(tx => tx.symbol === 'BTC') || this.state.highestBTC
    let highestETH = txns.find(tx => tx.symbol !== 'BTC') || this.state.highestETH

    this.setState({ highestBTC, highestETH})
  })

  render = () => {
    let { highestETH, highestBTC } = this.state

    return (
      <Pane
        display="flex"
        width="60%"
        justifyContent="space-around"
      >
        <Card
          backgroundColor="#fff"
          padding={majorScale(2)}
          elevation={1}
        >
          <Paragraph size={400}>
            Highest ETH/ERC20 (24h):
          </Paragraph>
          <Paragraph>
            <b>{withComas(highestETH["token-amount"])} {highestETH.symbol} ({toUSD(highestETH["cents-value"] / 100)} USD)</b>
          </Paragraph>
          <Paragraph textAlign="center">
            From {highestETH["from-name"]} to {highestETH["to-name"]}
          </Paragraph>
          <Paragraph>
            <Link
              target="_blank"
              color="neutral"
              href={`https://etherscan.io/tx/${highestETH.hash}`}
            >
              Details
            </Link>
          </Paragraph>
        </Card>
        <Card
          backgroundColor="#fff"
          padding={majorScale(2)}
          elevation={1}
        >
          <Paragraph>
            Highest BTC (24h):
          </Paragraph>
          <Paragraph>
            <b>{withComas(highestBTC["token-amount"])} {highestBTC.symbol} ({toUSD(highestBTC["cents-value"] / 100)} USD)</b>
          </Paragraph>
          <Paragraph>
            From {highestBTC["from-name"]} to {highestBTC["to-name"]}
          </Paragraph>
          <Paragraph>
            <Link
              target="_blank"
              color="neutral"
              href={`https://blockchain.info/tx/${highestBTC.hash}`}
            >
              Details
            </Link>
          </Paragraph>
        </Card>
      </Pane>
    )
  }
}


export default TopStats
