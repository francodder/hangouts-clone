import React from "react";

// # ASSETS
import "./styles/contacts.css";

// # COMPONENTS
import ContactCard from "./ContactCard";

class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.user = this.props.userData;
    this.contactList = this.props.contacts;
  }

  minOrMaximize() {
    document.getElementById("contact-list").classList.toggle("hide");
    document.getElementById("user-min").classList.toggle("max-button");
  }

  render() {
    return (
      <div className="contact-section">
        <div
          className="user-data__conatiner"
          onClick={this.minOrMaximize.bind(this)}
        >
          <img className="user-data__pp" src={this.user.image} alt="User"></img>
          <p className="user-data__name">{this.user.name}</p>
          <span
            className="user-data__min-button max-button"
            id="user-min"
          ></span>
        </div>
        <div className="contact-list__container hide" id="contact-list">
          {this.contactList.map((contact, i) => {
            return <ContactCard key={i} contactData={contact} />;
          })}
        </div>
      </div>
    );
  }
}

export default ContactList;
