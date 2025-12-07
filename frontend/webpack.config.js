const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.web.js",


  experiments: {},

  output: {
    
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".web.tsx", ".web.js", ".tsx", ".ts", ".jsx", ".js"],
    alias: {
  "react-native$": "react-native-web",

  "@react-navigation/native": path.resolve(
  __dirname,
  "mocks/navigation.web.js"
),

  "@react-navigation/native-stack": path.resolve(
    __dirname,
    "mocks/nativeStack.js"
  ),

  "react-native-safe-area-context": path.resolve(
    __dirname,
    "mocks/safeareaadvanced.js"
  ),

  "react-native-screens": path.resolve(
    __dirname,
    "mocks/nativescreen.js"
  ),

  "lucide-react-native$": "lucide-react",


},
    fallback: {
      process: require.resolve("process/browser"),
      url: require.resolve("url/"),
      util: require.resolve("util/"),
    },
  },

  module: {
  
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: "babel-loader",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "App.web.tsx"),
          path.resolve(__dirname, "index.web.js"),

          path.resolve(__dirname, "node_modules/react-native"),
          path.resolve(__dirname, "node_modules/@react-native"),
          path.resolve(__dirname, "node_modules/react-native-safe-area-context"),
          path.resolve(__dirname, "node_modules/react-native-screens"),
          path.resolve(__dirname, "node_modules/react-native-svg"),
          path.resolve(
            __dirname,
            "node_modules/@react-native-community/datetimepicker"
          ),
          path.resolve(
            __dirname,
            "node_modules/react-native-toast-message"
          ),
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
