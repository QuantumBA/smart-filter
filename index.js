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
    tags: [],
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
  filterList(search) {
    const { text } = this.state
    const { searchKey } = this.props

    if (text.slice(0, -1) === search) {
      this.deleting = true
    } else {
      this.deleting = false
    }

    const results = this.props.listDataSource.filter(listItem => listItem[searchKey].toLowerCase().indexOf(search.toLowerCase()) > -1)
    this.setState({ listItems: results })
    this.onTextChangeCB(search)
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

  render() {
    const {
      containerStyle,
      filtersList,
      iconStyle,
      textInputStyle,
    } = this.props

    const tags = Object.keys(filtersList).map(filter => (<Chip keyText={filter} valueText={filtersList[filter]} />))

    return (
      <View style={[styles.container, containerStyle]}>
        <Icon
          color="#919191"
          name="search"
          size={19}
          style={[styles.icon, iconStyle]}
        />
        {tags}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, textInputStyle]}
            value={this.state.text}
            onChangeText={(text) => {
              // this.filterList(text)
              this.setState({ text })
              const lastTyped = text.charAt(text.length - 1)
              const parseWhen = [',', ' ', ';']
              if (parseWhen.indexOf(lastTyped) > -1) {
                this.setState({
                  tags: [...this.state.tags, this.state.text],
                  text: '',
                })
              }
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
