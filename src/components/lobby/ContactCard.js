import React from "react";

// # COMPONENTS
import GlobalEvents from "../globalEvents";

let globalEvents = new GlobalEvents();

class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.contact = this.props.contactData;
  }

  classNotified = "";

  classConnected = "";

  openChat() {
    // console.log(this.contact.user);
    globalEvents.openChat(this.contact.user);
  }

  render() {
    let lastMessage = this.contact.messages.pop();
    this.contact.messages.push(lastMessage);

    if (this.contact.notified) {
      this.classNotified = " notified";
    }

    if (this.contact.connected) {
      this.classConnected = " connected";
    }

    return (
      <div
        className="contact-card__container"
        id={this.contact.user + "-contact-card"}
        onClick={this.openChat.bind(this)}
      >
        <img
          className="contact-card__pp"
          src={this.contact.image}
          alt="Profile"
        ></img>
        <p
          className={"contact-card__name" + this.classNotified}
          id={this.contact.user + "-name"}
        >
          {this.contact.name}
        </p>
        <p
          className={"contact-card__message" + this.classNotified}
          id={this.contact.user + "-last-message"}
        >
          {" "}
          {lastMessage.message}{" "}
        </p>
        <div
          className={"contact-card__message-count" + this.classNotified}
          id={this.contact.user + "-message-count"}
        ></div>
        <p className="contact-card__time" id={this.contact.user + "-time-last"}>
          {" "}
          {lastMessage.time}{" "}
        </p>
        <div className={"contact-card__status" + this.classConnected}></div>
      </div>
    );
  }
}

export default ContactList;
