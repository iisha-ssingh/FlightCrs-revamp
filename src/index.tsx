import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { AppRegistry } from "react-native"; // Handles react-native-web
import { store } from "./redux/store";
import App from "./App";

// Define the main App component wrapped with Provider
const AppHOCs = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// Register the app for React Native and React Native Web
AppRegistry.registerComponent("App", () => AppHOCs);

// Create a root container for web
const rootTag = document.getElementById("root");

// Conditionally run the app on web
if (rootTag) {
  AppRegistry.runApplication("App", {
    initialProps: {},
    rootTag,
  });
}
