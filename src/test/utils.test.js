import { filterIncomingTx, groupHoldersByName, markFresh, delay } from '../utils'
import { mockTx, filters, holders } from './mocks'

describe('Incoming Transaction Filter', () => {
  it('returns tx that passes all filters', () => {
    expect(filterIncomingTx(mockTx, filters))
    .toMatchObject(mockTx)
  })

  it('returns nothing if doesn\'t pass type filter', () => {
    let eth_tx = { ...mockTx, symbol: 'ETH' }

    expect(filterIncomingTx(eth_tx, filters))
    .toBeUndefined()
  })

  it('returns nothing if doesn\'t pass exchange filter', () => {
    let unknown_tx = { ...mockTx, 'from-name': 'Unknown Wallet' }

    expect(filterIncomingTx(unknown_tx, filters))
    .toBeUndefined()
  })

  it('returns nothing if doesn\'t pass threshold filter', () => {
    let small_tx = { ...mockTx, 'cents-value': 100 }

    expect(filterIncomingTx(small_tx, filters))
    .toBeUndefined()
  })

  it('returns nothing if doesn\'t pass time filter', () => {
    let old_tx = { ...mockTx, timestamp: 1540785600 }

    expect(filterIncomingTx(old_tx, filters))
    .toBeUndefined()
  })

  it('returns nothing if doesn\'t pass token filter', () => {
    let token_tx = { ...mockTx, type: 'erc20', symbol: 'BNB' }
    let tokenFilter = { ...filters, type: 'erc20', token: 'BAT' }

    expect(filterIncomingTx(token_tx, filters))
    .toBeUndefined()
  })

  it('returns tx if passes token filter', () => {
    let token_tx = { ...mockTx, type: 'erc20', symbol: 'BAT' }
    let tokenFilter = { ...filters, token: 'BAT', type: 'erc20' }

    expect(filterIncomingTx(token_tx, tokenFilter))
    .toMatchObject(token_tx)
  })
})

describe('groupHoldersByName/1', () => {
  it('correcly groups coin holder by name', () => {
    let processed = groupHoldersByName(holders)
    let binance = processed.find(h => h.name === 'Binance')

    expect(processed.length).toBe(4)
    expect(binance.balance).toBe(10000)
    expect(binance.percentage).toBe(84.202)
  })
})

describe('markFresh/1', () => {
  it('marks tx as fresh and removes the mark in one second', async () => {
    let tx = markFresh(mockTx)

    expect(tx.fresh).toBe(true)
    await delay(1)
    expect(tx.fresh).toBe(false)
  })
})
