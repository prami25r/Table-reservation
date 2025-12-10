const React = require("react");

const View = React.forwardRef((props, ref) =>
  React.createElement("div", { ...props, ref }, props.children)
);

const Text = React.forwardRef((props, ref) =>
  React.createElement("span", { ...props, ref }, props.children)
);

const TouchableOpacity = React.forwardRef(({ onPress, ...props }, ref) =>
  React.createElement("button", { ...props, ref, onClick: onPress, onPress }, props.children)
);

const ScrollView = React.forwardRef((props, ref) =>
  React.createElement("div", { ...props, ref }, props.children)
);

const TextInput = React.forwardRef(({ onChangeText, value, ...props }, ref) =>
  React.createElement("input", {
    ...props,
    ref,
    value: value ?? "",
    onChange: (e) => onChangeText?.(e?.target?.value),
  })
);

const FlatList = ({ data = [], renderItem, keyExtractor, ListEmptyComponent }) => {
  if (!data.length) {
    if (typeof ListEmptyComponent === "function") return React.createElement(ListEmptyComponent);
    return ListEmptyComponent ?? null;
  }

  return React.createElement(
    React.Fragment,
    null,
    data.map((item, index) =>
      React.createElement(
        React.Fragment,
        { key: keyExtractor ? keyExtractor(item, index) : index },
        renderItem ? renderItem({ item, index }) : null
      )
    )
  );
};

const Alert = { alert: jest.fn() };
const StyleSheet = {
  create: (styles) => styles,
  flatten: (styles) => {
    if (!styles) return {};
    if (Array.isArray(styles)) {
      return styles.reduce(
        (acc, style) => ({ ...acc, ...StyleSheet.flatten(style) }),
        {}
      );
    }
    return { ...styles };
  },
};
const Platform = { OS: "web", select: (options) => options?.web };

module.exports = {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
  Platform,
  SafeAreaView: View,
};
