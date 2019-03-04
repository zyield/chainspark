import React, { Component } from 'react'
import { IconButton, Dialog, Table, majorScale } from 'evergreen-ui'
import ExchangeForm from './ExchangeForm'
import { postExchanges } from '../utils/ajax'

const { TextCell: Cell, Head, Row, Body } = Table

class AddExchangeDialog extends Component {
  state = {
    exchanges: [],
    isLoading: false
  }

  alertSuccess = () => {
    alert('Exchanges saved successfully!')
    this.props.close()
  }

  alertFailure = failedExchanges => {
    const errorsToText = errors =>
      Object.entries(errors).map(x => x.join(' ')).join(';')

    let msg = failedExchanges
      .map(({ name, errors }) => `${name} failed to save because: ${errorsToText(errors)}`)
      .join('; ')

    alert(msg)
  }

  addExchange = exchange => {
    if (!exchange.name || !exchange.address)
      return alert('Both name and address should be present')

    this.setState({ exchanges: this.state.exchanges.concat([ exchange ])})
  }

  saveExchanges = async () => {
    if (!this.state.exchanges.length) return
    this.setState({ isLoading: true })

    let response = await postExchanges(this.state.exchanges)

    if (response.status === 201)
      return this.setState({ isLoading: false, exchanges: [] }, this.alertSuccess)

    if (response.status === 202) {
      let failedExchanges = await response.json()
      return this.setState({ isLoading: false, exchanges: [] }, () =>
        this.alertFailure(failedExchanges))
    }

    this.setState({ isLoading: false, exchanges: [] }, () =>
      alert("Something went wrong, please check the inputs and try again"))
  }

  render = () => (
    <Dialog
      width="65%"
      isShown={this.props.isDialogShown}
      title="Add new exchange wallet"
      isConfirmLoading={this.state.isLoading}
      onConfirm={() => this.saveExchanges()}
      onCloseComplete={() => this.props.close()}
      confirmLabel="Submit"
      paddingX={majorScale(5)}
    >
      {this.state.exchanges.length > 0 &&
        <Table>
          <Head>
            <Cell>Name</Cell>
            <Cell>Address</Cell>
            <Cell>Type</Cell>
            <Cell></Cell>
          </Head>
          <Body>
            {this.state.exchanges.map(x =>
              <Row key={x.address}>
                <Cell>{x.name}</Cell>
                <Cell>{x.address}</Cell>
                <Cell>{x.type}</Cell>
                <Cell>
                  <IconButton
                    icon="remove"
                    onClick={() => {
                      this.setState({
                        exchanges: this.state.exchanges
                          .filter(xchange => xchange.address !== x.address)})
                    }}
                  />
                </Cell>
              </Row>
            )}
          </Body>
        </Table>
      }
      <ExchangeForm entities={this.props.entities} addExchange={this.addExchange} />
    </Dialog>
  )
}

export default AddExchangeDialog
