import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";
import styled from "styled-components";

const Navbar = styled.nav`
  min-height: 8vh;
  width: 100%;
  margin: auto;
  position: relative;
  display: grid;
  grid-template-columns: 3fr 6fr 3fr;
  background-color: white;

  ul {
    display: flex;
    align-items: center;
    list-style: none;

    li {
      font-weight: 700;

      a {
        text-decoration: none;
      }
    }
  }
`;

const NavbarLeft = styled.ul`
  justify-content: center;

  li {
    font-size: 5rem;

    a {
      color: #588a72;
    }
  }
`;

const NavbarCenter = styled.ul`
  justify-content: space-evenly;
  align-items: center;

  li {
    font-size: 2rem;

    a {
      color: black;
    }
  }
`;

const NavbarRight = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  li {
    font-size: 2rem;
    margin-left: 1.5rem;
    color: black;

    a {
      color: black;
    }
  }

  li:nth-child(2),
  button {
    background: #588a72;
    color: white;
    padding: 1rem;
    border-radius: 10%;
  }

  button {
    font-size: 1.5rem;
    color: white;
    border: none;
    display: inline-block;
    margin-left: 1rem;
  }
`;

const Layout = ({ children, match, history }) => {
  const nav = () => (
    <Navbar>
      <NavbarLeft>
        <li>
          <Link to="/">OSE</Link>
        </li>
      </NavbarLeft>
      <NavbarCenter>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/blogs">Blog</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/donate">Donate</Link>
        </li>
      </NavbarCenter>
      {!isAuth() && (
        <NavbarRight>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
          <li>
            <Link to="/signup">Get Started</Link>
          </li>
        </NavbarRight>
      )}

      {isAuth() && isAuth().role === "admin" && (
        <NavbarRight>
          <li>
            <Link to="/admin">{isAuth().name}</Link>
          </li>
          <button
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </button>
        </NavbarRight>
      )}

      {isAuth() && isAuth().role === "user" && (
        <NavbarRight style={{ justifyContent: "center" }}>
          <li>
            <Link to="/user">{isAuth().name}</Link>
          </li>
          <button
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </button>
        </NavbarRight>
      )}
    </Navbar>
  );

  return (
    <React.Fragment>
      {nav()}
      <div className="container">{children}</div>
    </React.Fragment>
  );
};

export default withRouter(Layout);
