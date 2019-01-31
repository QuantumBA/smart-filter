import React, { Component } from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
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


  _renderItem = ({ ...listItem }) => (
    <TouchableOpacity
      onPress={() => this._onPress(listItem.item)}
      style={[styles.listRowContainer, this.props.listRowStyle, this.state.highlightedItem === listItem.item && this.state.isMouseHovering && styles.listRowContainerHover]}
      onMouseEnter={() => { this.setState({ isMouseHovering: true, highlightedItem: listItem.item }) }}
      onMouseLeave={() => this.setState({ isMouseHovering: false, highlightedItem: '' })}
    >
      <Text
        style={[styles.listRowText, this.props.listRowTextStyle, this.state.highlightedItem === listItem.item && this.state.isMouseHovering && styles.listRowTextHover]}
      >
        { listItem && listItem.item ? listItem.item : '<empty>'}
      </Text>
    </TouchableOpacity>
  )

  render() {
    const {
      style,
      dataList,
      contentContainerStyle,
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
