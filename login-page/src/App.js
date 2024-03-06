import React, { useState } from "react";
import "./App.css";
import open from "./assets/images/eye-open.png";
import close from "./assets/images/eye.png";
function App() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="outer-box">
      <div className="container">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
            />
            <button
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? (
                <img src={close} width={24} />
              ) : (
                <img src={open} width={24} />
              )}
            </button>
          </div>
        </div>
        <button className="btn">Login</button>
      </div>
    </div>
  );
}

export default App;
