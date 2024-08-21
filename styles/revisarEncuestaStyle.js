import { StyleSheet } from "react-native";

const revisarEncuestaStyles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  encuestadorContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modifyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  fixedPdfButton: {
    // Estilo para el botón fijo en la parte inferior
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 5,
    position: "absolute", // Fijar en la parte inferior
    bottom: 10, // Ajustar según sea necesario
    left: 20,
    right: 20,
  },
  pdfButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default revisarEncuestaStyles;
