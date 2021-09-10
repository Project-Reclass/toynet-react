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
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ReclassLogo from '../assets/PR-Icon-Square-White.png';
import { Icon, Avatar, Flex, Stack } from '@chakra-ui/core';
import styled from '@emotion/styled';

interface StyledNavProps {
  isMenuOpen: boolean;
};

const StyledNav = styled.nav`
  z-index: 3;
  height: 100vh;
  position: fixed;
  left: 0;
  background: rgb(24, 21, 21);
  transition: width 200ms ease;
  width: ${({ isMenuOpen }: StyledNavProps) => isMenuOpen ? '10rem' : '5rem'};

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const StyledLogo = styled.li`
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  top: 0;
  margin-bottom: 4rem;
  color: red;
`;

const StyledNavItem = styled.li`
  margin-top: auto;
  transition: .1s all linear;

  &:hover {
    color: white;
    border-left: solid 3px teal;
  }
`;

const StyledNavIcon = styled.div`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  height: 3rem;
  text-decoration: none;
  cursor: pointer;

  opacity: 0.9;
  transition: opacity 100ms;

  &:hover {
    stroke-width: 0;
    stroke: #fff;
    opacity: 0.95;
  }
`;

const StyledSvg = styled.span`
  margin: 0 0.30rem;

  &:hover {
   cursor: pointer;
  }
`;

const StyledLinkText = styled.span`
  color: white;
  filter: grayscale(100%) opacity(0.7);
  transition: color 200ms;

  transition: opacity 200ms;
  white-space: nowrap;
  visibility: ${({ isMenuOpen }: StyledNavProps) => isMenuOpen ? 'visible' : 'hidden'};
  opacity: ${({ isMenuOpen }: StyledNavProps) => isMenuOpen ? '1' : '0'};

  &:hover {
    filter: grayscale(0%) opacity(1);
    text-decoration: none;
    color: white;
  }
`;

const Sidebar = () => {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [enableHref, setEnableHref] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(prevMenu => !prevMenu);
    setEnableHref(prevEnableHref => !prevEnableHref);
  }

  const goToPageOnEnableHref = (path: string) => {
    if (enableHref) {
      history.push(path);
    }
  };

  return (
    <StyledNav isMenuOpen={isMenuOpen} onClick={toggleMenu} onMouseOver={toggleMenu} onMouseOut={toggleMenu}>
      <Flex direction='column' justifyContent='space-between' height='100%' paddingY='1rem'>
        <Stack spacing={3}>
          <StyledNavIcon onClick={() => goToPageOnEnableHref('/blank')}>
            <Avatar src={ReclassLogo} marginBottom='1rem'/>
          </StyledNavIcon>
          <StyledNavIcon>
            <StyledSvg> <Icon name='calendar' size='30px'/> </StyledSvg>
            <StyledLinkText isMenuOpen={isMenuOpen}>
              Curriculum
            </StyledLinkText>
          </StyledNavIcon>
        </Stack>
        <Stack spacing={3}>
          <StyledNavItem onClick={() => goToPageOnEnableHref('/blank')}>
            <StyledNavIcon>
              <StyledSvg> <Icon name='settings' size='30px'/> </StyledSvg>
              <StyledLinkText isMenuOpen={isMenuOpen}>
                Profile
              </StyledLinkText>
            </StyledNavIcon>
          </StyledNavItem>
          <StyledNavItem onClick={() => goToPageOnEnableHref('/blank')}>
            <StyledNavIcon>
              <StyledSvg>  <Icon name='question' size='30px'/> </StyledSvg>
              <StyledLinkText isMenuOpen={isMenuOpen}>
                FAQ
              </StyledLinkText>
            </StyledNavIcon>
          </StyledNavItem>
          <StyledNavItem onClick={() => goToPageOnEnableHref('/blank')}>
            <StyledNavIcon>
              <StyledSvg>  <Icon name='arrow-left' size='30px'/> </StyledSvg>
              <StyledLinkText isMenuOpen={isMenuOpen}>
                Log Out
              </StyledLinkText>
            </StyledNavIcon>
          </StyledNavItem>
        </Stack>
      </Flex>
    </StyledNav>
  );
};

export default Sidebar;