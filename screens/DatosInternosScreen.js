import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/datosInternosStyle';

const DatosInternosScreen = ({ navigation }) => {
  const [formaciones, setFormaciones] = useState([]);

  const agregarFormacion = () => {
    setFormaciones([...formaciones, { tipoFormacion: '', tiempoFormacion: '', anoRealizacion: '', estructura: '' }]);
  };

  const eliminarFormacion = (index) => {
    const nuevasFormaciones = [...formaciones];
    nuevasFormaciones.splice(index, 1);
    setFormaciones(nuevasFormaciones);
  };

  const actualizarFormacion = (index, campo, valor) => {
    const nuevasFormaciones = [...formaciones];
    nuevasFormaciones[index][campo] = valor;
    setFormaciones(nuevasFormaciones);
  };

  const [acciones, setAcciones] = useState([]);

  const agregarAccion = () => {
    setAcciones([...acciones, { tipoAccion: '', mandoEncargado: '', anoRealizacion: '', estructura: '' }]);
  };

  const eliminarAccion = (index) => {
    const nuevasAcciones = [...acciones];
    nuevasAcciones.splice(index, 1);
    setAcciones(nuevasAcciones);
  };

  const actualizarAccion = (index, campo, valor) => {
    const nuevasAcciones = [...acciones];
    nuevasAcciones[index][campo] = valor;
    setAcciones(nuevasAcciones);
  };

  // Estado para manejar las especialidades
  const [especialidades, setEspecialidades] = useState([]);

  // Función para agregar una especialidad
  const agregarEspecialidad = () => {
    setEspecialidades([...especialidades, { tipoEspecialidad: '', tiempoDesempenado: '', estructura: '' }]);
  };

  // Función para eliminar una especialidad
  const eliminarEspecialidad = (index) => {
    const nuevasEspecialidades = [...especialidades];
    nuevasEspecialidades.splice(index, 1);
    setEspecialidades(nuevasEspecialidades);
  };

  // Función para actualizar una especialidad
  const actualizarEspecialidad = (index, campo, valor) => {
    const nuevasEspecialidades = [...especialidades];
    nuevasEspecialidades[index][campo] = valor;
    setEspecialidades(nuevasEspecialidades);
  };

  // Estado para manejar las sanciones
  const [sanciones, setSanciones] = useState([]);

  // Función para agregar una sanción
  const agregarSancion = () => {
    setSanciones([...sanciones, { razon: '', quienSanciono: '', tipo: '', cuando: '', tiempo: '', estructura: '' }]);
  };

  // Función para eliminar una sanción
  const eliminarSancion = (index) => {
    const nuevasSanciones = [...sanciones];
    nuevasSanciones.splice(index, 1);
    setSanciones(nuevasSanciones);
  };

  // Función para actualizar una sanción
  const actualizarSancion = (index, campo, valor) => {
    const nuevasSanciones = [...sanciones];
    nuevasSanciones[index][campo] = valor;
    setSanciones(nuevasSanciones);
  };

  const [familiaresPertenecientes, setFamiliaresPertenecientes] = useState([]);

  // Función para agregar un familiar
  const agregarFamiliar = () => {
    setFamiliaresPertenecientes([...familiaresPertenecientes, { tipo: '', nombre: '', edad: '', rango: '', estructura: '', tiempo: '', estado: '' }]);
  };

  // Función para eliminar un familiar
  const eliminarFamiliar = (index) => {
    const nuevosFamiliares = [...familiaresPertenecientes];
    nuevosFamiliares.splice(index, 1);
    setFamiliaresPertenecientes(nuevosFamiliares);
  };

  // Función para actualizar un familiar
  const actualizarFamiliar = (index, campo, valor) => {
    const nuevosFamiliares = [...familiaresPertenecientes];
    nuevosFamiliares[index][campo] = valor;
    setFamiliaresPertenecientes(nuevosFamiliares);
  };

  // Estado para manejar las propiedades
  const [propiedades, setPropiedades] = useState([]);

  // Función para agregar una propiedad
  const agregarPropiedad = () => {
    setPropiedades([...propiedades, { ubicacion: '' }]);
  };

  // Función para eliminar una propiedad
  const eliminarPropiedad = (index) => {
    const nuevasPropiedades = [...propiedades];
    nuevasPropiedades.splice(index, 1);
    setPropiedades(nuevasPropiedades);
  };

  // Función para actualizar una propiedad
  const actualizarPropiedad = (index, campo, valor) => {
    const nuevasPropiedades = [...propiedades];
    nuevasPropiedades[index][campo] = valor;
    setPropiedades(nuevasPropiedades);
  };

  // Estado para manejar las respuestas de preguntas generales
  const [aspiraciones, setAspiraciones] = useState('');
  const [sentimientos, setSentimientos] = useState('');
  const [preferenciaCivil, setPreferenciaCivil] = useState('');
  const [extrañaCivil, setExtrañaCivil] = useState('');
  const [desempeño, setDesempeño] = useState('');
  const [gustos, setGustos] = useState('');
  const [problemaPrincipal, setProblemaPrincipal] = useState('');
  const [exitoPrincipal, setExitoPrincipal] = useState('');
  const [fracasoPrincipal, setFracasoPrincipal] = useState('');
  const [preparacionLisiado, setPreparacionLisiado] = useState('');
  const [preparacionCapturado, setPreparacionCapturado] = useState('');
  const [senalesDefectos, setSenalesDefectos] = useState('');
  const [enfermedadesSexuales, setEnfermedadesSexuales] = useState('');
  const [tratamientoETS, setTratamientoETS] = useState('');
  const [enfermedadesActuales, setEnfermedadesActuales] = useState('');
  const [operaciones, setOperaciones] = useState('');
  const [observaciones, setObservaciones] = useState('');

  return (

    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Formación en escuelas o talleres de la organización</Text>

      {formaciones.map((formacion, index) => (
        <View key={index} style={styles.formacionContainer}>
          <Text style={styles.label}>Tipo de Formación:</Text>
          <TextInput
            style={styles.input}
            value={formacion.tipoFormacion}
            onChangeText={(valor) => actualizarFormacion(index, 'tipoFormacion', valor)}
            placeholder="Tipo de Formación"
          />

          <Text style={styles.label}>Tiempo de Formación:</Text>
          <TextInput
            style={styles.input}
            value={formacion.tiempoFormacion}
            onChangeText={(valor) => actualizarFormacion(index, 'tiempoFormacion', valor)}
            placeholder="Tiempo de Formación"
          />

          <Text style={styles.label}>Año de Realización:</Text>
          <TextInput
            style={styles.input}
            value={formacion.anoRealizacion}
            onChangeText={(valor) => actualizarFormacion(index, 'anoRealizacion', valor)}
            placeholder="Año de Realización"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={formacion.estructura}
            onChangeText={(valor) => actualizarFormacion(index, 'estructura', valor)}
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
            onChangeText={(valor) => actualizarAccion(index, 'tipoAccion', valor)}
            placeholder="Tipo de Acción"
          />

          <Text style={styles.label}>Mando Encargado:</Text>
          <TextInput
            style={styles.input}
            value={accion.mandoEncargado}
            onChangeText={(valor) => actualizarAccion(index, 'mandoEncargado', valor)}
            placeholder="Mando Encargado"
          />

          <Text style={styles.label}>Año de Realización:</Text>
          <TextInput
            style={styles.input}
            value={accion.anoRealizacion}
            onChangeText={(valor) => actualizarAccion(index, 'anoRealizacion', valor)}
            placeholder="Año de Realización"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={accion.estructura}
            onChangeText={(valor) => actualizarAccion(index, 'estructura', valor)}
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
            onChangeText={(valor) => actualizarEspecialidad(index, 'tipoEspecialidad', valor)}
            placeholder="Tipo de Especialidad"
          />

          <Text style={styles.label}>Tiempo Desempeñado:</Text>
          <TextInput
            style={styles.input}
            value={especialidad.tiempoDesempenado}
            onChangeText={(valor) => actualizarEspecialidad(index, 'tiempoDesempenado', valor)}
            placeholder="Tiempo Desempeñado"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={especialidad.estructura}
            onChangeText={(valor) => actualizarEspecialidad(index, 'estructura', valor)}
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
            onChangeText={(valor) => actualizarSancion(index, 'razon', valor)}
            placeholder="Razón de la Sanción"
          />

          <Text style={styles.label}>¿Quién lo Sancionó?:</Text>
          <TextInput
            style={styles.input}
            value={sancion.quienSanciono}
            onChangeText={(valor) => actualizarSancion(index, 'quienSanciono', valor)}
            placeholder="¿Quién lo Sancionó?"
          />

          <Text style={styles.label}>Tipo de Sanción:</Text>
          <TextInput
            style={styles.input}
            value={sancion.tipo}
            onChangeText={(valor) => actualizarSancion(index, 'tipo', valor)}
            placeholder="Tipo de sanción"
          />

          <Text style={styles.label}>¿Cuándo?:</Text>
          <TextInput
            style={styles.input}
            value={sancion.cuando}
            onChangeText={(valor) => actualizarSancion(index, 'cuando', valor)}
            placeholder="¿Cuándo?"
          />

          <Text style={styles.label}>Tiempo de Sanción:</Text>
          <TextInput
            style={styles.input}
            value={sancion.tiempo}
            onChangeText={(valor) => actualizarSancion(index, 'tiempo', valor)}
            placeholder="Tiempo de Sanción"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={sancion.estructura}
            onChangeText={(valor) => actualizarSancion(index, 'estructura', valor)}
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
            onChangeText={(valor) => actualizarFamiliar(index, 'tipo', valor)}
            placeholder="Tipo de Familiar"
          />

          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={familiar.nombre}
            onChangeText={(valor) => actualizarFamiliar(index, 'nombre', valor)}
            placeholder="Nombre"
          />

          <Text style={styles.label}>Edad:</Text>
          <TextInput
            style={styles.input}
            value={familiar.edad}
            onChangeText={(valor) => actualizarFamiliar(index, 'edad', valor)}
            placeholder="Edad"
          />

          <Text style={styles.label}>Rango:</Text>
          <TextInput
            style={styles.input}
            value={familiar.rango}
            onChangeText={(valor) => actualizarFamiliar(index, 'rango', valor)}
            placeholder="Rango"
          />

          <Text style={styles.label}>Estructura:</Text>
          <TextInput
            style={styles.input}
            value={familiar.estructura}
            onChangeText={(valor) => actualizarFamiliar(index, 'estructura', valor)}
            placeholder="Estructura"
          />

          <Text style={styles.label}>¿Que tiempo lleva?:</Text>
          <TextInput
            style={styles.input}
            value={familiar.tiempo}
            onChangeText={(valor) => actualizarFamiliar(index, 'tiempo', valor)}
            placeholder="¿Qué tiempo lleva?"
          />

          <Text style={styles.label}>Estado Actual:</Text>
          <TextInput
            style={styles.input}
            value={familiar.estado}
            onChangeText={(valor) => actualizarFamiliar(index, 'estado', valor)}
            placeholder="Estado Actual"
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarFamiliar(index)}
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
            onChangeText={(valor) => actualizarPropiedad(index, 'ubicacion', valor)}
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

      <Text style={styles.label}>¿Se siente mejor en la civil o en la otra?</Text>
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

      <Text style={styles.label}>¿Qué ETS (Enfermedades de transmisión sexual) ha tenido?</Text>
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
        onPress={() => navigation.navigate('PreguntasSeguridad')}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DatosInternosScreen;
