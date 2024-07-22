import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { nuevaEncuestaStyles } from '../styles/nuevaEncuestaStyles';
import { Picker } from '@react-native-picker/picker';
import { localidades } from '../data/localidades'; // Ajusta la ruta según tu estructura de carpetas

const NuevaEncuestaScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pregunta1, setPregunta1] = useState('');
  const [fecha, setFecha] = useState(null);
  const [edad, setEdad] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('CC');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isNacimientoPickerVisible, setNacimientoPickerVisibility] = useState(false);
  const [localidad, setLocalidad] = useState('');

  const handleConfirm = (date) => {
    setFecha(date);
    setDatePickerVisibility(false);
  };

  const handleNacimientoConfirm = (date) => {
    setFechaNacimiento(date);
    setNacimientoPickerVisibility(false);
  };

  const handleSubmit = () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El campo Nombre es obligatorio');
      return;
    }
    if (!apellido.trim()) {
      Alert.alert('Error', 'El campo Apellido es obligatorio');
      return;
    }
    if (!pregunta1.trim()) {
      Alert.alert('Error', 'El campo Pregunta 1 es obligatorio');
      return;
    }
    if (!fecha) {
      Alert.alert('Error', 'El campo Fecha es obligatorio');
      return;
    }
    if (!fechaNacimiento) {
      Alert.alert('Error', 'El campo Fecha de Nacimiento es obligatorio');
      return;
    }
    if (!edad) {
      Alert.alert('Error', 'El campo Edad es obligatorio');
      return;
    }
    if (!numeroDocumento.trim()) {
      Alert.alert('Error', 'El campo Número de Documento es obligatorio');
      return;
    }
    if (!localidad) {
      Alert.alert('Error', 'El campo Localidad es obligatorio');
      return;
    }

    // Lógica para manejar el envío de la encuesta
    console.log('Nombre:', nombre);
    console.log('Apellido:', apellido);
    console.log('Pregunta 1:', pregunta1);
    console.log('Fecha:', fecha.toLocaleDateString());
    console.log('Fecha de Nacimiento:', fechaNacimiento.toLocaleDateString());
    console.log('Edad:', edad);
    console.log('Tipo de Documento:', tipoDocumento);
    console.log('Número de Documento:', numeroDocumento);
    console.log('Localidad:', localidad);
  };

  return (
    <View style={nuevaEncuestaStyles.container}>
      <Text style={nuevaEncuestaStyles.header}>Nueva Encuesta</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Pregunta 1"
        value={pregunta1}
        onChangeText={setPregunta1}
      />
      <TouchableOpacity style={nuevaEncuestaStyles.button} onPress={() => setDatePickerVisibility(true)}>
        <Text style={nuevaEncuestaStyles.buttonText}>
          {fecha ? `Fecha: ${fecha.toLocaleDateString()}` : 'Seleccionar Fecha de encuesta'}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <TouchableOpacity style={nuevaEncuestaStyles.button} onPress={() => setNacimientoPickerVisibility(true)}>
        <Text style={nuevaEncuestaStyles.buttonText}>
          {fechaNacimiento ? `Fecha de Nacimiento: ${fechaNacimiento.toLocaleDateString()}` : 'Seleccionar Fecha de Nacimiento'}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isNacimientoPickerVisible}
        mode="date"
        onConfirm={handleNacimientoConfirm}
        onCancel={() => setNacimientoPickerVisibility(false)}
      />
      <Text style={nuevaEncuestaStyles.label}>Selecciona la Edad:</Text>
      <Picker
        selectedValue={edad}
        style={nuevaEncuestaStyles.picker}
        onValueChange={(itemValue) => setEdad(itemValue)}
      >
        {[...Array(130).keys()].map((value) => (
          <Picker.Item key={value.toString()} label={`${value + 1}`} value={value + 1} />
        ))}
      </Picker>
      <Text style={nuevaEncuestaStyles.label}>Tipo de Documento:</Text>
      <Picker
        selectedValue={tipoDocumento}
        style={nuevaEncuestaStyles.picker}
        onValueChange={(itemValue) => setTipoDocumento(itemValue)}
      >
        <Picker.Item label="Cédula de Ciudadanía (CC)" value="CC" />
        <Picker.Item label="Tarjeta de Identidad (TI)" value="TI" />
        <Picker.Item label="Cédula de Extranjería (CE)" value="CE" />
        <Picker.Item label="Pasaporte" value="Pasaporte" />
      </Picker>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Número de Documento"
        value={numeroDocumento}
        onChangeText={setNumeroDocumento}
        keyboardType="numeric"
      />
      <Text style={nuevaEncuestaStyles.label}>Lugar de Nacimiento:</Text>
      <Picker
        selectedValue={localidad}
        style={nuevaEncuestaStyles.picker}
        onValueChange={(itemValue) => setLocalidad(itemValue)}
      >
        {localidades.map((loc) => (
          <Picker.Item key={loc.id} label={loc.nombre} value={loc.id} />
        ))}
      </Picker>
      <TouchableOpacity style={nuevaEncuestaStyles.button} onPress={handleSubmit}>
        <Text style={nuevaEncuestaStyles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NuevaEncuestaScreen;
