import { StyleSheet } from 'react-native'


export default StyleSheet.create({
container: {
width: '100%',
borderRadius: 16,
backgroundColor: '#fff',
padding: 20,
marginBottom: 16,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.08,
shadowRadius: 6,
elevation: 2,
},
headerRow: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 6,
},
title: {
fontSize: 18,
fontWeight: '700',
color: '#1a1a1a',
},
badge: {
paddingHorizontal: 12,
paddingVertical: 6,
borderRadius: 20,
backgroundColor: '#f37021',
},
badgeText: {
fontSize: 12,
fontWeight: '700',
color: '#fff',
},
sub: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 16,
marginTop: 2,
},
subText: {
fontSize: 14,
color: '#6b6b6b',
marginLeft: 6,
},
row: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
},
iconSpace: {
width: 18,
height: 18,
marginRight: 8,
},
label: {
fontSize: 14,
color: '#3a3a3a',
}
})