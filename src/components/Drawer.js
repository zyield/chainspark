import React from 'react'
import { Pane, majorScale, Link } from 'evergreen-ui'

const Drawer = props =>
  <Pane
    width="20%"
    display="flex"
    justifyContent="flex-start"
    alignItems="center"
    flexDirection="column"
    borderRight="default"
    {...props}
  >
    <Link href="/" color="neutral" marginTop={majorScale(5)}>Home</Link>
    <Link href="#" color="neutral" marginTop={majorScale(5)}>Dashboard</Link>
    <Link href="#" color="neutral" marginTop={majorScale(5)}>Alerts</Link>
    <Link href="#" color="neutral" marginTop={majorScale(5)}>Coins</Link>
    <Link href="#" color="neutral" marginTop={majorScale(5)}>Exchanges</Link>
    <Link href="#" color="neutral" marginTop={majorScale(5)}>Wallets</Link>
  </Pane>

export default Drawer
