import React from 'react'
import { Card, Table, Heading, majorScale, Link } from 'evergreen-ui'
import { withComas, toUSD} from '../utils/formatters'
const { TextCell, Row, Body } = Table


const CoinDetails = ({ details, width }) =>
  <Card
    elevation={1}
    width={width}
    paddingY={majorScale(2)}
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <Heading>Coin Details</Heading>
    <Table width="70%" flex={1} display="flex" flexDirection="column">
      <Body textAlign="left">
          <Row>
            <TextCell>Name</TextCell>
            <TextCell>{details['name']}</TextCell>
          </Row>
          <Row>
            <TextCell>Symbol</TextCell>
            <TextCell>{details['symbol']}</TextCell>
          </Row>
          <Row>
            <TextCell>Type</TextCell>
            <TextCell>{details['type']}</TextCell>
          </Row>
          {details['type'] === 'erc20' &&
            <Row>
              <TextCell>Contract</TextCell>
              <TextCell>
                <Link
                  target="_blank"
                  color="neutral"
                  href={`https://etherscan.io/address/${details['contract_address']}`}
                >
                  {details['contract_address']}
                </Link>
              </TextCell>
            </Row>
          }
          <Row>
            <TextCell>Price</TextCell>
            <TextCell>{toUSD(details['price'] / 100)}</TextCell>
          </Row>
          <Row>
            <TextCell>Volume (24h)</TextCell>
            <TextCell>{toUSD(details['volume_24h'])}</TextCell>
          </Row>
          <Row>
            <TextCell>Market Cap</TextCell>
            <TextCell>{toUSD(details['market_cap'])}</TextCell>
          </Row>
          <Row>
            <TextCell>Total Supply</TextCell>
            <TextCell>{withComas(details['total_supply'])}</TextCell>
          </Row>
          <Row>
            <TextCell>Circulating Supply</TextCell>
            <TextCell>{withComas(details['circulating_supply'])}</TextCell>
          </Row>
          {details['max_supply'] &&
            <Row>
              <TextCell>Max Supply</TextCell>
              <TextCell>{withComas(details['max_supply'])}</TextCell>
            </Row>
          }

          {/*Object.entries(details).map(([key, value]) =>
            <Row>
              <TextCell>{key}</TextCell>
              <TextCell>{value}</TextCell>
            </Row>) */
          }
      </Body>
    </Table>
  </Card>

export default CoinDetails
