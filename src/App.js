import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Index from './pages/Index'
import Exchange from './pages/Exchange'
import Coin from './pages/Coin'
import Login from './pages/Login'

import { isAuthenticated } from './utils/auth'

import './App.css'

const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route {...rest}
    render={props => isAuthenticated()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }} />
    }
  />


class App extends Component {
  render = () =>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path={`/exchange/:exchange`} component={Exchange} />
        <Route path={`/coin/:coin`} component={Coin} />
        <Route path="/login" component={Login} />
        <Route component={() => <div><h1>404</h1></div>} />
      </Switch>
    </div>
}

export default App
