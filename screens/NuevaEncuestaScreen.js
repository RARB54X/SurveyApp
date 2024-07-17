import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { nuevaEncuestaStyles } from '../styles/nuevaEncuestaStyles';

const NuevaEncuestaScreen = () => {
  return (
    <View style={nuevaEncuestaStyles.container}>
      <Text style={nuevaEncuestaStyles.header}>Nueva Encuesta</Text>
      <TextInput style={nuevaEncuestaStyles.input} placeholder="Pregunta 1" />
      <TextInput style={nuevaEncuestaStyles.input} placeholder="Pregunta 2" />
      <TouchableOpacity style={nuevaEncuestaStyles.button}>
        <Text style={nuevaEncuestaStyles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NuevaEncuestaScreen;
