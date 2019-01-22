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
    filterKey: '',
    data: [],
  }

  componentWillMount() {
    const { dataList } = this.props
    this.setState({ data: Object.keys(dataList) })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFilterTypeDefined && nextProps.isFilterTypeDefined !== this.props.isFilterTypeDefined) {
      this.setState({ data: this.props.dataList[this.state.filterKey] })
    }
  }

  _onPress = (currentItem) => {
    const {
      filtersList,
      isFilterTypeDefined,
      onChange,
      resetFilter,
      setFilterTypeDefinedStatus,
    } = this.props

    const { filterKey } = this.state

    if (isFilterTypeDefined) {
      if (!filtersList[filterKey]) {
        const valuesList = []
        valuesList.push(currentItem)
        filtersList[filterKey] = valuesList
      } else if (filtersList[filterKey].length > 0) {
        filtersList[filterKey].push(currentItem)
      }
      this.setState({
        filterKey: '',
      }, () => { onChange(filtersList); resetFilter() })
    } else {
      this.setState(
        { filterKey: currentItem },
        () => { setFilterTypeDefinedStatus(true) },
      )
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
    } = this.props
    const { data } = this.state

    return (
      <FlatList
        data={data}
        renderItem={this._renderItem}
        ListHeaderComponent={this._renderHeader}
        style={[styles.list, style]}
        extraData={this.props}
      />
    )
  }

}
