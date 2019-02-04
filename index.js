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
    const { onTextChange } = this.props
    if (onTextChange && typeof onTextChange === 'function') {
      setTimeout(() => {
        onTextChange(searchedText)
      }, 0)
    }
  }

  getDataList() {
    const { isFilterTypeDefined, filterKey } = this.state
    const { data } = this.props

    const tempData = isFilterTypeDefined ? data[filterKey] : Object.keys(data)

    return tempData
  }

  getFilteredList() {
    const { isFilterTypeDefined, filterKey, text } = this.state
    const { data, filtersList } = this.props

    // Remove if all values have been selected
    let dataList = Object.keys(data).filter(key => (
      !filtersList[key] || data[key].length > filtersList[key].length
    ))
    // Remove selected values
    if (isFilterTypeDefined && filterKey) {
      const currentValues = filtersList[filterKey]
      dataList = data[filterKey].filter(val => !currentValues || currentValues.indexOf(val) < 0)
    }
    return text ? dataList.filter(this.filterByText) : dataList
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

  filterByText = (item) => {
    const { caseSensitive } = this.props
    const { text } = this.state

    if (caseSensitive) return item.includes(text)

    return item.toLowerCase().includes(text.toLowerCase())
  }

  _removeFilter = (key, value) => {
    const { filtersList, onChange } = this.props
    const newFiltersList = filtersList[key].filter(filter => filter !== value)
    filtersList[key] = newFiltersList
    onChange(filtersList)
  }

  renderList() {
    const { focus, isFilterTypeDefined, filterKey } = this.state
    const {
      filtersList,
      onChange,
      filterTypeListHeaderText,
    } = this.props

    if (focus || isFilterTypeDefined) {
      return (
        <List
          dataList={this.getFilteredList()}
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
    Object.keys(filtersList).forEach((key) => {
      const values = filtersList[key]
      chipsList.push(values.map(val => (
        <Chip
          onRemove={this._removeFilter}
          keyText={key}
          valueText={val}
        />
      )))
    })

    return chipsList
  }

  render() {
    const {
      containerStyle,
      iconStyle,
      inputPlaceholder,
      textInputStyle,
    } = this.props
    const { text } = this.state

    return (
      <View onBlur={() => this.setState({ focus: false })}>
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
                value={text}
                onChangeText={text => this.setState({ text })}
                onFocus={() => this._setFieldFocus(true)}
                placeholder={inputPlaceholder ? inputPlaceholder : 'Add filter'}
                outline="transparent"
              />
            </View>
          </View>
        </View>
        {this.renderList()}
      </View>
    )
  }

}
