import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const cotizacion = ({ resultado }) => {
  //hook para importar la fuente utilizando expo
  const [loaded] = useFonts({
    LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
  });

  if (!loaded) {
    return <></>;
  }
  if (Object.keys(resultado).length === 0) {
    return <></>;
  }
  return (
    <View style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>{resultado.PRICE}</Text>
      </Text>
      <Text style={styles.texto}>
        {" "}
        Precio mas alto del dia: {""}
        <Text style={styles.span}>{resultado.HIGHDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        {" "}
        Precio mas gabo del dia: {""}
        <Text style={styles.span}>{resultado.LOWDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        {" "}
        Variación de las últimas 24 horas: {""}
        <Text style={styles.span}>%{resultado.CHANGE24HOUR}</Text>
      </Text>
      <Text style={styles.texto}>
        Última actualización: {""}
        <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: "#5e49e2",
    padding: 20,
  },
  texto: {
    color: "#FFF",
    fontFamily: "LatoRegular",
    fontSize: 18,
    marginBottom: 10,
  },
  precio: {
    fontSize: 38,
  },
  span: {
    fontFamily: "LatoBlack",
  },
});

export default cotizacion;
