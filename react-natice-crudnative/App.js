import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, PaperProvider, Provider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Inicio from "./views/Inicio";
import NuevoCliente from "./views/NuevoCliente";
import DetallesCliente from "./views/DetallesCliente";
import BarraSuperior from "./components/ui/Barra";

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1774F2",
    accent: "#0655BF",
  },
};

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: "bold",
            },
              headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={({ navigation, route }) => ({
            
              // headerLeft: (props) => (
              //   <BarraSuperior
              //     {...props}
              //     navigation={navigation}
              //     route={route}
              //   ></BarraSuperior>
              // ),
            })}
          ></Stack.Screen>
          <Stack.Screen
            name="NuevoCliente"
            component={NuevoCliente}
            options={{ title: "Nuevo Cliente" }}
          ></Stack.Screen>
          <Stack.Screen
            name="DetallesCliente"
            component={DetallesCliente}
            options={{ title: "Detalles Cliente" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
