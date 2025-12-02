const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.web.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  resolve: {
    extensions: [".web.js", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "react-native$": "react-native-web",

      // your mocks
      "react-native-reanimated": path.resolve(__dirname, "mocks/animated.js"),
      "react-native-config": path.resolve(__dirname, "mocks/config.js"),
      "react-native-gesture-handler": path.resolve(
        __dirname,
        "mocks/gesturehandler.js"
      ),
      "react-native-safe-area-context": path.resolve(
        __dirname,
        "mocks/safearea.js"
      ),
      "react-native-screens": path.resolve(
        __dirname,
        "mocks/nativescreen.js"
      ),

      // icons
      "lucide-react-native$": "lucide-react",

      // navigation fallback
      "@react-navigation/native-stack": path.resolve(
        __dirname,
        "mocks/nativeStack.js"
      ),
    },
    fallback: {
      process: require.resolve("process/browser"),
      url: require.resolve("url/"),
      util: require.resolve("util/"),
    },
  },

  module: {
    rules: [
      // 🔥 IMPORTANT: compile these RN libs
      {
  test: /\.(js|jsx|ts|tsx)$/,
  use: "babel-loader",
  include: [
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "App.tsx"),
    path.resolve(__dirname, "index.web.js"),

    // react-native + all RN-community packages
    path.resolve(__dirname, "node_modules/react-native"),
    path.resolve(__dirname, "node_modules/@react-native"),
    path.resolve(__dirname, "node_modules/react-native-safe-area-context"),
    path.resolve(__dirname, "node_modules/react-native-screens"),
    path.resolve(__dirname, "node_modules/react-native-svg"),
    path.resolve(__dirname, "node_modules/@react-native-community/datetimepicker"),
    path.resolve(__dirname, "node_modules/react-native-toast-message"),
    path.resolve(__dirname, "node_modules/@react-navigation"),
  ],
},


      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],

  devServer: {
    hot: true,
    historyApiFallback: true,
  },
};
