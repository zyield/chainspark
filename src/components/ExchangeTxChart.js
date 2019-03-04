import React from 'react'
import { Pane } from 'evergreen-ui'
import TxLineChart from './TxLineChart'

const extractOutTx = exchange => txns => txns.filter(tx => tx['from-name'] === exchange)
const extractInTx = exchange => txns => txns.filter(tx => tx['to-name'] === exchange)

const ExchangeTxChart = props => {
  let txnsIN = extractInTx(props.exchange)(props.transactions)
  let txnsOUT = extractOutTx(props.exchange)(props.transactions)

  return (
    <Pane>
      <TxLineChart
        transactions={txnsIN}
        chartKey="cents-value"
        label="IN"
      />
      <TxLineChart
        transactions={txnsOUT}
        chartKey="cents-value"
        label="OUT"
        backgroundColor="rgba(235, 0, 0, .4)"
        borderColor="rgba(255, 0, 0, .2)"
      />
    </Pane>
  )
}

export default ExchangeTxChart
