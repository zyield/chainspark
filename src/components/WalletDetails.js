import React from 'react'
import { Card, Table, Heading, majorScale, Link } from 'evergreen-ui'
import { withComas } from '../utils/formatters'

const { TextCell, Row, Body } = Table

const WalletDetails = ({ width, balance, address, type, details})  =>
  <Card
    elevation={1}
    width={width}
    paddingY={majorScale(2)}
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <Heading>Wallet Details</Heading>
    <Table width="80%" flex={1} display="flex" flexDirection="column">
      <Body textAlign="left">
          <Row>
            <TextCell>Created</TextCell>
            <TextCell>2 years ago</TextCell>
          </Row>
          <Row>
            <TextCell>Address</TextCell>
            <TextCell>
              <Link target="_blank" color="blue" href={`https://etherscan.io/address/${address}`}>
                {address}
              </Link>
            </TextCell>
          </Row>
          <Row>
            <TextCell>Total {type === 'btc' ? 'BTC' : 'ETH'} balance</TextCell>
            <TextCell>{withComas(balance / 10 ** 18)}</TextCell>
          </Row>
          {type === 'eth' &&
            <Row>
              <TextCell>Total ERC balance</TextCell>
              <TextCell>0</TextCell>
            </Row>
          }
          <Row>
            <TextCell>Total Number of txns</TextCell>
            <TextCell>{type === 'btc' && details && details.n_tx}</TextCell>
          </Row>
      </Body>
    </Table>
  </Card>

export default WalletDetails
