import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./SignupForm.css"

// 구글로 로그인하지 않고 서버에 직접 회원 등록하는 경우 폼
const SignupForm = ({username, password, handleChangeUsername, handleChangePassword, handleSubmit, validate}) => {
    return (
      <div className="Signup">
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
            Signup
          </Button>
        </form>
      </div>
    );
  }

export default SignupForm;
