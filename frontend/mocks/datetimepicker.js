const React = require("react");
const { TouchableOpacity } = require("react-native");

module.exports = function MockDateTimePicker({ onChange }) {
  return React.createElement(TouchableOpacity, {
    testID: "mock-datetime-picker",
    onPress: () => {
      const selectedDate = new Date(2025, 5, 15, 12, 0);
      onChange?.(null, selectedDate);
    },
  });
};

