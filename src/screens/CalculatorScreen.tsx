import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'

import { ButtonCalc } from '../components'
import { styles } from '../theme/appTheme'

enum Opetators {
    add, subtract, multiply, divide
}

export const CalculatorScreen = () => {

    const [previousNumber, setPreviousNumber] = useState('0')
    const [number, setNumber] = useState('0')
    const [operator, setOperator] = useState('')
    const [textOperation, setTextOperation] = useState('')

    const lastOpetationRef = useRef<Opetators>()


    const onClear = () => {
        setNumber('0')
        setPreviousNumber('0')
        lastOpetationRef.current = undefined
        setTextOperation('')
    }

    const onSetNumber = ( textNumber:string ) => {

        let numberTem = number

        // Reiniciar calculadora antes de iniciar otra operación
        if (textOperation.trim() !== ''){
            onClear()
            numberTem = '0'
        }


        // Validación para no agregar doble punto
        if ( numberTem.includes('.') && textNumber === '.' ){ return }

        // Validación para no agregar doble cero antes del punto
        if ( numberTem.startsWith('0') || numberTem.startsWith('-0') ){

            if ( textNumber === '.' ){
                return setNumber( numberTem + textNumber )
            }

            if ( textNumber === '0' && numberTem.includes('.') ){
                return setNumber( numberTem + textNumber )
            }

            if ( textNumber !== '0' && numberTem.includes('.') ){
                return setNumber( numberTem + textNumber )
            }

            if ( textNumber === '0' && !numberTem.includes('.') ){
                return
            }

            if ( textNumber !== '0' && numberTem === '0' ){
                return setNumber( textNumber )
            }

            if ( textNumber !== '0' && numberTem === '-0' ){
                return setNumber( `-${textNumber}` )
            }

            setNumber( numberTem + textNumber )

        } else {
            setNumber( numberTem + textNumber )
        }
    }

    const onTogglePositiveNegative = () => {
        if (number.includes('-')){
            setNumber( number.substring(1) )
        } else {
            setNumber(`-${number}`)
        }
    }

    const deleteLastNumber = () => {

        if ( number.length === 1 ){
            return setNumber('0')
        }

        if ( number.includes('-') && number.length === 2 ){
            return setNumber('0')
        }

        setNumber( number.slice( 0, -1 ) )

        if (textOperation.trim() !== ''){
            setTextOperation('')
        }
    }

    const onChangeNumberToPrevious = () => {

        if ( number === '0' || number === '-0' ){ return }

        if ( number.endsWith('.') ){
            setPreviousNumber( number.slice( 0, -1 ) )
        } else {
            setPreviousNumber( number )
        }

        setNumber('0')
    }

    const onAdd = () => {
        onChangeNumberToPrevious()
        lastOpetationRef.current = Opetators.add
        setOperator('+')
        setTextOperation('')
    }

    const onSubtract = () => {
        onChangeNumberToPrevious()
        lastOpetationRef.current = Opetators.subtract
        setOperator('-')
        setTextOperation('')
    }

    const onMultiply = () => {
        onChangeNumberToPrevious()
        lastOpetationRef.current = Opetators.multiply
        setOperator('x')
        setTextOperation('')
    }

    const onDivide = () => {
        onChangeNumberToPrevious()
        lastOpetationRef.current = Opetators.divide
        setOperator('/')
        setTextOperation('')
    }


    const onCalculate = () => {

        if ( previousNumber === '0' ){ return }

        const current = Number( number )
        const previous = Number( previousNumber )

        switch (lastOpetationRef.current) {
            case Opetators.add:
                setNumber(`${ previous + current }`)
                break;

            case Opetators.subtract:
                setNumber(`${ previous - current }`)
                break;

            case Opetators.multiply:
                setNumber(`${ previous * current  }`)
                break;

            case Opetators.divide:
                setNumber(`${ previous / current }`)
                break;
            }

        setPreviousNumber('0')
        setTextOperation(`${ previous } ${ operator } ${ current } =`)
    }

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
                <ButtonCalc text="del" bgColor="#9B9B9B" textColor="#000" action={ deleteLastNumber } />
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

                {/* #9B9B9B gris claro */}
                {/* #2D2D2D gris oscuro */}
                {/* #FF9427 Anaranjado */}
            </View>
        </View>
    )
}
