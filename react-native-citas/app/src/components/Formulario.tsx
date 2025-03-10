import React, { useState, useEffect } from "react";
import {
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
  Button,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const Formulario = ({
  modalVisible,
  cerrarModal,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
  guardarCitasStorage
}: any) => {
  const [id, setId] = useState("");
  const [paciente, setPaciente] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);

  const handleCita = () => {
    // Validar
    if ([paciente, propietario, email, fecha, sintomas].includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    // Revisar si es un registro nuevo o edición
    const nuevoPaciente = {
      id: Date.now(),
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    if (id) {
      // Editando
      nuevoPaciente.id = parseInt(id);

      const pacientesActualizados = pacientes.map(
        (pacienteState: { id: any }) =>
          pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPacienteApp({});
    } else {
      // Nuevo Registro
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }
    cerrarModal();
    setId("");
    setPaciente("");
    setPropietario("");
    setEmail("");
    setTelefono("");
    setFecha(new Date());
    setSintomas("");

    guardarCitasStorage(JSON.stringify([...pacientes, nuevoPaciente]))

  };

  // Función para manejar la selección de la fecha
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || Date;
    setShowPicker(false); // Ocultar el DateTimePicker después de seleccionar una fecha
    setShowTimePicker(!showTimePicker);

    setFecha(currentDate); // Actualizar el estado con la fecha seleccionada
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteObj.id ? "Editar" : "Nueva"} {""}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => {
              cerrarModal();
              setPacienteApp({});
              setId("");
              setPaciente("");
              setPropietario("");
              setEmail("");
              setTelefono("");
              setFecha(new Date());
              setSintomas("");
            }}
          >
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor={"#666"}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor={"#666"}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Propietario"
              placeholderTextColor={"#666"}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono Propietario"
              placeholderTextColor={"#666"}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <Pressable onPress={() => setShowPicker(true)}>
              <Text style={styles.btnFechaAlta}>Agregar fecha de alta</Text>
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={fecha}
                mode="date" // Puedes cambiar a "time" para un selector de tiempo
                display="default" // Cambia esto a "spinner" o "calendar" según tu preferencia
                onChange={onChange}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={fecha}
                mode="time" // Puedes cambiar a "time" para un selector de tiempo
                display="default" // Cambia esto a "spinner" o "calendar" según tu preferencia
                onChange={onChange}
              />
            )}
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholderTextColor={"#666"}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
              placeholder="Sintomas"
            />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>
              {pacienteObj.id ? "Editar" : "Agregar"} Paciente
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#6D28D9",
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#FFF",
  },
  tituloBold: {
    fontWeight: "900",
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: "#5827A4",
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
  btnFechaAlta: {
    color: "#5827A4",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
    backgroundColor: "#F59E0B",
    height: 55,
    borderRadius: 10,
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    color: "#000",
  },
  sintomasInput: {
    height: 100,
    textAlignVertical: "top",
  },
  fechaContenedor: {
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: "#F59E0B",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: "#5827A4",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
});

export default Formulario;
