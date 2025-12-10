import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../themes/colors";

export const styles = StyleSheet.create({
  errorBorder: {
  borderColor: "red",
  borderWidth: 1,
},

 safe: {
  flex: 1,
  backgroundColor: COLORS.background,
  width: "100%",
  alignItems: Platform.OS === "web" ? "center" : "stretch",
},

scrollContainer: {
  paddingHorizontal: 20,
  paddingBottom: 60,
  paddingTop: 20,

  width: "100%", 
  maxWidth: Platform.OS === "web" ? 900 : "100%",
  alignSelf: "center", 
},


  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    width: "100%",
  },

  sectionTitle: {
    fontSize: Platform.OS === "web" ? 24 : 22,
    fontWeight: "700",
    marginBottom: 4,
    color: COLORS.textPrimary,
  },

  sectionSubtitle: {
    fontSize: Platform.OS === "web" ? 15 : 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },

  label: {
    fontSize: Platform.OS === "web" ? 15 : 14,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
    color: COLORS.textPrimary,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: Platform.OS === "web" ? 16 : 15,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.cardBackground,
    width: "100%",
  },

  pickerContainer: {
    position: "relative",
    width: "100%",
    zIndex: Platform.OS === "web" ? 20 : 1,
  },

  picker: {
    height: 50,
    width: "100%",
  },

  inputRow: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: Platform.OS === "web" ? 16 : 15,
    backgroundColor: COLORS.cardBackground,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  inputValue: {
    color: COLORS.textPrimary,
    fontSize: Platform.OS === "web" ? 16 : 15,
  },

  placeholder: {
    color: COLORS.textSecondary,
    fontSize: Platform.OS === "web" ? 16 : 15,
  },

  specialInput: {
    height: 90,
    textAlignVertical: "top",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    width: "100%",
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: COLORS.border,
    alignItems: "center",
  },

  cancelText: {
    color: COLORS.textPrimary,
    fontWeight: "600",
    fontSize: Platform.OS === "web" ? 16 : 15,
  },

  confirmButton: {
    flex: 1.3,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: COLORS.badgeUpcoming,
    alignItems: "center",
  },

  confirmText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: Platform.OS === "web" ? 16 : 15,
  },

  header: {
    fontSize: Platform.OS === "web" ? 28 : 26,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 6,
    backgroundColor: COLORS.background,
    justifyContent: "flex-start",
    width: "100%",
  },

  headerTitle: {
    fontSize: Platform.OS === "web" ? 26 : 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginLeft: 12,
  },

  dropdown: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: Platform.OS === "web" ? 9999 : 99,
    elevation: 10,
    width: "100%",
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: Platform.OS === "web" ? 16 : 15,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
  
});
