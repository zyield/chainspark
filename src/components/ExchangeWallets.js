import React from 'react'
import { Button, Pane, Heading, Paragraph, Popover, Table, Position, majorScale } from 'evergreen-ui'
import WalletsList from './WalletsList'
import { toUSD, withComas } from '../utils/formatters'

const { TextHeaderCell, TextCell, Head, Row, Body } = Table

const ExchangeWallets = props => {
  let { exchange } = props

  return <Pane {...props} textAlign="left">
    <Heading paddingY={majorScale(3)}>Wallet Holdings:</Heading>
    <Table>
      <Head>
        <TextHeaderCell>
          Name
        </TextHeaderCell>
        <TextHeaderCell>
          Balance
        </TextHeaderCell>
        <TextHeaderCell>
          Value
        </TextHeaderCell>
      </Head>
      <Body>
        {exchange && exchange.btc_balance > 0
          ? <Row>
              <TextCell>
                <Popover
                  position={Position.BOTTOM_LEFT}
                  content={
                    <Pane width={500}>
                      <WalletsList type="btc" wallets={exchange.btc_wallets} />
                    </Pane>
                  }>
                  <Button iconBefore="search">
                    BTC
                  </Button>
                </Popover>
              </TextCell>
              <TextCell>
                {withComas(exchange.btc_balance) || 0}
              </TextCell>
              <TextCell>
                {toUSD(exchange.btc_value / 100) || 0}
              </TextCell>
            </Row>
          : null
        }
        {exchange.eth_balance > 0
          ? <Row>
              <TextCell>
                <Popover
                  position={Position.BOTTOM_LEFT}
                  content={
                    <Pane width={500}>
                      <WalletsList type="eth" wallets={exchange.eth_wallets} />
                    </Pane>
                  }>
                  <Button iconBefore="search">
                    ETH
                  </Button>
                </Popover>
              </TextCell>
              <TextCell>
                {withComas(exchange.eth_balance)}
              </TextCell>
              <TextCell>
                {toUSD(exchange.eth_value / 100)}
              </TextCell>
            </Row>
          : null
        }
        {exchange.token_value > 0
          ? <Row>
              <TextCell>
                <Paragraph>ERC20</Paragraph>
              </TextCell>
              <TextCell></TextCell>
              <TextCell>
                {toUSD(exchange.token_value / 100) || 0}
              </TextCell>
            </Row>
          : null
        }
      </Body>
    </Table>
  </Pane>
}

export default ExchangeWallets
