import React from 'react'
import { TouchableOpacity, Text, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import styles from './primarybuttonStyles'


type Props = {
title: string
onPress?: (e: GestureResponderEvent) => void
style?: StyleProp<ViewStyle>
disabled?: boolean
}


const PrimaryButton = ({ title, onPress, style, disabled }: Props) => (
<TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, style, disabled && styles.disabled]}>
<Text style={styles.text}>{title}</Text>
</TouchableOpacity>
)


export default PrimaryButton