import React from 'react'
import { Text, View } from 'react-native'

import { useCalculator } from '../hooks'

import { ButtonCalc } from '../components'
import { styles } from '../theme/appTheme'


export const CalculatorScreen = () => {

    const {
        previousNumber,
        number,
        operator,
        textOperation,
        onClear,
        onSetNumber,
        onTogglePositiveNegative,
        onDeleteLastNumber,
        onAdd,
        onSubtract,
        onMultiply,
        onDivide,
        onCalculate,
    } = useCalculator()

    return (
        <View style={ styles.calculatorContainer }>
            {
                previousNumber !== '0' && (
                    <View style={styles.resultSmallContainer}>
                        <Text style={ styles.resultSmall }>{ previousNumber }</Text>
                        <Text style={ styles.operator }>{ operator }</Text>
                    </View>
                )
            }
            {
                textOperation.trim() !== '' && (
                    <Text style={ styles.resultSmall }>{ textOperation }</Text>
                )
            }
            <Text
                style={ styles.result }
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                { number }
            </Text>

            <View style={ styles.row } >
                {/* Button */}
                <ButtonCalc text="C"   bgColor="#9B9B9B" textColor="#000" action={ onClear } />
                <ButtonCalc text="+/-" bgColor="#9B9B9B" textColor="#000" action={ onTogglePositiveNegative } />
                <ButtonCalc text="del" bgColor="#9B9B9B" textColor="#000" action={ onDeleteLastNumber } />
                <ButtonCalc text="/"   bgColor="#FF9427" action={ onDivide } />

                <ButtonCalc text="7" action={ onSetNumber } />
                <ButtonCalc text="8" action={ onSetNumber } />
                <ButtonCalc text="9" action={ onSetNumber } />
                <ButtonCalc text="x" bgColor="#FF9427" action={ onMultiply } />

                <ButtonCalc text="4" action={ onSetNumber } />
                <ButtonCalc text="5" action={ onSetNumber } />
                <ButtonCalc text="6" action={ onSetNumber } />
                <ButtonCalc text="-" bgColor="#FF9427" action={ onSubtract } />

                <ButtonCalc text="1" action={ onSetNumber } />
                <ButtonCalc text="2" action={ onSetNumber } />
                <ButtonCalc text="3" action={ onSetNumber } />
                <ButtonCalc text="+" bgColor="#FF9427" action={ onAdd } />

                <ButtonCalc text="0" width={ 175 } action={ onSetNumber }/>
                <ButtonCalc text="." action={ onSetNumber } />
                <ButtonCalc text="=" bgColor="#FF9427" action={ onCalculate } />
            </View>
        </View>
    )
}
