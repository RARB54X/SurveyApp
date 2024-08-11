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
import * as SQLite from 'expo-sqlite';
import { ActivityIndicator, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useSQLiteContext } from "expo-sqlite/next";
import { SQLiteProvider} from "expo-sqlite/next";
import { migrateDbIfNeeded } from './migrations/migrations'

const Stack = createStackNavigator();

// const loadDatabase = async () => {
//   const dbName = "testDB.db";
//   const dbAsset = require("./assets/testDB.db");
//   const dbUri = Asset.fromModule(dbAsset).uri;
//   const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

//   const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
//   if (!fileInfo.exists) {
//     await FileSystem.makeDirectoryAsync(
//       `${FileSystem.documentDirectory}SQLite`,
//       { intermediates: true }
//     );
//     await FileSystem.downloadAsync(dbUri, dbFilePath);

//   }
// };



const App = () => {

  // const [dbLoaded, setDbLoaded] = React.useState(false);
  // React.useEffect(() => {
  //   loadDatabase()
  //     .then(() => setDbLoaded(true))
  //     .catch((e) => console.error(e));
  // }, []);

  // if (!dbLoaded)
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <ActivityIndicator size={"large"} />
  //       <Text>Loading Database...</Text>
  //     </View>
  //   );

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
        <SQLiteProvider databaseName="survey.db" useSuspense onInit={migrateDbIfNeeded}>
          <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NuevaEncuesta" component={NuevaEncuestaScreen} options={{ title: 'Hoja de Vida' }} />
            <Stack.Screen name="RevisarEncuestas" component={RevisarEncuestasScreen} options={{ title: 'Revisar Encuestas' }} />
            <Stack.Screen name="DatosFamiliares" component={DatosFamiliaresScreen} options={{ title: 'Datos Familiares' }} />
            <Stack.Screen name="DatosInternos" component={DatosInternosScreen} options={{ title: 'Datos internos' }} />
            <Stack.Screen name="OtrasPreguntas" component={OtrasPreguntasScreen} options={{ title: 'Otras Preguntas' }} />
            <Stack.Screen name="PreguntasSeguridad" component={PreguntasSeguridadScreen} options={{ title: 'Preguntas de Seguridad' }} />
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>

  );
};

export default App;

