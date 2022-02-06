import aguspp from "./agus-pp.jpg";
import crispp from "./cris-pp.jpg";
import nicopp from "./nico-pp.jpg";
import santipp from "./santi-pp.jpg";
import rodripp from "./rodri-pp.jpg";

// Agus data
var agus = {
  user: "agus",
  name: "Agus Nicolás",
  image: aguspp,
  notified: true,
  connected: true,

  messages: [
    {
      user: true,
      message: "Hola papá, te mando un videito para que veas.",
      time: "16:47",
    },
    {
      user: true,
      message: "https://www.youtube.com/watch?v=qvUWA45GOMg&list",
      time: "16:48",
    },
  ],
};

// Cris data
var cris = {
  user: "cris",
  name: "Cristian Sánchez",
  image: crispp,
  notified: false,
  connected: true,

  messages: [
    { user: false, message: "Pudiste contectarte a la VPN", time: "12:30" },
    { user: true, message: "No che, sigo teniendo problemas", time: "12:36" },
    { user: true, message: "Podes venir a configurarla?", time: "12:36" },
  ],
};

// Nico data
var nico = {
  user: "nico",
  name: "Nicolás Giovana",
  image: nicopp,
  notified: true,
  connected: false,

  messages: [
    { user: false, message: "Mensaje 1", time: "09:30" },
    { user: false, message: "Mensaje 2 pero más largo.", time: "09:30" },
    {
      user: false,
      message: "Mensaje 3 y está vez es mucho pero mucho más largo.",
      time: "09:31",
    },
  ],
};

// Santi data
var santi = {
  user: "santi",
  name: "Santiago Mansilla",
  image: santipp,
  notified: false,
  connected: false,

  messages: [
    {
      user: false,
      message: "Hey ther, I'm using Encodesa chat.",
      time: "09:20",
    },
  ],
};

// Rodri data
var rodri = {
  user: "rodri",
  name: "Rodrigo Rosales",
  image: rodripp,
  notified: false,
  connected: true,

  messages: [
    {
      user: false,
      message: "Hey there, I'm using Encodesa chat.",
      time: "09:00",
    },
  ],
};

let contacts = [agus, cris, nico, santi, rodri];

export default contacts;
