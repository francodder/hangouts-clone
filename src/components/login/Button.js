import React, { Component } from "react";

// # ASSETS
import "./styles/button.css";

export class Button extends Component {
  render() {
    const {
      buttonClass,
      buttonType,
      buttonId,
      buttonValue,
      eventOnClick,
    } = this.props;

    return (
      <React.Fragment>
        <input
          type={buttonType}
          className={buttonClass}
          id={buttonId}
          value={buttonValue}
          onClick={eventOnClick}
        />
      </React.Fragment>
    );
  }
}

export default Button;
