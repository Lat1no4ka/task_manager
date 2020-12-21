import React from "react";
import Header from "./components/header/header";
import Home from "./components/home/home";


import "./App.scss";


class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;
