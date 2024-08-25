import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import revisarEncuestaStyles from "../styles/revisarEncuestaStyle";
import { RevisarEncuestasRepository } from "../repositories/RevisarEncuestasRepository";
import { useSQLiteContext } from "expo-sqlite/next";

const RevisarEncuestasScreen = ({ navigation }) => {
  const db = useSQLiteContext();
  const [data, setData] = useState([]);
  const repository = new RevisarEncuestasRepository(db);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await repository.findAll();
        setData(result);
      } catch (error) {
        console.error("Error al obtener los datos:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleModify = (id) => {
    navigation.navigate("NuevaEncuesta", { respondentId: id });
    // Lógica para modificar el encuestado con el ID correspondiente
    console.log("Modificar encuestado con ID:", id);
  };

  const handleDelete = (id, nombre) => {
    // Muestra una alerta para confirmar la eliminación
    Alert.alert(
      "Confirmar Eliminación",
      `¿Estás seguro de que deseas eliminar al encuestado ${nombre}?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Eliminación cancelada"),
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              // Llama al método delete del repositorio para eliminar el encuestado
              await repository.delete(id);

              // Actualiza la lista de encuestados después de eliminar el encuestado de la base de datos
              setData((prevData) => prevData.filter((item) => item.id !== id));

              console.log("Encuestado eliminado con éxito:", id);
            } catch (error) {
              console.error("Error al eliminar el encuestado:", error);
            }
          },
        },
      ],
      { cancelable: false } // Esto evita que se cierre el cuadro de diálogo al tocar fuera de él
    );
  };

  const handleSubmit = () => {
    navigation.navigate("Inicio");
  };

  const renderItem = ({ item }) => (
    <View style={revisarEncuestaStyles.encuestadorContainer}>
      <Text style={revisarEncuestaStyles.label}>
        Respondent: {item.respondent_name}
      </Text>
      <Text style={revisarEncuestaStyles.label}>
        Interviewer: {item.interviewer_name}
      </Text>
      <View style={revisarEncuestaStyles.buttonGroup}>
        <TouchableOpacity
          style={revisarEncuestaStyles.modifyButton}
          onPress={() => handleModify(item.id)}
        >
          <Text style={revisarEncuestaStyles.buttonText}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={revisarEncuestaStyles.deleteButton}
          onPress={() => handleDelete(item.id, item.respondent_name)}
        >
          <Text style={revisarEncuestaStyles.buttonText}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={revisarEncuestaStyles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 70 }} // Espacio adicional para el botón
      />
      <TouchableOpacity
        style={revisarEncuestaStyles.fixedPdfButton} // Estilo para fijar el botón
        onPress={handleSubmit}
      >
        <Text style={revisarEncuestaStyles.pdfButtonText}>Generar PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RevisarEncuestasScreen;
