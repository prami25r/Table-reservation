import { StyleSheet } from "react-native";
import { COLORS } from "../themes/colors";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContainer: {
  paddingHorizontal: 20,
  paddingBottom: 40, 
}
,

  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
    color: COLORS.textPrimary,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
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
    fontSize: 15,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.cardBackground,
  },

  pickerContainer: {
  borderWidth: 1,
  borderColor: COLORS.border,
  borderRadius: 12,
  paddingHorizontal: 10,
  paddingVertical: 2,   
  height: 48,           
  justifyContent: "center",
}
,

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
    fontSize: 15,
    backgroundColor: COLORS.cardBackground,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputValue: {
    color: COLORS.textPrimary,
    fontSize: 15,
  },

  placeholder: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },

  specialInput: {
    height: 90,
    textAlignVertical: "top",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
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
    fontSize: 15,
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
    fontSize: 15,
  },
  header: {
  fontSize: 26,
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
  justifyContent: "space-between",
  backgroundColor: COLORS.background,
},

headerTitle: {
  fontSize: 24,
  fontWeight: "700",
  color: COLORS.textPrimary,
},


});
