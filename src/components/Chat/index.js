import React, { Component } from "react";
import socket from "./socketConnection";
import "./style.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      messages: [],
      sender: "",
      isTyping: false,
      timeout: undefined
    };
  }
  timeoutFunction = () => {
    this.setState({ isTyping: false });
    socket.emit("notTyping");
  };
  sendMessage = message => {
    socket.emit("newMessage", {
      sender: this.state.user,
      message: message
    });
  };
  userTyping = event => {
    if (event.which === 13 && event.target.value) {
      this.sendMessage(event.target.value)
      document.getElementById("message-field").value = ''
    } else {
      if (!this.state.isTyping) {
        this.setState({
          isTyping: true,
          timeout: setTimeout(this.timeoutFunction, 3000)
        });
        socket.emit("typing", this.state.user);
      } else {
        clearTimeout(this.state.timeout);
        this.setState({ timeout: setTimeout(this.timeoutFunction, 3000) });
      }
    }
  };
  someoneTyping = (sender) => {
    this.setState({sender})
  }
  componentDidMount() {
    socket.on("typing", data => {
      this.someoneTyping(data)
    });
    socket.on("notTyping", () => {
      this.setState({sender: ""})
    });
    socket.on("newMessage", (message) => {
      this.setState({sender: "", messages: [...this.state.messages, message]})
    })
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="logo">ChatBox</div>
          <div className="user"><span className="online-status">&#x25CF;</span>{this.state.user}</div>
          <div className="typing-status" id="typing-status" >
          {this.state.sender !== '' && <div>{this.state.sender} is typing</div>}
          </div>
        </div>
        <div className="chat-display" id="chat-display" >
          {this.state.messages.map(chat => {
            let align = "", time = "", reader;
            if(this.state.user === chat.sender){
              align = "right";
              time = "left";
              reader = "You"
            }
            return(
              <div className={`chat-segment ${align}`}>
                <strong>{reader || chat.sender}</strong>
                <div class="message">{chat.message}</div>
                <div class={`time ${time}`}>{chat.time.slice(10)}</div>
              </div>
            )
          })}
        </div>
        <div className="message-box">
          <textarea
            className="message-field"
            id="message-field"
            placeholder="Type the message"
            onKeyUp={this.userTyping}
          />
        </div>
      </div>
    );
  }
}

export default Chat;