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
    data: [],
  }

  componentWillMount() {
    const { listDataSource } = this.props
    this.setState({ data: Object.keys(listDataSource) })
  }

  componentWillReceiveProps(nextProps) {
    console.log('willRecProps', this.props.listDataSource, this.state.filter.type)
    if (nextProps.isFilterTypeDefined && nextProps.isFilterTypeDefined !== this.props.isFilterTypeDefined) {
      this.setState({ data: this.props.listDataSource[this.state.filter.type] })
    }
  }

  _onPress = (currentItem) => {
    const {
      emitFilter,
      isFilterTypeDefined,
      setFilterTypeDefinedStatus,
    } = this.props

    if (isFilterTypeDefined) {
      console.log('filtro ya definido!')
      this.setState({
        filter: { ...this.state.filter, keyword: currentItem },
      }, () => {
        const filter = { [this.state.filter.type]: this.state.filter.keyword }
        console.log('emitFilter!', filter)
        emitFilter(filter)
      })
    } else {
      console.log('definiendo tipo de filtro...')
      this.setState(
        { filter: { ...this.state.filter, type: currentItem } },
        () => setFilterTypeDefinedStatus(true),
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
