import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./LoginForm.css"
import GoogleLoginButton from "./GoogleLoginButton";


// presentational component, only a stateless function
// gets props by destructuring the props object
// note that the input fields use the props to render their value attribute
const LoginForm = ({
    username, password, 
    handleChangeUsername,  
    handleChangePassword, 
    handleSubmit,
    handleGoogleSignIn,
    validate,
    isAuthenticated
  }) => {
    return (
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              value={username}
              onChange={handleChangeUsername}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={password}
              onChange={handleChangePassword}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!validate(username, password)}
            type="submit"
          >
            Login
          </Button>    

          <div className="Login-google">
            <GoogleLoginButton
              onSignIn={handleGoogleSignIn}
              isAuthenticated={isAuthenticated}
            />
          </div>

          
        </form>

      </div>
    );
  }

export default LoginForm;
