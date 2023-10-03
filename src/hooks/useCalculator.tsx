import { useRef, useState } from 'react'

enum Opetators {
    add, subtract, multiply, divide
}

export const useCalculator = () => {
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

    const onDeleteLastNumber = () => {

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

    return {
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
    }
}
