import React, { Component } from 'react';
import { Position, Table, Popover, Menu, TextDropdownButton } from 'evergreen-ui'

const Order = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc'
}

class SortableHeading extends Component {
  state = {
  }

  getIconForOrder = order => {
    switch (order) {
      case Order.ASC:
        return 'arrow-up'
      case Order.DESC:
        return 'arrow-down'
      default:
        return 'caret-down'
    }
  }

  render = () => {
    return <Table.TextHeaderCell>
      <Popover
        position={Position.BOTTOM_LEFT}
        content={({ close }) => (
          <Menu>
            <Menu.OptionsGroup
              title="Order"
              options={[
                { label: 'Ascending', value: Order.ASC },
                { label: 'Descending', value: Order.DESC }
              ]}
              selected={
                this.props.orderedColumn === this.props.column ? this.state.ordering : null
              }
              onChange={value => {
                this.setState({
                  orderedColumn: this.props.column,
                  ordering: value
                })
                this.props.changeHandler({ column: this.props.column, direction: value})
                // Close the popover when you select a value.
                close()
              }}
          />
          </Menu>
        )}
      >
      <TextDropdownButton
    icon={
      this.props.column === this.props.orderedColumn
      ? this.getIconForOrder(this.state.ordering)
      : 'caret-down'
    }
      >
      { this.props.title }
      </TextDropdownButton>
      </Popover>
      </Table.TextHeaderCell>
  }
}

export default SortableHeading
