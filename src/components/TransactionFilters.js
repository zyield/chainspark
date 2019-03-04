import React, { Fragment } from 'react'
import { Pane, SegmentedControl, Select, Combobox } from 'evergreen-ui'
import { toTitleCase, toUSD } from '../utils/formatters'

const thresholds = [ 25000000, 50000000, 100000000, 300000000, 500000000, 1000000000, 1500000000 ]
const ERC20thresholds = [ 100000, 25000000, 50000000, 100000000, 500000000, 1000000000, 1500000000 ]
const typeOptions = [
  { label: 'BTC', value: 'btc' },
  { label: 'ETH', value: 'eth' },
  { label: 'ERC20', value: 'erc20' }
]
const timeOptions = [
  { label: '24h', value: '1d' },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' }
]

const TypeSwitch = ({ type, changeHandler }) =>
  <SegmentedControl
    width={240}
    options={typeOptions}
    value={type}
    onChange={type => changeHandler({ value: type, filter: 'type' })}
  />

const TokenSelect = ({ tokens, changeHandler }) =>
  <Combobox
    items={tokens.map(({ symbol }) => symbol)}
    placeholder="Token"
    autocompleteProps={{ title: 'Token'}}
    onChange={token => changeHandler({ value: token, filter: 'token' })}
  />

const TimeSwitch = ({ timeframe, changeHandler }) =>
  <SegmentedControl
    width={240}
    options={timeOptions}
    value={timeframe}
    onChange={time => changeHandler({ value: time, filter: 'timeframe' })}
  />

const ExchangeSelect = ({ exchange, exchanges, changeHandler }) =>
  <Combobox
    items={['All Wallets', 'Exchanges Only'].concat(exchanges.map(({ name }) => toTitleCase(name)))}
    placeholder="Exchanges"
    autocompleteProps={{ title: 'Exchange'}}
    value={exchange}
    onChange={exchange => changeHandler({ value: exchange, filter: 'exchange' })}
  />

const ThresholdSelect = ({ erc20select, threshold, changeHandler }) =>
  <Select
    value={threshold || thresholds[0]}
    onChange={({ target }) => changeHandler({ filter: 'threshold', value: target.value })}>
      {erc20select
        ? ERC20thresholds.map(x => <option key={x} value={x}>{toUSD(x / 100)}+</option> )
        : thresholds.map(x => <option key={x} value={x}>{toUSD(x / 100)}+</option> )
      }
  </Select>

const MainFilters = ({ type, ...props }) =>
  <Fragment>
    <TypeSwitch {...props} />
    {type === 'erc20' && <TokenSelect {...props} />}
    {!props.isExchange && <ExchangeSelect {...props} />}
    <ThresholdSelect erc20select={type === 'erc20'} {...props} />
    <TimeSwitch {...props} />
  </Fragment>

const CoinFilters = props =>
  <Fragment>
    <ExchangeSelect {...props} />
    <ThresholdSelect erc20select {...props} />
    <TimeSwitch {...props} />
  </Fragment>

const TransactionFilters = ({ isCoin, ...props }) =>
  <Pane
    display="flex"
    width="100%"
    alignItems="center"
    justifyContent="center"
    border="muted"
  >
    {isCoin
      ? <CoinFilters {...props} />
      : <MainFilters {...props} />
    }
  </Pane>

export default TransactionFilters
