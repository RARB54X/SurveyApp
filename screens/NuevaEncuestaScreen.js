import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { nuevaEncuestaStyles } from '../styles/nuevaEncuestaStyles'; // Ajusta la ruta si es necesario
import { Checkbox } from 'react-native-paper'; // Importar Checkbox
import localidades from '../data/localidades'; // Asegúrate de que la ruta es correcta
import nivelesEstudio from '../data/nivelesEstudio'; // Asegúrate de que la ruta es correcta
import estadoCivilOptions from '../data/estadoCivil'; // Ajusta la ruta si es necesario
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

const NuevaEncuestaScreen = () => {
  const navigation = useNavigation(); // Inicializar useNavigation
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState(null);
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [lugarNacimiento, setLugarNacimiento] = useState(localidades.length > 0 ? localidades[0].nombre : '');
  const [lugarVivienda, setLugarVivienda] = useState('');
  const [nivelEstudio, setNivelEstudio] = useState(nivelesEstudio.length > 0 ? nivelesEstudio[0].nombre : '');
  const [profesion, setProfesion] = useState('');
  const [estadoCivil, setEstadoCivil] = useState(estadoCivilOptions.length > 0 ? estadoCivilOptions[0].nombre : '');
  const [edad, setEdad] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('CC');
  const [numeroDocumento, setNumeroDocumento] = useState('');

  // Nuevos estados para la sección de incorporación
  const [fechaIncorporacion, setFechaIncorporacion] = useState(null);
  const [lugarIncorporacion, setLugarIncorporacion] = useState('');
  const [quienIncorporo, setQuienIncorporo] = useState('');
  const [mandoRecibido, setMandoRecibido] = useState('');
  const [estructuraIncorporacion, setEstructuraIncorporacion] = useState('');

  // Nuevos campos adicionales
  const [seudonimo, setSeudonimo] = useState('');
  const [otrasEstructuras, setOtrasEstructuras] = useState('');
  const [mandosACargo, setMandosACargo] = useState('');
  const [tiempoPermanecido, setTiempoPermanecido] = useState('');
  const [tareasDesempenadas, setTareasDesempenadas] = useState('');
  const [porqueIncorporacion, setPorqueIncorporacion] = useState('');
  const [familiaDeAcuerdo, setFamiliaDeAcuerdo] = useState(''); // Estado para almacenar la respuesta

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isNacimientoPickerVisible, setNacimientoPickerVisibility] = useState(false);
  const [isIncorporacionPickerVisible, setIncorporacionPickerVisibility] = useState(false);
  const [enfermedadesPadecidas, setEnfermedadesPadecidas] = useState('');
  const [haPertenecidoFuerzasMilitares, setHaPertenecidoFuerzasMilitares] = useState('');


  const handleConfirm = (date) => {
    setFecha(date);
    setDatePickerVisibility(false);
  };

  const handleNacimientoConfirm = (date) => {
    setFechaNacimiento(date);
    setNacimientoPickerVisibility(false);
  };

  const handleIncorporacionConfirm = (date) => {
    setFechaIncorporacion(date);
    setIncorporacionPickerVisibility(false);
  };


  const handleSubmit = () => {
    /*if (!nombre.trim()) {
      Alert.alert('Error', 'El campo Nombre es obligatorio');
      return;
    }
    if (!apellido.trim()) {
      Alert.alert('Error', 'El campo Apellido es obligatorio');
      return;
    }    
    if (!fecha) {
      Alert.alert('Error', 'El campo Fecha es obligatorio');
      return;
    }
    if (!fechaNacimiento) {
      Alert.alert('Error', 'El campo Fecha de Nacimiento es obligatorio');
      return;
    }
    if (!fechaIncorporacion) {
      Alert.alert('Error', 'El campo Fecha de Incorporación es obligatorio');
      return;
    }
    if (!edad) {
      Alert.alert('Error', 'El campo Edad es obligatorio');
      return;
    }
    if (!numeroDocumento.trim()) {
      Alert.alert('Error', 'El campo Número de Documento es obligatorio');
      return;
    }
    console.log('Nombre:', nombre);
    console.log('Apellido:', apellido);  
    console.log('Fecha:', fecha.toLocaleDateString());
    console.log('Fecha de Nacimiento:', fechaNacimiento.toLocaleDateString());
    console.log('Fecha de Incorporación:', fechaIncorporacion.toLocaleDateString());
    console.log('Edad:', edad);
    console.log('Tipo de Documento:', tipoDocumento);
    console.log('Número de Documento:', numeroDocumento);
    console.log('Lugar de Nacimiento:', lugarNacimiento);
    console.log('Lugar de Vivienda:', lugarVivienda);
    console.log('Nivel de Estudio:', nivelEstudio);
    console.log('Profesión u Ocupación:', profesion);
    console.log('Estado Civil:', estadoCivil);
    console.log('Lugar de Incorporación:', lugarIncorporacion);
    console.log('Quién lo Incorporó:', quienIncorporo);
    console.log('Mando que lo Recibió:', mandoRecibido);
    console.log('Estructura en la cual se Incorporó:', estructuraIncorporacion);
    console.log('Seudónimo o Nombre:', seudonimo);
    console.log('Otras Estructuras:', otrasEstructuras);
    console.log('Mandos a Cargo:', mandosACargo);
    console.log('Tiempo Permanecido:', tiempoPermanecido);
    console.log('Tareas Desempeñadas:', tareasDesempenadas);
    console.log('Por qué se incorporó:', porqueIncorporacion);
    console.log('¿Su familia está de acuerdo?:', familiaDeAcuerdo);
    console.log('Enfermedades Padecidas:', enfermedadesPadecidas);
    console.log('¿Ha pertenecido a las fuerzas militares?:', haPertenecidoFuerzasMilitares);*/
    navigation.navigate('DatosFamiliares');

    // Aquí puedes agregar la lógica para enviar las preguntas a un servidor o guardarlas localmente
  };

  const localidadesItems = (localidades && Array.isArray(localidades) ? localidades : []).map(localidad => (
    <Picker.Item key={localidad.id} label={localidad.nombre} value={localidad.nombre} />
  ));

  const nivelesEstudioItems = (nivelesEstudio && Array.isArray(nivelesEstudio) ? nivelesEstudio : []).map(nivel => (
    <Picker.Item key={nivel.id} label={nivel.nombre} value={nivel.nombre} />
  ));

  const estadoCivilItems = (estadoCivilOptions && Array.isArray(estadoCivilOptions) ? estadoCivilOptions : []).map(estado => (
    <Picker.Item key={estado.id} label={estado.nombre} value={estado.nombre} />
  ));

  return (
    <ScrollView contentContainerStyle={nuevaEncuestaStyles.container}>
      <Text style={nuevaEncuestaStyles.header}>Hoja de Vida</Text>

      {/* Datos Básicos */}
      <View style={nuevaEncuestaStyles.encuestadorContainer}>
      <Text style={nuevaEncuestaStyles.label}>Fecha Encuesta</Text>
      <TouchableOpacity style={nuevaEncuestaStyles.button} onPress={() => setDatePickerVisibility(true)}>
        <Text style={nuevaEncuestaStyles.buttonText}>
          {fecha ? `Fecha: ${fecha.toLocaleDateString()}` : 'Seleccionar Fecha de encuesta'}
        </Text>
      </TouchableOpacity>

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <Text style={nuevaEncuestaStyles.label}>Nombre de quien realiza la encuesta</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Nombre"
        
      />
      <Text style={nuevaEncuestaStyles.label}>Identificación del encuestador</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Identificación"
        
      />
      </View>

      <Text style={nuevaEncuestaStyles.label}>Nombre del combatiente:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Nombre del combatiente"
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={nuevaEncuestaStyles.label}>Apellido del combatiente:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Apellido del combatiente"
        value={apellido}
        onChangeText={setApellido}
      />
      <Text style={nuevaEncuestaStyles.label}>Mando que la elabora:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Mando que la elabora:"
      />
      <Text style={nuevaEncuestaStyles.label}>Seudónimo o Nombres de Guerra</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Seudónimo o Nombres de Guerra"
        value={seudonimo}
        onChangeText={setSeudonimo}
      />
      <Text style={nuevaEncuestaStyles.label}>Fecha de Nacimiento:</Text>
      <TouchableOpacity style={nuevaEncuestaStyles.button} onPress={() => setNacimientoPickerVisibility(true)}>
        <Text style={nuevaEncuestaStyles.buttonText}>
          {fechaNacimiento ? `Fecha de Nacimiento: ${fechaNacimiento.toLocaleDateString()}` : 'Seleccionar Fecha de Nacimiento'}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isNacimientoPickerVisible}
        mode="date"
        onConfirm={handleNacimientoConfirm}
        onCancel={() => setNacimientoPickerVisibility(false)}
      />
      <Text style={nuevaEncuestaStyles.label}>Edad:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
      />
      <Text style={nuevaEncuestaStyles.label}>Tipo de Documento:</Text>

      <Picker
        selectedValue={tipoDocumento}
        style={nuevaEncuestaStyles.picker}
        onValueChange={(itemValue) => setTipoDocumento(itemValue)}
      >
        <Picker.Item label="Cédula de Ciudadanía" value="CC" />
        <Picker.Item label="Tarjeta de Identidad" value="TI" />
        <Picker.Item label="Pasaporte" value="PAS" />
      </Picker>

      <Text style={nuevaEncuestaStyles.label}>Número de Documento:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Número de Documento"
        value={numeroDocumento}
        onChangeText={setNumeroDocumento}
      />
      <Text style={nuevaEncuestaStyles.label}>Lugar de Nacimiento:</Text>

      <Picker
        selectedValue={lugarNacimiento}
        style={nuevaEncuestaStyles.picker}
        onValueChange={(itemValue) => setLugarNacimiento(itemValue)}
      >
        {localidadesItems}
      </Picker>

      <Text style={nuevaEncuestaStyles.label}>Lugar de Vivienda:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Lugar de Vivienda"
        value={lugarVivienda}
        onChangeText={setLugarVivienda}
      />
      <Text style={nuevaEncuestaStyles.label}>Nivel de Estudio:</Text>

      <Picker
        selectedValue={nivelEstudio}
        style={nuevaEncuestaStyles.picker}
        onValueChange={(itemValue) => setNivelEstudio(itemValue)}
      >
        {nivelesEstudioItems}
      </Picker>

      <Text style={nuevaEncuestaStyles.label}>Profesión u Ocupación antes de Incorporarse:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Profesión u Ocupación antes de Incorporarse"
        value={profesion}
        onChangeText={setProfesion}
      />
      <Text style={nuevaEncuestaStyles.label}>Estado Civil:</Text>

      <Picker
        selectedValue={estadoCivil}
        style={nuevaEncuestaStyles.picker}
        onValueChange={(itemValue) => setEstadoCivil(itemValue)}
      >
        {estadoCivilItems}
      </Picker>


      {/* Datos de Incorporación */}
      <Text style={nuevaEncuestaStyles.header}>Datos de Incorporación</Text>
      <Text style={nuevaEncuestaStyles.label}>Fecha de Incorporación:</Text>
      <TouchableOpacity style={nuevaEncuestaStyles.button} onPress={() => setIncorporacionPickerVisibility(true)}>
        <Text style={nuevaEncuestaStyles.buttonText}>
          {fechaIncorporacion ? `Fecha de Incorporación: ${fechaIncorporacion.toLocaleDateString()}` : 'Seleccionar Fecha de Incorporación'}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isIncorporacionPickerVisible}
        mode="date"
        onConfirm={handleIncorporacionConfirm}
        onCancel={() => setIncorporacionPickerVisibility(false)}
      />
      <Text style={nuevaEncuestaStyles.label}>Lugar de Incorporación:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Lugar de Incorporación"
        value={lugarIncorporacion}
        onChangeText={setLugarIncorporacion}
      />
      <Text style={nuevaEncuestaStyles.label}>¿Quién lo incorporó?</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="¿Quién lo Incorporó?"
        value={quienIncorporo}
        onChangeText={setQuienIncorporo}
      />
      <Text style={nuevaEncuestaStyles.label}>Mando que lo Recibió:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Mando que lo Recibió"
        value={mandoRecibido}
        onChangeText={setMandoRecibido}
      />
      <Text style={nuevaEncuestaStyles.label}>Estructura en la cual se incorporó:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Estructura en la cual se Incorporó"
        value={estructuraIncorporacion}
        onChangeText={setEstructuraIncorporacion}
      />

      {/* Campos adicionales */}
      <Text style={nuevaEncuestaStyles.label}>En qué otras estructuras ha estado:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="En qué otras estructuras ha estado"
        value={otrasEstructuras}
        onChangeText={setOtrasEstructuras}
      />
      <Text style={nuevaEncuestaStyles.label}>Mandos que lo han tenido a cargo:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Mandos que lo han tenido a cargo"
        value={mandosACargo}
        onChangeText={setMandosACargo}
      />
      <Text style={nuevaEncuestaStyles.label}>Tiempo Permanecido:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Tiempo Permanecido"
        value={tiempoPermanecido}
        onChangeText={setTiempoPermanecido}
      />
      <Text style={nuevaEncuestaStyles.label}>Tareas Desempeñadas:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Tareas Desempeñadas"
        value={tareasDesempenadas}
        onChangeText={setTareasDesempenadas}
      />

      <Text style={nuevaEncuestaStyles.label}>¿Por qué se incorporó?</Text>
      <TextInput
        style={[nuevaEncuestaStyles.input, { height: 100 }]} // Aumentar la altura para texto amplio
        placeholder="¿Por qué se incorporó?"
        multiline
        value={porqueIncorporacion}
        onChangeText={setPorqueIncorporacion}
      />
      <Text style={nuevaEncuestaStyles.label}>Enfermedades Padecidas:</Text>
      <TextInput
        style={nuevaEncuestaStyles.input}
        placeholder="Enfermedades Padecidas"
        value={enfermedadesPadecidas}
        onChangeText={setEnfermedadesPadecidas}
      />

      {/* Nueva sección: ¿Su familia está de acuerdo? */}
      <Text style={nuevaEncuestaStyles.label}>¿Su familia está de acuerdo?</Text>
      <View style={nuevaEncuestaStyles.checkboxContainer}>
        <Checkbox
          status={familiaDeAcuerdo === 'si' ? 'checked' : 'unchecked'}
          onPress={() => setFamiliaDeAcuerdo('si')}
        />
        <Text style={nuevaEncuestaStyles.checkboxLabel}>Sí</Text>
      </View>
      <View style={nuevaEncuestaStyles.checkboxContainer}>
        <Checkbox
          status={familiaDeAcuerdo === 'no' ? 'checked' : 'unchecked'}
          onPress={() => setFamiliaDeAcuerdo('no')}
        />
        <Text style={nuevaEncuestaStyles.checkboxLabel}>No</Text>
      </View>
      <View style={nuevaEncuestaStyles.checkboxContainer}>
        <Checkbox
          status={familiaDeAcuerdo === 'no_sabe' ? 'checked' : 'unchecked'}
          onPress={() => setFamiliaDeAcuerdo('no_sabe')}
        />
        <Text style={nuevaEncuestaStyles.checkboxLabel}>No sabe</Text>
      </View>

      <Text style={nuevaEncuestaStyles.label}>¿Ha pertenecido a las fuerzas militares?</Text>
      <View style={nuevaEncuestaStyles.checkboxContainer}>
        <Checkbox
          status={haPertenecidoFuerzasMilitares === 'Sí' ? 'checked' : 'unchecked'}
          onPress={() => setHaPertenecidoFuerzasMilitares(haPertenecidoFuerzasMilitares === 'Sí' ? '' : 'Sí')}
        />
        <Text style={nuevaEncuestaStyles.checkboxLabel}>Sí</Text>
      </View>
      <View style={nuevaEncuestaStyles.checkboxContainer}>
        <Checkbox
          status={haPertenecidoFuerzasMilitares === 'No' ? 'checked' : 'unchecked'}
          onPress={() => setHaPertenecidoFuerzasMilitares(haPertenecidoFuerzasMilitares === 'No' ? '' : 'No')}
        />
        <Text style={nuevaEncuestaStyles.checkboxLabel}>No</Text>
      </View>
      <TouchableOpacity style={nuevaEncuestaStyles.button} onPress={handleSubmit}>
        <Text style={nuevaEncuestaStyles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NuevaEncuestaScreen;
