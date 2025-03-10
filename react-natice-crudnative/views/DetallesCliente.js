import React from "react";
import { Text, Headline, Subheading, Button, FAB } from "react-native-paper";
import { View, StyleSheet, Alert } from "react-native";
import globalStyles from "../styles/Global";
import axios from "axios";

const DetallesCliente = ({ navigation, route }) => {
  const { nombre, telefono, correo, empresa, id } = route.params.item;
  const { setConsultarApi } = route.params;
  const mostrarConformacion = () => {
    Alert.alert(
      "Desea eliminar el cliente?",
      "un contanto eliminado no se puede recuperar",
      [
        { text: "Si, Eliminar", onPress: () => eliminarContacto() },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const eliminarContacto = async () => {
    const url = `http://10.0.2.2:3000/clientes/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.log(error);
    }

    navigation.navigate("Inicio");
    setConsultarApi(true);
  };

  return (
    <>
      <View style={globalStyles.contenedor}>
        <Headline style={globalStyles.titulo}>{nombre}</Headline>
        <Text style={styles.texto}>
          Empresa: <Subheading>{empresa}</Subheading>
        </Text>
        <Text style={styles.texto}>
          Correo: <Subheading>{correo}</Subheading>
        </Text>
        <Text style={styles.texto}>
          Telefono: <Subheading>{telefono}</Subheading>
        </Text>

        <Button
          style={styles.boton}
          mode="contained"
          icon={"cancel"}
          onPress={() => mostrarConformacion()}
        >
          Eliminar Cliente
        </Button>
      </View>

      <FAB
        icon={"pencil"}
        style={globalStyles.fab}
        onPress={() => navigation.navigate("NuevoCliente", {cliente: route.params.item, setConsultarApi })}
      />
    </>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  boton: {
    marginTop: 100,
    backgroundColor: "red",
  },
});

export default DetallesCliente;
