# About this project

Chainspark.io is an open source Elixir / React web application that makes it easy to analyze Bitcoin and Ethereum transactions.
The project was originally developer by [Agile Alpha Inc.](https://agilealpha.com/) and later open sourced. 

The application is split into a few components as follows: 

- React Frontend application ([chainspark frontend](https://github.com/AgileAlpha/chainspark))
- Phoenix/Elixir API ([chainspark api](https://github.com/AgileAlpha/chainspak_api))
- Ethereum transaction watcher ([ethereum tx watcher](https://github.com/AgileAlpha/eth_watcher))
- Bitcoin transaction watcher ([bitcoin tx watcher](https://github.com/AgileAlpha/btc_watcher))

The Ethereum and Bitcoin watchers send POST requests to the API whenever a new transaction above the configured threshold is observed.

# Maintainers

- [viktmv](https://github.com/viktmv/)
- [tzumby](https://github.com/tzumby/)
