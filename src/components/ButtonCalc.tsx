import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { styles } from '../theme/appTheme'

interface Props {
    text      : string
    bgColor?  : string
    textColor?: string
    width?     :number
    action: ( textNumber:string ) => void
}
export const ButtonCalc = ( { text, bgColor = '#2D2D2D', textColor = '#FFF', width = 80, action }:Props ) => {
    return (
        <TouchableOpacity 
            activeOpacity={0.3}
            onPress={ ()=> action( text ) }
        >
            <View
                style={{
                    ...styles.button,
                    backgroundColor: bgColor,
                    width,
                }}
            >
                <Text 
                    style={{
                        ...styles.textButton,
                        color: textColor,
                    }}
                >
                    { text }
                </Text>
            </View>
        </TouchableOpacity>
    )
}
