import { useRef, useState } from "react"

enum Operadores{
  sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
  const [numero, setNumero] = useState('0')
  const [resultados, setResultados] = useState<string[]>([])
  const [numeroAnterior, setNumeroAnterior] = useState('0')
  const ultimaOperacion = useRef <Operadores>()
  
  const limpiar = () =>{
    setNumero('0')
    setNumeroAnterior('0')
    setResultados([])
  }

  const armarNumero = ( numeroTexto:string ) =>{
    //NO aceptar doble punto
    if ( numero.includes('.') && numeroTexto === '.') return

    if ( numero.startsWith('0') || numero.startsWith('-0') ) {
      //Punto decimal
      if(numeroTexto === '.'){
        setNumero( numero + numeroTexto )

      }else if( numeroTexto === '0' && numero.includes('.') ){

        //Evaluar si es otro cero y hay otro punto
        setNumero( numero + numeroTexto )

      }else if( numeroTexto !== '0' && !numero.includes('.') ){

        //Evaluar si es diferente de cero y no tiene un punto
        setNumero( numeroTexto )

      }else if( numeroTexto === '0' && !numero.includes('.') ){
        setNumero( numero )
      }else{
        setNumero( numero + numeroTexto )
      }
    }else{
      setNumero( numero + numeroTexto )
    }
  }

  const absoluto = () =>{
    if ( numero.includes('-') ) {
      setNumero( numero.replace('-', '') )
    }else{
      setNumero( '-' + numero )
    }
  }

  const btnDelete = () =>{
    if( numero.length > 1 ){
      setNumero( numero.substring(0, numero.length - 1) )
    }
    if( (numero.startsWith('-') && numero.length === 2) || numero.length === 1 ){
      setNumero('0')
    }
  }

  const cambiarNumPorAnterior = () => {
    if( numero.endsWith('.') ){
      setNumeroAnterior( numero.slice(0, -1) )
    }else{
      setNumeroAnterior( numero )
    }
    setNumero('0')
  }

  const btnDividir = () => {
    cambiarNumPorAnterior()
    ultimaOperacion.current = Operadores.dividir
  }

  const btnMultiplicar = () => {
    cambiarNumPorAnterior()
    ultimaOperacion.current = Operadores.multiplicar
  }

  const btnSumar = () => {
    cambiarNumPorAnterior()
    ultimaOperacion.current = Operadores.sumar
  }

  const btnRestar = () => {
    cambiarNumPorAnterior()
    ultimaOperacion.current = Operadores.restar
  }

  const calcular = () =>{
    const num1 = Number( numero )
    const num2 = Number( numeroAnterior )
    let resultado = 0
    let resultadoString = ''

    switch ( ultimaOperacion.current ) {
      case Operadores.sumar:
        resultado = num1 + num2
        resultadoString = num1+' + '+num2+' = '+resultado
        setNumero( `${ resultado }` )
        break;

      case Operadores.restar:
        resultado = (num2 !== 0) ? num2 - num1 : num1
        if(num2 !== 0)
          resultadoString = num2+' - '+num1+' = '+resultado
        setNumero( `${ resultado }` )
        break;

      case Operadores.multiplicar:
        resultado = num1 * num2
        resultadoString = num1+' * '+num2+' = '+resultado
        setNumero( `${ resultado }` )
        break;

      case Operadores.dividir:
        resultado = (num1 !== 0) ? num2 / num1 : num1
        if(num1 !== 0)
          resultadoString = num2+' / '+num1+' = '+resultado
        setNumero( `${ resultado }` )
        break;
    }

    if(resultados[resultados.length - 1] !== resultadoString && num2){
      setResultados([...resultados, resultadoString])
    }
    setNumeroAnterior('0')
  }  

  return {
    numero,
    numeroAnterior,
    limpiar,
    absoluto,
    armarNumero,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
    resultados
  }
}
