import React, { Component, Fragment } from "react";
import LoginForm from "../components/auth/LoginForm";

// 로그인 로직을 수행하는 컴포넌트
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  // 만약 유저가 이미 로그인된 상태라면 home으로 이동
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

  // 구글 로그인 버튼을 클릭한 경우 로직
  // 처음 로그인을 시도하는 경우라면 구글 리소스 서버로부터 받은 정보를 이용하여 서버에 User 생성하고 로그인
  // 이미 로그인을 시도한 적 있는 경우라면 서버로부터 해당 정보를 받아와 로그인
  handleGoogleSignIn(googleUser) {
    
    let profile = googleUser.getBasicProfile();

    let username = profile.getName();
    let email = profile.getEmail();
    let id_token = profile.getId();
    let firstname = profile.getGivenName()
    let lastname = profile.getFamilyName()

    // let access_token = googleUser.getAuthResponse().id_token;
    
    // console.log('username: ' + username);
    // console.log('email: ' + email);
    // console.log('id_token: ' + id_token);
    // console.log('access_token: ' + access_token);
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());

    let data = {
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: id_token,
      provider: 'google'
    };

    // 서버에 Google 계정 저장돼 있지 않다면 Create 작업 수행
    fetch('http://localhost:8000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      
      if (json.username && json.token) {

        // console.log('token: ' + json.token);

        this.props.userHasAuthenticated(true, json.username, json.token);
        this.props.history.push("/");

      }else{

        // 서버에 Google 계정 이미 저장돼 있다면 Login 작업 수행
        // 로그인을 시도하기 전에 서버에 접근하기 위한 access token을 발급 받음
        fetch('http://localhost:8000/login/', {  
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {

          // 발급 완료 되었다면 해당 토큰을 클라이언트 Local Storage에 저장
          if (json.user && json.user.username && json.token) {

            // console.log('token: ' + json.token);
        
            this.props.userHasAuthenticated(true, json.user.username, json.token);
            this.props.history.push("/");

          }
        })
        .catch(error => {
          console.log(error);
          window.gapi && window.gapi.auth2.getAuthInstance().signOut();
        });   

      }

    })
    .catch(error => {
      console.log(error);
      window.gapi && window.gapi.auth2.getAuthInstance().signOut();
    });  

    
  }

  // 서버에 등록되어있는 회원 정보로 로그인을 시도하는 경우
  handleSubmit(submitEvent) {

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

    // 서버로부터 새로운 access token 발급받음
    fetch('http://localhost:8000/login/', {  
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      // 발급 완료 되었다면 해당 토큰을 클라이언트 Local Storage에 저장
      if (json.user && json.user.username && json.token) {
        this.props.userHasAuthenticated(true, json.user.username, json.token);
        this.props.history.push("/");
      }
    })
    .catch(error => alert(error));
  }

  render() {
    return (
      <Fragment>
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          handleChangeUsername={e => this.handleChange(e)}
          handleChangePassword={e => this.handleChange(e)}
          handleSubmit={e => this.handleSubmit(e)}
          handleGoogleSignIn={e => this.handleGoogleSignIn(e)}
          validate={this.validateForm}
        />

      </Fragment>

    );
  }
}
