class globalEvents {

  // Devuelve la hora ya formateada
  getTime() {
    let fullDate = new Date();
    let hours = fullDate.getHours();
    let minutes = fullDate.getMinutes();
    if (minutes.toString().length === 1) minutes = "0" + minutes;
    if (hours.toString().length === 1) hours = "0" + hours;
    let date = hours + ":" + minutes;

    return date;
  }

  minOrMaximize(user) {
    document.getElementById(user + "-message-bar").classList.toggle("hide");
    document.getElementById(user + "-low-bar").classList.toggle("hide");
    document.getElementById(user + "-min").classList.toggle("max-button");
  }

  // Cierra la ventana de chat
  closeChat(user) {
    document.getElementById(user + "-chat").classList.add("hide");
  }

  // Abre la ventana de chat
  openChat(user) {
    // console.log(document.getElementById(user + "-chat"));
    document.getElementById(user + "-chat").classList.remove("hide");
    document.getElementById(user + "-message-bar").classList.remove("hide");
    document.getElementById(user + "-low-bar").classList.remove("hide");
    document.getElementById(user + "-min").classList.remove("max-button");
    this.removeNotified(user);
  }

  // Quita el estado de notificado de los componentes
  removeNotified(user) {
    document.getElementById(user + "-name").classList.remove("notified");
    document
      .getElementById(user + "-last-message")
      .classList.remove("notified");
    document
      .getElementById(user + "-message-count")
      .classList.remove("notified");
    document.getElementById(user + "-top-bar").classList.remove("notified");
  }

  updateContactCard(user) {
    // Ordenamos la contact card
    document.getElementById(user + "-contact-card").style.order =
      window.messageCount;
    window.messageCount--;

    // Actualizamos el último mensaje y hora
    document.getElementById(
      user + "-last-message"
    ).innerText = document.getElementById(user + "-input").value;
    document.getElementById(user + "-time-last").innerText = this.getTime();
  }
}

export default globalEvents;
