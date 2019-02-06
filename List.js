import React, { Component } from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
}                           from 'react-native'

import styles               from './styles'

export default class List extends Component {

  state = {
    isMouseHovering: false,
    highlightedItem: '',
  }

  _onPress = (currentItem) => {
    const {
      filterKey,
      filtersList,
      onChange,
      resetFilter,
      setFilterKey,
    } = this.props

    // selecting second element
    if (filterKey) {
      if (!Array.isArray(filtersList[filterKey])) {
        filtersList[filterKey] = [currentItem]
      } else if (!filtersList[filterKey].includes(currentItem)) {
        filtersList[filterKey].push(currentItem)
      }
      onChange(filtersList)
      resetFilter()
    } else {
      // selecting first element
      setFilterKey(currentItem)
    }

  }

  _renderHeader = () => {
    const { filterKey, filterTypeListHeaderText } = this.props
    return (
      <Text style={styles.listHeaderText}>
        {filterKey || filterTypeListHeaderText || 'Filter by'}
      </Text>
    )
  }


  _renderItem = ({ ...listItem }) => {
    const { listRowStyle, listRowTextStyle } = this.props
    const { highlightedItem, isMouseHovering } = this.state
    const { item } = listItem
    return (
      <TouchableOpacity
        onPress={() => this._onPress(item)}
        style={[
          styles.listRowContainer,
          listRowStyle,
          highlightedItem === item && isMouseHovering && styles.listRowContainerHover,
        ]}
        onMouseEnter={() => this.setState({ isMouseHovering: true, highlightedItem: item })}
        onMouseLeave={() => this.setState({ isMouseHovering: false, highlightedItem: '' })}
      >
        <Text
          style={[
            styles.listRowText,
            listRowTextStyle,
            highlightedItem === item
            && isMouseHovering
            && styles.listRowTextHover,
          ]}
        >
          { listItem && item ? item : '<empty>'}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      style,
      dataList,
    } = this.props

    return (
      <FlatList
        data={dataList}
        renderItem={this._renderItem}
        ListHeaderComponent={this._renderHeader}
        style={[styles.list, style]}
        extraData={this.props}
        contentContainerStyle={{ paddingBottom: 15 }}
      />
    )
  }

}

