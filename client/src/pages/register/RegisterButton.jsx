import React from "react";
import '../../css/component.css';
import '../../css/login.css';
import { Link } from 'react-router-dom';

const LoginButton = (e) => {
    return (
      <div 
        className="noDrag button register-button"
      >
        <Link to= '/sign' className="links button-text">{e.label}</Link>
      </div>
    );
};

export default LoginButton;