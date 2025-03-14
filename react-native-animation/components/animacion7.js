import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";

const animacion7 = () => {
  const [animacion1] = useState(new Animated.Value(0));
  const [animacion2] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animacion1, {
        toValue: 200,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.spring(
        animacion2,{
          toValue: 10,
          useNativeDriver: false
        }
      ),
      Animated.spring(
        animacion2,{
          toValue: 1,
          useNativeDriver: false
        }
      ),
      Animated.timing(animacion1, {
        toValue: 400,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const estiloAnimacion = {
    transform: [{ translateY: animacion1 }, { scale: animacion2 }],
  };

  return (
    <View>
      <Animated.View style={[styles.caja, estiloAnimacion]}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  caja: {
    width: 100,
    height: 100,
    backgroundColor: "cornflowerblue",
  },
});

export default animacion7;
