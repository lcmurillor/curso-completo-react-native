import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import globalStyles from "../styles";

const formularioGasto = ({
  setModal,
  handleGasto,
  gasto,
  setGasto,
  eliminarGasto,
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");
  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setId(gasto.id);
      setFecha(gasto.fecha);
    } else {
    }
  }, [gasto]);

  return (
    <SafeAreaView style={style.contenedor}>
      <View style={style.contenedorBotones}>
        <Pressable
          style={[style.btn, style.btnCancelar]}
          onPress={() => {
            setModal(false);
            setGasto({});
          }}
        >
          <Text style={style.btnTexto}>Cancelar</Text>
        </Pressable>
        {!!id && ( <Pressable
          style={[style.btn, style.btnEliminar]}
          onPress={() => eliminarGasto(id)}
        >
          <Text style={style.btnTexto}>Eliminar</Text>
        </Pressable>)}
       
      </View>
      <View style={style.formulario}>
        <View>
          <Text style={style.titulo}>
            {gasto?.nombre ? "Editar Gasto" : "Nuevo Gasto"}
          </Text>
        </View>
        <View style={style.campo}>
          <Text style={style.label}>Nombre Gasto</Text>
          <TextInput
            style={style.input}
            placeholder="Nombre del gasto. Ej: Comida"
            onChangeText={setNombre}
            value={nombre}
          ></TextInput>
        </View>

        <View style={style.campo}>
          <Text style={style.label}>Cantidad Gasto</Text>
          <TextInput
            style={style.input}
            placeholder="Cantidad del gasto. Ej: 10000"
            keyboardType="numeric"
            onChangeText={setCantidad}
            value={cantidad}
          ></TextInput>
        </View>
        <View style={style.campo}>
          <Text style={style.label}>Categoria Gasto</Text>
          <Picker
            selectedValue={categoria}
            onValueChange={(value) => {
              setCategoria(value);
            }}
          >
            <Picker.Item label=" -- Seleccione --" value=""></Picker.Item>
            <Picker.Item label="Ahorro" value="ahorro"></Picker.Item>
            <Picker.Item label="Comida" value="comida"></Picker.Item>
            <Picker.Item label="Casa" value="casa"></Picker.Item>
            <Picker.Item label="Gastios Varios" value="gastos"></Picker.Item>
            <Picker.Item label="Ocio" value="ocio"></Picker.Item>
            <Picker.Item label="Salud" value="salud"></Picker.Item>
            <Picker.Item
              label="Suscripciones"
              value="suscripciones"
            ></Picker.Item>
          </Picker>
        </View>

        <Pressable
          style={style.submitBtn}
          onPress={() =>
            handleGasto({ nombre, cantidad, categoria, id, fecha })
          }
        >
          <Text style={style.submitBtnTexto}>
            {gasto?.nombre ? "Gardar Gasto" : "Agregar Gasto"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  contenedor: {
    backgroundColor: "#1e40af",
    flex: 1,
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 1,
  },
  btnEliminar: {
    backgroundColor: "red",
  },
  btnCancelar: {
    backgroundColor: "#db2777",
  },
  btnTexto: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  titulo: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 30,
    color: "#64748D",
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: "#64748D",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: "#3b81f6",
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  submitBtnTexto: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default formularioGasto;
