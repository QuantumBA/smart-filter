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
    filter: {},
  }

  _onPress = (currentItem) => {
    const {
      emitFilter,
      isFilterTypeDefined,
      searchKey,
      setFilterTypeDefinedStatus,
    } = this.props

    if (isFilterTypeDefined) {
      console.log('filtro ya definido!')
      this.setState({
        filter: { ...this.state.filter, keyword: currentItem[searchKey] },
      }, () => emitFilter(this.state.filter))
    } else {
      console.log('definiendo tipo de filtro...')
      setFilterTypeDefinedStatus(true)
      this.setState({ filter: { ...this.state.filter, type: currentItem[searchKey] } })
    }

  }

  _renderHeader = () => {
    const { isFilterTypeDefined } = this.props
    if (!isFilterTypeDefined) {
      return (
        <Text style={styles.listHeaderText}>Filtrar por</Text>)
    }
    return null
  }


  _renderItem = ({ ...listItem }) => (
    <TouchableOpacity
      onPress={() => this._onPress(listItem.item)}
      style={[styles.listRowContainer, this.props.listRowStyle, this.state.highlightedItem === listItem.item[this.props.searchKey] && this.state.isMouseHovering && styles.listRowContainerHover]}
      onMouseEnter={() => { this.setState({ isMouseHovering: true, highlightedItem: listItem.item[this.props.searchKey] }) }}
      onMouseLeave={() => this.setState({ isMouseHovering: false, highlightedItem: '' })}
    >
      <Text
        style={[styles.listRowText, this.props.listRowTextStyle, this.state.highlightedItem === listItem.item[this.props.searchKey] && this.state.isMouseHovering && styles.listRowTextHover]}
      >
        { listItem && listItem.item[this.props.searchKey] ? listItem.item[this.props.searchKey] : 'hello there'}
      </Text>
    </TouchableOpacity>
  )

  render() {
    const {
      listDataSource,
      style,
    } = this.props
    console.log('final filter!', this.state.filter)
    return (
      <FlatList
        data={listDataSource}
        renderItem={this._renderItem}
        ListHeaderComponent={this._renderHeader}
        style={[styles.list, style]}
        extraData={this.props}
      />
    )
  }

}
