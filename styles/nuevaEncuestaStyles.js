import { StyleSheet } from 'react-native';

export const nuevaEncuestaStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30, // Añadido para asegurar que el botón sea visible
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  checkboxGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,  
  },
  pickerContainer: {
    borderWidth: 1, // Grosor del borde
    borderColor: '#ccc', // Color del borde
    borderRadius: 5, // Redondear bordes (opcional)
    marginBottom: 5,    
  },
  encuestadorContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
});
