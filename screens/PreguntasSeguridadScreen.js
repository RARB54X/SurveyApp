import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/preguntasSeguridadStyle';

const PreguntasSeguridadScreen = ({ navigation }) => {
  const [razonCaptura, setRazonCaptura] = useState('');
  const [quienCaptura, setQuienCaptura] = useState('');
  const [cuandoCaptura, setCuandoCaptura] = useState('');
  const [dondeCaptura, setDondeCaptura] = useState('');
  const [carcel, setCarcel] = useState('');
  const [tiempoCaptura, setTiempoCaptura] = useState('');
  const [comoSalio, setComoSalio] = useState('');

  // Declarar constantes para los campos de "Servicio militar"
  const [cuandoServicio, setCuandoServicio] = useState('');
  const [dondeServicio, setDondeServicio] = useState('');
  const [comoSalioServicio, setComoSalioServicio] = useState('');

  // Declarar constantes para los campos de "Otras organizaciones"
  const [cuálOrganización, setCuálOrganización] = useState('');
  const [cuantoTiempoOrganización, setCuantoTiempoOrganización] = useState('');
  const [motivoRetiroOrganización, setMotivoRetiroOrganización] = useState('');

  const [familiaresFuerzas, setFamiliaresFuerzas] = useState([]);

  const agregarFamiliarFuerzas = () => {
    setFamiliaresFuerzas([...familiaresFuerzas, {
      tipoFamiliar: '',
      nombre: '',
      edad: '',
      profesion: '',
      tiempo: '',
      rango: '',
      unidad: '',
      lugarServicio: '',
      amigosFuerzas: ''
    }]);
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

      {familiaresFuerzas.map((familiar, index) => (
        <View key={index} style={styles.familiarContainer}>
          <Text style={styles.label}>Tipo de Familiar:</Text>
          <TextInput
            style={styles.input}
            value={familiar.tipoFamiliar}
            onChangeText={(valor) => actualizarFamiliarFuerzas(index, 'tipoFamiliar', valor)}
          />

          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={familiar.nombre}
            onChangeText={(valor) => actualizarFamiliarFuerzas(index, 'nombre', valor)}
          />

          <Text style={styles.label}>Edad:</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            value={familiar.edad}
            onChangeText={(valor) => actualizarFamiliarFuerzas(index, 'edad', valor)}
          />

          <Text style={styles.label}>Profesión:</Text>
          <TextInput
            style={styles.input}
            value={familiar.profesion}
            onChangeText={(valor) => actualizarFamiliarFuerzas(index, 'profesion', valor)}
          />

          <Text style={styles.label}>Tiempo:</Text>
          <TextInput
            style={styles.input}
            value={familiar.tiempo}
            onChangeText={(valor) => actualizarFamiliarFuerzas(index, 'tiempo', valor)}
          />

          <Text style={styles.label}>Rango:</Text>
          <TextInput
            style={styles.input}
            value={familiar.rango}
            onChangeText={(valor) => actualizarFamiliarFuerzas(index, 'rango', valor)}
          />

          <Text style={styles.label}>Unidad:</Text>
          <TextInput
            style={styles.input}
            value={familiar.unidad}
            onChangeText={(valor) => actualizarFamiliarFuerzas(index, 'unidad', valor)}
          />

          <Text style={styles.label}>Lugar de Servicio:</Text>
          <TextInput
            style={styles.input}
            value={familiar.lugarServicio}
            onChangeText={(valor) => actualizarFamiliarFuerzas(index, 'lugarServicio', valor)}
          />

          <Text style={styles.label}>Tiene amigos en las Fuerzas:</Text>
          <TextInput
            style={styles.input}
            value={familiar.amigosFuerzas}
            onChangeText={(valor) => actualizarFamiliarFuerzas(index, 'amigosFuerzas', valor)}
          />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarFamiliarFuerzas(index)}
          >
            <Text style={styles.deleteButtonText}>Eliminar Familiar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={agregarFamiliarFuerzas}>
        <Text style={styles.addButtonText}>Agregar Familiar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OtrasPreguntas')}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PreguntasSeguridadScreen;