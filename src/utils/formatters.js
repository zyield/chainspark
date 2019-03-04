import D from 'date-fns'

export const formatTime = timestamp => {
  let ms = timestamp * 1000
  let now = Date.now()

  let hoursAgo = D.differenceInHours(now, ms)
  if (hoursAgo < 1)
    return `${D.format(timestamp * 1000, 'HH:mm:ss')} (< 1h ago)`

  if (hoursAgo < 24)
    return `${D.format(timestamp * 1000, 'HH:mm:ss')} (${hoursAgo}h ago)`

  let daysAgo = D.differenceInDays(now, ms)
  if (daysAgo  < 7)
    return `${D.format(timestamp * 1000, 'MMM-DD HH:mm:ss')} (${daysAgo}d ago)`

  return D.format(timestamp * 1000, 'YYYY-MMM-DD HH:mm:ss')
}

export const toUnit = (amount, type) => type === 'btc' ? amount / 10**8 : amount / 10**18

export const toDate = timestamp => D.format(timestamp * 1000, 'MM/DD')

export const withComas = str => str ? str.toLocaleString() : ''

export const toUSD = str => str ? `$${withComas(str)}` : `$0`

export const toTitleCase = str => `${str[0].toUpperCase()}${str.substring(1)}`

export const truncate = str => `${str.substr(0, 4)}...${str.substr(-3)}`

export const toPerc = str => {
  let perc = Math.floor(str * 100)
  return (perc < 1) ? "< 1%" : `${perc}%`
}
