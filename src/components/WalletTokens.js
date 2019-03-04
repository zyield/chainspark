import React from 'react'
import { Pane, Table } from 'evergreen-ui'
import { withComas } from '../utils/formatters'

const { TextCell, Head, Row, VirtualBody } = Table

const WalletTokens = ({ tokens, ...props }) =>
  <Pane
    {...props}>
    <Table width="100%" flex={1} display="flex" flexDirection="column">
      <Head>
        <TextCell>Symbol</TextCell>
        <TextCell>Name</TextCell>
        <TextCell>Amount</TextCell>
        <TextCell>Value (USD)</TextCell>
        <TextCell>Contract Address</TextCell>
      </Head>
      <VirtualBody height={500}>
        {tokens
          .filter(({ balance }) => Number(balance) > 0)
          .map(({ name, symbol, balance, decimals, contractAddress }) =>
            <Row key={symbol}>
              <TextCell>{symbol}</TextCell>
              <TextCell>{name}</TextCell>
              <TextCell>{withComas((Number(balance) / 10 ** Number(decimals)).toFixed(2))}</TextCell>
              <TextCell>0</TextCell>
              <TextCell>{contractAddress}</TextCell>
            </Row>
        )}
      </VirtualBody>
    </Table>
  </Pane>

export default WalletTokens
