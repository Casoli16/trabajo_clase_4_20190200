import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const EjercicioPropio = () => {
    return ( 
        <View style={styles.container}>
        <Text style={styles.title}>
            ¡Hola profe Will!
        </Text>
        <Text style={styles.descripcion}>
            En mi ejercicio anterior de JavaScript ocupe la api de pokemon también ;) 
        </Text>
        </View>
     );
}
 
export default EjercicioPropio;


// Estilos para los componentes.
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 20,
      paddingHorizontal:15
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
      textTransform: 'uppercase',
    },
    descripcion: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'justify',
        marginTop: 10,
      },
      negrita:{
        fontWeight:'bold'
      }
  });
  