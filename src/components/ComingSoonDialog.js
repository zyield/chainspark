import React, { Component } from 'react'
import { Dialog, Pane, Paragraph, TextInput, majorScale } from 'evergreen-ui'
import { isEmailValid } from '../utils'
import { postSubscription } from '../utils/ajax'

class ComingSoonDialog extends Component {
  state = {
    email: '',
    isLoading: false,
    isInvalid: false
  }

  subscribe = () => {
    let { email } = this.state

    if (!isEmailValid(email)) {
      this.setState({ isInvalid: true })
      return alert('Please enter a valid email')
    }

    this.setState({ isLoading: true })

    postSubscription(email)
    .then(res => res.status === 200
      ? alert('You have been subscribed! Thank you.')
      : res.json()
    )
    .then(res => {
      if (!res) return

      if (res.title === 'Member Exists')
        return alert('You have already subscribed! Thank you')

      alert('Something went wrong. Please try again later')
    })
    .then(() => this.setState({ isInvalid: false, isLoading: false, email: '' }))
    .then(() => this.props.close())
  }

  render = () =>
    <Dialog
      isShown={this.props.isShown}
      title="Coming Soon"
      onCloseComplete={() => this.props.close()}
      onConfirm={() => this.subscribe()}
      confirmLabel="Submit"
      isConfirmLoading={this.state.isLoading}
    >
      <Pane display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Paragraph textAlign="center">
          To use the API or download the data in CSV format, you’ll need a subscription.
          We’re launching our subscriptions shortly. <br />
          Please enter your email to be notified as soon as they’re live!
        </Paragraph>
        <TextInput
          isInvalid={this.state.isInvalid}
          value={this.state.email}
          onChange={({ target }) => this.setState({ email: target.value, isInvalid: false })}
          marginTop={majorScale(3)}
          placeholder="Email"
        />
      </Pane>
    </Dialog>
}

export default ComingSoonDialog
