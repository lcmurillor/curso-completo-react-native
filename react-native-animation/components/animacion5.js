import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  TouchableWithoutFeedback,
} from "react-native";

const animacion5 = () => {
  const [animacion] = useState(new Animated.Value(1));

  const presionarBoton = () => {
    Animated.spring(animacion, {
      toValue: 0.8,
      useNativeDriver: false
    }).start();
  };

  const soltarBoton = () => {
    Animated.spring(animacion, {
      toValue: 1,
      friction: 1,
      tension: 70,
      useNativeDriver: false
    }).start();
  };

  const estiloAnimacion = {
    transform: [{ scale: animacion || 1}],
  };

  return (
    <View style={styles.contenedor}>
      <TouchableWithoutFeedback
        onPressIn={() => presionarBoton()}
        onPressOut={() => soltarBoton()}
      >
        <Animated.View style={[styles.btn, estiloAnimacion]}>
          <Text style={styles.texto}>iniciar sesion</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    alignItems: "center",
  },
  btn: {
    backgroundColor: "cornflowerblue",
    width: 280,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 28,
  },
});

export default animacion5;
