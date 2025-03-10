import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

const header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.texto}>Planificador de Gastos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  texto: {
    textAlign: "center",
    fontSize: 30,
    color: "#FFF",
    textTransform: "uppercase",
    fontWeight: "800",
    marginHorizontal: 20,
    paddingTop: 20,
  },
});

export default header;
