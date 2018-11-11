import React, { Component } from "react";
import shortid from "shortid";
import Axios from "axios";
import Loadable from "react-loadable";
// import NullComponent from "./sample-components/NullComponent";
import Loader from "./Loader";
class App extends Component {
  state = {
    components: []
  };
  componentDidMount = () => {
    Axios.get("http://5be5853348c1280013fc3d63.mockapi.io/cc/components")
      .then(response => {
        const loadableComponents = response.data.map(el =>
          Loadable({
            loader: () => import(`./sample-components/${el.name}`),
            loading: Loader
          })
        );
        const componentList = loadableComponents.map(Item => (
          <Item key={shortid.generate()} />
        ));
        this.setState({ components: componentList });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { components } = this.state;
    return (
      <div className="App">
        {components.length === 0 ? (
          <div>Nothing to display...</div>
        ) : (
          components
        )}
      </div>
    );
  }
}

export default App;
