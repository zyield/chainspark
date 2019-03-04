import React, { Component } from 'react'
import { Pane, Card, Heading, TextInputField, majorScale, Button } from 'evergreen-ui'
import { withRouter } from 'react-router-dom'
import Logo from '../assets/chainspark_logo.png'
import { loginUser } from '../utils/auth'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  loginAndRedirect = () =>
    loginUser({ email: this.state.email, password: this.state.password })
    .then(res => res !== 403 && this.props.history.push('/'))

  render = () =>
    <Card
      display="flex"
      height="100vh"
      paddingY={majorScale(5)}
      justifyContent="flex-start"
      flexDirection="column"
      alignItems="center"
    >
      <img src={Logo} height="90" alt="Chainspark" />
      <Pane
        padding={majorScale(5)}
        marginTop={majorScale(5)}
        elevation={2}
        width={300}
      >
        <Heading marginBottom={majorScale(4)}>Login</Heading>
        <TextInputField
          onChange={({ target }) => this.setState({ email: target.value })}
          value={this.state.email}
          label="Email"
          placeholder="warren@buffett.com"
        />
        <TextInputField
          onChange={({ target }) => this.setState({ password: target.value })}
          value={this.state.password}
          label="Password"
          type="password"
          placeholder="very_secret_password"
        />
      <Button onClick={this.loginAndRedirect} appearance="primary">
        Submit
      </Button>
      </Pane>
    </Card>
}

export default withRouter(Login)
