import { AppRegistry } from "react-native";
import App from "./App.web";

AppRegistry.registerComponent("frontend", () => App);
AppRegistry.runApplication("frontend", {
  rootTag: document.getElementById("root"),
});
