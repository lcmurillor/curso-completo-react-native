import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";

const App = () => {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgColor, setBgColor] = useState('rgb(71,149,212)')

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consutarClima = async () => {
      if (consultar) {
        const apiKey = "d82fdb368a8a5b0850e38c2f9ed3b0f4";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setResultado(resultado);
          setConsultar(false);

          const kelvin = 273.15;

          const {main} = resultado;
          const actual = main.temp - kelvin;

          if(actual < 10) {
            setBgColor('rgb( 105, 108, 149 )');
          } else if(actual >= 10 && actual < 25) {
            setBgColor('rgb(71, 149, 212)');
          } else {
            setBgColor('rgb( 178, 28, 61)');
          }

        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consutarClima();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert("Error", "No hay Resultados, intenta con otroa ciudad o país", [
      { text: "Entendido" },
    ]);
  };

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };

  const bgColorApp = {
    backgroundColor: bgColor
  }
  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima resultado={resultado}></Clima>
          <Formulario
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setConsultar={setConsultar}
          ></Formulario>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});

export default App;
