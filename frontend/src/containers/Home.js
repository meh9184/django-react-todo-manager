import React, { Component } from "react";
import TodoList from "../components/todos/TodoList";
import "./Home.css";


export default class Home extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    // todo api를 요청하기 위해 현재 access 토큰을 보내 타당한지 확인하고, 타탕하다면 해당 리소스 접근
    // 타당성 확인은 서버측에서 담당
    fetch('http://localhost:8000/todo/', {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      this.setState({
        todos: json
      });
    })
    .catch(error => alert(error));
}

  render() {
    return (
      <div className="Home">
        <h3>Hi, {this.props.username}</h3>
        <div className="lander">
          <hr/>
          <TodoList
            data={this.state.todos}
          />
        </div>
      </div>
    );
  }
}
