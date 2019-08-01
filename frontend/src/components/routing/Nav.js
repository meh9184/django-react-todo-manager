import React, {Fragment} from 'react';
import {Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

// 메뉴 컴포넌트
const NavBar = ({isAuthenticated, username, handleLogout}) => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          {isAuthenticated
            ? <Link to="/">{username}</Link>
            : 'JWT-Todo-Demo Client'
          }
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {isAuthenticated
            ? <NavItem onClick={handleLogout}>Logout</NavItem>
            : <Fragment>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </Fragment>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
