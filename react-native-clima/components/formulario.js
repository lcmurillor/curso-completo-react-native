import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
const Formulario = ({ busqueda, setBusqueda, setConsultar}) => {
  const { pais, ciudad } = busqueda;

  const [animacionboton] = useState(new Animated.Value(1));

  const consultarClima= () =>{
    if(pais.trim() === '' || ciudad.trim() === ''){
        mostrarAlerta();
        return;
    }

    setConsultar(true)
  }

  const mostrarAlerta = () =>{
    Alert.alert(
        'Error',
        'Agrega una ciudad y pais para la búsqueda',
        [{text: 'Entendido'}]
    )
  }

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: 0.75,
      useNativeDriver: true,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      useNativeDriver: true,
      friction: 1,
      tension: 30,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{ scale: animacionboton }],
  };

  return (
    <View style={styles.formulario}>
      <View>
        <TextInput
        value={ciudad}
        onChangeText={ ciudad => setBusqueda({...busqueda, ciudad})}
          style={styles.input}
          placeholder="Ciudad"
          placeholderTextColor="#666"
        ></TextInput>
      </View>
      <View>
        <Picker 
        selectedValue={pais}
        onValueChange={ pais => setBusqueda({...busqueda, pais})}
        itemStyle={{ height: 120, backgroundColor: "#FFF"}}>
          <Picker.Item label=" -- Seleccione un pais --" value=""></Picker.Item>
          <Picker.Item label="Estados Unicos" value="US"></Picker.Item>
          <Picker.Item label="Costa Rica" value="CR"></Picker.Item>
          <Picker.Item label="México" value="MX"></Picker.Item>
          <Picker.Item label="Argentina" value="AR"></Picker.Item>
          <Picker.Item label="Colombia" value="CO"></Picker.Item>
          <Picker.Item label="España" value="ES"></Picker.Item>
          <Picker.Item label="Peru" value="PE"></Picker.Item>
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPressIn={() => animacionEntrada()}
        onPressOut={() => animacionSalida()}
        onPress={()=> consultarClima()}
      >
        <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
          <Text style={styles.textoBuscar}>Buscar clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  formulario: {
    // marginTop: 100,
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: "#FFF",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: "#000",
    padding: 10,
    justifyContent: "center",
  },
  textoBuscar: {
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
  },
});

export default Formulario;
