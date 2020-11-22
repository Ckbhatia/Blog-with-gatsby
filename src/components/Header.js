import React, { useContext, useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import "../assets/main.scss";
import { GoSearch } from "react-icons/go";
import { MdWbSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";
import styled from "styled-components";
import Context from "../context";

export default function Header() {
  const { isDay, toggleDay } = useContext(Context);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allContentfulBlogPost {
        edges {
          node {
            topic
          }
        }
      }
    }
  `);

  const topics = useMemo(() => {
    const nodesTopics = data.allContentfulBlogPost.edges.map(edge =>
      edge.node.topic.toLowerCase()
    );
    //removes duplicate entries;
    return [...new Set(nodesTopics)];
  }, [data.allContentfulBlogPost]);

  const handleClick = () => {
    localStorage.setItem("day", JSON.stringify(isDay));
    toggleDay(() => !isDay);
  };

  return (
    <Div className="navbar-main-container">
      <Navbar bg="transparent" expand="lg">
        <Navbar.Brand href="/">
          <h1
            className={`navbar-main-heading-text heading-${
              isDay ? "light" : "dark"
            }`}
          >
            {data.site.siteMetadata.title}'s{" "}
            <span className="header-blog-text">blog</span>
          </h1>
        </Navbar.Brand>
        {/* TEMP BlOCK */}
        {/* <Navbar.Toggle
          aria-controls="basic-navbar-nav"
        /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        <Nav className="mr-auto">
          <NavDropdown
            title="Topics"
            id="basic-nav-dropdown"
            className={`nav-dropdown text-${isDay ? "light" : "dark"}`}
          >
            {topics.map(topic => (
              <NavDropdown.Item href={`/topic/${topic}`} key={topic}>
                {topic}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
        <Form inline>
          <Button className="search-btn" variant="outline-success">
            <GoSearch />
          </Button>
          <FormControl
            type="text"
            placeholder="SEARCH"
            className={`mr-sm-2 form-control form-${isDay ? "light" : "dark"}`}
          />
        </Form>
        <div className="mode-toggler-container">
          {isDay ? (
            <button
              aria-label="Activate dark mode"
              title="Activate dark mode"
              onClick={handleClick}
              className="mode-toggle-btn btn-light"
            >
              <IoIosMoon />
            </button>
          ) : (
            <button
              aria-label="Activate light mode"
              title="Activate light mode"
              onClick={handleClick}
              className="mode-toggle-btn btn-dark"
            >
              <MdWbSunny />
            </button>
          )}
        </div>
        {/* </Navbar.Collapse> */}
      </Navbar>
    </Div>
  );
}

const Div = styled.div`
  margin: 0 2rem;
  @media screen and (max-width: 440px) {
    // Reset margin
    margin: 0;
  }
  .navbar-main-heading-text {
    font-family: "Roboto", sans-serif;
    // font-family: "Source Serif Pro", serif;
    font-size: 1.5rem;
    letter-spacing: 0.01rem;
    font-weight: 700;
    text-transform: lowercase;
    .header-blog-text {
      color: #12ab87;
    }
  }

  // TEMP HIDDEN
  .basic-navbar,
  .form-control,
  .search-btn {
    display: none;
  }

  .navbar-light .navbar-toggler {
    background-color: #fafafc;
    border-color: transparent;
    border-radius: 5px;
  }

  .dropdown-menu {
    font-size: 0.8rem;
    text-transform: uppercase;
    .dropdown-item {
      padding-bottom: 0.4rem;
      padding-top: 0.4rem;
    }
  }

  // Drop down toggle
  .text-light > .dropdown-toggle {
    color: rgba(0, 0, 0, 0.5);
  }

  .text-dark > .dropdown-toggle {
    color: #dddddd;
    &:hover,
    &:focus {
      color: #fff;
    }
  }

  .nav-link {
    font-family: "Roboto", sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .btn-outline-success {
    color: #3b3e4d;
    border: none;
    outline: 0;
    &:hover {
      color: darkgrey;
      background-color: transparent;
    }
    &:focus {
      background-color: transparent;
      // RESET
      box-shadow: 0 0 0;
    }
  }

  .form-control {
    // RESET
    box-shadow: 0 0 0;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    &:focus {
      border: 1px solid #89898b;
    }
  }

  .form-dark {
    background-color: #131217;
    color: white;
  }

  // Toggle Button
  .mode-toggle-btn {
    background-color: transparent;
    border: none;
    outline: none;
    margin: 0.8rem 0;
    &:focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
  }
`;
