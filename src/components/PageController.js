import React from 'react'
import { SelectField, Card, Button, majorScale } from 'evergreen-ui'

const PageController = props =>
  <Card
    width="100%"
    display="flex"
    paddingY={majorScale(1)}
    paddingX={majorScale(5)}
    justifyContent="space-between"
    alignItems="center"
  >
    <SelectField
      value={props.offset}
      label="Transactions per page"
      onChange={({ target }) => props.onOffsetChange(target.value)}
    >
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </SelectField>
    <Card elevation={1}>
      {props.first && <Button onClick={props.onFirst}>First</Button>}
      <Button disabled={props.isBackDisabled} onClick={props.onBack}>Prev</Button>
      <Button disabled={props.isNextDisabled} onClick={props.onForward}>Next</Button>
      {props.last && <Button onClick={props.onLast}>Last</Button>}
    </Card>
  </Card>

export default PageController
