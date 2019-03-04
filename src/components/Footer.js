import React, { Component } from 'react'
import { Pane, UnorderedList, Link, ListItem, Text, majorScale } from 'evergreen-ui'
import ComingSoonDialog from './ComingSoonDialog'

import TwitterLogo from '../assets/twitter.png'

class Footer extends Component {
  state = {
    isDialogShown: false
  }

  openDialog = () => this.setState({ isDialogShown: true })
  closeDialog = () => this.setState({ isDialogShown: false })

  render = () =>
    <Pane
      width="100%"
      minWidth={1150}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      elevation={1}
      zIndex={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="#fff"
      paddingTop={majorScale(1)}
      paddingX={majorScale(4)}
      paddingBottom={majorScale(1)}
    >
      <Pane>
        <Text>
          Buidl by Agile Alpha in Toronto, Canada
          <span role="img" aria-label="canadian flag"> 🇨🇦 </span>
        </Text>
      </Pane>
      <Pane display="flex" alignItems="center">
        <Link
          color="neutral"
          marginRight={majorScale(2)}
          href="https://twitter.com/chainsparkio"
          target="_blank"
          >
          <img
            style={{ verticalAlign: 'top', marginRight: '5px' }}
            width={20}
            src={TwitterLogo}
            alt="twitter logo"
          />
            Chainspark.io
          </Link>
        <Link
          color="neutral"
          marginRight={majorScale(2)}
          href="https://twitter.com/whalewatchio"
          target="_blank"
        >
          <img
            style={{ verticalAlign: 'top', marginRight: '5px' }}
            width={20}
            src={TwitterLogo}
            alt="twitter logo"
          />
            WhaleWatch.io
          </Link>
      </Pane>
      <ComingSoonDialog close={this.closeDialog} isShown={this.state.isDialogShown} />
    </Pane>
}

export default Footer
