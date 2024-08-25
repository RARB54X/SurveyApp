import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Para el selector de nivel de estudios
import { datosFamiliaresStyles } from "../styles/datosFamiliaresStyles"; // Asegúrate de tener este archivo
import { useSQLiteContext } from "expo-sqlite/next";
import { MotherRepository } from "../repositories/MotherRepository";
import { FatherRepository } from "../repositories/FatherRepository";
import { SiblingsRepository } from "../repositories/SiblingsRepository";
import { SpouseRepository } from "../repositories/SpouseRepository";
import { ChildrenRepository } from "../repositories/ChildrenRepository";

const DatosFamiliaresScreen = ({ route, navigation }) => {
  const respondentId = route.params?.respondentId;

  const db = useSQLiteContext();

  //estado para la madre
  const [nombreMadre, setNombreMadre] = useState("");
  const [edadMadre, setEdadMadre] = useState("");
  const [ocupacionMadre, setOcupacionMadre] = useState("");
  const [nivelEstudioMadre, setNivelEstudioMadre] = useState("");
  const [residenciaMadre, setResidenciaMadre] = useState("");
  const [direccionActualMadre, setDireccionActualMadre] = useState("");
  const [telefonoMadre, setTelefonoMadre] = useState("");
  const [conyugueMadre, setConyugueMadre] = useState("");

  // Estado para el padre
  const [nombrePadre, setNombrePadre] = useState("");
  const [edadPadre, setEdadPadre] = useState("");
  const [ocupacionPadre, setOcupacionPadre] = useState("");
  const [nivelEstudioPadre, setNivelEstudioPadre] = useState("");
  const [residenciaPadre, setResidenciaPadre] = useState("");
  const [direccionActualPadre, setDireccionActualPadre] = useState("");
  const [telefonoPadre, setTelefonoPadre] = useState("");
  const [conyuguePadre, setConyuguePadre] = useState("");

  // Estado para pareja
  const [nombrePareja, setNombrePareja] = useState("");
  const [edadPareja, setEdadPareja] = useState("");
  const [ocupacionPareja, setOcupacionPareja] = useState("");
  const [nivelEstudioPareja, setNivelEstudioPareja] = useState("");
  const [residenciaPareja, setResidenciaPareja] = useState("");
  const [direccionActualPareja, setDireccionActualPareja] = useState("");
  const [telefonoPareja, setTelefonoPareja] = useState("");
  const [conyuguePareja, setConyuguePareja] = useState("");

  const motherRepository = new MotherRepository(db);
  const fatherRepository = new FatherRepository(db);
  const siblingsRepository = new SiblingsRepository(db);
  const spouseRepository = new SpouseRepository(db);
  const childrenRepository = new ChildrenRepository(db);

  // Estado para los hermanos
  const [hermanos, setHermanos] = useState([]);

  const handleAddHermano = () => {
    setHermanos([
      ...hermanos,
      {
        id: null,
        nombre: "",
        edad: "",
        ocupacion: "",
        nivelEstudio: "",
        residencia: "",
        direccionActual: "",
        telefono: "",
        conyugue: "",
      },
    ]);
  };

  const handleRemoveHermano = async (index) => {
    const hermano = hermanos[index];
    const sibling = await siblingsRepository.findById(hermano.id);
    if (sibling) {
      await siblingsRepository.delete(sibling.id);
    }
    setHermanos(hermanos.filter((_, i) => i !== index));
  };

  const handleHermanoChange = (index, field, value) => {
    const updatedHermanos = [...hermanos];
    updatedHermanos[index][field] = value;
    setHermanos(updatedHermanos);
  };

  const [hijos, setHijos] = useState([]);

  const agregarHijo = () => {
    setHijos([
      ...hijos,
      {
        id: null,
        nombre: "",
        edad: "",
        ocupacion: "",
        nivelEstudio: "",
        residencia: "",
        direccionActual: "",
        telefono: "",
        conyugue: "",
      },
    ]);
  };
  const eliminarHijo = async (index) => {
    const hijo = hijos[index];
    const child = await childrenRepository.findById(hijo.id);
    if (child) {
      await childrenRepository.delete(child.id);
    }
    setHijos(hijos.filter((_, i) => i !== index));
  };

  const actualizarHijo = (index, field, value) => {
    const updatedHijos = [...hijos];
    updatedHijos[index][field] = value;
    setHijos(updatedHijos);
  };

  const saveHermanos = async (hermanos, respondentId) => {
    try {
      // Itera sobre el array de hermanos y guarda cada uno en la base de datos
      for (const hermano of hermanos) {
        const hermanoEntity = await siblingsRepository.findById(hermano.id);

        if (hermanoEntity) {
          console.log("Actualizando hermano:", hermanoEntity);
          await siblingsRepository.update({
            id: hermano.id,
            name: hermano.nombre,
            age: hermano.edad,
            occupation: hermano.ocupacion,
            educationLevel: hermano.nivelEstudio,
            residenceSite: hermano.residencia,
            currentAddress: hermano.direccionActual,
            phone: hermano.telefono,
            spouse: hermano.conyugue,
          });
        } else {
          // create
          await siblingsRepository.create({
            respondentId,
            name: hermano.nombre,
            age: hermano.edad,
            occupation: hermano.ocupacion,
            educationLevel: hermano.nivelEstudio,
            residenceSite: hermano.residencia,
            currentAddress: hermano.direccionActual,
            phone: hermano.telefono,
            spouse: hermano.conyugue,
          });
        }
      }
      console.log("Todos los hermanos han sido guardados exitosamente.");
    } catch (error) {
      console.error("Error al guardar los hermanos:", error.message);
    }
  };

  const saveChildren = async (hijos, respondentId) => {
    try {
      // Itera sobre el array de hijos y guarda cada uno en la base de datos
      for (const hijo of hijos) {
        const hijoEntity = await childrenRepository.findById(hijo.id);
        if (hijoEntity) {
          console.log("Actualizando hijo:", hijoEntity);
          await childrenRepository.update({
            id: hijo.id,
            name: hijo.nombre,
            age: hijo.edad,
            occupation: hijo.ocupacion,
            educationLevel: hijo.nivelEstudio,
            residenceSite: hijo.residencia,
            currentAddress: hijo.direccionActual,
            phone: hijo.telefono,
            spouse: hijo.conyugue,
          });
        } else {
          // create
          await childrenRepository.create({
            respondentId,
            name: hijo.nombre,
            age: hijo.edad,
            occupation: hijo.ocupacion,
            educationLevel: hijo.nivelEstudio,
            residenceSite: hijo.residencia,
            currentAddress: hijo.direccionActual,
            phone: hijo.telefono,
            spouse: hijo.conyugue,
          });
        }
      }
      console.log("Todos los hijos han sido guardados exitosamente.");
    } catch (error) {
      console.error("Error al guardar los hijos:", error.message);
    }
  };

  const getMotherFields = () => ({
    respondentId,
    name: nombreMadre,
    age: edadMadre,
    occupation: ocupacionMadre,
    educationLevel: nivelEstudioMadre,
    residenceSite: residenciaMadre,
    currentAddress: direccionActualMadre,
    phone: telefonoMadre,
    spouse: conyugueMadre,
  });
  const getSpouseFields = () => ({
    respondentId,
    name: nombrePareja,
    age: edadPareja,
    occupation: ocupacionPareja,
    educationLevel: nivelEstudioPareja,
    residenceSite: residenciaPareja,
    currentAddress: direccionActualPareja,
    phone: telefonoPareja,
    relationshipStatus: conyuguePareja,
  });

  const getFatherFields = () => ({
    respondentId,
    name: nombrePadre,
    age: edadPadre,
    occupation: ocupacionPadre,
    educationLevel: nivelEstudioPadre,
    residenceSite: residenciaPadre,
    currentAddress: direccionActualPadre,
    phone: telefonoPadre,
    spouse: conyuguePadre,
  });

  // Manejar el envío de los datos o navegación

  const handleSubmit = async () => {
    const mother = await motherRepository.findByRespondentId(respondentId);
    if (mother) {
      // Actualizar los datos de la madre
      await motherRepository.update({
        ...getMotherFields(),
        id: mother.id,
      });
      if (!mother) {
        console.error("No se pudo actualizar la madre.");
        return;
      }
      console.log("madre actualizado correctamente.");
      // navigation.navigate("DatosInternos", { respondentId });
    } else {
      await motherRepository.create(getMotherFields());
    }
    const father = await fatherRepository.findByRespondentId(respondentId);
    if (father) {
      // Actualizar los datos del padre
      await fatherRepository.update({
        ...getFatherFields(),
        id: father.id,
      });
      if (!father) {
        console.error("No se pudo actualizar el padre.");
        return;
      }
      console.log("padre actualizado correctamente.");
      // navigation.navigate("DatosInternos", { respondentId });
    } else {
      await fatherRepository.create(getFatherFields());
    }
    const spouse = await spouseRepository.findByRespondentId(respondentId);
    if (spouse) {
      // Actualizar los datos del spouse
      await spouseRepository.update({
        ...getSpouseFields(),
        id: spouse.id,
      });
      if (!spouse) {
        console.error("No se pudo actualizar el padre.");
        return;
      }
      console.log("spouse actualizado correctamente.");
      // navigation.navigate("DatosInternos", { respondentId });
    } else {
      await spouseRepository.create(getSpouseFields());
    }

    await saveHermanos(hermanos, respondentId);

    await saveChildren(hijos, respondentId);

    navigation.navigate("DatosInternos", { respondentId });
  };

  const setMotherFields = async (mother) => {
    setNombreMadre(mother.name);
    setEdadMadre(mother.age);
    setOcupacionMadre(mother.occupation);
    setNivelEstudioMadre(mother.educationLevel);
    setResidenciaMadre(mother.residenceSite);
    setDireccionActualMadre(mother.currentAddress);
    setTelefonoMadre(mother.phone);
    setConyugueMadre(mother.spouse);
  };
  const setFatherFields = async (father) => {
    setNombrePadre(father.name);
    setEdadPadre(father.age);
    setOcupacionPadre(father.occupation);
    setNivelEstudioPadre(father.educationLevel);
    setResidenciaPadre(father.residenceSite);
    setDireccionActualPadre(father.currentAddress);
    setTelefonoPadre(father.phone);
    setConyuguePadre(father.spouse);
  };
  const setSpouseFields = async (spouse) => {
    setNombrePareja(spouse.name);
    setEdadPareja(spouse.age);
    setOcupacionPareja(spouse.occupation);
    setNivelEstudioPareja(spouse.educationLevel);
    setResidenciaPareja(spouse.residenceSite);
    setDireccionActualPareja(spouse.currentAddress);
    setTelefonoPareja(spouse.phone);
    setConyuguePareja(spouse.relationshipStatus);
  };

  const setSiblingFields = (sibling) => ({
    id: sibling.id,
    nombre: sibling.name,
    edad: sibling.age,
    ocupacion: sibling.occupation,
    nivelEstudio: sibling.educationLevel,
    residencia: sibling.residenceSite,
    direccionActual: sibling.currentAddress,
    telefono: sibling.phone,
    conyugue: sibling.spouse,
  });

  const setChildFields = (child) => ({
    id: child.id,
    nombre: child.name,
    edad: child.age,
    ocupacion: child.occupation,
    nivelEstudio: child.educationLevel,
    residencia: child.residenceSite,
    direccionActual: child.currentAddress,
    telefono: child.phone,
    conyugue: child.spouse,
  });

  const loadMotherData = async (respondentId) => {
    if (!respondentId) return;

    const mother = await motherRepository.findByRespondentId(respondentId);
    if (mother) {
      setMotherFields(mother);
    }
  };

  const loadFatherData = async (respondentId) => {
    if (!respondentId) return;

    const father = await fatherRepository.findByRespondentId(respondentId);
    if (father) {
      setFatherFields(father);
    }
  };

  const loadSpouseData = async (respondentId) => {
    if (!respondentId) return;

    const spouse = await spouseRepository.findByRespondentId(respondentId);
    if (spouse) {
      setSpouseFields(spouse);
    }
  };

  const loadSiblingData = async (respondentId) => {
    if (!respondentId) return;

    const siblings = await siblingsRepository.findByRespondentId(respondentId);
    if (!siblings.length) {
      return;
    }
    setHermanos(siblings.map(setSiblingFields));
  };

  const loadChildData = async (respondentId) => {
    if (!respondentId) return;

    const children = await childrenRepository.findByRespondentId(respondentId);
    if (!children.length) {
      return;
    }
    setHijos(children.map(setChildFields));
  };

  React.useEffect(() => {
    loadMotherData(respondentId);
    loadFatherData(respondentId);
    loadSpouseData(respondentId);
    loadSiblingData(respondentId);
    loadChildData(respondentId);
  }, [respondentId]);

  return (
    <ScrollView contentContainerStyle={datosFamiliaresStyles.container}>
      <Text style={datosFamiliaresStyles.header}>Datos de la Madre</Text>

      {/* Campos de la Madre */}
      <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={nombreMadre}
        onChangeText={setNombreMadre}
        placeholder="Nombre"
      />

      <Text style={datosFamiliaresStyles.label}>Edad:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        keyboardType="numeric"
        value={edadMadre}
        onChangeText={setEdadMadre}
        placeholder="Edad"
      />

      <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={ocupacionMadre}
        onChangeText={setOcupacionMadre}
        placeholder="Ocupación"
      />

      <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>
      <Picker
        selectedValue={nivelEstudioMadre}
        style={datosFamiliaresStyles.picker}
        onValueChange={(itemValue) => setNivelEstudioMadre(itemValue)}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Primaria" value="Primaria" />
        <Picker.Item label="Secundaria" value="Secundaria" />
        <Picker.Item label="Técnico" value="Técnico" />
        <Picker.Item label="Profesional" value="Profesional" />
        <Picker.Item label="Posgrado" value="Posgrado" />
      </Picker>

      <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={residenciaMadre}
        onChangeText={setResidenciaMadre}
        placeholder="Sitio de Residencia"
      />

      <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={direccionActualMadre}
        onChangeText={setDireccionActualMadre}
        placeholder="Dirección actual"
      />

      <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        keyboardType="phone-pad"
        value={telefonoMadre}
        onChangeText={setTelefonoMadre}
        placeholder="Telefono"
      />

      <Text style={datosFamiliaresStyles.label}>Cónyuge o Pareja Actual:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={conyugueMadre}
        onChangeText={setConyugueMadre}
        placeholder="Cónyugue o pareja actual"
      />

      <Text style={datosFamiliaresStyles.header}>Datos del Padre</Text>

      {/* Campos del Padre */}
      <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={nombrePadre}
        onChangeText={setNombrePadre}
        placeholder="Nombre"
      />

      <Text style={datosFamiliaresStyles.label}>Edad:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        keyboardType="numeric"
        value={edadPadre}
        onChangeText={setEdadPadre}
        placeholder="Edad"
      />

      <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={ocupacionPadre}
        onChangeText={setOcupacionPadre}
        placeholder="Ocupación"
      />

      <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>
      <Picker
        selectedValue={nivelEstudioPadre}
        style={datosFamiliaresStyles.picker}
        onValueChange={(itemValue) => setNivelEstudioPadre(itemValue)}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Primaria" value="Primaria" />
        <Picker.Item label="Secundaria" value="Secundaria" />
        <Picker.Item label="Técnico" value="Técnico" />
        <Picker.Item label="Profesional" value="Profesional" />
        <Picker.Item label="Posgrado" value="Posgrado" />
      </Picker>

      <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={residenciaPadre}
        onChangeText={setResidenciaPadre}
        placeholder="Sitio de Residencia"
      />

      <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={direccionActualPadre}
        onChangeText={setDireccionActualPadre}
        placeholder="Dirección actual"
      />

      <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        keyboardType="phone-pad"
        value={telefonoPadre}
        onChangeText={setTelefonoPadre}
        placeholder="Teléfono"
      />

      <Text style={datosFamiliaresStyles.label}>Cónyuge o Pareja Actual:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={conyuguePadre}
        onChangeText={setConyuguePadre}
        placeholder="Cónyugue o pareja actual"
      />

      <Text style={datosFamiliaresStyles.header}>Datos de los Hermanos</Text>

      {/* Datos de los Hermanos */}
      {hermanos.map((hermano, index) => (
        <View key={index} style={datosFamiliaresStyles.hermanoContainer}>
          <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hermano.nombre}
            onChangeText={(value) =>
              handleHermanoChange(index, "nombre", value)
            }
            placeholder="Nombre"
          />

          <Text style={datosFamiliaresStyles.label}>Edad:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            keyboardType="numeric"
            value={hermano.edad}
            onChangeText={(value) => handleHermanoChange(index, "edad", value)}
            placeholder="Edad"
          />

          <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hermano.ocupacion}
            onChangeText={(value) =>
              handleHermanoChange(index, "ocupacion", value)
            }
            placeholder="Ocupación"
          />

          <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>
          <Picker
            selectedValue={hermano.nivelEstudio}
            style={datosFamiliaresStyles.picker}
            onValueChange={(value) =>
              handleHermanoChange(index, "nivelEstudio", value)
            }
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Primaria" value="Primaria" />
            <Picker.Item label="Secundaria" value="Secundaria" />
            <Picker.Item label="Técnico" value="Técnico" />
            <Picker.Item label="Profesional" value="Profesional" />
            <Picker.Item label="Posgrado" value="Posgrado" />
          </Picker>

          <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hermano.residencia}
            onChangeText={(value) =>
              handleHermanoChange(index, "residencia", value)
            }
            placeholder="Sitio de Residencia"
          />

          <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hermano.direccionActual}
            onChangeText={(value) =>
              handleHermanoChange(index, "direccionActual", value)
            }
            placeholder="Dirección Actual"
          />

          <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            keyboardType="phone-pad"
            value={hermano.telefono}
            onChangeText={(value) =>
              handleHermanoChange(index, "telefono", value)
            }
            placeholder="Teléfono"
          />

          <Text style={datosFamiliaresStyles.label}>
            Cónyuge o Pareja Actual:
          </Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hermano.conyugue}
            onChangeText={(value) =>
              handleHermanoChange(index, "conyugue", value)
            }
            placeholder="Cónyuge o Pareja Actual"
          />

          <TouchableOpacity
            style={datosFamiliaresStyles.removeButton}
            onPress={() => handleRemoveHermano(index)}
          >
            <Text style={datosFamiliaresStyles.removeButtonText}>
              Eliminar Hermano
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={datosFamiliaresStyles.addButton}
        onPress={handleAddHermano}
      >
        <Text style={datosFamiliaresStyles.addButtonText}>Agregar Hermano</Text>
      </TouchableOpacity>

      <Text style={datosFamiliaresStyles.header}>
        Datos de la Pareja o Cónyuge
      </Text>

      <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={nombrePareja}
        onChangeText={setNombrePareja}
        placeholder="Nombre"
      />

      <Text style={datosFamiliaresStyles.label}>Edad:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        keyboardType="numeric"
        value={edadPareja}
        onChangeText={setEdadPareja}
        placeholder="Edad"
      />

      <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={ocupacionPareja}
        onChangeText={setOcupacionPareja}
        placeholder="Ocupación"
      />

      <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>
      <Picker
        selectedValue={nivelEstudioPareja}
        style={datosFamiliaresStyles.picker}
        onValueChange={setNivelEstudioPareja}
      >
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Primaria" value="Primaria" />
        <Picker.Item label="Secundaria" value="Secundaria" />
        <Picker.Item label="Técnico" value="Técnico" />
        <Picker.Item label="Profesional" value="Profesional" />
        <Picker.Item label="Posgrado" value="Posgrado" />
      </Picker>

      <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={residenciaPareja}
        onChangeText={setResidenciaPareja}
        placeholder="Sitio de Residencia"
      />

      <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={direccionActualPareja}
        onChangeText={setDireccionActualPareja}
        placeholder="Dirección Actual"
      />

      <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        keyboardType="phone-pad"
        value={telefonoPareja}
        onChangeText={setTelefonoPareja}
        placeholder="Teléfono"
      />

      <Text style={datosFamiliaresStyles.label}>
        Estado actual de la relación
      </Text>
      <TextInput
        style={datosFamiliaresStyles.input}
        value={conyuguePareja}
        onChangeText={setConyuguePareja}
        placeholder="Estado actual de la relación"
      />
      <Text style={datosFamiliaresStyles.header}>Datos de los Hijos</Text>

      {hijos.map((hijo, index) => (
        <View key={index} style={datosFamiliaresStyles.hijoContainer}>
          <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hijo.nombre}
            onChangeText={(valor) => actualizarHijo(index, "nombre", valor)}
            placeholder="Nombre"
          />

          <Text style={datosFamiliaresStyles.label}>Edad:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            keyboardType="numeric"
            value={hijo.edad}
            onChangeText={(valor) => actualizarHijo(index, "edad", valor)}
            placeholder="Edad"
          />

          <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hijo.ocupacion}
            onChangeText={(valor) => actualizarHijo(index, "ocupacion", valor)}
            placeholder="Ocupación"
          />

          <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>

          <Picker
            selectedValue={hijo.nivelEstudio}
            style={datosFamiliaresStyles.picker}
            onValueChange={(valor) =>
              actualizarHijo(index, "nivelEstudio", valor)
            }
          >
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Primaria" value="Primaria" />
            <Picker.Item label="Secundaria" value="Secundaria" />
            <Picker.Item label="Técnico" value="Técnico" />
            <Picker.Item label="Profesional" value="Profesional" />
            <Picker.Item label="Posgrado" value="Posgrado" />
          </Picker>

          <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hijo.residencia}
            onChangeText={(valor) => actualizarHijo(index, "residencia", valor)}
            placeholder="Sitio de residencia"
          />

          <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hijo.direccionActual}
            onChangeText={(valor) =>
              actualizarHijo(index, "direccionActual", valor)
            }
            placeholder="Dirección Actual"
          />

          <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            keyboardType="phone-pad"
            value={hijo.telefono}
            onChangeText={(valor) => actualizarHijo(index, "telefono", valor)}
            placeholder="Teléfono"
          />
          <Text style={datosFamiliaresStyles.label}>
            Cónyuge o Pareja Actual:
          </Text>
          <TextInput
            style={datosFamiliaresStyles.input}
            value={hijo.conyugue}
            onChangeText={(value) => actualizarHijo(index, "conyugue", value)}
            placeholder="Cónyuge o Pareja Actual"
          />

          <TouchableOpacity
            style={datosFamiliaresStyles.deleteButton}
            onPress={() => eliminarHijo(index)}
          >
            <Text style={datosFamiliaresStyles.deleteButtonText}>
              Eliminar Hijo
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={datosFamiliaresStyles.addButton}
        onPress={agregarHijo}
      >
        <Text style={datosFamiliaresStyles.addButtonText}>Agregar Hijo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={datosFamiliaresStyles.button}
        onPress={handleSubmit}
      >
        <Text style={datosFamiliaresStyles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DatosFamiliaresScreen;
