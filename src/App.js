import React, { Component } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }
  changeUser = (userName) => {
    this.setState({user: userName})
  }
  render() {
    let chat = this.state.user === "" ? <Login changeUser={this.changeUser}/> : <Chat user={this.state.user} />;
    return <div className="container">{chat}</div>;
  }
}

export default App;