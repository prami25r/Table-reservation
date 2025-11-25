import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Calendar } from 'lucide-react-native'
import styles from './appdatepickerstyles'

type Props = {
  label: string
  value: string
  onPress: () => void
}

const AppDatePicker = ({ label, value, onPress }: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity onPress={onPress} style={styles.field}>
      <Text style={styles.text}>{value}</Text>
      <Calendar size={20} color="#6b6b6b" />
    </TouchableOpacity>
  </View>
)

export default AppDatePicker