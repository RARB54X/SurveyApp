import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import revisarEncuestaStyles from "../styles/revisarEncuestaStyle";
import { RevisarEncuestasRepository } from "../repositories/RevisarEncuestasRepository";
import { useSQLiteContext } from "expo-sqlite/next";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

// Función para convertir los datos a CSV
const generateCSV = (data) => {
  // Encabezados principales del entrevistado
  const respondentHeaders = [
    "ID",
    "Nombre del Entrevistado",
    "Entrevistador",
    "Nombre",
    "Apellido",
    "Nombre de Guerra",
    "Fecha de Nacimiento",
    "Edad",
    "Tipo de Documento",
    "Número de Documento",
    "Lugar de Nacimiento",
    "Lugar de Residencia",
    "Educación",
    "Profesión/ocupación",
    "Estado Civil",
    "Fecha de Incorporación",
    "Lugar de Incorporación",
    "Quién Incorporó",
    "Mando que lo recibio",
    "Estructura de Incorporación",
    "Otras Estructura",
    "Mandos que lo han tenido a cargo",
    "Tiempo permanecido",
    "Tareas",
    "Motivo de Incorporación",
    "Enfermedades",
    "su familia esta de acuerdo",
    "Perteneció a las fuerzas militares",
  ];

  // Encabezados para datos de la madre
  const motherHeaders = [
    "Nombre Madre",
    "Edad Madre",
    "Ocupación Madre",
    "Nivel de Educación Madre",
    "Sitio de Residencia Madre",
    "Dirección Actual Madre",
    "Teléfono Madre",
    "Cónyuge Madre",
  ];

  // Encabezados para datos del padre
  const fatherHeaders = [
    "Nombre Padre",
    "Edad Padre",
    "Ocupación Padre",
    "Nivel de Educación Padre",
    "Sitio de Residencia Padre",
    "Dirección Actual Padre",
    "Teléfono Padre",
    "Cónyuge Padre",
  ];

  // Encabezados para datos del cónyuge
  const spouseHeaders = [
    "Nombre Cónyuge",
    "Edad Cónyuge",
    "Ocupación Cónyuge",
    "Nivel de Educación Cónyuge",
    "Sitio de Residencia Cónyuge",
    "Dirección Actual Cónyuge",
    "Teléfono Cónyuge",
    "Cónyuge del Cónyuge",
    "Estado de Relación",
  ];

  // Encabezados para datos de los hermanos
  const siblingHeaders = [
    "Nombre Hermano",
    "Edad Hermano",
    "Ocupación Hermano",
    "Nivel de Educación Hermano",
    "Sitio de Residencia Hermano",
    "Dirección Actual Hermano",
    "Teléfono Hermano",
    "Cónyuge Hermano",
  ];

  // Encabezados para datos de los hijos
  const childrenHeaders = [
    "Nombre Hijo",
    "Edad Hijo",
    "Ocupación Hijo",
    "Nivel de Educación Hijo",
    "Sitio de Residencia Hijo",
    "Dirección Actual Hijo",
    "Teléfono Hijo",
    "Cónyuge Hijo",
  ];
  // Encabezados para datos de la educación
  const educationHeaders = [
    "Tipo de Entrenamiento",
    "Duración del Entrenamiento",
    "Año de Finalización",
    "Estructura",
  ];
  const actionHeaders = [
    "Tipo de Acción",
    "Oficial al Mando",
    "Año de Finalización",
    "Estructura",
  ];
  const sanctionHeaders = [
    "Razón de la Sanción",
    "Sancionado por",
    "Tipo de Sanción",
    "Fecha",
    "Duración de la Sanción",
    "Estructura",
  ];
  const nonMilitaryFamilyHeaders = [
    "Tipo de Familiar",
    "Nombre",
    "Edad",
    "Rango",
    "Estructura",
    "Duración",
    "Estado Actual",
  ];
  const militaryFamilyHeaders = [
    "Tipo de Familiar en el Ejército",
    "Nombre del Familiar en el Ejército",
    "Edad del Familiar en el Ejército",
    "Profesión del Familiar en el Ejército",
    "Tiempo en el Ejército",
    "Rango del Familiar",
    "Unidad del Familiar",
    "Lugar de Servicio del Familiar",
  ];
  // Encabezados para la tabla 'security_questions'
  const securityQuestionsHeaders = [
    "Razón de Captura",
    "Capturado Por",
    "Fecha de Captura",
    "Lugar de Captura",
    "Nombre de la Prisión",
    "Duración en Prisión",
    "Método de Liberación",
    "Inicio del Servicio Militar",
    "Ubicación del Servicio Militar",
    "Fin del Servicio Militar",
    "Otra Organización",
    "Duración en Otra Organización",
    "Razón para Dejar la Organización",
    "Tiene Amigos Militares",
  ];

  // Encabezados para la tabla 'general_questions'
  const generalQuestionsHeaders = [
    "Aspiración en 5 Años",
    "Cómo Se Ha Sentido",
    "Se Siente Mejor en Civil",
    "Qué Extraña del Civil",
    "En Qué Es Mejor",
    "Qué Disfruta Más",
    "Problema Principal",
    "Mayor Éxito",
    "Mayor Fracaso",
    "Preparado para Discapacidad",
    "Preparado para Captura",
    "Signos o Defectos Físicos",
    "ETS",
    "Tratamiento Recibido",
    "Enfermedades Actuales",
    "Ha Tenido Cirugías",
    "Observaciones",
    "Tiene Amigos Militares",
  ];

  // Encabezados para la tabla 'other_questions'
  const otherQuestionsHeaders = [
    "Con Quién Vivió los Primeros 7 Años",
    "Método de Castigo",
    "Método de Recompensa",
    "Aspiración en la Infancia",
    "Aspiración Actual",
    "Relación con el Padre",
    "Relación con la Madre",
    "Relación con los Hermanos",
    "Tiene Pareja Estable",
    "Tiempo con la Pareja",
    "Relación con la Pareja",
    "Edad de la Primera Relación Sexual",
    "Situación Actual",
    "Demostración de Afecto",
    "Enamorado",
    "Miedos",
    "Mayor Miedo",
    "Mayor Alegría",
    "Respuesta ante Ofensa o Ataque",
  ];

  const propertyHeaders = ["Ubicación de la Propiedad"];
  const specialtyHeaders = ["Tipo de Especialidad", "Duración", "Estructura"];

  // Inicializar las filas del CSV
  const csvRows = [];

  // Iterar sobre cada respondent
  data.forEach((respondent) => {
    // Añadir encabezados del entrevistado
    csvRows.push(respondentHeaders.join(","));

    // Añadir datos del entrevistado
    const respondentRow = [
      respondent.id,
      respondent.first_name + " " + respondent.last_name,
      respondent.name_interviewer,
      respondent.first_name,
      respondent.last_name,
      respondent.nickname,
      respondent.birth_date,
      respondent.age,
      respondent.document_type,
      respondent.id_number,
      respondent.place_of_birth,
      respondent.place_of_residence,
      respondent.education,
      respondent.profession_occupation,
      respondent.marital_status,
      respondent.incorporation_date,
      respondent.incorporation_place,
      respondent.who_incorporated,
      respondent.received_supervisor,
      respondent.incorporation_structure,
      respondent.other_structure,
      respondent.position_supervisor,
      respondent.duration,
      respondent.tasks,
      respondent.reason_for_incorporation,
      respondent.parental_illness,
      respondent.family_agreement,
      respondent.has_previous_experience,
    ];

    csvRows.push(respondentRow.join(","));

    // Añadir encabezados de la madre si existe
    if (respondent.mother) {
      csvRows.push(motherHeaders.join(","));

      // Añadir datos de la madre
      const motherRow = [
        respondent.mother.name || "",
        respondent.mother.age || "",
        respondent.mother.occupation || "",
        respondent.mother.education_level || "",
        respondent.mother.residence_site || "",
        respondent.mother.current_address || "",
        respondent.mother.phone || "",
        respondent.mother.spouse || "",
      ];

      csvRows.push(motherRow.join(","));
    }

    // Añadir encabezados del padre si existe
    if (respondent.father) {
      csvRows.push(fatherHeaders.join(","));

      // Añadir datos del padre
      const fatherRow = [
        respondent.father.name || "",
        respondent.father.age || "",
        respondent.father.occupation || "",
        respondent.father.education_level || "",
        respondent.father.residence_site || "",
        respondent.father.current_address || "",
        respondent.father.phone || "",
        respondent.father.spouse || "",
      ];

      csvRows.push(fatherRow.join(","));
    }

    // Añadir encabezados del cónyuge si existe
    if (respondent.spouse) {
      csvRows.push(spouseHeaders.join(","));

      // Añadir datos del cónyuge
      const spouseRow = [
        respondent.spouse.name || "",
        respondent.spouse.age || "",
        respondent.spouse.occupation || "",
        respondent.spouse.education_level || "",
        respondent.spouse.residence_site || "",
        respondent.spouse.current_address || "",
        respondent.spouse.phone || "",
        respondent.spouse.spouse || "", // Cónyuge del cónyuge
        respondent.spouse.relationship_status || "", // Estado de Relación
      ];

      csvRows.push(spouseRow.join(","));
    }

    // Añadir encabezados de los hermanos solo una vez
    if (respondent.siblings && respondent.siblings.length > 0) {
      csvRows.push(siblingHeaders.join(","));

      // Añadir datos de cada hermano
      respondent.siblings.forEach((sibling) => {
        const siblingRow = [
          sibling.name || "",
          sibling.age || "",
          sibling.occupation || "",
          sibling.education_level || "",
          sibling.residence_site || "",
          sibling.current_address || "",
          sibling.phone || "",
          sibling.spouse || "",
        ];

        csvRows.push(siblingRow.join(","));
      });
    }
    // Añadir encabezados de los hijos solo una vez
    if (respondent.children && respondent.children.length > 0) {
      csvRows.push(childrenHeaders.join(","));

      // Añadir datos de cada hijo
      respondent.children.forEach((child) => {
        const childRow = [
          child.name || "",
          child.age || "",
          child.occupation || "",
          child.education_level || "",
          child.residence_site || "",
          child.current_address || "",
          child.phone || "",
          child.spouse || "",
        ];

        csvRows.push(childRow.join(","));
      });
    }
    // Añadir encabezados de la educación solo una vez
    if (respondent.educationDetails && respondent.educationDetails.length > 0) {
      csvRows.push(educationHeaders.join(","));

      // Añadir datos de cada educación
      respondent.educationDetails.forEach((education) => {
        const educationRow = [
          education.training_type || "",
          education.training_duration || "",
          education.year_of_completion || "",
          education.structure || "",
        ];

        csvRows.push(educationRow.join(","));
      });
    }
    // Añadir encabezados de acciones solo una vez
    if (respondent.actions && respondent.actions.length > 0) {
      csvRows.push(actionHeaders.join(","));
      respondent.actions.forEach((action) => {
        const actionRow = [
          action.action_type || "",
          action.commanding_officer || "",
          action.year_of_completion || "",
          action.structure || "",
        ];
        csvRows.push(actionRow.join(","));
      });
    }
    // Añadir encabezados de especialidades solo una vez
    if (respondent.specialties && respondent.specialties.length > 0) {
      csvRows.push(specialtyHeaders.join(","));
      respondent.specialties.forEach((specialty) => {
        const specialtyRow = [
          specialty.specialty_type || "",
          specialty.duration || "",
          specialty.structure || "",
        ];
        csvRows.push(specialtyRow.join(","));
      });
    }
    if (respondent.sanctions && respondent.sanctions.length > 0) {
      csvRows.push(sanctionHeaders.join(","));
      respondent.sanctions.forEach((sanction) => {
        const sanctionRow = [
          sanction.reason || "",
          sanction.sanctioned_by || "",
          sanction.sanction_type || "",
          sanction.date || "",
          sanction.sanction_duration || "",
          sanction.structure || "",
        ];
        csvRows.push(sanctionRow.join(","));
      });
    }
    // Añadir encabezados de familiares no militares solo una vez
    if (
      respondent.nonMilitaryFamilyMembers &&
      respondent.nonMilitaryFamilyMembers.length > 0
    ) {
      csvRows.push(nonMilitaryFamilyHeaders.join(","));
      respondent.nonMilitaryFamilyMembers.forEach((familyMember) => {
        const familyMemberRow = [
          familyMember.family_type || "",
          familyMember.name || "",
          familyMember.age || "",
          familyMember.rank || "",
          familyMember.structure || "",
          familyMember.duration || "",
          familyMember.current_status || "",
        ];
        csvRows.push(familyMemberRow.join(","));
      });
    }
    // Añadir encabezados de propiedades solo una vez
    if (respondent.properties && respondent.properties.length > 0) {
      csvRows.push(propertyHeaders.join(","));
      respondent.properties.forEach((property) => {
        const propertyRow = [property.location || ""];
        csvRows.push(propertyRow.join(","));
      });
    }
    // Añadir encabezados de familiares militares solo una vez
    if (
      respondent.militaryFamilyMembers &&
      respondent.militaryFamilyMembers.length > 0
    ) {
      csvRows.push(militaryFamilyHeaders.join(","));
      respondent.militaryFamilyMembers.forEach((militaryFamilyMember) => {
        const militaryFamilyRow = [
          militaryFamilyMember.family_type_in_military || "",
          militaryFamilyMember.family_name_in_military || "",
          militaryFamilyMember.family_age_in_military || "",
          militaryFamilyMember.family_profession_in_military || "",
          militaryFamilyMember.time_in_military || "",
          militaryFamilyMember.family_rank || "",
          militaryFamilyMember.family_unit || "",
          militaryFamilyMember.family_service_location || "",
        ];
        csvRows.push(militaryFamilyRow.join(","));
      });
    }
    // Añadir encabezados de 'security_questions' si existen
    if (respondent.securityQuestions) {
      csvRows.push(securityQuestionsHeaders.join(","));

      // Añadir datos de 'security_questions'
      const securityQuestionsRow = [
        respondent.securityQuestions.reason_for_capture || "",
        respondent.securityQuestions.captured_by || "",
        respondent.securityQuestions.capture_date || "",
        respondent.securityQuestions.capture_location || "",
        respondent.securityQuestions.prison_name || "",
        respondent.securityQuestions.prison_duration || "",
        respondent.securityQuestions.release_method || "",
        respondent.securityQuestions.military_service_start || "",
        respondent.securityQuestions.military_service_location || "",
        respondent.securityQuestions.military_service_end || "",
        respondent.securityQuestions.other_organization || "",
        respondent.securityQuestions.other_organization_duration || "",
        respondent.securityQuestions.reason_for_leaving_organization || "",
        respondent.securityQuestions.has_military_friends || "",
      ];

      csvRows.push(securityQuestionsRow.join(","));
    }

    // Añadir encabezados de 'general_questions' si existen
    if (respondent.generalQuestions) {
      csvRows.push(generalQuestionsHeaders.join(","));

      // Añadir datos de 'general_questions'
      const generalQuestionsRow = [
        respondent.generalQuestions.aspiration_in_5_years || "",
        respondent.generalQuestions.how_has_feeling || "",
        respondent.generalQuestions.feels_better_in_civil || "",
        respondent.generalQuestions.what_do_you_miss_from_civil || "",
        respondent.generalQuestions.what_is_best_at || "",
        respondent.generalQuestions.what_you_enjoy_most || "",
        respondent.generalQuestions.main_problem || "",
        respondent.generalQuestions.main_success || "",
        respondent.generalQuestions.main_failure || "",
        respondent.generalQuestions.prepared_for_disability || "",
        respondent.generalQuestions.prepared_for_capture || "",
        respondent.generalQuestions.physical_signs_or_defects || "",
        respondent.generalQuestions.STIs || "",
        respondent.generalQuestions.treatment_received || "",
        respondent.generalQuestions.current_illnesses || "",
        respondent.generalQuestions.had_any_surgeries || "",
        respondent.generalQuestions.observations || "",
        respondent.generalQuestions.has_military_friends || "",
      ];

      csvRows.push(generalQuestionsRow.join(","));
    }

    // Añadir encabezados de 'other_questions' si existen
    if (respondent.otherQuestions) {
      csvRows.push(otherQuestionsHeaders.join(","));

      // Añadir datos de 'other_questions'
      const otherQuestionsRow = [
        respondent.otherQuestions.lived_with_first_7_years || "",
        respondent.otherQuestions.punishment_method || "",
        respondent.otherQuestions.reward_method || "",
        respondent.otherQuestions.childhood_aspiration || "",
        respondent.otherQuestions.current_aspiration || "",
        respondent.otherQuestions.relationship_with_father || "",
        respondent.otherQuestions.relationship_with_mother || "",
        respondent.otherQuestions.relationship_with_siblings || "",
        respondent.otherQuestions.has_stable_partner || "",
        respondent.otherQuestions.time_with_partner || "",
        respondent.otherQuestions.relationship_with_partner || "",
        respondent.otherQuestions.age_of_first_sexual_relationship || "",
        respondent.otherQuestions.current_situation || "",
        respondent.otherQuestions.affection_demonstration || "",
        respondent.otherQuestions.in_love || "",
        respondent.otherQuestions.fears || "",
        respondent.otherQuestions.biggest_fear || "",
        respondent.otherQuestions.greatest_joy || "",
        respondent.otherQuestions.response_to_offense_or_attack || "",
      ];

      csvRows.push(otherQuestionsRow.join(","));
    }
  });

  return csvRows.join("\n");
};

// Función para guardar el archivo CSV en el sistema de archivos
const saveCSVFile = async (csv) => {
  try {
    const fileUri = FileSystem.documentDirectory + "encuestas.csv"; // Define la ruta para guardar el archivo

    // Crear un BOM para UTF-8
    const BOM = "\uFEFF";

    // Añadir BOM al contenido CSV
    const csvWithBOM = BOM + csv;

    // Escribe el archivo en la ruta especificada con BOM incluido
    await FileSystem.writeAsStringAsync(fileUri, csvWithBOM);

    return fileUri;
  } catch (error) {
    console.error("Error guardando el archivo CSV:", error); // Manejo de errores al guardar el archivo
    return null;
  }
};

// Función para compartir el archivo CSV
const shareCSVFile = async (fileUri) => {
  try {
    await Sharing.shareAsync(fileUri); // Comparte el archivo utilizando el sistema nativo
  } catch (error) {
    console.error("Error compartiendo el archivo CSV:", error); // Manejo de errores al compartir el archivo
  }
};

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

  const handleSubmit = async () => {
    try {
      const allData = await repository.getAllRespondentsData();
      const csv = generateCSV(allData);

      if (csv) {
        const fileUri = await saveCSVFile(csv);
        if (fileUri) {
          await shareCSVFile(fileUri);
        } else {
          console.error("No se pudo guardar el archivo CSV.");
        }
      } else {
        console.error("No se pudo generar el archivo CSV.");
      }
    } catch (error) {
      console.error("Error generando el archivo CSV:", error);
    }
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
