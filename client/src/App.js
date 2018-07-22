import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import AppContainer from "./components/AppContainer";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
