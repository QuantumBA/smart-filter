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
      isFilterTypeDefined,
      onChange,
      resetFilter,
      setFilterKey,
      setFilterTypeDefinedStatus,
    } = this.props

    if (isFilterTypeDefined) {
      if (!filtersList[filterKey]) {
        const valuesList = []
        valuesList.push(currentItem)
        filtersList[filterKey] = valuesList
      } else if (filtersList[filterKey].length >= 0 && !filtersList[filterKey].includes(currentItem)) {
        filtersList[filterKey].push(currentItem)
      }
      setFilterKey('', () => { onChange(filtersList); resetFilter() })
    } else {
      setFilterKey(currentItem, () => { setFilterTypeDefinedStatus(true) })
    }

  }

  _renderHeader = () => {
    const { isFilterTypeDefined, filterTypeListHeaderText } = this.props
    if (!isFilterTypeDefined) {
      return (
        <Text style={styles.listHeaderText}>{filterTypeListHeaderText ? filterTypeListHeaderText : 'Filter by'}</Text>)
    }
    return null
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
