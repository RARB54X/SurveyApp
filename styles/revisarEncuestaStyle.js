import { StyleSheet } from 'react-native';

const revisarEncuestaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    paddingBottom: 100, // Espacio para el botón de PDF
  },
  encuestadoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 3,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  documento: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modifyButton: {
    backgroundColor: '#4caf50',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    borderRadius: 4,
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pdfButton: {
    backgroundColor: '#2196f3',
    borderRadius: 4,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  pdfButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default revisarEncuestaStyles;
