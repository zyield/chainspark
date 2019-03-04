import React, { Component } from 'react'
import {
  Pane, Select, RadioGroup, Button,
  Combobox, TextInput, majorScale
} from 'evergreen-ui'

class ExchangeForm extends Component {
  state = {
    name: '',
    address: '',
    type: 'eth',
    switchInput: ''
  }

  saveExchange = () => {
    let { name, address } = this.state
    if (!name || !address) return

    this.props.addExchange(this.state)
    this.setState({
      address: '',
      type: 'eth'
    })
  }

  renderInput = () => {
    if (this.state.switchInput === 'existing')
      return (
        <Combobox
          placeholder="Exchanges"
          title="Exchange Name"
          items={this.props.entities}
          value={this.state.name}
          onChange={name => this.setState({ name })}
        />
      )

    return (
      <TextInput
        onChange={e => this.setState({ name: e.target.value })}
        value={this.state.name}
        placeholder="New Exchange Name"
      />
    )
  }


  render = () =>
    <Pane display="flex" alignItems="center">
      <Pane
        paddingX={majorScale(1)}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <RadioGroup
           value={this.state.switchInput}
           options={[
             {label: 'New Exchange', value: 'new'},
             {label: 'Existing', value: 'existing'}
           ]}
           onChange={value => this.setState({ switchInput: value })}
         />
      </Pane>
      {this.renderInput()}
      <TextInput
        value={this.state.address}
        placeholder="address"
        onChange={e => this.setState({ address: e.target.value })}
      />
      <Select
        value={this.state.type}
        onChange={e => this.setState({ type: e.target.value })}
      >
        <option value="eth" checked>ETH</option>
        <option value="btc">BTC</option>
      </Select>
      <Button iconBefore="add" onClick={this.saveExchange}>Add</Button>
    </Pane>
}

export default ExchangeForm
