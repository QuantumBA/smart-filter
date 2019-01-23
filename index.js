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
  }

  // componentWillMount() {
  //   const { listDataSource } = this.props
  //   this.setState({ listItems: listDataSource })
  // }

  onTextChangeCB(searchedText) {
    if (this.props.onTextChange && typeof this.props.onTextChange === 'function') {
      setTimeout(() => {
        this.props.onTextChange(searchedText)
      }, 0)
    }
  }

  onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      this.deleting = true
    } else {
      this.deleting = false
    }
  }

  _setFilterTypeDefinedStatus = (isDefined) => {
    this.setState({ isFilterTypeDefined: isDefined })
  }

  _setFieldFocus = (focus) => {
    this.setState({ focus })
  }

  _resetFilter = () => {
    this._setFieldFocus(false)
    this._setFilterTypeDefinedStatus(false)
  }

  // WIP!
  // filterList(search) {
  //   const { text } = this.state
  //   const { dataList } = this.props
  //
  //   if (text.slice(0, -1) === search) {
  //     this.deleting = true
  //   } else {
  //     this.deleting = false
  //   }
  //
  //   const results = dataList.filter(listItem => listItem[searchKey].toLowerCase().indexOf(search.toLowerCase()) > -1)
  //   this.setState({ listItems: results })
  //   this.onTextChangeCB(search)
  // }

  _removeFilter = (key, value) => {
    const { filtersList, onChange } = this.props
    const newFiltersList = filtersList[key].filter(filter => filter !== value)
    filtersList[key] = newFiltersList
    onChange(filtersList)
  }

  renderList() {
    const { focus, isFilterTypeDefined } = this.state
    const {
      dataList,
      filtersList,
      onChange,
    } = this.props

    if (focus) {
      return (
        <List
          dataList={dataList}
          filtersList={filtersList}
          resetFilter={this._resetFilter}
          isFilterTypeDefined={isFilterTypeDefined}
          onChange={onChange}
          setFilterTypeDefinedStatus={this._setFilterTypeDefinedStatus}
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
      textInputStyle,
    } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        <Icon
          color="#919191"
          name="search"
          size={19}
          style={[styles.icon, iconStyle]}
        />
        {this.renderChips()}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, textInputStyle]}
            value={this.state.text}
            onChangeText={(text) => {
              // this.filterList(text)
              this.setState({ text })
            }
            }
            onFocus={() => this._setFieldFocus(true)}
            placeholder="Añadir filtro"
            outline="transparent"
          />
          {this.renderList()}
        </View>
      </View>
    )
  }

}
