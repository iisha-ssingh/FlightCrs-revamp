module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "react-native-web", // This should be added to handle React Native components
    "@babel/plugin-transform-runtime",
  ],
};
