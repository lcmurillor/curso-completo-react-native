import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Animated } from "react-native";

const animacion2 = () => {
  const [animacion] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animacion, {
      toValue: 450,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.caja, { width: animacion, height: animacion }]}
    ></Animated.View>
  );
};

const styles = StyleSheet.create({
  caja: {
    width: 100,
    height: 100,
    backgroundColor: "cornflowerblue",
  },
});
export default animacion2;
