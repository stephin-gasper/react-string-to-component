import React, { Component } from "react";
import shortid from "shortid";
import Axios from "axios";
import NullComponent from "./sample-components/NullComponent";

class App extends Component {
  state = {
    components: []
  };
  /**
   * Used for importing components dyanamically by string provided.
   * 
   * @param {string} componentStr - Component filename
   * @returns {object} React Component
   * @memberof App
   */
  getComponent = async componentStr => {
    console.log(`Loading ${componentStr} component...`);
    try {
      const FetchedComponent = await import(`./sample-components/${componentStr}.js`);
      return <FetchedComponent.default key={shortid.generate()} />;
    } catch (error) {
      return <NullComponent key={shortid.generate()} />;
    }
  };
  componentDidMount = () => {
    Axios.get("http://5be5853348c1280013fc3d63.mockapi.io/cc/components")
      .then(response => {
        const componentList = response.data.map(el =>
          this.getComponent(el.name)
        );
        Promise.all(componentList).then(list => {
          this.setState({ components: list });
        });
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
