import React from "react";

import classes from "./styles.module.css";

const Errors = ({ errors }) => {
  if (errors !== undefined) {
    return (
      <ul className={classes.errorComponent}>
        <li key={Date.now()}>{errors}</li>
      </ul>
    );
  }
  return <div></div>;
};

export default Errors;
