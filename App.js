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
        <Stack.Screen name="NuevaEncuesta" component={NuevaEncuestaScreen} />
        <Stack.Screen name="RevisarEncuestas" component={RevisarEncuestasScreen} />
        <Stack.Screen name="DatosFamiliares" component={DatosFamiliaresScreen}/>
        <Stack.Screen name="DatosInternos" component={DatosInternosScreen}/>
        <Stack.Screen name="OtrasPreguntas" component={OtrasPreguntasScreen}/>
        <Stack.Screen name="PreguntasSeguridad" component={PreguntasSeguridadScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
