import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

// # ASSETS
import Input from "../components/login/Input";
import Button from "../components/login/Button";
import "./styles/login.css";
import encodeLogo from "../assets/images/encode-logo.png";
import defaultPp from "../assets/images/default-pp.jpg";

var login,
  register1,
  register2,
  register3,
  singin,
  next1,
  next3,
  progress1,
  progress2,
  progress3;

export class Login extends Component {
  constructor() {
    super();

    document.getElementById("root").classList.add("body-login");

    this.registerStep = 1;

    this.state = {
      email: "",
      pass: "",
      lastName: "",
      firstName: "",
      email1: "",
      userImage: "",
      pass1: "",
      pass2: "",
    };

    this.isEmailValid = false;
    this.isPassValid = false;
    this.isEmail1Valid = false;
    this.isLastNameValid = false;
    this.isFirstNameValid = false;
    this.isPass1Valid = false;
    this.isPass2Valid = false;

    window.onload = () => this.initialize();
  }

  initialize() {
    login = document.getElementById("login");
    register1 = document.getElementById("register1");
    register2 = document.getElementById("register2");
    register3 = document.getElementById("register3");
    singin = document.getElementById("sing-in");
    next1 = document.getElementById("next1");
    next3 = document.getElementById("next3");
    progress1 = document.getElementById("progress1");
    progress2 = document.getElementById("progress2");
    progress3 = document.getElementById("progress3");

    // Comentar esto desactiva las validaciones
    singin.disabled = true;
    next1.disabled = true;
    next3.disabled = true;

    // login.classList.add("hide")
    // register3.classList.remove("hide")
  }

  // VALIDACIONES DEL SINGIN

  validateEmail() {
    const email = this.state.email;
    let isAt = false;
    let isDot = false;

    for (var i = 0; i < email.length; i++) {
      if (email.charAt(i) === "@") isAt = true;
      if (email.charAt(i) === ".") isDot = true;
    }

    if (isAt && isDot) this.isEmailValid = true;
    else this.isEmailValid = false;

    this.validateSingIn();
  }

  validatePass() {
    const pass = this.state.pass
    const MIN_LENGHT = 8
    const MAX_LENGHT = 20

    if (pass.length >= MIN_LENGHT && pass.length <= MAX_LENGHT) this.isPassValid = true;
    else this.isPassValid = false;

    this.validateSingIn();
  }

  validateSingIn() {
    if (this.isEmailValid && this.isPassValid) {
      document.getElementById("sing-in").disabled = false;
      document.getElementById("sing-in").classList.remove("disabled");
    } else {
      document.getElementById("sing-in").disabled = true;
      document.getElementById("sing-in").classList.add("disabled");
    }
  }

  // VALIDACIONES DEL REGISTRO

  validateEmail1() {
    const email = this.state.email1;
    let isAt = false;
    let isDot = false;

    for (var i = 0; i < email.length; i++) {
      if (email.charAt(i) === "@") isAt = true;
      if (email.charAt(i) === ".") isDot = true;
    }

    if (isAt && isDot) this.isEmail1Valid = true;
    else this.isEmail1Valid = false;

    this.validateRegister1();
  }

  validateLastName() {
    this.isLastNameValid = this.state.lastName.length !== "";
    this.validateRegister1();
  }

  validateFirstName() {
    this.isFirstNameValid = this.state.firstName.length !== "";
    this.validateRegister1();
  }

  validateRegister1() {
    if (this.isEmail1Valid && this.isFirstNameValid && this.isLastNameValid) {
      next1.disabled = false;
      next1.classList.remove("disabled");
    } else {
      next1.disabled = true;
      next1.classList.add("disabled");
    }

    // console.log(this.isEmail1Valid, this.isFirstNameValid, this.isLastNameValid)
  }

  validatePass1() {
    const pass = this.state.pass1;

    let isLenght = false;
    let isUpperCase = false;
    let isLowerCase = false;
    let isSpecial = false;
    let isNum = false;

    const MIN_LENGHT = 8
    const MAX_LENGHT = 20
    let upperCaseCount = 0
    let lowerCaseCount = 0
    let numCount = 0
    let specials = ['!', '"', '#', '$', '%', '&', '/', ',', '(', ')', '+', '*', '-', '_', '.', ':', ';', '<', '>', '=', '?', '¿', '¡', '@', '{', '}', '[', ']', '|', '^', '~', '´', '`']

    // Validación de tamaño
    if (pass.length >= MIN_LENGHT && pass.length <= MAX_LENGHT) {
      isLenght = true
    }

    // Validaciones generales
    for (var i = 0; i < pass.length; i++) {
      const char = pass.charAt(i)

      // Chequea si el caracter es número, mayúscula o minúscula
      if (!isNaN(char * 1)){
        numCount++
      }else{
        if (char === char.toUpperCase()) {
            upperCaseCount++
        }
        if (char === char.toLowerCase()){
            lowerCaseCount++
        }
      }

      // Valida que haya caracteres especiales
      for(let special of specials) {
        if (char === special) isSpecial = true
      }
    }

    // Valida la cantidad de caracteres requerida por cada capo
    if(numCount >= 2) isNum = true
    if(upperCaseCount >= 3) isUpperCase = true
    if(lowerCaseCount >= 2) isLowerCase = true

    if (isLenght && isNum && isUpperCase && isLowerCase && isSpecial) this.isPass1Valid = true
    else this.isPass1Valid = false

    // Compara con la pass 2
    this.validatePass2()
  }

  validatePass2() {
    if (this.state.pass2 === this.state.pass1) {
      this.isPass2Valid = true
    }
    else {
      this.isPass2Valid = false
      // Maneja los estilos del error
      let error = document.getElementById("error2")
      if (this.state.pass2.length >= this.state.pass1.length) error.classList.remove("invisible")
      else error.classList.add("invisible")
    }
    this.validateRegister3()
  }

  validateRegister3() {
    if (this.isPass1Valid && this.isPass2Valid) {
      next3.disabled = false;
      next3.classList.remove("disabled");
      progress3.classList.remove("progress3-2");
      progress3.classList.add("progress2-3");
    } else {
      next3.disabled = true;
      next3.classList.add("disabled");
      if (progress3.classList.contains("progress2-3")) {
        progress3.classList.remove("progress2-3");
        progress3.classList.add("progress3-2");
      }
    }

    // console.log(this.isPass1Valid, this.isPass2Valid)
  }

  // RESET

  resetLogin() {
    this.setState({email: "", pass: ""})
    this.isEmailValid = false;
    this.isPassValid = false;
    this.validateSingIn();
  }

  // EVENTOS

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    // El setTimeout espera a que el estado se actualice para hacer la validación.
    setTimeout(() => {
      switch (e.target.name) {
        case "email":
          this.validateEmail();
          break;
        case "pass":
          this.validatePass();
          break;
        case "email1":
          this.validateEmail1();
          break;
        case "lastName":
          this.validateLastName();
          break;
        case "firstName":
          this.validateFirstName();
          break;
        case "pass1":
          this.validatePass1();
          break;
        case "pass2":
          this.validatePass2();
          break;
        default:
          break;
      }
    }, 0);

    if (!document.getElementById("error").classList.contains("invisible")) {
        document.getElementById("error").classList.add("invisible")
    }
  };

  handleOpenFile() {
    // Abre el file explorer
    document.getElementById("input-file").click();
  }

  handleSelectedFile() {
    console.log(document.getElementById("input-file").files);
  }

  handleRegister() {
    // Deja de mostrar el login
    login.classList.add("hide");
    // Muestra el registro
    register1.classList.remove("hide");
    // Resetea el registro
    this.resetLogin();
  }

  // Maneja que se oculta, que se muestra y que clases deben cambiar
  handleBack() {
    if (this.registerStep === 1) {
      register1.classList.add("hide");
      register1.classList.remove("growt1-0");
      register1.classList.add("fade-in");
      progress1.classList.remove("progress1-0");
      login.classList.remove("hide");
    } else if (this.registerStep === 2) {
      register2.classList.add("hide");
      register2.classList.remove("growt2-1");
      register2.classList.add("growt0-1");
      register1.classList.remove("hide");
      progress2.classList.remove("progress2-1");
      progress2.classList.remove("progress3-1");
      progress2.classList.add("progress0-1");
      this.registerStep--;
    } else if (this.registerStep === 3) {
      register3.classList.add("hide");
      register2.classList.remove("hide");
      if (progress3.classList.contains("progress3-2")) {
        progress3.classList.remove("progress3-2");
        progress2.classList.remove("progress3-1");
        progress2.classList.add("progress2-1");
      }
      if (progress3.classList.contains("progress2-3")) {
        progress3.classList.remove("progress2-3");
        progress3.classList.add("progress1-3");
        progress2.classList.remove("progress2-1");
        progress2.classList.add("progress3-1");
      }
      this.registerStep--;
    }
  }

  // Maneja que se oculta y que se muestra
  handleNext() {
    console.log(this.registerStep);
    if (this.registerStep === 1) {
      register1.classList.add("hide");
      register1.classList.remove("fade-in");
      register1.classList.add("growt1-0");
      register2.classList.remove("hide");
      progress1.classList.add("progress1-0");
      this.registerStep++;
    } else if (this.registerStep === 2) {
      register2.classList.add("hide");
      register2.classList.remove("growt1-2");
      register2.classList.add("growt2-1");
      register3.classList.remove("hide");
      progress2.classList.remove("progress1-2");
      progress2.classList.add("progress2-1");
      this.registerStep++;
    }
  }

  handleSingUp = async (e) => {
    e.preventDefault();

    let singUpData = {
      mail: this.state.email1,
      nombreusuario: this.state.firstName,
      pass: this.state.pass1,
      apellidoUsuario: this.state.lastName,
      fotoUsuario: defaultPp,
    };

    console.log(singUpData);

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(singUpData),
      };

      let res = await fetch("http://localhost:4000/", config);
      let json = await res.json();
      //cambiar console.log por redireccion a chat
      console.log(json);

      //validar json no nulo antes de redireccionar y/o errores pass/mail incorrecto o usuario inexistente mostrar en
      if (true) {
        this.handleRegisterSucces();
      }
    } catch (error) { }
  };

  handleSingInDev(e) {
    e.preventDefault();

    let singInData = {
      email: this.state.email,
      pass: this.state.pass,
    };

    // window.setUser(singInData);
    // this.user = window.getUser();
    // console.log(this.user);
    this.handleSucces();
  }

  handleSingIn = async (e) => {
    e.preventDefault();

    // Genera los datos del login
    let singInData = {
      email: this.state.email,
      pass: this.state.pass,
    };

    // Intenta hacer la conexión con la API
    try {

      // Configuración de la consulta de la API
      let config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.singInData),
      };

      // Función que hace la consulta a la API
      let res = await fetch(
        "http://localhost:4000/" + this.state.email + "/" + this.state.pass,
        config
      );

      // Resultado de la consulta a la API
      let json = await res.json();

      if(json.CodeStatus === "200") {
        let userData = json.rows[0]
        this.handleSucces(userData)
      } else if(json.CodeStatus === "400") {
        this.handleError()
      }
    } catch (error) {console.log(error) }
  };

  handleError() {
    document.getElementById("error").classList.remove("invisible");
  }

  handleSucces(userData) {
    sessionStorage.setItem("userData", JSON.stringify(userData));
    window.location.href = "/lobby";
  }

  // Lanza una alerta de éxito al crear la cuenta y redirije al login
  handleRegisterSucces() {
    swal(
      "Cuenta creada exitosamente!",
      "Por favor inicia sesión",
      "success"
    ).then(() => (window.location.href = "/login"));
  }

  render() {
    return (
      <main>
        {/* LOGIN */}
        <section className="login-box fade-in" id="login">
          <img
            src={encodeLogo}
            className="login-box__image"
            alt="Logo Encode"
          />
          <hr className="login-box__separator" />
          <form
            className="login-box__form"
            action=""
            onSubmit={this.handleSingInDev}
          >
            <Input
              inputLabel="E-mail"
              inputName="email"
              inputType="email"
              handleChange={this.handleChange.bind(this)}
              value={this.state.email}
            />
            <Input
              inputLabel="Clave"
              inputName="pass"
              inputType="password"
              handleChange={this.handleChange.bind(this)}
              value={this.state.pass}
            />
            <p className="login-box__error invisible" id="error">
              Email y/o contraseña incorrectos
            </p>
            <Button
              buttonClass="login-box__button primary long disabled"
              buttonType="button"
              buttonId="sing-in"
              buttonValue="INGRESAR"
              eventOnClick={this.handleSingIn.bind(this)}
            />
          </form>
          <Link
            className="login-box__a"
            to="/login"
            onClick={this.handleRegister.bind(this)}
          >
            ¿No tienes cuenta?
          </Link>
          <Link className="login-box__a forgot" to="/login">
            Blanqueo de clave
          </Link>
        </section>

        {/* REGISTER (1/3) */}
        <section className="login-box border-none fade-in hide" id="register1">
          <div className="login-box__progress-bar" id="progress1"></div>
          <p className="login-box__tittle">Nueva Cuenta</p>
          <form className="login-box__form" action="">
            <Input
              inputLabel="E-mail"
              inputName="email1"
              inputType="email"
              handleChange={this.handleChange.bind(this)}
              value={this.state.email1}
            />
            <Input
              inputLabel="Apellido"
              inputName="lastName"
              inputType="text"
              handleChange={this.handleChange.bind(this)}
              value={this.state.lastName}
            />
            <Input
              inputLabel="Nombre"
              inputName="firstName"
              inputType="text"
              handleChange={this.handleChange.bind(this)}
              value={this.state.firstName}
            />
          </form>
          <div className="login-box__button-container">
            <Button
              buttonClass="login-box__button secondary left"
              buttonType="button"
              buttonId="back"
              buttonValue="VOLVER"
              eventOnClick={this.handleBack.bind(this)}
            />
            <Button
              buttonClass="login-box__button primary right disabled"
              buttonType="button"
              buttonId="next1"
              buttonValue="SIGUIENTE"
              eventOnClick={this.handleNext.bind(this)}
            />
          </div>
        </section>

        {/* REGISTER (2/3) */}
        <section className="login-box border-none growt0-1 hide" id="register2">
          <div
            className="login-box__progress-bar progress0-1"
            id="progress2"
          ></div>
          <p className="login-box__tittle">Nueva Cuenta</p>
          <p className="login-box__pp-description">Foto de perfil (Opcional)</p>
          <div
            className="login-box__pp-container"
            onClick={this.handleOpenFile.bind(this)}
          ></div>
          <input
            className="hide"
            type="file"
            id="input-file"
            accept="image/png, image/jpeg"
            onChange={this.handleSelectedFile.bind(this)}
          ></input>
          <div className="login-box__button-container">
            <Button
              buttonClass="login-box__button secondary left"
              buttonType="button"
              buttonId="back"
              buttonValue="VOLVER"
              eventOnClick={this.handleBack.bind(this)}
            />
            <Button
              buttonClass="login-box__button primary right"
              buttonType="button"
              buttonId="next2"
              buttonValue="SIGUIENTE"
              eventOnClick={this.handleNext.bind(this)}
            />
          </div>
        </section>

        {/* REGISTER (3/3) */}
        <section className="login-box border-none growt1-2 hide" id="register3">
          <div
            className="login-box__progress-bar progress1-2"
            id="progress3"
          ></div>
          <p className="login-box__tittle">Nueva Cuenta</p>
          <form className="login-box__form" action="">
            <Input
              inputLabel="Clave"
              inputName="pass1"
              inputType="password"
              handleChange={this.handleChange.bind(this)}
              value={this.state.pass1}
            />
            <Input
              inputLabel="Confirmar Clave"
              inputName="pass2"
              inputType="password"
              handleChange={this.handleChange.bind(this)}
              value={this.state.pass2}
            />
            <p className="login-box__error invisible" id="error2">
              Las contraseñas no coinciden
            </p>
          </form>
          <div className="login-box__button-container">
            <Button
              buttonClass="login-box__button secondary left"
              buttonType="button"
              buttonId="back"
              buttonValue="VOLVER"
              eventOnClick={this.handleBack.bind(this)}
            />
            <Button
              buttonClass="login-box__button primary right disabled"
              buttonType="submit"
              buttonId="next3"
              buttonValue="TERMINAR"
              eventOnClick={this.handleSingUp.bind(this)}
            />
          </div>
        </section>
      </main>
    );
  }
}

export default Login;
