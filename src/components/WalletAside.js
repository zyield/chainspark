import React, { Component } from 'react'
import { Pane, SideSheet, Card, Table, Heading, majorScale, Link } from 'evergreen-ui'
import { withComas, toUnit } from '../utils/formatters'
import LoadingSpinner from './LoadingSpinner'
import WalletActivityBadge from './WalletActivityBadge'
import WalletTokens from './WalletTokens'

const { TextCell, Row, Body } = Table

class WalletAside extends Component {
  renderTokens = () =>
    <Pane>
      <Heading
        marginLeft={majorScale(1)}
        marginTop={majorScale(3)}
        marginBottom={majorScale(2)}>Wallet Tokens
      </Heading>
      <WalletTokens tokens={this.props.selectedWallet.tokens || []} />
    </Pane>

  renderDetails = () => {
    let { selectedWallet, type } = this.props
    return (
      <Pane>
        <Heading
          marginLeft={majorScale(1)}
          marginTop={majorScale(1)}
          marginBottom={majorScale(2)}
        >
          Wallet Details
          {type !== 'btc' &&
            <WalletActivityBadge activity={selectedWallet.activity} />
          }
        </Heading>
        <Table flex={1} display="flex" flexDirection="column">
          <Body textAlign="left">
              <Row>
                <TextCell>Address</TextCell>
                <TextCell>
                  <Link
                    target="_blank"
                    color="blue"
                    href={type === 'btc'
                      ? `https://www.blockchain.com/btc/address/${selectedWallet.address}`
                      : `https://etherscan.io/address/${selectedWallet.address}`
                    }
                  >
                    {selectedWallet.address}
                  </Link>
                </TextCell>
              </Row>
              <Row>
                <TextCell>Total {type === 'btc' ? 'BTC' : 'ETH'} balance</TextCell>
                <TextCell>{withComas(toUnit(selectedWallet.balance, type)) || 0}</TextCell>
              </Row>
              {type === 'eth' &&
                <Row>
                  <TextCell>Total ERC balance</TextCell>
                  <TextCell>0</TextCell>
                </Row>
              }
              {type === 'btc' &&
                <Row>
                  <TextCell>Total Number of txns</TextCell>
                  <TextCell>{selectedWallet.details && selectedWallet.details.n_tx}</TextCell>
                </Row>
              }
          </Body>
        </Table>
        {selectedWallet.tokens && selectedWallet.tokens.length > 0
          ? this.renderTokens()
          : null
        }
      </Pane>
    )
  }

  render = () => {
    return (
      <SideSheet isShown={this.props.isShown} onCloseComplete={() => this.props.close()}>
        <Card
          paddingY={majorScale(2)}
          paddingX={majorScale(2)}
          display="flex"
          justifyContent="left"
          alignItems="left"
          flexDirection="column"
        >
          {this.props.selectedWallet
            ? this.renderDetails()
            : <LoadingSpinner />
          }
        </Card>
      </SideSheet>
    )
  }
}

export default WalletAside
