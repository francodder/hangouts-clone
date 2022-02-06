import React from "react";
// import ReactDOM from "react-dom";

// # COMPONENTS
import ChatWindow from "../components/lobby/ChatWindow";
import ContactList from "../components/lobby/ContactList";
import Contacts from "../components/lobby/temp/Contacts";
import User from "../components/lobby/temp/User";

// # ASSETS
import "./styles/lobby.css";

// # JAVASCRIPT

class Lobby extends React.Component {
  constructor() {
    super();

    document.getElementById("root").classList.add("body-lobby");
    this.getUser();
  }

  // Obtiene los datos del usuario para iniciar la sala
  getUser() {
    this.user = JSON.parse(sessionStorage.getItem("userData"));
    if(this.user) {
      console.log(this.user);

    // Si el usuario no está logueado
    } else {
      // window.location.href = "/login";
    }
    
  }

  render() {
    return (
      <>
        <div className="aside">
          <ContactList userData={User} contacts={Contacts} />
        </div>
        <div className="bottom">
          {Contacts.map((contact, i) => {
            return <ChatWindow key={i} contact={contact} />;
          })}
        </div>
      </>
    );
  }
}

export default Lobby;
