import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './screens/InicioScreen';
import NuevaEncuestaScreen from './screens/NuevaEncuestaScreen';
import RevisarEncuestasScreen from './screens/RevisarEncuestasScreen';
import DatosFamiliaresScreen from './screens/DatosFamiliaresScreen';
import DatosInternosScreen from './screens/DatosInternosScreen';
import OtrasPreguntasScreen from './screens/OtrasPreguntasScreen';
import PreguntasSeguridadScreen from './screens/PreguntasSeguridadScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NuevaEncuesta" component={NuevaEncuestaScreen} options={{ title: 'Hoja de Vida' }}/>
        <Stack.Screen name="RevisarEncuestas" component={RevisarEncuestasScreen} options={{ title: 'Revisar Encuestas' }}/>
        <Stack.Screen name="DatosFamiliares" component={DatosFamiliaresScreen} options={{ title: 'Datos Familiares' }}/>
        <Stack.Screen name="DatosInternos" component={DatosInternosScreen} options={{ title: 'Datos internos' }}/>
        <Stack.Screen name="OtrasPreguntas" component={OtrasPreguntasScreen} options={{ title: 'Otras Preguntas' }}/>
        <Stack.Screen name="PreguntasSeguridad" component={PreguntasSeguridadScreen} options={{ title: 'Preguntas de Seguridad' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
