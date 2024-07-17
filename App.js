import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './screens/InicioScreen';
import NuevaEncuestaScreen from './screens/NuevaEncuestaScreen';
import RevisarEncuestasScreen from './screens/RevisarEncuestasScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NuevaEncuesta" component={NuevaEncuestaScreen} />
        <Stack.Screen name="RevisarEncuestas" component={RevisarEncuestasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
