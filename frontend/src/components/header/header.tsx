import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import styles from './headerstyles'


type Props = {
title: string
onBack?: () => void
}


const Header = ({ title, onBack }: Props) => (
<View style={styles.container}>
<TouchableOpacity onPress={onBack} style={styles.back}>
<ArrowLeft size={22} color="#1a1a1a" />
</TouchableOpacity>
<Text style={styles.title}>{title}</Text>
</View>
)


export default Header