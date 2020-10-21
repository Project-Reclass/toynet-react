import React from 'react';
import logo from 'src/assets/PR-Logo-Long-FullColor.png';
import {Login, SignUp, NavLink, Logo, Container, Nav, Header, NavLinksContainer, NavItem} from './SplashNavStyles';




function SplashNav() {
  return (
    <Header>
      <Container>
        <div style={{ maxWidth: '25%' }}>
          <a href="https://www.projectreclass.org">
            <Logo src={logo} alt='logo' />
          </a>
        </div>
        <Nav>
          <NavLinksContainer>
            <NavItem>
              <NavLink href='#home'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#about'>About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='#contact'>Contact</NavLink>
            </NavItem>
            <NavItem>
              <Login>Log in</Login>
            </NavItem>
            <NavItem>
              <SignUp href='#signup'>Sign up</SignUp>
            </NavItem>
          </NavLinksContainer>
        </Nav>
      </Container>
    </Header>
  );
}

export default SplashNav;

