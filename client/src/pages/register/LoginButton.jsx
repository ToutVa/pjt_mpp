import React from "react";
import '../../css/component.css';
import '../../css/login.css';

const LoginButton = (e) => {
    return (
      <button 
        className="noDrag button login-button"
        type={e.type} 
        // onClick={e.onClick}
      >
        <div className="button-text">
          {e.label}
        </div>
      </button>
    );
};

export default LoginButton;