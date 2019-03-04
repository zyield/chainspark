import React from 'react'
import { Line } from 'react-chartjs-2'
import { toDate, withComas } from '../utils/formatters'

const config = {
  fill: 'origin',
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderColor: "rgba(75, 192, 192, 1)",
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
}

const TxLineChart = () => null

// const TxLineChart = ({ transactions, chartKey, label, borderColor, backgroundColor }) => transactions.length > 1 &&
//   <Line
//     width={1000}
//     data={{
//       labels:  transactions.map(tx => toDate(tx.timestamp)),
//       datasets: [{
//         data: transactions.map(tx => chartKey === 'cents-value' ? tx[chartKey] / 100 : tx[chartKey]),
//         label,
//         ...config,
//         borderColor: borderColor ? borderColor : config.borderColor,
//         backgroundColor: backgroundColor ? backgroundColor : config.backgroundColor
//       }]
//     }}
//     options={{
//       scales: {
//         yAxes: [{
//           ticks: {
//             callback: label => label >= 1000000000
//                             ? `${label / 1000000000}b`
//                             : withComas(label)
//           }
//         }]
//       }
//     }}
//   />

export default TxLineChart
