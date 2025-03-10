import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
const formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setConsultarAPI,
}) => {
  //hook para importar la fuente utilizando expo
  const [loaded] = useFonts({
    LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
  });

  const [criptomonedas, setCriptomonedas] = useState([]);
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resulado = await axios.get(url);
      setCriptomonedas(resulado.data.Data);
    };
    consultarAPI();
  }, []);

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
  };

  const obtenerCripoMoneda = (cripto) => {
    setCriptomoneda(cripto);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === "" || criptomoneda.trim() === "") {
      mostrarAletar();
      return;
    }
    setConsultarAPI(true)
  };

  const mostrarAletar = () => {
    Alert.alert("Error!", "Ambos campos son obligatorios", [{ text: "ok" }]);
  };

  if (!loaded) {
    return <></>;
  }

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(moneda) => {
          obtenerMoneda(moneda);
        }}
      >
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>

      <Picker
        selectedValue={criptomoneda}
        onValueChange={(cripto) => {
          obtenerCripoMoneda(cripto);
        }}
      >
        <Picker.Item label="- Seleccione -" value="" />
        {criptomonedas.map((cripto) => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>

      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => {
          cotizarPrecio();
        }}
      >
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "LatoBlack",
    fontSize: 22,
    marginVertical: 20,
    textTransform: "uppercase",
  },
  btnCotizar: {
    backgroundColor: "#5e49e2",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  textoCotizar: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "LatoBlack",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default formulario;
