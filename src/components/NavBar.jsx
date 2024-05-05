import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

const ExternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }

  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const InternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }

  &::after {
    background-color: ${(props) => props.theme.accentColor};
  }

  &.navbar__link--active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navbarRef = useRef(null);
  const prevScrollPos = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos.current > currentScrollPos;

      if (navbarRef.current) {
        navbarRef.current.style.transform = visible ? 'translateY(0)' : 'translateY(-200px)';
      }

      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('NavBar fetch error:', err));
  }, []);

  const handleClick = (e, sectionId, index) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth', block: "start" });
    setExpanded(false);
    setActiveIndex(index);
  };

  return (
    <Navbar
      ref={navbarRef}
      fixed="top"
      expand="md"
      bg="dark"
      variant="dark"
      className="navbar-custom"
      expanded={expanded}
    >
      <Container>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            {data &&
              data.sections?.map((section, index) =>
                section?.type === 'link' ? (
                  <ExternalNavLink
                    key={section.title}
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setExpanded(false)}
                    className="navbar__link"
                    theme={theme}
                  >
                    {section.title}
                  </ExternalNavLink>
                ) : (
                  <InternalNavLink
                    key={section.title}
                    onClick={(e) => handleClick(e, section.href, index)}
                    className={`navbar__link ${activeIndex === index ? 'navbar__link--active' : ''}`}
                    theme={theme}
                  >
                    {section.title}
                  </InternalNavLink>
                )
              )}
          </Nav>
          <ThemeToggler onClick={() => setExpanded(false)} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
