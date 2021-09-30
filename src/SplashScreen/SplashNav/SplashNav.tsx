/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
import React from 'react';
import logo from 'src/assets/PR-Logo-Long-FullColor.png';
import {NavLink, LogoLink, Logo, Container, Nav, Header, NavLinksContainer, NavItem} from './SplashNavStyles';




function SplashNav() {
  return (
    <Header>
      <Container>
          <LogoLink href="https://www.projectreclass.org">
            <Logo src={logo} alt='logo' />
          </LogoLink>
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
            {/* <NavItem>
              <Login>Log in</Login>
            </NavItem>
             <NavItem>
              <SignUp href='#signup'>Sign up</SignUp>
            </NavItem>  */}
          </NavLinksContainer>
        </Nav>
      </Container>
    </Header>
  );
}

export default SplashNav;

