
import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Icon                 from 'react-native-vector-icons/FontAwesome'

import styles               from './styles'

export default class Chip extends Component {

  render() {
    const { keyText, valueText } = this.props
    return (
      <View style={styles.chip}>
        <Text style={styles.chipText} numberOfLines={1}>
          <Text style={styles.chipTextBold}>{keyText}</Text>
           : {valueText}
        </Text>
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => console.log('borrame!')}
        >
          <Icon
            size={13}
            name="times"
            color="white"
          />
        </TouchableOpacity>
      </View>
    )
  }

}
