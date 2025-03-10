import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "./components/header";
import Formulario from "./components/formulario";
import Cotizacion from "./components/cotizacion";
import axios from "axios";

const App = () => {
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resulato = await axios.get(url);
        setCargando(true)
       setTimeout(() => {
        setResultado( resulato.data.DISPLAY[criptomoneda][moneda]);
        setConsultarAPI(false);
        setCargando(false)
       }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI]);

  const componenete = cargando ? <ActivityIndicator size={'large'} color={'#5e49e2'}/> : <Cotizacion resultado={resultado} />;

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require("./assets/img/cryptomonedas.png")}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultarAPI={setConsultarAPI}
          />
        </View>
        <View style={{marginTop:40}}>
          {componenete}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imagen: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
});

export default App;
