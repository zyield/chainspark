import React from 'react'
import { Pane, Table, Heading, majorScale } from 'evergreen-ui'
import { toUSD, toPerc, withComas } from '../utils/formatters'

const { TextCell, Head, Row, VirtualBody } = Table

const ExchangeTokens = props => {
  return <Pane
    textAlign="left"
    {...props}>
      <Heading paddingY={majorScale(3)}>Tokens Balance</Heading>
      <Table width="100%" flex={1} display="flex" flexDirection="column">
      <Head>
        <TextCell>Symbol</TextCell>
        <TextCell>Amount</TextCell>
        <TextCell>Value (USD)</TextCell>
        <TextCell>% of total minted</TextCell>
      </Head>
      <VirtualBody height={250}>
        {props.tokens
          .filter(({ balance}) => Number(balance) > 0)
          .sort((a,b) => b.value - a.value)
          .map((token, i) =>
          <Row key={i}>
            <TextCell>{token.name} ({token.symbol})</TextCell>
            <TextCell>{withComas(token.balance)}</TextCell>
            <TextCell>{toUSD(token.value / 100)}</TextCell>
            <TextCell>{toPerc(token.perc_held)}</TextCell>
          </Row>
        )}
      </VirtualBody>
    </Table>
  </Pane>
}

export default ExchangeTokens
