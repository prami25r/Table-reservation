import React from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'
import styles from './appinputstyles'

type Props = TextInputProps & {
  label: string
}

const AppInput = ({ label, ...props }: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput {...props} style={styles.input} />
  </View>
)

export default AppInput