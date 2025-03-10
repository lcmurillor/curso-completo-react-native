import React, { useEffect, useState } from "react";
import { Text, FlatList, View } from "react-native";
import axios from "axios";
import { Headline, List, Button, FAB } from "react-native-paper";
import globalStyles from "../styles/Global";
const Inicio = ({ navigation }) => {
  const [clientes, setCliente] = useState([]);
  const [consultarApi, setConsultarApi] = useState(true);

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const resultado = await axios.get("http://10.0.2.2:3000/clientes");
        setCliente(resultado.data);
        setConsultarApi(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (consultarApi) {
      obtenerClientesAPI();
    }
  }, []);

  return (
    <>
      <View style={globalStyles.titulo}>
        <Button
          icon={"plus-circle-outline"}
          onPress={() =>
            navigation.navigate("NuevoCliente", { setConsultarApi })
          }
        >
          Nuevo cliente
        </Button>
        <Headline style={globalStyles.titulo}>
          {clientes.length > 0 ? "Clientes" : "Aun no hay clientes"}
        </Headline>
        <FlatList
          data={clientes}
          keyExtractor={(cliente) => cliente.id.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item.nombre}
              description={item.empresa}
              onPress={() =>
                navigation.navigate("DetallesCliente", {
                  item,
                  setConsultarApi,
                })
              }
            />
          )}
        />
      </View>
      <FAB
        icon={"plus-circle-outline"}
        style={globalStyles.fab}
        onPress={() => navigation.navigate("NuevoCliente", { setConsultarApi })}
      />
    </>
  );
};

export default Inicio;
