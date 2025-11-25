import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Clock } from 'lucide-react-native'
import styles from './apptimepickerstyles'

type Props = {
  label: string
  value: string
  onPress: () => void
}

const AppTimePicker = ({ label, value, onPress }: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity onPress={onPress} style={styles.field}>
      <Text style={styles.text}>{value}</Text>
      <Clock size={20} color="#6b6b6b" />
    </TouchableOpacity>
  </View>
)

export default AppTimePicker