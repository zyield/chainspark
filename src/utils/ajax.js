import { BASE_URL, API_SECRET, SUBSCRIPTIONS_URL } from './constants'
import { getToken } from './auth'

const throwUnauthorized = res => {
  if (res.status === 401) throw Error('Not authorized')
  return res
}

const fetchData = url => {
  let opts = {
    headers: {
      // Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/vnd.api+json',
      'Chainspark-secret': API_SECRET
    }
  }

  return fetch(url, opts)
    .then(throwUnauthorized)
    .then(res => res.status === 200 && res.json())
    .then(res => {
      let { data, links } = res
      let payload = Array.isArray(data)
        ? data.map(({ attributes }) => attributes)
        : data.attributes

      return links ? [payload, links] : payload
    })
}

export const getTxs = ({ type, exchange, threshold, timeframe, token, page, offset, orderedColumn, ordering }) => {
  if (type === 'btc' || type === 'eth')
    token = 'all'

  if (exchange === 'All Wallets' || exchange === 'Exchanges Only')
    exchange = exchange.toLowerCase().replace(/\s/gi, '-')

  let filters =
    `?page[number]=${page}&page[size]=${offset}&filter[type]=${type}&filter[time]=${timeframe}&filter[exchange]=${exchange}&filter[threshold]=${threshold}&filter[token]=${token}&order[${orderedColumn}]=${ordering}`

  return fetchData(`${BASE_URL}/api/transactions${filters}`)
}

export const getExchangeTxs = ({ type, exchange, threshold, timeframe, offset, token, orderedColumn, ordering })=>  {
  let filters =
    `?page[number]=1&page[size]=${offset}&filter[type]=${type}&filter[time]=${timeframe}&filter[threshold]=${threshold}&filter[token]=${token}&filter[exchange]=${exchange}&order[${orderedColumn}]=${ordering}`

  return fetchData(`${BASE_URL}/api/transactions${filters}`)
}

export const getCoinTxs = ({ token, threshold, timeframe, offset, orderedColumn, ordering, type }) =>  {
  let filters =
    `?page[number]=1&page[size]=${offset}&filter[type]=${type}&filter[time]=${timeframe}&filter[threshold]=${threshold}&filter[token]=${token}&order[${orderedColumn}]=${ordering}`

  return fetchData(`${BASE_URL}/api/transactions${filters}`)
}

export const getWalletTxs = ({ threshold, timeframe, offset, wallet }) => {
  let filters =
    `?page[number]=1&page[size]=${offset}&filter[time]=${timeframe}&filter[threshold]=${threshold}&filter[wallet]=${wallet}`

  return fetchData(`${BASE_URL}/api/transactions${filters}`)
}

export const getExchangeAssets = exchange =>
  fetchData(`${BASE_URL}/api/entities/${exchange}`)

export const getExchanges = type =>
  fetchData(`${BASE_URL}/api/wallets/?type=${type}`)

export const getEntities = () =>
  fetchData(`${BASE_URL}/api/entities`)

export const getTokens = () =>
  fetchData(`${BASE_URL}/api/tokens`)

export const getCoin = symbol =>
  fetchData(`${BASE_URL}/api/tokens/${symbol}`)

export const getWallet = address =>
  fetchData(`${BASE_URL}/api/wallets/${address}`)

export const getPage = page => fetchData(`${BASE_URL}${page}`)

export const getHighestTxns = () => fetchData(`${BASE_URL}/api/transactions/highest`)

export const postSubscription = email =>
  fetch(`${SUBSCRIPTIONS_URL}/api/subscriptions`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email_address: email,
      status: "pending"
    })
  })

export const postExchanges = exchanges =>
  fetch(`${BASE_URL}/api/wallets`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/vnd.api+json',
      'Chainspark-secret': API_SECRET
    },
    body: JSON.stringify({ exchanges })
  })
