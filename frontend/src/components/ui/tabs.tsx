import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './tabsstyles'

type Tab = {
  label: string
}

type Props = {
  tabs: Tab[]
  activeIndex: number
  onChange: (index: number) => void
}

const Tabs = ({ tabs, activeIndex, onChange }: Props) => (
  <View style={styles.container}>
    {tabs.map((t, i) => (
      <TouchableOpacity key={i} onPress={() => onChange(i)} style={[styles.tab, i === activeIndex && styles.active]}>
        <Text style={[styles.label, i === activeIndex && styles.activeLabel]}>{t.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
)

export default Tabs
