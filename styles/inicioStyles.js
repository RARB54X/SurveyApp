import { StyleSheet } from 'react-native';

export const inicioStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Fondo claro para elegancia
    padding: 20,
  },
  logo: {
    width: 150, // Ajusta según el tamaño de tu logo
    height: 150, // Ajusta según el tamaño de tu logo
    marginBottom: 30,
  },
  title: {
    fontSize: 32, // Tamaño de fuente aumentado para destacar
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007BFF', // Color del botón
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // Bordes más redondeados para un diseño moderno
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
