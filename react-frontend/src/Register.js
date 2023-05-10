import './styles/login.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef } from "react"
import {useNavigate} from 'react-router-dom'

function Register (props) {
  let [authMode, setAuthMode] = useState("login")
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);

  const navigate = useNavigate();


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    //return true;
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formIsValid = true;
    if (!validateEmail(email)) {
      setShowEmailError(true);
      formIsValid = false;
    } else {
      setShowEmailError(false);
    }
    if (!validatePassword(password)) {
      setShowPasswordError(true);
      formIsValid = false;
    } else {
      setShowPasswordError(false);
    }
    if (!validateConfirmPassword(password, confirmPassword)) {
      setShowConfirmPasswordError(true);
      formIsValid = false;
    } else {
      setShowConfirmPasswordError(false);
    }
    if (formIsValid) {
      // Submit form data if validation passes
      let response = await props.createUser(fullName, email, password);
      if(response.status == 201){
        navigate('/');
      }
      //setShowRegistrationSuccess(true);
      clearAll();
      
    }
  };

  function clearAll(){
    setFullName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="Login-form-container">
      <form className="Login-form" onSubmit={handleSubmit}>
        <div className="Login-form-content">
          <h3 className="Login-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <a className="link-primary"href="/login">Sign In</a>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="First and last name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder=""
              value={email}
              onChange={(event) => {setEmail(event.target.value); setShowEmailError(false);}}
            />
          </div>
          {showEmailError && <div className="error-message">Invalid email address</div>}
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="at least 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {showPasswordError && (
            <div className="error-message">Password must be at least 8 characters long</div>
          )}
          <div className="form-group mt-3">
            <label>Re-enter password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder=""
              value={confirmPassword}
              onChange={(event) => {setConfirmPassword(event.target.value); setShowConfirmPasswordError(false);}}
            />
            
          </div>
          {showConfirmPasswordError && (
            <div className="error-message">Passwords do not match</div>
          )}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register;