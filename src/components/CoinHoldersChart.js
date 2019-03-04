import React from 'react'
import { Pane, defaultTheme } from 'evergreen-ui'
import { Pie } from 'react-chartjs-2'

import { truncateIfUnknown } from '../utils'

// TODO: calculate correct percentage, change colours, add labels etc
const CoinHoldersChart = ({ holders, price, coin, width }) => {
  let data = holders
    .reduce((acc, { address, percentage, name }) => {
        percentage = percentage * 100
        address = truncateIfUnknown(name, address)

        if (percentage > 4)
          acc[0].push({address, percentage})
        else
          acc[1].percentage += percentage

        return acc
      }, [[], {address: 'other', percentage: 0}]
    ).flat()

  return (
    <Pane width={width}>
      <Pie
        data={{
          datasets: [{
            data: data.map(({ percentage }) => percentage),
            backgroundColor: Object.values(defaultTheme.colors.intent)
          }],
          labels: data.map(({ address }) => address)
        }}
      />
    </Pane>
  )
}
export default CoinHoldersChart
