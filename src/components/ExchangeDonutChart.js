import React from 'react'
import { Pane } from 'evergreen-ui'
import { Doughnut } from 'react-chartjs-2'

const ExchangeDonutChart = props =>
  <Pane {...props}>
    <Doughnut
      data={{
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)'
          ]
        }],
        labels: [
          'Tokens',
          'ETH',
          'BTC'
        ]
      }}
    />
  </Pane>

export default ExchangeDonutChart
