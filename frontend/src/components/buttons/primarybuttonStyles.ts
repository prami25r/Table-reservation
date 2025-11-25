import { StyleSheet } from 'react-native'


export default StyleSheet.create({
button: {
height: 48,
borderRadius: 12,
paddingHorizontal: 20,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#f37021',
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.12,
shadowRadius: 6,
elevation: 3,
},
text: {
fontSize: 16,
lineHeight: 20,
fontWeight: '700',
color: '#fff',
},
disabled: {
opacity: 0.5,
},
})