import React, { Component } from "react";
import SignupForm from "../components/auth/SignupForm";

// 구글 계정으로 로그인하지 않는 경우 회원 생성 로직을 수행하는 컴포넌트
export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  validateForm(username, password) {
    return (username && username.length > 0) && (password && password.length > 0);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleSubmit(submitEvent) {
    let data = {
      username: this.state.username,
      password: this.state.password
    };

    submitEvent.preventDefault();

    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch('http://localhost:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      if (json.username && json.token) {
        this.props.userHasAuthenticated(true, json.username, json.token);
        this.props.history.push("/");
      }
    })
    .catch(error => alert(error));
  }

  render() {
    return (
      <SignupForm
        username={this.state.username}
        password={this.state.password}
        handleChangeUsername={e => this.handleChange(e)}
        handleChangePassword={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
        validate={this.validateForm}
      />
    );
  }
}
