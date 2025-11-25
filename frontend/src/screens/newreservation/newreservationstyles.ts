import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 20,
    gap: 20
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  modalBox: {
    backgroundColor: "#fff",
    margin: 30,
    borderRadius: 10,
    padding: 20
  },
  modalItem: {
    paddingVertical: 12
  },
  modalText: {
    fontSize: 16
  }
});
