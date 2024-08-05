import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import revisarEncuestaStyles from '../styles/revisarEncuestaStyle';

const RevisarEncuestasScreen = ({ navigation }) => {
  const encuestados = [
    { nombre: 'Juan Pérez', documento: '12345678' },
    { nombre: 'María López', documento: '87654321' },
    // Agrega más encuestados aquí
  ];

  return (
    <View style={revisarEncuestaStyles.container}>
      <ScrollView
        style={revisarEncuestaStyles.scrollContainer}
        contentContainerStyle={revisarEncuestaStyles.contentContainer}
      >
        {encuestados.map((encuestado, index) => (
          <View key={index} style={revisarEncuestaStyles.encuestadoContainer}>
            <View style={revisarEncuestaStyles.infoContainer}>
              <Text style={revisarEncuestaStyles.nombre}>{encuestado.nombre}</Text>
              <Text style={revisarEncuestaStyles.documento}>{encuestado.documento}</Text>
            </View>
            <View style={revisarEncuestaStyles.buttonsContainer}>
              <TouchableOpacity
                style={revisarEncuestaStyles.modifyButton}
                onPress={() => {
                  /* Acción para modificar */
                }}
              >
                <Text style={revisarEncuestaStyles.buttonText}>Cambiar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={revisarEncuestaStyles.deleteButton}
                onPress={() => {
                  /* Acción para eliminar */
                }}
              >
                <Text style={revisarEncuestaStyles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={revisarEncuestaStyles.pdfButton}
        onPress={() => {
          /* Acción para generar PDF */
        }}
      >
        <Text style={revisarEncuestaStyles.pdfButtonText}>Generar PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RevisarEncuestasScreen;
