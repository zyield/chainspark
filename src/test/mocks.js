let mockTx = {
  'cents-value': 100000,
  'from-name': 'Binance',
  'to-name': "Unknown Wallet",
  symbol: 'BTC',
  timestamp: Date.now() / 1000
}

let filters = {
  type: 'btc',
  exchange: 'Binance',
  threshold: 1000,
  timeframe: '1d',
  token: ''
}

let holders = [
  {
    address: "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
    balance: 5000,
    name: "Binance",
    percentage: 42.101
  },
  {
    address: "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
    balance: 5000,
    name: "Binance",
    percentage: 42.101
  },
  {
    address: "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
    balance: 11111,
    name: "uknown wallet",
    percentage: 42.101
  },
  {
    address: "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
    balance: 111111,
    name: "uknown wallet",
    percentage: 42.101
  },
  {
    address: "0xfe9e8709d3215310075d67e3ed32a380ccf451c8",
    balance: 5555,
    name: "Bitrex",
    percentage: 42.101
  }
]

export { mockTx, filters, holders }
