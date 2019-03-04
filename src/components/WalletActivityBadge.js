import React from 'react'
import { Badge, majorScale } from 'evergreen-ui'

const WalletActivityBadge = ({ activity }) => {
  switch (activity) {
    case "LOW":
      return (
        <Badge color="neutral" isSolid marginLeft={majorScale(2)}>
          Low Activity
        </Badge>
      )
    case "HIGH":
      return (
        <Badge color="red" isSolid marginLeft={majorScale(2)}>
          High Activity
        </Badge>
      )
    default:
      return (
        <Badge color="yellow" isSolid marginLeft={majorScale(2)}>
          Medium Activity
        </Badge>
      )
  }
}

export default WalletActivityBadge
