import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../styles/datosInternosStyle";
import { EducationRepository } from "../repositories/EducationRepository";
import { ActionRepository } from "../repositories/ActionRepository";
import { SpecialtiesRepository } from "../repositories/SpecialtiesRepository";
import { SanctionsRepository } from "../repositories/SanctionsRepository";
import { NonMilitaryFamilyMembersRepository } from "../repositories/NonMilitaryFamilyMembersRepository";
import { GeneralQuestionsRepository } from "../repositories/GeneralQuestionsRepository";
import { PropertiesRepository } from "../repositories/PropertiesRepository";
import { useSQLiteContext } from "expo-sqlite/next";

const DatosInternosScreen = ({ route, navigation }) => {
  const respondentId = route.params?.respondentId;

  const db = useSQLiteContext();

  // Estado para manejar las respuestas de preguntas generales
  const [aspiraciones, setAspiraciones] = useState("");
  const [sentimientos, setSentimientos] = useState("");
  const [preferenciaCivil, setPreferenciaCivil] = useState("");
  const [extrañaCivil, setExtrañaCivil] = useState("");
  const [desempeño, setDesempeño] = useState("");
  const [gustos, setGustos] = useState("");
  const [problemaPrincipal, setProblemaPrincipal] = useState("");
  const [exitoPrincipal, setExitoPrincipal] = useState("");
  const [fracasoPrincipal, setFracasoPrincipal] = useState("");
  const [preparacionLisiado, setPreparacionLisiado] = useState("");
  const [preparacionCapturado, setPreparacionCapturado] = useState("");
  const [senalesDefectos, setSenalesDefectos] = useState("");
  const [enfermedadesSexuales, setEnfermedadesSexuales] = useState("");
  const [tratamientoETS, setTratamientoETS] = useState("");
  const [enfermedadesActuales, setEnfermedadesActuales] = useState("");
  const [operaciones, setOperaciones] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const educationRepository = new EducationRepository(db);
  const actionRepository = new ActionRepository(db);
  const sanctionsRepository = new SanctionsRepository(db);
  const nonMilitaryFamilyMembersRepository =
    new NonMilitaryFamilyMembersRepository(db);
  const propertiesRepository = new PropertiesRepository(db);
  const generalQuestionsRepository = new GeneralQuestionsRepository(db);
  const specialtiesRepository = new SpecialtiesRepository(db);
  const [formaciones, setFormaciones] = useState([]);
  // Estado para manejar las propiedades
  const [propiedades, setPropiedades] = useState([]);

  const agregarFormacion = () => {
    setFormaciones([
      ...formaciones,
      {
        id: null,
        tipoFormacion: "",
        tiempoFormacion: "",
        anoRealizacion: "",
        estructura: "",
      },
    ]);
  };

  const eliminarFormacion = async (index) => {
    const formacion = formaciones[index];
    const education = await educationRepository.findById(formacion.id);
    if (education) {
      await educationRepository.delete(education.id);
    }
    setFormaciones(formaciones.filter((_, i) => i !== index));
  };

  const actualizarFormacion = (index, field, value) => {
    const updateFormaciones = [...formaciones];
    updateFormaciones[index][field] = value;
    setFormaciones(updateFormaciones);
  };

  const [acciones, setAcciones] = useState([]);

  const agregarAccion = () => {
    setAcciones([
      ...acciones,
      {
        id: null,
        tipoAccion: "",
        mandoEncargado: "",
        anoRealizacion: "",
        estructura: "",
      },
    ]);
  };

  const eliminarAccion = async (index) => {
    const accion = acciones[index];
    const action = await actionRepository.findById(accion.id);
    if (action) {
      await actionRepository.delete(action.id);
    }
    setAcciones(acciones.filter((_, i) => i !== index));
  };

  const actualizarAccion = (index, field, value) => {
    const updateAcciones = [...acciones];
    updateAcciones[index][field] = value;
    setAcciones(updateAcciones);
  };

  // Estado para manejar las especialidades
  const [especialidades, setEspecialidades] = useState([]);

  // Función para agregar una especialidad
  const agregarEspecialidad = () => {
    setEspecialidades([
      ...especialidades,
      { id: null, tipoEspecialidad: "", tiempoDesempenado: "", estructura: "" },
    ]);
  };

  // Función para eliminar una especialidad
  const eliminarEspecialidad = async (index) => {
    const especialidad = especialidades[index];
    const specialty = await specialtiesRepository.findById(especialidad.id);
    if (specialty) {
      await specialtiesRepository.delete(specialty.id);
    }
    setEspecialidades(especialidades.filter((_, i) => i !== index));
  };

  // Función para actualizar una especialidad
  const actualizarEspecialidad = (index, field, value) => {
    const updateEspecialidades = [...especialidades];
    updateEspecialidades[index][field] = value;
    setEspecialidades(updateEspecialidades);
  };

  // Estado para manejar las sanciones
  const [sanciones, setSanciones] = useState([]);

  // Función para agregar una sanción
  const agregarSancion = () => {
    setSanciones([
      ...sanciones,
      {
        id: null,
        razon: "",
        quienSanciono: "",
        tipo: "",
        cuando: "",
        tiempo: "",
        estructura: "",
      },
    ]);
  };

  // Función para eliminar una sanción
  const eliminarSancion = async (index) => {
    const sancion = sanciones[index]; // Asume que 'sanciones' es tu array de sanciones
    const sanction = await sanctionsRepository.findById(sancion.id);
    if (sanction) {
      await sanctionsRepository.delete(sanction.id);
    }
    setSanciones(sanciones.filter((_, i) => i !== index));
  };

  // Función para actualizar una sanción
  const actualizarSancion = (index, field, value) => {
    const updatedSanciones = [...sanciones]; // Copia el array de sanciones
    updatedSanciones[index][field] = value; // Actualiza el campo especificado con el nuevo valor
    setSanciones(updatedSanciones); // Actualiza el estado con las sanciones modificadas
  };

  const [familiaresPertenecientes, setFamiliaresPertenecientes] = useState([]);

  // Función para agregar un familiar
  const agregarFamiliar = () => {
    setFamiliaresPertenecientes([
      ...familiaresPertenecientes,
      {
        id: null,
        tipo: "",
        nombre: "",
        edad: "",
        rango: "",
        estructura: "",
        tiempo: "",
        estado: "",
      },
    ]);
  };

  // Función para eliminar un familiar
  const eliminarFamiliarPerteneciente = async (index) => {
    const familiar = familiaresPertenecientes[index];
    const familiarPerteneciente =
      await nonMilitaryFamilyMembersRepository.findById(familiar.id);
    if (familiarPerteneciente) {
      await nonMilitaryFamilyMembersRepository.delete(familiarPerteneciente.id);
    }
    setFamiliaresPertenecientes(
      familiaresPertenecientes.filter((_, i) => i !== index)
    );
  };

  // Función para actualizar un familiar
  const actualizarFamiliarPerteneciente = (index, field, value) => {
    const updatedFamiliaresPertenecientes = [...familiaresPertenecientes];
    updatedFamiliaresPertenecientes[index][field] = value;
    setFamiliaresPertenecientes(updatedFamiliaresPertenecientes);
  };

  // Función para agregar una propiedad
  const agregarPropiedad = () => {
    setPropiedades([...propiedades, { id: null, ubicacion: "" }]);
  };

  // Función para eliminar una propiedad
  const eliminarPropiedad = async (index) => {
    const propiedad = propiedades[index];
    const propiedadExistente = await propertiesRepository.findById(
      propiedad.id
    );
    if (propiedadExistente) {
      await propertiesRepository.delete(propiedadExistente.id);
    }
    setPropiedades(propiedades.filter((_, i) => i !== index));
  };

  // Función para actualizar una propiedad
  const actualizarPropiedad = (index, field, value) => {
    const updatedPropiedades = [...propiedades];
    updatedPropiedades[index][field] = value;
    setPropiedades(updatedPropiedades);
  };

  // const securityQuestionsRepository = new SecurityQuestionsRepository(db);

  const saveFormaciones = async (formaciones, respondentId) => {
    try {
      for (const formacion of formaciones) {
        const formacionEntity = await educationRepository.findById(
          formacion.id
        );

        if (formacionEntity) {
          console.log("Actualizando educacion:", formacionEntity);
          await educationRepository.update({
            id: formacion.id,
            trainingType: formacion.tipoFormacion,
            trainingDuration: formacion.tiempoFormacion,
            yearOfCompletion: formacion.anoRealizacion,
            structure: formacion.estructura,
          });
        } else {
          // create
          await educationRepository.create({
            respondentId,
            trainingType: formacion.tipoFormacion,
            trainingDuration: formacion.tiempoFormacion,
            yearOfCompletion: formacion.anoRealizacion,
            structure: formacion.estructura,
          });
        }
      }
      console.log("Todas las formaciones han sido guardadas exitosamente.");
    } catch (error) {
      console.error("Error al guardar las formaciones:", error.message);
    }
  };

  const saveAcciones = async (acciones, respondentId) => {
    try {
      // Itera sobre el array de hermanos y guarda cada uno en la base de datos
      for (const accion of acciones) {
        const accionEntity = await actionRepository.findById(accion.id);

        if (accionEntity) {
          console.log("Actualizando accion:", accionEntity);
          await actionRepository.update({
            id: accion.id,
            actionType: accion.tipoAccion,
            commandingOfficer: accion.mandoEncargado,
            yearOfCompletion: accion.anoRealizacion,
            structure: accion.estructura,
          });
        } else {
          // create
          await actionRepository.create({
            respondentId,
            actionType: accion.tipoAccion,
            commandingOfficer: accion.mandoEncargado,
            yearOfCompletion: accion.anoRealizacion,
            structure: accion.estructura,
          });
        }
      }
      console.log("Todos los accion han sido guardados exitosamente.");
    } catch (error) {
      console.error("Error al guardar los accion:", error.message);
    }
  };

  const saveSpecialties = async (especialidades, respondentId) => {
    try {
      // Itera sobre el array de hermanos y guarda cada uno en la base de datos
      for (const especialidad of especialidades) {
        const especialdiadEntity = await specialtiesRepository.findById(
          especialidad.id
        );
        if (especialdiadEntity) {
          console.log("Actualizando especialidad:", especialdiadEntity);
          await specialtiesRepository.update({
            id: especialidad.id,
            specialtyType: especialidad.tipoEspecialidad,
            duration: especialidad.tiempoDesempenado,
            structure: especialidad.estructura,
          });
        } else {
          // create
          await specialtiesRepository.create({
            respondentId,
            specialtyType: especialidad.tipoEspecialidad,
            duration: especialidad.tiempoDesempenado,
            structure: especialidad.estructura,
          });
        }
      }
      console.log("Todos los especialidad han sido guardados exitosamente.");
    } catch (error) {
      console.error("Error al guardar los especialidad:", error.message);
    }
  };
  const saveSanciones = async (sanciones, respondentId) => {
    try {
      // Itera sobre el array de sanciones y guarda cada una en la base de datos
      for (const sancion of sanciones) {
        const sancionEntity = await sanctionsRepository.findById(sancion.id);
        if (sancionEntity) {
          console.log("Actualizando sanción:", sancionEntity);
          await sanctionsRepository.update({
            id: sancion.id,
            reason: sancion.razon,
            sanctionedBy: sancion.quienSanciono,
            sanctionType: sancion.tipo,
            date: sancion.cuando,
            sanctionDuration: sancion.tiempo,
            structure: sancion.estructura,
          });
        } else {
          // create
          await sanctionsRepository.create({
            respondentId,
            reason: sancion.razon,
            sanctionedBy: sancion.quienSanciono,
            sanctionType: sancion.tipo,
            date: sancion.cuando,
            sanctionDuration: sancion.tiempo,
            structure: sancion.estructura,
          });
        }
      }
      console.log("Todas las sanciones han sido guardadas exitosamente.");
    } catch (error) {
      console.error("Error al guardar las sanciones:", error.message);
    }
  };

  const saveFamiliaresPertenecientes = async (
    familiaresPertenecientes,
    respondentId
  ) => {
    try {
      // Itera sobre el array de familiares pertenecientes y guarda cada uno en la base de datos
      for (const familiar of familiaresPertenecientes) {
        const familiarEntity =
          await nonMilitaryFamilyMembersRepository.findById(familiar.id);

        if (familiarEntity) {
          console.log("Actualizando familiar perteneciente:", familiarEntity);
          await nonMilitaryFamilyMembersRepository.update({
            id: familiar.id,
            familyType: familiar.tipo,
            name: familiar.nombre,
            age: familiar.edad,
            rank: familiar.rango,
            structure: familiar.estructura,
            duration: familiar.tiempo,
            currentStatus: familiar.estado,
          });
        } else {
          // Crear
          await nonMilitaryFamilyMembersRepository.create({
            respondentId,
            familyType: familiar.tipo,
            name: familiar.nombre,
            age: familiar.edad,
            rank: familiar.rango,
            structure: familiar.estructura,
            duration: familiar.tiempo,
            currentStatus: familiar.estado,
          });
        }
      }
      console.log(
        "Todos los familiares pertenecientes han sido guardados exitosamente."
      );
    } catch (error) {
      console.error(
        "Error al guardar los familiares pertenecientes:",
        error.message
      );
    }
  };

  const savePropiedades = async (propiedades, respondentId) => {
    try {
      // Itera sobre el array de propiedades y guarda cada una en la base de datos
      for (const propiedad of propiedades) {
        const propiedadEntity = await propertiesRepository.findById(
          propiedad.id
        );

        if (propiedadEntity) {
          console.log("Actualizando propiedad:", propiedadEntity);
          await propertiesRepository.update({
            id: propiedad.id,
            location: propiedad.ubicacion,
          });
        } else {
          // create
          await propertiesRepository.create({
            respondentId,
            location: propiedad.ubicacion,
          });
        }
      }
      console.log("Todas las propiedades han sido guardadas exitosamente.");
    } catch (error) {
      console.error("Error al guardar las propiedades:", error.message);
    }
  };

  const getGeneralQuestionsFields = () => ({
    respondentId,
    aspirationIn5Years: aspiraciones,
    howHasFeeling: sentimientos,
    feelsBetterInCivil: preferenciaCivil,
    whatDoYouMissFromCivil: extrañaCivil,
    whatIsBestAt: desempeño,
    whatYouEnjoyMost: gustos,
    mainProblem: problemaPrincipal,
    mainSuccess: exitoPrincipal,
    mainFailure: fracasoPrincipal,
    preparedForDisability: preparacionLisiado,
    preparedForCapture: preparacionCapturado,
    physicalSignsOrDefects: senalesDefectos,
    STIs: enfermedadesSexuales,
    treatmentReceived: tratamientoETS,
    currentIllnesses: enfermedadesActuales,
    hadAnySurgeries: operaciones,
    observations: observaciones,
  });

  //boton enviar
  const handleSubmit = async () => {
    const generalQuestions =
      await generalQuestionsRepository.findByRespondentId(respondentId);
    if (generalQuestions) {
      // Actualizar los datos de la madre
      await generalQuestionsRepository.update({
        ...getGeneralQuestionsFields(),
        id: generalQuestions.id,
      });
      if (!generalQuestions) {
        console.error("No se pudo actualizar la preguntas generales.");
        return;
      }
      console.log("preguntas generales actualizado correctamente.");
      // navigation.navigate("PreguntasSeguridad", { respondentId });
    } else {
      await generalQuestionsRepository.create(getGeneralQuestionsFields());
    }
    await saveFormaciones(formaciones, respondentId);
    await saveAcciones(acciones, respondentId);
    await saveSpecialties(especialidades, respondentId);
    await saveSanciones(sanciones, respondentId);
    await saveFamiliaresPertenecientes(familiaresPertenecientes, respondentId);
    await savePropiedades(propiedades, respondentId);

    navigation.navigate("PreguntasSeguridad", { respondentId });
  };
  const setEducationFields = (education) => ({
    id: education.id,
    tipoFormacion: education.trainingType,
    tiempoFormacion: education.trainingDuration,
    anoRealizacion: education.yearOfCompletion,
    estructura: education.structure,
  });
  const setActionFields = (action) => ({
    id: action.id,
    tipoAccion: action.actionType,
    mandoEncargado: action.commandingOfficer,
    anoRealizacion: action.yearOfCompletion,
    estructura: action.structure,
  });
  const setSpecialtyFields = (specialty) => ({
    id: specialty.id,
    tipoEspecialidad: specialty.specialtyType,
    tiempoDesempenado: specialty.duration,
    estructura: specialty.structure,
  });
  const setSanctionFields = (sanction) => ({
    id: sanction.id,
    razon: sanction.reason,
    quienSanciono: sanction.sanctionedBy,
    tipo: sanction.sanctionType,
    cuando: sanction.date,
    tiempo: sanction.sanctionDuration,
    estructura: sanction.structure,
  });
  const setFamiliaresPertenecientesFields = (familiar) => ({
    id: familiar.id, // id
    tipo: familiar.familyType, // familyType
    nombre: familiar.name, // name
    edad: familiar.age, // age
    rango: familiar.rank, // rank
    estructura: familiar.structure, // structure
    tiempo: familiar.duration, // duration
    estado: familiar.currentStatus, // currentStatus
  });

  const setPropertyFields = (property) => ({
    id: property.id,
    ubicacion: property.location,
  });

  const setGeneralQuestionsFields = async (generalQuestions) => {
    setAspiraciones(generalQuestions.aspirationIn5Years);
    setSentimientos(generalQuestions.howHasFeeling);
    setPreferenciaCivil(generalQuestions.feelsBetterInCivil);
    setExtrañaCivil(generalQuestions.whatDoYouMissFromCivil);
    setDesempeño(generalQuestions.whatIsBestAt);
    setGustos(generalQuestions.whatYouEnjoyMost);
    setProblemaPrincipal(generalQuestions.mainProblem);
    setExitoPrincipal(generalQuestions.mainSuccess);
    setFracasoPrincipal(generalQuestions.mainFailure);
    setPreparacionLisiado(generalQuestions.preparedForDisability);
    setPreparacionCapturado(generalQuestions.preparedForCapture);
    setSenalesDefectos(generalQuestions.physicalSignsOrDefects);
    setEnfermedadesSexuales(generalQuestions.STIs);
    setTratamientoETS(generalQuestions.treatmentReceived);
    setEnfermedadesActuales(generalQuestions.currentIllnesses);
    setOperaciones(generalQuestions.hadAnySurgeries);
    setObservaciones(generalQuestions.observations);
  };

  const loadEducationData = async (respondentId) => {
    if (!respondentId) return;

    const educations = await educationRepository.findByRespondentId(
      respondentId
    );
    if (!educations.length) {
      return;
    }
    setFormaciones(educations.map(setEducationFields));
  };
  const loadSanctionData = async (respondentId) => {
    if (!respondentId) return;

    const sanctions = await sanctionsRepository.findByRespondentId(
      respondentId
    );
    if (!sanctions.length) {
      return;
    }
    setSanciones(sanctions.map(setSanctionFields));
  };

  const loadActionData = async (respondentId) => {
    if (!respondentId) return;

    const actions = await actionRepository.findByRespondentId(respondentId);
    if (!actions.length) {
      return;
    }
    setAcciones(actions.map(setActionFields));
  };
  const loadGeneralQuestionsData = async (respondentId) => {
    if (!respondentId) return;

    const generalQuestions =
      await generalQuestionsRepository.findByRespondentId(respondentId);
    if (generalQuestions) {
      setGeneralQuestionsFields(generalQuestions);
    }
  };
  const loadSpecialtyData = async (respondentId) => {
    if (!respondentId) return;

    const specialties = await specialtiesRepository.findByRespondentId(
      respondentId
    );
    if (!specialties.length) {
      return;
    }
    setEspecialidades(specialties.map(setSpecialtyFields));
  };
  const loadFamiliaresPertenecientesData = async (respondentId) => {
    if (!respondentId) return;

    const familiaresPertenecientes =
      await nonMilitaryFamilyMembersRepository.findByRespondentId(respondentId);
    if (!familiaresPertenecientes.length) {
      return;
    }
    setFamiliaresPertenecientes(
      familiaresPertenecientes.map(setFamiliaresPertenecientesFields)
    );
  };
  const loadPropertyData = async (respondentId) => {
    if (!respondentId) return;

    const properties = await propertiesRepository.findByRespondentId(
      respondentId
    );
    if (!properties.length) {
      return;
    }
    setPropiedades(properties.map(setPropertyFields));
  };

  React.useEffect(() => {
    loadGeneralQuestionsData(respondentId);
    loadEducationData(respondentId);
    loadActionData(respondentId);
    loadSpecialtyData(respondentId);
    loadSanctionData(respondentId);
    loadFamiliaresPertenecientesData(respondentId);
    loadPropertyData(respondentId);
  }, [respondentId]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>
        Formación en escuelas o talleres de la organización
      </Text>

      {formaciones.map((formacion, index) => (
        <View key={index} style={styles.formacionContainer}>
          <Text style={styles.label}>Tipo de Formación:</Text>
          <TextInput
            style={styles.input}
            value={formacion.tipoFormacion}
            onChangeText={(value) =>
              actualizarFormacion(index, "tipoFormacion", value)
            }
            placeholder="Tipo de Formación"
          />

          <Text style={styles.label}>Tiempo de Formación:</Text>
          <TextInput
            style={styles.input}
            value={formacion.tiempoFormacion}
            onChangeText={(value) =>
              actualizarFormacion(index, "tiempoFormacion", value)
            }
            placeholder="Tiempo de Formación"
          />

          <Text style={styles.label}>Año de Realización:</Text>
          <TextInput
            style={styles.input}
            value={formacion.anoRealizacion}
            onChangeText={(value) =>
              actualizarFormacion(index, "anoRealizacion", value)
            }
            placeholder="Año de Realización"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={formacion.estructura}
            onChangeText={(value) =>
              actualizarFormacion(index, "estructura", value)
            }
            placeholder="Estructura"
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarFormacion(index)}
          >
            <Text style={styles.deleteButtonText}>Eliminar Formación</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={agregarFormacion}>
        <Text style={styles.addButtonText}>Agregar Formación</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Acciones en que ha participado</Text>

      {acciones.map((accion, index) => (
        <View key={index} style={styles.formacionContainer}>
          <Text style={styles.label}>Tipo de Acción:</Text>
          <TextInput
            style={styles.input}
            value={accion.tipoAccion}
            onChangeText={(valor) =>
              actualizarAccion(index, "tipoAccion", valor)
            }
            placeholder="Tipo de Acción"
          />

          <Text style={styles.label}>Mando Encargado:</Text>
          <TextInput
            style={styles.input}
            value={accion.mandoEncargado}
            onChangeText={(valor) =>
              actualizarAccion(index, "mandoEncargado", valor)
            }
            placeholder="Mando Encargado"
          />

          <Text style={styles.label}>Año de Realización:</Text>
          <TextInput
            style={styles.input}
            value={accion.anoRealizacion}
            onChangeText={(valor) =>
              actualizarAccion(index, "anoRealizacion", valor)
            }
            placeholder="Año de Realización"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={accion.estructura}
            onChangeText={(valor) =>
              actualizarAccion(index, "estructura", valor)
            }
            placeholder="Estructura"
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarAccion(index)}
          >
            <Text style={styles.deleteButtonText}>Eliminar Acción</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={agregarAccion}>
        <Text style={styles.addButtonText}>Agregar Acción</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Especialidades</Text>

      {especialidades.map((especialidad, index) => (
        <View key={index} style={styles.formacionContainer}>
          <Text style={styles.label}>Tipo de Especialidad:</Text>
          <TextInput
            style={styles.input}
            value={especialidad.tipoEspecialidad}
            onChangeText={(valor) =>
              actualizarEspecialidad(index, "tipoEspecialidad", valor)
            }
            placeholder="Tipo de Especialidad"
          />

          <Text style={styles.label}>Tiempo Desempeñado:</Text>
          <TextInput
            style={styles.input}
            value={especialidad.tiempoDesempenado}
            onChangeText={(valor) =>
              actualizarEspecialidad(index, "tiempoDesempenado", valor)
            }
            placeholder="Tiempo Desempeñado"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={especialidad.estructura}
            onChangeText={(valor) =>
              actualizarEspecialidad(index, "estructura", valor)
            }
            placeholder="Estructura"
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarEspecialidad(index)}
          >
            <Text style={styles.deleteButtonText}>Eliminar Especialidad</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={agregarEspecialidad}>
        <Text style={styles.addButtonText}>Agregar Especialidad</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Sanciones</Text>

      {sanciones.map((sancion, index) => (
        <View key={index} style={styles.formacionContainer}>
          <Text style={styles.label}>Razón de la Sanción:</Text>
          <TextInput
            style={styles.input}
            value={sancion.razon}
            onChangeText={(valor) => actualizarSancion(index, "razon", valor)}
            placeholder="Razón de la Sanción"
          />

          <Text style={styles.label}>¿Quién lo Sancionó?:</Text>
          <TextInput
            style={styles.input}
            value={sancion.quienSanciono}
            onChangeText={(valor) =>
              actualizarSancion(index, "quienSanciono", valor)
            }
            placeholder="¿Quién lo Sancionó?"
          />

          <Text style={styles.label}>Tipo de Sanción:</Text>
          <TextInput
            style={styles.input}
            value={sancion.tipo}
            onChangeText={(valor) => actualizarSancion(index, "tipo", valor)}
            placeholder="Tipo de sanción"
          />

          <Text style={styles.label}>¿Cuándo?:</Text>
          <TextInput
            style={styles.input}
            value={sancion.cuando}
            onChangeText={(valor) => actualizarSancion(index, "cuando", valor)}
            placeholder="¿Cuándo?"
          />

          <Text style={styles.label}>Tiempo de Sanción:</Text>
          <TextInput
            style={styles.input}
            value={sancion.tiempo}
            onChangeText={(valor) => actualizarSancion(index, "tiempo", valor)}
            placeholder="Tiempo de Sanción"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={sancion.estructura}
            onChangeText={(valor) =>
              actualizarSancion(index, "estructura", valor)
            }
            placeholder="Estructura"
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarSancion(index)}
          >
            <Text style={styles.deleteButtonText}>Eliminar Sanción</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={agregarSancion}>
        <Text style={styles.addButtonText}>Agregar Sanción</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Familiares Pertenecientes</Text>

      {familiaresPertenecientes.map((familiar, index) => (
        <View key={index} style={styles.formacionContainer}>
          <Text style={styles.label}>Tipo de Familiar:</Text>
          <TextInput
            style={styles.input}
            value={familiar.tipo}
            onChangeText={(valor) =>
              actualizarFamiliarPerteneciente(index, "tipo", valor)
            }
            placeholder="Tipo de Familiar"
          />

          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={familiar.nombre}
            onChangeText={(valor) =>
              actualizarFamiliarPerteneciente(index, "nombre", valor)
            }
            placeholder="Nombre"
          />

          <Text style={styles.label}>Edad:</Text>
          <TextInput
            style={styles.input}
            value={familiar.edad}
            onChangeText={(valor) =>
              actualizarFamiliarPerteneciente(index, "edad", valor)
            }
            placeholder="Edad"
          />

          <Text style={styles.label}>Rango:</Text>
          <TextInput
            style={styles.input}
            value={familiar.rango}
            onChangeText={(valor) =>
              actualizarFamiliarPerteneciente(index, "rango", valor)
            }
            placeholder="Rango"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={familiar.estructura}
            onChangeText={(valor) =>
              actualizarFamiliarPerteneciente(index, "estructura", valor)
            }
            placeholder="Estructura"
          />

          <Text style={styles.label}>¿Que tiempo lleva?:</Text>
          <TextInput
            style={styles.input}
            value={familiar.tiempo}
            onChangeText={(valor) =>
              actualizarFamiliarPerteneciente(index, "tiempo", valor)
            }
            placeholder="¿Qué tiempo lleva?"
          />

          <Text style={styles.label}>Estado Actual:</Text>
          <TextInput
            style={styles.input}
            value={familiar.estado}
            onChangeText={(valor) =>
              actualizarFamiliarPerteneciente(index, "estado", valor)
            }
            placeholder="Estado Actual"
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarFamiliarPerteneciente(index)}
          >
            <Text style={styles.deleteButtonText}>Eliminar Familiar</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={agregarFamiliar}>
        <Text style={styles.addButtonText}>Agregar Familiar</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Propiedades</Text>

      {propiedades.map((propiedad, index) => (
        <View key={index} style={styles.formacionContainer}>
          <Text style={styles.label}>¿Dónde se ubica?:</Text>
          <TextInput
            style={styles.input}
            value={propiedad.ubicacion}
            onChangeText={(valor) =>
              actualizarPropiedad(index, "ubicacion", valor)
            }
            placeholder="¿Dónde se Ubica?"
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarPropiedad(index)}
          >
            <Text style={styles.deleteButtonText}>Eliminar Propiedad</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={agregarPropiedad}>
        <Text style={styles.addButtonText}>Agregar Propiedad</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Preguntas Generales</Text>

      <Text style={styles.label}>¿Qué aspiras a ser en 5 años?</Text>
      <TextInput
        style={styles.input}
        value={aspiraciones}
        onChangeText={setAspiraciones}
        placeholder="¿Qué aspiras a ser en 5 años?"
      />

      <Text style={styles.label}>¿Cómo se ha sentido hasta el momento?</Text>
      <TextInput
        style={styles.input}
        value={sentimientos}
        onChangeText={setSentimientos}
        placeholder="¿Cómo se ha sentido hasta el momento?"
      />

      <Text style={styles.label}>
        ¿Se siente mejor en la civil o en la otra?
      </Text>
      <TextInput
        style={styles.input}
        value={preferenciaCivil}
        onChangeText={setPreferenciaCivil}
        placeholder="¿Se siente mejor en la civil o en la otra?"
      />

      <Text style={styles.label}>¿Qué cosas extraña de la civil?</Text>
      <TextInput
        style={styles.input}
        value={extrañaCivil}
        onChangeText={setExtrañaCivil}
        placeholder="¿Qué cosas extraña de la civil?"
      />

      <Text style={styles.label}>¿En qué se desempeña mejor?</Text>
      <TextInput
        style={styles.input}
        value={desempeño}
        onChangeText={setDesempeño}
        placeholder="¿En qué se desempeña mejor?"
      />

      <Text style={styles.label}>¿Qué es lo que más le gusta hacer?</Text>
      <TextInput
        style={styles.input}
        value={gustos}
        onChangeText={setGustos}
        placeholder="¿Qué es lo que mas le gusta hacer?"
      />

      <Text style={styles.label}>¿Cuál ha sido su principal problema?</Text>
      <TextInput
        style={styles.input}
        value={problemaPrincipal}
        onChangeText={setProblemaPrincipal}
        placeholder="¿Cuál ha sido su principal problema?"
      />

      <Text style={styles.label}>¿Cuál ha sido su principal éxito?</Text>
      <TextInput
        style={styles.input}
        value={exitoPrincipal}
        onChangeText={setExitoPrincipal}
        placeholder="¿Cuál ha sido su principal éxito?"
      />

      <Text style={styles.label}>¿Cuál ha sido su principal fracaso?</Text>
      <TextInput
        style={styles.input}
        value={fracasoPrincipal}
        onChangeText={setFracasoPrincipal}
        placeholder="¿Cuál ha sido su principal fracaso?"
      />

      <Text style={styles.label}>¿Está preparado para quedar lisiado?</Text>
      <TextInput
        style={styles.input}
        value={preparacionLisiado}
        onChangeText={setPreparacionLisiado}
        placeholder="¿Está preparado para quedar lisiado?"
      />

      <Text style={styles.label}>¿Está preparado para ser capturado?</Text>
      <TextInput
        style={styles.input}
        value={preparacionCapturado}
        onChangeText={setPreparacionCapturado}
        placeholder="Está preparado para ser capturado?"
      />

      <Text style={styles.label}>Señales o defectos físicos</Text>
      <TextInput
        style={styles.input}
        value={senalesDefectos}
        onChangeText={setSenalesDefectos}
        placeholder="Señales o defectos físicos"
      />

      <Text style={styles.label}>
        ¿Qué ETS (Enfermedades de transmisión sexual) ha tenido?
      </Text>
      <TextInput
        style={styles.input}
        value={enfermedadesSexuales}
        onChangeText={setEnfermedadesSexuales}
        placeholder="¿Qué ETS ha tenido?"
      />

      <Text style={styles.label}>Tratamiento realizado</Text>
      <TextInput
        style={styles.input}
        value={tratamientoETS}
        onChangeText={setTratamientoETS}
        placeholder="Tratamiento realizado"
      />

      <Text style={styles.label}>¿Qué enfermedades padece actualmente?</Text>
      <TextInput
        style={styles.input}
        value={enfermedadesActuales}
        onChangeText={setEnfermedadesActuales}
        placeholder="¿Qué enfermedades padece actualmente"
      />

      <Text style={styles.label}>¿Ha sido operado de algo?</Text>
      <TextInput
        style={styles.input}
        value={operaciones}
        onChangeText={setOperaciones}
        placeholder="¿Ha sido operado de algo?"
      />

      <Text style={styles.label}>Observaciones</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        numberOfLines={5}
        value={observaciones}
        onChangeText={setObservaciones}
        placeholder="Observaciones"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        // onPress={() => navigation.navigate('PreguntasSeguridad')}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DatosInternosScreen;
