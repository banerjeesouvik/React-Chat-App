import React, { Component } from "react";
import "./style.css";

class Login extends Component {
  userLogin = event => {
    if (event.which === 13 && event.target.value.trim() !== "") {
      this.props.changeUser(event.target.value);
    }
  };

  render() {
    return (
      <div className="login-box">
        <div className="logo-big">ChatBox</div>
        <input
          type="text"
          className="sender"
          id="sender"
          placeholder="Type your name and hit Enter"
          onKeyUp={this.userLogin}
        />
      </div>
    );
  }
}

export default Login;
