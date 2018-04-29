import React, { Component } from "react";
import { Provider } from "react-redux";
import { Root } from "native-base";
import Layout from "./screens";

import store from "./reducers";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <Layout />
        </Root>
      </Provider>
    );
  }
}

export default App;
