import React from 'react';

import './Button.css';

const button = props => {
  const cssClasses = [
    "Button",
    props.btnType ? props.btnType : "Default"
  ];
    return (
      <button
        className={cssClasses.join(' ')} 
        type= {props.noSubmit === "true" ? "button" : "submit"} 
        onClick={props.clicked}>{props.children}</button>
    ); 
};

export default button;