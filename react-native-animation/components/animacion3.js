import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Animated, View } from "react-native";

const animacion3 = () => {
  const [animacion] = useState(new Animated.Value(14));

  useEffect(() => {
    Animated.timing(animacion, {
      toValue: 40,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View>
      <Animated.Text style={[styles.texto, { fontSize: animacion }]}>
        Animacion3
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: "center",
  },
});
export default animacion3;
