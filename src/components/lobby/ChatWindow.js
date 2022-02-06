import React from "react";
import ReactDOM from "react-dom";

// # COMPONENTS
import GlobalEvents from "../globalEvents";

// # ASSETS
import "./styles/chatWindow.css";

let globalEvents = new GlobalEvents();

// CHAT COMPLETO

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.contact = this.props.contact;
  }

  render() {
    return (
      <div className="chat-container hide" id={this.contact.user + "-chat"}>
        <TopBar contact={this.contact} />
        <MessageBar contact={this.contact} />
        <LowBar contact={this.contact} />
      </div>
    );
  }
}

// TOPBAR

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.contact = this.props.contact;
  }

  status = "En línea";
  indicator_class = "indicador_connected";

  minOrMaximize() {
    globalEvents.minOrMaximize(this.contact.user);
  }

  closeChat() {
    globalEvents.closeChat(this.contact.user);
  }

  render() {
    if (!this.contact.connected) {
      this.status = "Desconectado";
      this.indicator_class = "indicator_disconnected";
    }

    return (
      <div
        className="top-bar__container"
        id={this.contact.user + "-top-bar"}
        onClick={this.minOrMaximize.bind(this)}
      >
        <img
          src={this.contact.image}
          className="top-bar__pp"
          alt="Profile"
        ></img>
        <div className="top-bar__description-container">
          <p className="top-bar__name">{this.contact.name}</p>
          <p className="top-bar__status">
            <span
              className={"top-bar__status-indicator " + this.indicator_class}
            ></span>
            {this.status}
          </p>
        </div>
        <div className="top-bar__actions-container">
          <span
            className="top-bar__min-button"
            id={this.contact.user + "-min"}
          ></span>
          <span className="top-bar__max-button"></span>
          <span
            className="top-bar__close-button"
            onClick={this.closeChat.bind(this)}
          ></span>
        </div>
      </div>
    );
  }
}

// MESSAGE BAR

class MessageBar extends React.Component {
  constructor(props) {
    super(props);

    this.contact = this.props.contact;
  }

  removeNotified() {
    globalEvents.removeNotified(this.contact.user);
  }

  render() {
    return (
      <div
        className="message-bar__container"
        id={this.contact.user + "-message-bar"}
        onClick={this.removeNotified.bind(this)}
      >
        {this.contact.messages.map((message, i) => {
          return (
            <MessageBubble
              key={i}
              user={message.user}
              message={message.message}
              time={message.time}
            />
          );
        })}
      </div>
    );
  }
}

// LOWBAR

class LowBar extends React.Component {
  constructor(props) {
    super(props);

    // Cuando se define una propiedad dentro del constructor, se debe hacer así.
    this.contact = this.props.contact;
  }

  state = {
    sendClass: "low-bar__record-button",
  };

  // Método que cambia la clase del botón enviar.
  changeButton() {
    // Valida si el input está vacio
    if (document.getElementById(this.contact.user + "-input").value !== "") {
      this.setState({
        sendClass: "low-bar__send-button",
      });
    } else {
      this.setState({
        sendClass: "low-bar__record-button",
      });
    }
  }

  sendMessage() {
    // Si el input no está vació, entonces envía.
    if (document.getElementById(this.contact.user + "-input").value !== "") {
      // Agregamos el mensaje nuevo
      this.contact.messages.push({
        user: true,
        message: document.getElementById(this.contact.user + "-input").value,
        time: globalEvents.getTime(),
      });

      // Renderizamos las burbujas otra vez
      ReactDOM.render(
        <React.StrictMode>
          {this.contact.messages.map((message, i) => {
            return (
              <MessageBubble
                user={message.user}
                message={message.message}
                time={message.time}
                key={i}
              />
            );
          })}
        </React.StrictMode>,
        document.getElementById(this.contact.user + "-message-bar")
      );

      // Actualizamos la contact card
      globalEvents.updateContactCard(this.contact.user);

      // Reseteamos el input
      document.getElementById(this.contact.user + "-input").value = "";
    }
  }

  removeNotified() {
    globalEvents.removeNotified(this.contact.user);
  }

  render() {
    return (
      <div
        className="low-bar__container"
        id={this.contact.user + "-low-bar"}
        onClick={this.removeNotified.bind(this)}
      >
        <div className="low-bar__actions-container">
          <span className="low-bar__attach-button"></span>
          <span className="low-bar__emoji-button"></span>
          <input
            type="text"
            className="low-bar__input"
            id={this.contact.user + "-input"}
            placeholder="Escriba su mensaje"
            autoComplete="false"
            onKeyUp={this.changeButton.bind(this)}
          ></input>
          <span
            className={this.state.sendClass}
            onClick={this.sendMessage.bind(this)}
          ></span>
        </div>
      </div>
    ); // La última línea del método debe tener ";"
  }
}

// MESSAGE BUBBLE

class MessageBubble extends React.Component {
  bubbleClass = "user-bubble";

  render() {
    if (!this.props.user) {
      this.bubbleClass = "other-bubble";
    }

    return (
      <div className={"bubble " + this.bubbleClass}>
        <p>{this.props.message}</p>
        <span>{this.props.time}</span>
      </div>
    );
  }
}

export default ChatWindow;
