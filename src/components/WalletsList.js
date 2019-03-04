import React from 'react'
import { Table } from 'evergreen-ui'
import { toUSD, withComas, truncate } from '../utils/formatters'

const { TextCell, Head, Row, Body } = Table

const WalletsList = ({ isCoinHolders, wallets, type }) =>
  <Table width="100%" flex={1} display="flex" flexDirection="column">
    <Head>
      <TextCell>Address</TextCell>
      <TextCell>Total Amount</TextCell>
      <TextCell>Total Value (USD)</TextCell>
      {isCoinHolders && <TextCell>Percentage</TextCell>}
    </Head>
    <Body>
      {wallets
        .filter(({ balance }) => Number(balance) > 0)
        .sort((a,b) => b.value - a.value)
        .map((wallet, i) =>
          <Row key={i}>
            <TextCell>
              {
                isCoinHolders
                ? truncate(wallet.address)
                : truncate(wallet.wallet_address)
              }
            </TextCell>
            <TextCell>{withComas(wallet.balance)}</TextCell>
            <TextCell>{toUSD(wallet.value / 100.0)}</TextCell>
            {isCoinHolders && <TextCell>%{wallet.percentage.toFixed(2)}</TextCell>}
          </Row>
      )}
    </Body>
  </Table>

export default WalletsList
