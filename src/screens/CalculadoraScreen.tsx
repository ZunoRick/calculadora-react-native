import React from 'react'
import { Text, View } from 'react-native';
import { BotonCalc } from '../components/BotonCalc';
import { styles } from '../theme/appTheme';
import { useCalculadora } from '../hooks/useCalculadora';

export const CalculadoraScreen = () => {
  const { 
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
  } = useCalculadora()

  return (
    <View style={ styles.calculadoraContainer }>
      {
        (resultados.length > 0) && (
          resultados.map((res, key) => (
            <Text 
              style={ styles.resultadoPequeno }
              key={ key }
            >
              { res }
            </Text>
          )) 
        )
      }
      
      {
        ( numeroAnterior !== '0' ) && (
          <Text style={ styles.resultadoPequeno }>{ numeroAnterior }</Text>
        )
      }
      <Text 
        style={ styles.resultado }
        numberOfLines = { 1 }
        adjustsFontSizeToFit
      >
        { numero }
      </Text>

      {/* Fila de botones */}
      <View style={ styles.fila }>
        <BotonCalc texto='C' color='#9B9B9B' accion={ limpiar } />
        <BotonCalc texto='+/-' color='#9B9B9B' accion={ absoluto }/>
        <BotonCalc texto='del' color='#9B9B9B' accion={ btnDelete }/>
        <BotonCalc texto='/' color='#FF9427' accion={ btnDividir }/>
      </View>

      <View style={ styles.fila }>
        <BotonCalc texto='7' accion={ armarNumero } />
        <BotonCalc texto='8' accion={ armarNumero }/>
        <BotonCalc texto='9' accion={ armarNumero }/>
        <BotonCalc texto='*' color='#FF9427' accion={ btnMultiplicar }/>
      </View>

      <View style={ styles.fila }>
        <BotonCalc texto='4' accion={ armarNumero }/>
        <BotonCalc texto='5' accion={ armarNumero }/>
        <BotonCalc texto='6' accion={ armarNumero }/>
        <BotonCalc texto='-' color='#FF9427' accion={ btnRestar }/>
      </View>

      <View style={ styles.fila }>
        <BotonCalc texto='1' accion={ armarNumero }/>
        <BotonCalc texto='2' accion={ armarNumero }/>
        <BotonCalc texto='3' accion={ armarNumero }/>
        <BotonCalc texto='+' color='#FF9427' accion={ btnSumar }/>
      </View>

      <View style={ styles.fila }>
        <BotonCalc texto='0' ancho accion={ armarNumero }/>
        <BotonCalc texto='.' accion={ armarNumero }/>
        <BotonCalc texto='=' color='#FF9427' accion={ calcular }/>
      </View>
    </View>
  )
}