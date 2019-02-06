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
    filterKey: undefined,
  }

  onTextChangeCB(searchedText) {
    const { onTextChange } = this.props
    if (onTextChange && typeof onTextChange === 'function') {
      setTimeout(() => onTextChange(searchedText), 0)
    }
  }

  getDataList() {
    const { data } = this.props
    const { filterKey } = this.state

    const tempData = filterKey ? data[filterKey] : Object.keys(data)

    return tempData
  }

  getFilteredList() {
    const { filterKey, text } = this.state
    const { data, filtersList } = this.props

    // Remove if all values have been selected
    let dataList = Object.keys(data).filter(key => (
      !filtersList[key] || data[key].length > filtersList[key].length
    ))
    // Remove selected values
    if (filterKey) {
      const currentValues = filtersList[filterKey]
      if (!currentValues) dataList = data[filterKey]
      else dataList = data[filterKey].filter(val => !currentValues.includes(val))
    }
    return text ? dataList.filter(this.filterByText) : dataList
  }

  _resetFilter = () => {
    this.setState({ text: '', focus: false, filterKey: undefined })
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

  _handleEnterKeyPress = () => {
    const { filtersList, onChange } = this.props
    const { filterKey } = this.state
    const list = this.getFilteredList()
    if (!list.length) return

    if (!filterKey) {
      // afterOnblur
      setTimeout(() => this.setFilterKey(list[0]), 0)
    } else {
      if (!Array.isArray(filtersList[filterKey])) {
        filtersList[filterKey] = [list[0]]
      } else {
        filtersList[filterKey].push(list[0])
      }
      onChange(filtersList)
    }
  }

  setFilterKey = (filterKey) => {
    this.setState({ filterKey, text: '', focus: true })
    this.textInput.focus()
  }

  renderList() {
    const { focus, filterKey } = this.state
    const {
      filtersList,
      onChange,
      filterTypeListHeaderText,
    } = this.props

    if (focus) {
      return (
        <List
          dataList={this.getFilteredList()}
          filterKey={filterKey}
          filtersList={filtersList}
          resetFilter={this._resetFilter}
          onChange={onChange}
          setFilterKey={(key) => setTimeout(() => this.setFilterKey(key), 0)}
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
      <View>
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
                onBlur={this._resetFilter}
                ref={(input) => { this.textInput = input }}
                style={[styles.input, textInputStyle]}
                value={text}
                onSubmitEditing={this._handleEnterKeyPress}
                onChangeText={text => this.setState({ text })}
                onFocus={() => this.setState({ focus: true })}
                placeholder={inputPlaceholder || 'Add filter'}
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

