import React from 'react';
import logo from 'src/assets/PR-Logo-Long-FullColor.png';
import {Login, SignUp, NavLink, Img, Container, Nav, Header, Ul, Li} from './SplashNavStyles';




function SplashNav() {
  return (
    <Header>
      <Container>
        <div style={{ maxWidth: '25%' }}>
          <a href="https://www.projectreclass.org">
            <Img src={logo} alt='logo' style={{ width: '65%', height: 'auto' }} />
          </a>
        </div>
        <Nav>
          <Ul>
            <Li>
              <NavLink href='#home'>Home</NavLink>
            </Li>
            <Li>
              <NavLink href='#about'>About</NavLink>
            </Li>
            <Li>
              <NavLink href='#contact'>Contact</NavLink>
            </Li>
            <Li>
              <Login>Log in</Login>
            </Li>
            <Li>
              <SignUp href='#signup'>Sign up</SignUp>
            </Li>
          </Ul>
        </Nav>
      </Container>
    </Header>
  );
}

export default SplashNav;

