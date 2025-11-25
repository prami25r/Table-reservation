import React from 'react'
import { View, Text } from 'react-native'
import styles from './reservationcardstyles'


import { Calendar, Clock, Users, MapPin } from 'lucide-react-native'


type Props = {
restaurant: string
location: string
date: string
time: string
guests: number
status: string
}


const ReservationCard = ({ restaurant, location, date, time, guests, status }: Props) => (
<View style={styles.container}>
<View style={styles.headerRow}>
<Text style={styles.title}>{restaurant}</Text>
<View style={styles.badge}><Text style={styles.badgeText}>{status}</Text></View>
</View>


<View style={styles.sub}>
<MapPin size={18} color="#6b6b6b" />
<Text style={styles.subText}>{location}</Text>
</View>


<View style={styles.row}>
<Calendar size={18} color="#3a3a3a" />
<Text style={styles.label}>{date}</Text>
</View>


<View style={styles.row}>
    <Clock size={18} color="#3a3a3a" />
    <Text style={styles.label}>{time}</Text>
</View>


<View style={styles.row}>
<Users size={18} color="#3a3a3a" />
<Text style={styles.label}>{guests} guests</Text>
</View>
</View>
)


export default ReservationCard