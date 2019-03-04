import React, { Fragment } from 'react'
import { Popover, Position, Menu, IconButton } from 'evergreen-ui'
import { withRouter } from 'react-router-dom'
import { logoutUser, isAuthenticated } from '../utils/auth'

const signOut = ({ history }) => logoutUser().then(() => history.push('/login'))

const AuthenticatedMenu = props => isAuthenticated()
? <Fragment>
    <Menu.Group>
      <Menu.Item
        onClick={() => props.showPopup()}
        icon="add"
      >
        Add Exchange
      </Menu.Item>
    </Menu.Group>
    <Menu.Divider />
    <Menu.Group>
      <Menu.Item
        icon="log-out"
        intent="danger"
        onClick={() => signOut(props)}
      >
        Sign Out
      </Menu.Item>
    </Menu.Group>
  </Fragment>
: null

const DropdownMenu = props =>
  <Popover
    position={Position.BOTTOM_LEFT}
    content={
      <Menu>
        <Menu.Group>
        </Menu.Group>
        <Menu.Divider />
        <AuthenticatedMenu {...props} />
      </Menu>
    }
  >
    <IconButton appearance="minimal" icon="menu" height={40} />
  </Popover>

export default withRouter(DropdownMenu)
