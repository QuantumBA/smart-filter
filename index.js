import React, { Component } from 'react'
import {
  View,
  TextInput,
}                           from 'react-native'
import Icon                 from 'react-native-vector-icons/FontAwesome'

import styles               from './styles'
import Chip                 from './Chip'
import List                 from './List'

export default class SmartFilter extends Component {

  state = {
    text: '',
    focus: false,
    isFilterTypeDefined: false,
    filterKey: '',
  }

  onTextChangeCB(searchedText) {
    if (this.props.onTextChange && typeof this.props.onTextChange === 'function') {
      setTimeout(() => {
        this.props.onTextChange(searchedText)
      }, 0)
    }
  }

  getDataList() {
    const { isFilterTypeDefined, filterKey } = this.state
    const { data } = this.props

    const tempData = isFilterTypeDefined ? data[filterKey] : Object.keys(data)

    return tempData
  }

  _setFilterKey = (filterKey, nextAction) => {
    this.setState({ filterKey }, nextAction)
  }

  _setFilterTypeDefinedStatus = (isDefined) => {
    this.setState({ isFilterTypeDefined: isDefined, text: '' })
  }

  _setFieldFocus = (focus) => {
    this.setState({ focus })
  }

  _resetFilter = () => {
    this._setFieldFocus(false)
    this._setFilterTypeDefinedStatus(false)
  }

  // WIP!
  filterList(search) {
    const { isFilterTypeDefined, filterKey, text } = this.state
    const { data, filtersList } = this.props

    // Filter if all values have been selected
    let dataList = Object.keys(data).filter(key => (
      !filtersList[key] || data[key].length > filtersList[key].length
    ))
    // Remove selected values
    if (isFilterTypeDefined && filterKey) {
      const currentValues = filtersList[filterKey]
      dataList = data[filterKey].filter(val =>
        !currentValues || currentValues.indexOf(val) < 0)
    }
    return text ? dataList.filter(listItem => listItem.indexOf(search) > -1) : dataList
  }

  _removeFilter = (key, value) => {
    const { filtersList, onChange } = this.props
    const newFiltersList = filtersList[key].filter(filter => filter !== value)
    filtersList[key] = newFiltersList
    onChange(filtersList)
  }

  renderList() {
    const { focus, isFilterTypeDefined, filterKey, text } = this.state
    const {
      filtersList,
      onChange,
      filterTypeListHeaderText,
    } = this.props

    if (focus) {
      return (
        <List
          dataList={this.filterList(text)}
          filterKey={filterKey}
          filtersList={filtersList}
          resetFilter={this._resetFilter}
          isFilterTypeDefined={isFilterTypeDefined}
          onChange={onChange}
          setFilterKey={this._setFilterKey}
          setFilterTypeDefinedStatus={this._setFilterTypeDefinedStatus}
          filterTypeListHeaderText={filterTypeListHeaderText}
        />
      )
    }
    return null
  }

  renderChips() {
    const { filtersList } = this.props
    const chipsList = []
    let value
    Object.keys(filtersList).forEach((key) => {
      value = filtersList[key]
      chipsList.push(value.map(item => (<Chip onRemove={this._removeFilter} keyText={key} valueText={item} />)))
    })

    return chipsList
  }

  render() {
    const {
      containerStyle,
      // filtersList,
      iconStyle,
      inputPlaceholder,
      textInputStyle,
    } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.iconWrapper}>
          <Icon
            color="#919191"
            name="search"
            size={19}
            style={[styles.icon, iconStyle]}
          />
        </View>
        <View style={styles.contentContainer}>
          {this.renderChips()}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, textInputStyle]}
              value={this.state.text}
              onChangeText={(text) => {
                this.setState({ text })
                this.filterList(text)
              }
              }
              onFocus={() => this._setFieldFocus(true)}
              placeholder={inputPlaceholder ? inputPlaceholder : 'Add filter'}
              outline="transparent"
            />
            {this.renderList()}
          </View>
        </View>
      </View>
    )
  }

}
