module.exports = {
  presets: [
    "module:@react-native/babel-preset",
    "@babel/preset-env",
    "@babel/preset-react",
  ],
  plugins: [
    ["babel-plugin-react-native-web", { commonjs: true }],
    "@babel/plugin-transform-flow-strip-types",
  ],
};
