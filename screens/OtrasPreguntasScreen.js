import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { nuevaEncuestaStyles } from '../styles/otrasPreguntasStyle'; // Ajusta la ruta si es necesario
import styles from '../styles/otrasPreguntasStyle';

const OtrasPreguntasScreen = ({ navigation }) => {

  const [primerosAños, setPrimerosAños] = useState('');
  const [comoCastigaban, setComoCastigaban] = useState('');
  const [comoPremiaban, setComoPremiaban] = useState('');
  const [queriaSerGrande, setQueriaSerGrande] = useState('');
  const [quiereSerAhora, setQuiereSerAhora] = useState('');
  const [relacionPadre, setRelacionPadre] = useState('');
  const [relacionMadre, setRelacionMadre] = useState('');
  const [relacionHermanos, setRelacionHermanos] = useState('');
  const [parejaEstable, setParejaEstable] = useState('');
  const [tiempoPareja, setTiempoPareja] = useState('');
  const [relacionPareja, setRelacionPareja] = useState('');
  const [primeraRelacionSexual, setPrimeraRelacionSexual] = useState('');
  const [esComoImaginaba, setEsComoImaginaba] = useState('');
  const [demuestraAfecto, setDemuestraAfecto] = useState('');
  const [enamorado, setEnamorado] = useState('');
  const [teme, setTeme] = useState('');
  const [sustoMasGrande, setSustoMasGrande] = useState('');
  const [alegriaMasGrande, setAlegriaMasGrande] = useState('');
  const [respuestaOfensa, setRespuestaOfensa] = useState('');

  return (


    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Otras Preguntas</Text>

      <Text style={styles.label}>¿Con quién vivió durante los primeros 7 años de vida?</Text>
      <TextInput
        style={styles.input}
        value={primerosAños}
        onChangeText={setPrimerosAños}
      />

      <Text style={styles.label}>¿Cómo lo castigaban?</Text>
      <TextInput
        style={styles.input}
        value={comoCastigaban}
        onChangeText={setComoCastigaban}
      />

      <Text style={styles.label}>¿Cómo lo premiaban?</Text>
      <TextInput
        style={styles.input}
        value={comoPremiaban}
        onChangeText={setComoPremiaban}
      />

      <Text style={styles.label}>¿Qué quería ser cuando grande?</Text>
      <TextInput
        style={styles.input}
        value={queriaSerGrande}
        onChangeText={setQueriaSerGrande}
      />

      <Text style={styles.label}>¿Qué quiere ser ahora?</Text>
      <TextInput
        style={styles.input}
        value={quiereSerAhora}
        onChangeText={setQuiereSerAhora}
      />

      <Text style={styles.label}>¿Cómo es la relación con su padre?</Text>
      <TextInput
        style={styles.input}
        value={relacionPadre}
        onChangeText={setRelacionPadre}
      />

      <Text style={styles.label}>¿Cómo es la relación con su madre?</Text>
      <TextInput
        style={styles.input}
        value={relacionMadre}
        onChangeText={setRelacionMadre}
      />

      <Text style={styles.label}>¿Cómo es la relación con sus hermanos?</Text>
      <TextInput
        style={styles.input}
        value={relacionHermanos}
        onChangeText={setRelacionHermanos}
      />

      <Text style={styles.label}>¿Tiene pareja estable?</Text>
      <TextInput
        style={styles.input}
        value={parejaEstable}
        onChangeText={setParejaEstable}
      />

      <Text style={styles.label}>¿Cuánto tiempo lleva con su pareja?</Text>
      <TextInput
        style={styles.input}
        value={tiempoPareja}
        onChangeText={setTiempoPareja}
      />

      <Text style={styles.label}>¿Cómo es la relación con su pareja?</Text>
      <TextInput
        style={styles.input}
        value={relacionPareja}
        onChangeText={setRelacionPareja}
      />

      <Text style={styles.label}>¿A qué edad tuvo su primera relación sexual?</Text>
      <TextInput
        style={styles.input}
        value={primeraRelacionSexual}
        onChangeText={setPrimeraRelacionSexual}
      />

      <Text style={styles.label}>¿Es aquí como se lo imaginaba?</Text>
      <TextInput
        style={styles.input}
        value={esComoImaginaba}
        onChangeText={setEsComoImaginaba}
      />

      <Text style={styles.label}>¿Cómo le demuestra a alguien afecto?</Text>
      <TextInput
        style={styles.input}
        value={demuestraAfecto}
        onChangeText={setDemuestraAfecto}
      />

      <Text style={styles.label}>¿Está enamorado?</Text>
      <TextInput
        style={styles.input}
        value={enamorado}
        onChangeText={setEnamorado}
      />

      <Text style={styles.label}>¿A qué le teme?</Text>
      <TextInput
        style={styles.input}
        value={teme}
        onChangeText={setTeme}
      />

      <Text style={styles.label}>¿Cuál ha sido el susto más grande que ha tenido?</Text>
      <TextInput
        style={styles.input}
        value={sustoMasGrande}
        onChangeText={setSustoMasGrande}
      />

      <Text style={styles.label}>¿Cuál ha sido la alegría más grande que ha tenido?</Text>
      <TextInput
        style={styles.input}
        value={alegriaMasGrande}
        onChangeText={setAlegriaMasGrande}
      />

      <Text style={styles.label}>Si alguien (Civil o compañero) lo ofende o lo ataca, ¿qué le hace?</Text>
      <TextInput
        style={styles.input}
        value={respuestaOfensa}
        onChangeText={setRespuestaOfensa}
      />



      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Inicio')}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>

  );
};

export default OtrasPreguntasScreen;




