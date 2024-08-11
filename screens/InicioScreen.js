import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { inicioStyles } from '../styles/inicioStyles';
import { useSQLiteContext } from "expo-sqlite/next";


const InicioScreen = ({ navigation }) => {
  const db = useSQLiteContext();

  React.useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  async function getData() {
    const result = await db.getAllAsync(
      `SELECT * FROM Encuestador`
    );
    console.log(result);
  }
  
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
