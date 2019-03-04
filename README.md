# About this project

Chainspark.io is an open source Elixir / React web application that makes it easy to analyze Bitcoin and Ethereum transactions.

The application is split into a few components as follows: 

- React Frontend application (https://github.com/AgileAlpha/chainspark)
- Phoenix/Elixir API (https://github.com/AgileAlpha/chainspak_api)
- Ethereum transaction watcher (https://github.com/AgileAlpha/eth_watcher)
- Bitcoin transaction watcher (https://github.com/AgileAlpha/btc_watcher)

The Ethereum and Bitcoin watchers send POST requests to the API whenever a new transaction above the configured threshold is observed.
