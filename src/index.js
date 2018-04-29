import React, { Component } from "react";
import { Provider } from "react-redux";
import Layout from "./screens";

import store from "./reducers";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

export default App;
