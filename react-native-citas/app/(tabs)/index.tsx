import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import Formulario from "../src/components/Formulario";
import Paciente from "../src/components/Paciente";
import InformacionPaciente from "../src/components/InformacionPaciente";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HommeScreem = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        console.log(citasStorage);
        if(citasStorage){
           const parsedCitas = JSON.parse(citasStorage);
           setPacientes(parsedCitas);

        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, []);

  const pacienteEditar = (id: number) => {
    const pacienteEditar = pacientes.filter(
      (paciente: any) => paciente.id === id
    );
    setPaciente(pacienteEditar[0]);
  };

  const pacienteEliminar = (id: number) => {
    Alert.alert(
      "¿Deseas eliminar este paciente?",
      "Un paciente eliminado no se puede recuperar",
      [
        { text: "Cancelar" },
        {
          text: "Si, Eliminar",
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              (pacientesState: any) => pacientesState.id !== id
            );
            guardarCitasStorage(JSON.stringify(pacientesActualizados))
            setPacientes(pacientesActualizados);
          },
        },
      ]
    );
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  //Actualziacion para integar AsyncStorage
  const guardarCitasStorage = async (citasJSON: string) => {
    try {
      await AsyncStorage.setItem("citas", citasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.titulo}>
        Administrador de Citas {""}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                setPaciente={setPaciente}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
              />
            );
          }}
        />
      )}

      {modalVisible && (
        <Formulario
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
          modalVisible={undefined}
          guardarCitasStorage={guardarCitasStorage}
        />
      )}

      <Modal visible={modalPaciente} animationType="slide">
        <InformacionPaciente
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    backgroundColor: "#F3F4F6",
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#374151",
    fontWeight: "600",
  },
  tituloBold: {
    fontWeight: "900",
    color: "#6D28D9",
  },
  btnNuevaCita: {
    backgroundColor: "#6D28D9",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  noPacientes: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#374151",
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default HommeScreem;
