import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Inicio from "./views/inicio";
import Nosotros from "./views/nosotros";

const App = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{
            title: "Componente principal",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#F4511E",
            },
            headerTintColor: "#FFF",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Inicio" component={Inicio}></Stack.Screen>
          <Stack.Screen
            name="Nosotros"
            component={Nosotros}
            options={({ route }) => ({
              title: route.params.clienteId,
            })}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
