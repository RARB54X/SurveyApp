import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { inicioStyles } from '../styles/inicioStyles'; // Asegúrate de que la capitalización sea correcta

const InicioScreen = ({ navigation }) => {
  return (
    <View style={inicioStyles.container}>
      <Image source={require('../assets/logo.png')} style={inicioStyles.logo} />
      <Text style={inicioStyles.title}>Encuesta</Text>
      <TouchableOpacity style={inicioStyles.button} onPress={() => navigation.navigate('NuevaEncuesta')}>
        <Text style={inicioStyles.buttonText}>Iniciar Nueva Encuesta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={inicioStyles.button} onPress={() => navigation.navigate('RevisarEncuestas')}>
        <Text style={inicioStyles.buttonText}>Revisar Encuestas Anteriores</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InicioScreen;
