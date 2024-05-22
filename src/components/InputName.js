

import { View, Text, StyleSheet, TextInput} from 'react-native';


const InputName = ({labelInput, placeholder, valor}) => {
    return (
    <View>
        <Text style={styles.descripcion}>{labelInput}</Text>
        <TextInput
            style={styles.Input}
            placeholder={placeholder}
            onChangeText={valor}
        />
    </View>
    );
}

export default InputName;


const styles = StyleSheet.create({
    descripcion: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'justify',
        marginTop: 10,
        marginStart:-25
      },
    Input:{
        width:'50',
        backgroundColor:'#dfd7d7', 
        height:50, 
        fontWeight:'900', 
        borderRadius:5, 
        margin:5, 
        fontSize:18,
        marginStart:-25,
        marginBottom:20
    },
  });
  