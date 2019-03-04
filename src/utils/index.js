import D from 'date-fns'
import { truncate } from './formatters'

export const filterIncomingTx = (tx, filters) => {
  let {
    'cents-value': cents_value,
    'from-name': from_name,
    'to-name': to_name,
    symbol,
    timestamp
  } = tx
  let { type, exchange, threshold, timeframe, token } = filters

  let txDate = timestamp * 1000

  // Value threshold filter
  if (cents_value < threshold) return

  // Type filter
  if (type === 'btc' && symbol !== 'BTC') return
  if (type === 'eth' && symbol !== 'ETH') return
  if (type === 'erc20' && (symbol === 'ETH' || symbol === 'BTC')) return
  if (type === 'erc20' && token !== 'all' && symbol !== token) return

  // Exchange filter
  if (exchange !== 'All Wallets') {
    if (from_name !== exchange && to_name !== exchange) return
  }

  // Time filter
  let now = Date.now()
  if (timeframe === '1d'  && D.differenceInHours(now, txDate) > 24) return
  if (timeframe === '7d'  && D.differenceInDays(now, txDate)  > 7)  return
  if (timeframe === '30d' && D.differenceInDays(now, txDate)  > 30) return

  return tx
}

export const markFresh = tx => {
  tx.fresh = true
  window.setTimeout(() => (tx.fresh = false), 1000)

  return tx
}

export const truncateIfUnknown = (name, address) => name === 'uknown wallet'
  ? truncate(address)
  : name

export const groupHoldersByName = holders => holders
 .reduce((grouped, holder) => {
   if (holder.name === 'uknown wallet') {
     grouped.push({...holder})
     return grouped
   }

   let exchange = grouped.find(h => h.name === holder.name)
   if (exchange) {
     exchange.balance += holder.balance
     exchange.percentage += holder.percentage
   }
   else grouped.push({...holder})

   return grouped
}, [])

export const isEmailValid = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const delay = seconds =>
  new Promise(resolve => setTimeout(() => resolve(), seconds * 1000))
