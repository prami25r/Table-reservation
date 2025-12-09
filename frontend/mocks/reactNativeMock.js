module.exports = {
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  StyleSheet: { create: () => ({}) },
  Platform: { OS: "web", select: (o) => o.web },
};
