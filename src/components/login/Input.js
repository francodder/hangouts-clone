import React, { Component } from "react";

// # ASSETS
import "./styles/input.css";

export class Input extends Component {
  render() {
    const {
      inputName,
      inputLabel,
      inputType,
      handleChange,
      value,
    } = this.props;
    return (
      <div className="login-box__row">
        <label htmlFor={inputName}>
          <span>{inputLabel}</span>
          <br />
          <input
            type={inputType}
            className="login-box__input"
            id={inputName}
            name={inputName}
            spellCheck="false"
            autoComplete="off"
            onChange={handleChange}
            value={value}
          />
        </label>
      </div>
    );
  }
}

export default Input;
