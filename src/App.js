import React, { Component } from "react";
import shortid from "shortid";
import Axios from "axios";

class App extends Component {
  state = {
    loadedComponents: [],
    components: []
  };
  componentDidMount = () => {
    Axios.get("http://5be5853348c1280013fc3d63.mockapi.io/cc/components")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return <div className="App" />;
  }
}

export default App;
