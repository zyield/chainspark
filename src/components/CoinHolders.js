import React from 'react'
import { Card, Pane, Table, Text, Link, Popover, Position, Button } from 'evergreen-ui'
import WalletsList from './WalletsList'
import { groupHoldersByName } from '../utils'

const { TextCell, Head, Row, VirtualBody } = Table

const renderLinks = (coin, address) => coin === 'BTC'
  ? <Link
      target="_blank"
      size={300}
      color="neutral"
      href={`https://www.blockchain.com/btc/address/${address}`}
    >
      {address}
    </Link>
  : <Link
      target="_blank"
      size={300}
      color="neutral"
      href={`https://etherscan.io/address/${address}`}
    >
      {address}
    </Link>

const DetailPopover = ({ coin, name, holders, price }) =>
  <Popover
    position={Position.BOTTOM_LEFT}
    content={
      <Pane width={500}>
        <WalletsList
          isCoinHolders
          price={price}
          wallets={holders
            .filter(wallet => wallet.name === name)
            .map(wallet => ({ ...wallet, value: wallet.balance * price }))
          }
        />
      </Pane>
    }>
    <Button appearance="minimal" iconBefore="chevron-down">
      {name}
    </Button>
  </Popover>

const CoinHolders = ({ holders, price, width, coin }) =>
  <Card
    elevation={1}
    width={width}
    height="100%"
    display="flex"
    justifyContent="center"
    flexDirection="column"
  >
    {holders.length === 0
      ? <Text>No holders data availabe yet, sorry</Text>
      : <Table width="100%" flex={1} display="flex" flexDirection="column">
          <Head>
            <TextCell>Top Holders</TextCell>
            <TextCell>Total Amount</TextCell>
            <TextCell>Total Value (USD)</TextCell>
            <TextCell>% of total supply</TextCell>
          </Head>
          <VirtualBody height={450}>
            {groupHoldersByName(holders)
              .map(({ address, balance, percentage, name }) =>
                <Row key={address}>
                  <TextCell>
                    {name === 'uknown wallet'
                      ? renderLinks(coin, address)
                      : <DetailPopover
                          holders={holders}
                          coin={coin}
                          name={name}
                          price={price}
                        />
                    }
                  </TextCell>
                  <TextCell>{balance.toLocaleString()}</TextCell>
                  <TextCell>${(price / 100 * balance).toLocaleString()}</TextCell>
                  <TextCell>{(percentage * 100).toFixed(2)} %</TextCell>
                </Row>
            )}
          </VirtualBody>
        </Table>
    }
  </Card>

export default CoinHolders
