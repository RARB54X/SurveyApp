import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SQLiteProvider } from "expo-sqlite/next";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { migrateDbIfNeeded } from "./migrations/migrations";
import DatosFamiliaresScreen from "./screens/DatosFamiliaresScreen";
import DatosInternosScreen from "./screens/DatosInternosScreen";
import InicioScreen from "./screens/InicioScreen";
import NuevaEncuestaScreen from "./screens/NuevaEncuestaScreen";
import OtrasPreguntasScreen from "./screens/OtrasPreguntasScreen";
import PreguntasSeguridadScreen from "./screens/PreguntasSeguridadScreen";
import RevisarEncuestasScreen from "./screens/RevisarEncuestasScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <React.Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading Database...</Text>
          </View>
        }
      >
        <SQLiteProvider
          databaseName="survey.db"
          useSuspense
          onInit={migrateDbIfNeeded}
        >
          <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen
              name="Inicio"
              component={InicioScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NuevaEncuesta"
              component={NuevaEncuestaScreen}
              options={{ title: "Hoja de Vida" }}
            />
            <Stack.Screen
              name="RevisarEncuestas"
              component={RevisarEncuestasScreen}
              options={{ title: "Revisar Encuestas" }}
            />
            <Stack.Screen
              name="DatosFamiliares"
              component={DatosFamiliaresScreen}
              options={{ title: "Datos Familiares" }}
            />
            <Stack.Screen
              name="DatosInternos"
              component={DatosInternosScreen}
              options={{ title: "Datos internos" }}
            />
            <Stack.Screen
              name="OtrasPreguntas"
              component={OtrasPreguntasScreen}
              options={{ title: "Otras Preguntas" }}
            />
            <Stack.Screen
              name="PreguntasSeguridad"
              component={PreguntasSeguridadScreen}
              options={{ title: "Preguntas de Seguridad" }}
            />
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>
  );
};

export default App;
