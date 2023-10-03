import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: 'black',
    },
    calculatorContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    result: {
        color: 'white',
        fontSize: 60,
        textAlign: 'right',
        marginBottom: 10,
    },
    resultSmallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 10,
    },
    resultSmall: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 30,
        textAlign: 'right',
    },
    operator: {
        color: 'white',
        fontSize: 30,
        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 15,
    },
    button:{
        height: 80,
        width: 80,
        borderRadius: 100,
        justifyContent: 'center',
    },
    textButton: {
        textAlign: 'center',
        padding: 10,
        fontSize: 30,
        color:'white',
        fontWeight: '300',
    },
})
