import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [inputTexto, setInputTexto] = useState("");
  const [nombreStorage, setNombreStorage] = useState("");

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem("nombre");
      setNombreStorage(nombre);
    } catch (error) {
      console.log(error);
    }
  };

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem("nombre", inputTexto);
      setNombreStorage(inputTexto);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem("nombre");
      setNombreStorage('')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.contenedor}>
      {nombreStorage ? <Text>Hola: {nombreStorage} </Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Escribre tu nombre"
        onChangeText={(texto) => setInputTexto(texto)}
      ></TextInput>

      <Button
        title="Guardar"
        color="#333"
        onPress={() => guardarDatos()}
      ></Button>
      {nombreStorage ? (
        <TouchableHighlight
          style={styles.btnEliminar}
          onPress={() => eliminarDatos()}
        >
          <Text style={styles.textoElimina}>Eliminar nombre &times;</Text>
        </TouchableHighlight>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderBlockColor: "#666",
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 10,
  },
  btnEliminar: {
    backgroundColor: "red",
    margin: 20,
    padding: 10,
  },
  textoElimina: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    width: 300,
  },
});
