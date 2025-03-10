import React, { useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import globalStyles from "../styles";

const nuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  handleNuevoPresupuesto,
}) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto: Ej. 300"
        style={styles.input}
        value={presupuesto.toString()}
        onChangeText={(value) => setPresupuesto(Number.parseInt(value))}
      />

      <Pressable
        style={styles.boton}
        onPress={() => {
          handleNuevoPresupuesto(presupuesto);
        }}
      >
        <Text style={styles.botonTexto}>Agregar presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: "center",
    fontSize: 24,
    color: "#3b82f6",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 30,
  },
  boton: {
    marginTop: 30,
    backgroundColor: "#1048a4",
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    color: "#FFF",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default nuevoPresupuesto;
