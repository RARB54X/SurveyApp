import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import revisarEncuestaStyles from "../styles/revisarEncuestaStyle";
import { RevisarEncuestasRepository } from "../repositories/RevisarEncuestasRepository";
import { useSQLiteContext } from "expo-sqlite/next";

const RevisarEncuestasScreen = ({ navigation }) => {
  const db = useSQLiteContext();

  React.useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  const revisarEncuestasRepository = new RevisarEncuestasRepository(db);

  async function getData() {
    const result = await revisarEncuestasRepository.findAll();
    console.log("Arreglo de datos", result);
  }

  const handleSubmit = async () => {
    navigation.navigate("Inicio");
  };

  return (
    <View style={revisarEncuestaStyles.container}>
      <ScrollView
        style={revisarEncuestaStyles.scrollContainer}
        contentContainerStyle={revisarEncuestaStyles.contentContainer}
      ></ScrollView>
      <TouchableOpacity
        style={revisarEncuestaStyles.pdfButton}
        onPress={handleSubmit}
      >
        <Text style={revisarEncuestaStyles.pdfButtonText}>Generar PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RevisarEncuestasScreen;
