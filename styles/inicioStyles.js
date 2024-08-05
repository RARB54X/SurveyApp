import { StyleSheet } from 'react-native';

export const inicioStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ocupa todo el ancho disponible
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Asegura que el texto esté centrado
  },
});
