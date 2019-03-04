import React, { Component } from 'react'
import { Position, Popover, Button, Pane, Heading, majorScale } from 'evergreen-ui'
import { Link } from 'react-router-dom'
import DropdownMenu from './DropdownMenu'
import AddExchangeDialog from './AddExchangeDialog'
import Logo from '../assets/logo.svg'
import { getEntities } from '../utils/ajax'

class Header extends Component {
  state = {
    isDialogShown: false,
    exchanges: [],
    entities: []
  }

  componentDidMount = () =>
    getEntities()
    .then(entities => {

      let exchanges =
        entities
        .filter(entity => entity.eth_balance || entity.btc_balance)

      this.setState({ exchanges , entities })
    })


  openDialog = () => this.setState({ isDialogShown: true })
  closeDialog = () => this.setState({ isDialogShown: false })

  render = () =>
    <Pane
      minWidth={1150}
      elevation={1}
      zIndex={1}
      position="relative"
      display="flex"
      alignItems="flex-start"
      paddingTop={majorScale(1)}
      paddingBottom={majorScale(0)}
      paddingLeft={majorScale(4)}
      paddingRight={majorScale(4)}
      marginBottom={majorScale(2)}
    >
      <Pane flex={1} display="flex" marginRight={majorScale(10)}>
        <a href="/#/"><img src={Logo} height="40" alt="Chainspark" /></a>
        <Link to="/#">
          <Button
            height={40}
            marginLeft={majorScale(4)}
            marginRight={majorScale(1)}
            appearance="minimal"
            intent="none"
          >
            Home
          </Button>
        </Link>

        <Popover
          position={Position.BOTTOM_LEFT}
          content={({close}) =>
            <Pane
              clearfix
              width="400px"
              padding={majorScale(3)}
            >
              {
                this.state.exchanges
                  .map(({ name }) => name)
                  .sort()
                  .map((exchange, i) =>
                    <Pane key={i} float="left" width="33%">
                      <Button
                        onClick={close}
                        height={40}
                        is={Link}
                        appearance="minimal"
                        intent="none"
                        to={`/exchange/${exchange}`}
                        >
                          {exchange}
                        </Button>
                    </Pane>
                )
              }
            </Pane>
          }
        >
          <Button height={40} appearance="minimal" intent="none">Exchanges</Button>
        </Popover>
      </Pane>
      <Heading
        position="absolute"
        marginLeft="auto"
        marginRight="auto"
        left={0}
        right={0}
        alignSelf="center"
        width={200}
        size={600}
      >
        {this.props.title}
      </Heading>
      <Pane>
        <DropdownMenu showPopup={this.openDialog} />
      </Pane>
      <AddExchangeDialog
        entities={this.state.entities.map(({ name }) => name)}
        isDialogShown={this.state.isDialogShown}
        open={this.openDialog}
        close={this.closeDialog}
      />
    </Pane>
}

export default Header
