import React from 'react'
import { CornerDialog, Link } from 'evergreen-ui'

const Aside = props => {
  let { hash, symbol } = props.selectedTx || { hash: '', symbol: '' }

  return (
    <CornerDialog
      title="Get Tx Details"
      isShown={props.isShown}
      onCloseComplete={() => props.close()}
      hasFooter={false}
    >
      {symbol === 'BTC'
        ? <Link target="_blank" color="blue" href={`https://blockchain.info/tx/${hash}`}>Blockchain.info</Link>
        : <Link target="_blank" color="blue" href={`https://etherscan.io/tx/${hash}`}>Etherscan</Link>
      }
    </CornerDialog>
  )
}

export default Aside
