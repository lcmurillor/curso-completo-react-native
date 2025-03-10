import React, { useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import globalStyles from "../styles";
import { formatearCantidad } from "../helpers";
import CircularProgress from "react-native-circular-progress-indicator";
const controlPresupuesto = ({ presupuesto, gastos, resetearApp }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje > 100 ? 100 : nuevoPorcentaje);
    }, 1000);
    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          radius={150}
          valueSuffix={"%"}
          title="Gastado"
          inActiveStrokeColor="#F5f5f5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3B82F6"
          activeStrokeWidth={20}
          titleStyle={{ fontWeight: "bold", fontSize: 20 }}
          titleColor="#64748b"
        ></CircularProgress>
      </View>
      <View style={styles.contenedorTexto}>
        <Pressable style={styles.boton}
        onPress={resetearApp}>
          <Text style={styles.textoBoton}>Reinicar app</Text>
        </Pressable>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Dsponible: </Text>
          {formatearCantidad(disponible)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: "center",
  },
  boton:{
    backgroundColor: '#db2777',
    padding: 10,
    marginBottom: 40, 
    borderRadius: 5,
  },
  textoBoton:{
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase'

  },
  contenedorTexto: {
    marginTop: 30,
  },
  valor: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "700",
    color: "#3b82f7",
  },
});

export default controlPresupuesto;
