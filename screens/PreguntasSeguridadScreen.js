import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../styles/preguntasSeguridadStyle";
import { MilitaryFamilyMembersRepository } from "../repositories/MilitaryFamilyMembersRepository";
import { useSQLiteContext } from "expo-sqlite/next";
import { SecurityQuestionsRepository } from "../repositories/SecurityQuestionsRepository";

const PreguntasSeguridadScreen = ({ route, navigation }) => {
  const respondentId = route.params?.respondentId;
  console.log("respondentId", respondentId);
  const db = useSQLiteContext();
  React.useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  const [razonCaptura, setRazonCaptura] = useState("");
  const [quienCaptura, setQuienCaptura] = useState("");
  const [cuandoCaptura, setCuandoCaptura] = useState("");
  const [dondeCaptura, setDondeCaptura] = useState("");
  const [carcel, setCarcel] = useState("");
  const [tiempoCaptura, setTiempoCaptura] = useState("");
  const [comoSalio, setComoSalio] = useState("");

  // Declarar constantes para los campos de "Servicio militar"
  const [cuandoServicio, setCuandoServicio] = useState("");
  const [dondeServicio, setDondeServicio] = useState("");
  const [comoSalioServicio, setComoSalioServicio] = useState("");

  // Declarar constantes para los campos de "Otras organizaciones"
  const [cuálOrganización, setCuálOrganización] = useState("");
  const [cuantoTiempoOrganización, setCuantoTiempoOrganización] = useState("");
  const [motivoRetiroOrganización, setMotivoRetiroOrganización] = useState("");
  const [amigosFuerzasMilitares, setAmigosFuerzasMilitares] = useState("");

  const [familiaresFuerzas, setFamiliaresFuerzas] = useState([]);

  const agregarFamiliarFuerzas = () => {
    setFamiliaresFuerzas([
      ...familiaresFuerzas,
      {
        tipoFamiliar: "",
        nombre: "",
        edad: "",
        profesion: "",
        tiempo: "",
        rango: "",
        unidad: "",
        lugarServicio: "",
        amigosFuerzas: "",
      },
    ]);
  };

  const eliminarFamiliarFuerzas = (index) => {
    const nuevosFamiliares = [...familiaresFuerzas];
    nuevosFamiliares.splice(index, 1);
    setFamiliaresFuerzas(nuevosFamiliares);
  };

  const actualizarFamiliarFuerzas = (index, campo, valor) => {
    const nuevosFamiliares = [...familiaresFuerzas];
    nuevosFamiliares[index][campo] = valor;
    setFamiliaresFuerzas(nuevosFamiliares);
  };

  const militaryFamilyMembersRepository = new MilitaryFamilyMembersRepository(
    db
  );
  const securityQuestionsRepository = new SecurityQuestionsRepository(db);

  async function getData() {
    const result = await militaryFamilyMembersRepository.findAll();
    console.log("militar Familiar", result);
  }

  async function getData() {
    const result = await militaryFamilyMembersRepository.findAll();
    console.log("militar Familiar", result);
  }

  const saveMilitaryFamilyMembers = async (familiaresFuerzas, respondentId) => {
    try {
      // Itera sobre el array de familiares en fuerzas militares y guarda cada uno en la base de datos
      for (const familiar of familiaresFuerzas) {
        await militaryFamilyMembersRepository.create({
          respondentId,
          familyTypeInMilitary: familiar.tipoFamiliar,
          familyNameInMilitary: familiar.nombre,
          familyAgeInMilitary: familiar.edad,
          familyProfessionInMilitary: familiar.profesion,
          timeInMilitary: familiar.tiempo,
          familyRank: familiar.rango,
          familyUnit: familiar.unidad,
          familyServiceLocation: familiar.lugarServicio,
        });
      }
      console.log(
        "Todos los familiares militares han sido guardados exitosamente."
      );
    } catch (error) {
      console.error(
        "Error al guardar los familiares militares:",
        error.message
      );
    }
  };
  const getSecurityQuestionsFields = () => ({
    respondentId,
    reasonForCapture: razonCaptura,
    capturedBy: quienCaptura,
    captureDate: cuandoCaptura,
    captureLocation: dondeCaptura,
    prisonName: carcel,
    prisonDuration: tiempoCaptura,
    releaseMethod: comoSalio,

    militaryServiceStart: cuandoServicio,
    militaryServiceLocation: dondeServicio,
    militaryServiceEnd: comoSalioServicio,

    otherOrganization: cuálOrganización,
    otherOrganizationDuration: cuantoTiempoOrganización,
    reasonForLeavingOrganization: motivoRetiroOrganización,
    hasMilitaryFriends: amigosFuerzasMilitares,
  });

  const handleSubmit = async () => {
    await saveMilitaryFamilyMembers(familiaresFuerzas, respondentId);

    // await securityQuestionsRepository.create({
    //   respondentId,
    //   reasonForCapture: razonCaptura,
    //   capturedBy: quienCaptura,
    //   captureDate: cuandoCaptura,
    //   captureLocation: dondeCaptura,
    //   prisonName: carcel,
    //   prisonDuration: tiempoCaptura,
    //   releaseMethod: comoSalio,

    //   militaryServiceStart: cuandoServicio,
    //   militaryServiceLocation: dondeServicio,
    //   militaryServiceEnd: comoSalioServicio,

    //   otherOrganization: cuálOrganización,
    //   otherOrganizationDuration: cuantoTiempoOrganización,
    //   reasonForLeavingOrganization: motivoRetiroOrganización,
    //   hasMilitaryFriends: amigosFuerzasMilitares,
    // });
    const securityQuestion =
      await securityQuestionsRepository.findByRespondentId(respondentId);
    if (securityQuestion) {
      // Actualizar los datos de la madre
      await securityQuestionsRepository.update({
        ...getSecurityQuestionsFields(),
        id: securityQuestion.id,
      });
      if (!securityQuestion) {
        console.error("No se pudo actualizar la securityQuestion.");
        return;
      }
      console.log("securityQuestion actualizado correctamente.");
      navigation.navigate("OtrasPreguntas", { respondentId });
    } else {
      await securityQuestionsRepository.create(getSecurityQuestionsFields());
    }

    navigation.navigate("OtrasPreguntas", { respondentId });
  };

  const setSecurityQuestionsFields = async (securityQuestions) => {
    setRazonCaptura(securityQuestions.reasonForCapture);
    setQuienCaptura(securityQuestions.capturedBy);
    setCuandoCaptura(securityQuestions.captureDate);
    setDondeCaptura(securityQuestions.captureLocation);
    setCarcel(securityQuestions.prisonName);
    setTiempoCaptura(securityQuestions.prisonDuration);
    setComoSalio(securityQuestions.releaseMethod);

    // Configurar campos de "Servicio militar"
    setCuandoServicio(securityQuestions.militaryServiceStart);
    setDondeServicio(securityQuestions.militaryServiceLocation);
    setComoSalioServicio(securityQuestions.militaryServiceEnd);

    // Configurar campos de "Otras organizaciones"
    setCuálOrganización(securityQuestions.otherOrganization);
    setCuantoTiempoOrganización(securityQuestions.otherOrganizationDuration);
    setMotivoRetiroOrganización(securityQuestions.reasonForLeavingOrganization);
    setAmigosFuerzasMilitares(securityQuestions.hasMilitaryFriends);
  };
  const loadSecurityQuestionsData = async (respondentId) => {
    if (!respondentId) return;

    const securityQuestions =
      await securityQuestionsRepository.findByRespondentId(respondentId);
    if (securityQuestions) {
      setSecurityQuestionsFields(securityQuestions);
    }
  };
  React.useEffect(() => {
    loadSecurityQuestionsData(respondentId);
  }, [respondentId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>¿Ha sido capturado?</Text>

      <Text style={styles.label}>¿Por qué?</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        numberOfLines={5}
        value={razonCaptura}
        onChangeText={setRazonCaptura}
        placeholder="¿Por qué?"
      />

      <Text style={styles.label}>¿Por quién?</Text>
      <TextInput
        style={styles.input}
        value={quienCaptura}
        onChangeText={setQuienCaptura}
        placeholder="¿Por quién?"
      />

      <Text style={styles.label}>¿Cuándo?</Text>
      <TextInput
        style={styles.input}
        value={cuandoCaptura}
        onChangeText={setCuandoCaptura}
        placeholder="¿Cuándo?"
      />

      <Text style={styles.label}>¿Dónde?</Text>
      <TextInput
        style={styles.input}
        value={dondeCaptura}
        onChangeText={setDondeCaptura}
        placeholder="¿Dónde?"
      />

      <Text style={styles.label}>¿En qué cárcel estuvo?</Text>
      <TextInput
        style={styles.input}
        value={carcel}
        onChangeText={setCarcel}
        placeholder="¿En que cárcel estuvo?"
      />

      <Text style={styles.label}>¿Por cuánto tiempo?</Text>
      <TextInput
        style={styles.input}
        value={tiempoCaptura}
        onChangeText={setTiempoCaptura}
        placeholder="¿Por Cuánto Tiempo?"
      />

      <Text style={styles.label}>¿Cómo salió?</Text>
      <TextInput
        style={styles.input}
        value={comoSalio}
        onChangeText={setComoSalio}
        placeholder="¿Cómo salió?"
      />
      <Text style={styles.header}>Servicio militar</Text>
      <TextInput
        style={styles.input}
        placeholder="¿Cuándo?"
        value={cuandoServicio}
        onChangeText={setCuandoServicio}
      />
      <TextInput
        style={styles.input}
        placeholder="¿Dónde?"
        value={dondeServicio}
        onChangeText={setDondeServicio}
      />
      <TextInput
        style={styles.input}
        placeholder="¿Cómo salió?"
        value={comoSalioServicio}
        onChangeText={setComoSalioServicio}
      />

      <Text style={styles.header}>Otras organizaciones</Text>
      <TextInput
        style={styles.input}
        placeholder="¿Cuál?"
        value={cuálOrganización}
        onChangeText={setCuálOrganización}
      />
      <TextInput
        style={styles.input}
        placeholder="¿Cuánto tiempo?"
        value={cuantoTiempoOrganización}
        onChangeText={setCuantoTiempoOrganización}
      />
      <TextInput
        style={styles.input}
        placeholder="¿Motivo de retiro?"
        value={motivoRetiroOrganización}
        onChangeText={setMotivoRetiroOrganización}
      />
      <Text style={styles.header}>Familiares en las Fuerzas</Text>
      <Text style={styles.label}>Tiene amigos en las Fuerzas Militares:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tiene amigos en las fuerzas militares"
        value={amigosFuerzasMilitares}
        onChangeText={setAmigosFuerzasMilitares}
      />
      {familiaresFuerzas.map((familiar, index) => (
        <View key={index} style={styles.familiarContainer}>
          <Text style={styles.label}>Tipo de Familiar:</Text>
          <TextInput
            style={styles.input}
            value={familiar.tipoFamiliar}
            onChangeText={(valor) =>
              actualizarFamiliarFuerzas(index, "tipoFamiliar", valor)
            }
          />

          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={familiar.nombre}
            onChangeText={(valor) =>
              actualizarFamiliarFuerzas(index, "nombre", valor)
            }
          />

          <Text style={styles.label}>Edad:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={familiar.edad}
            onChangeText={(valor) =>
              actualizarFamiliarFuerzas(index, "edad", valor)
            }
          />

          <Text style={styles.label}>Profesión:</Text>
          <TextInput
            style={styles.input}
            value={familiar.profesion}
            onChangeText={(valor) =>
              actualizarFamiliarFuerzas(index, "profesion", valor)
            }
          />

          <Text style={styles.label}>Tiempo:</Text>
          <TextInput
            style={styles.input}
            value={familiar.tiempo}
            onChangeText={(valor) =>
              actualizarFamiliarFuerzas(index, "tiempo", valor)
            }
          />

          <Text style={styles.label}>Rango:</Text>
          <TextInput
            style={styles.input}
            value={familiar.rango}
            onChangeText={(valor) =>
              actualizarFamiliarFuerzas(index, "rango", valor)
            }
          />

          <Text style={styles.label}>Unidad:</Text>
          <TextInput
            style={styles.input}
            value={familiar.unidad}
            onChangeText={(valor) =>
              actualizarFamiliarFuerzas(index, "unidad", valor)
            }
          />

          <Text style={styles.label}>Lugar de Servicio:</Text>
          <TextInput
            style={styles.input}
            value={familiar.lugarServicio}
            onChangeText={(valor) =>
              actualizarFamiliarFuerzas(index, "lugarServicio", valor)
            }
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarFamiliarFuerzas(index)}
          >
            <Text style={styles.deleteButtonText}>Eliminar Familiar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={agregarFamiliarFuerzas}
      >
        <Text style={styles.addButtonText}>Agregar Familiar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        // onPress={() => navigation.navigate("OtrasPreguntas")}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PreguntasSeguridadScreen;
