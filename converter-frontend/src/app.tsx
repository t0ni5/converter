import React from "react";
import Converter from "./app/converter";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Converter />
    </Provider>
  );
};

export default App;
