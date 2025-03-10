import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import globalStyles from "../styles/Global";
import axios from "axios";

const NuevoCliente = ({ navigation, route }) => {
  const setConsultarApi = route.params;

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [alerta, setAlerta] = useState(false);

  useEffect(() => {
    if (route.params.cliente) {
      const { nombre, telefono, correo, empresa } = route.params.cliente;
      setNombre(nombre);
      setTelefono(telefono);
      setCorreo(correo);
      setEmpresa(empresa);
    }
  }, []);

  const guardarCliente = async () => {
    if (nombre === "" || telefono === "" || correo === "" || empresa === "") {
      setAlerta(true);
      return;
    }

    const cliente = { nombre, telefono, correo, empresa };

    if (route.params.cliente) {
      const { id } = route.params.cliente;
      cliente.id = id;
      const url = `http://10.0.2.2:3000/clientes/${id}`;
      try {
        await axios.put(url, cliente);
      } catch (error) {
        console.log(error);
        
      }
    } else {
      try {
        let response;
        if (Platform.OS === "ios") {
          response = await axios.post(
            "http://localhost:3000/clientes",
            cliente
          );
        } else {
          response = await axios.post("http://10.0.2.2:3000/clientes", cliente);
        }

        console.log("Response data:", response.data);
      } catch (error) {
        if (error.response) {
          console.log("Error response data:", error.response.data);
          console.log("Error response status:", error.response.status);
          console.log("Error response headers:", error.response.headers);
        } else if (error.request) {
          console.log("Error request:", error.request);
        } else {
          console.log("Error message:", error.message);
        }
      }
    }

    navigation.navigate("Inicio");

    setNombre("");
    setTelefono("");
    setCorreo("");
    setEmpresa("");

    setConsultarApi(true);
  };

  return (
    <ScrollView>
      <View style={globalStyles.contenedor}>
        <Headline style={globalStyles.titulo}>Añadir nuevo cliente</Headline>
        <TextInput
          style={styles.input}
          label={"Nombre"}
          placeholder="Juan Carlos"
          onChangeText={(texto) => setNombre(texto)}
          value={nombre}
        />

        <TextInput
          style={styles.input}
          label={"Telefono"}
          placeholder="1547854"
          onChangeText={(texto) => setTelefono(texto)}
          value={telefono}
        />

        <TextInput
          style={styles.input}
          label={"Correo"}
          placeholder="Jcorreo@host.com"
          onChangeText={(texto) => setCorreo(texto)}
          value={correo}
        />

        <TextInput
          style={styles.input}
          label={"Empresa"}
          placeholder="Nombre Empresa S.A"
          onChangeText={(texto) => setEmpresa(texto)}
          value={empresa}
        />

        <Button
          icon={"pencil-circle"}
          mode="contained"
          onPress={() => guardarCliente()}
        >
          Guardar Cliente
        </Button>
        <Portal>
          <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Todos los campos son obligatorios</Paragraph>
              <Dialog.Actions>
                <Button onPress={() => setAlerta(false)}>Ok</Button>
              </Dialog.Actions>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
});

export default NuevoCliente;
