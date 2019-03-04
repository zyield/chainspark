import React from 'react'
import { Pane, majorScale } from 'evergreen-ui'
import Header from '../components/Header'
import TopStats from '../components/TopStats'
import Footer from '../components/Footer'
import TransactionsExplorer from '../components/TransactionsExplorer'

const Index = () =>
  <Pane minWidth={1150}>
    <Header title="Transaction Explorer" />
    <Pane
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginTop={majorScale(1)}
    >
      <TopStats />
      <Pane marginTop={majorScale(3)} width="90%" maxWidth={1500}>
        <TransactionsExplorer withFilters />
      </Pane>
    </Pane>
    <Footer />
  </Pane>

export default Index
