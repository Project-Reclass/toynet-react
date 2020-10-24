import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {ReactComponent as FolderIcon} from '../assets/headerIcons/folderIcon.svg';
import {ReactComponent as AccountIcon} from '../assets/headerIcons/accountIcon.svg';
import {ReactComponent as HelpIcon} from '../assets/headerIcons/helpIcon.svg';
import {ReactComponent as LogIcon} from '../assets/headerIcons/logIcon.svg';

import styled from '@emotion/styled';

const Header = () => {
  const history = useHistory();
  const [menu, setMenu] = useState(false);
  const [enableHref, setEnableHref] = useState(false);

  function toggleMenu() {
    setMenu(prevMenu => !prevMenu);
    setEnableHref(prevEnableHref => !prevEnableHref);
  }

  const goToPageOnEnableHref = (path: string) => {
    if (enableHref) {
      history.push(path);
    }
  };



const width = menu ? '14rem' : '3rem';
const StyledNav = styled.nav`
  z-index: 3;
  height: 100vh;
  position: fixed;
  left: 0;
  background: rgb(24, 21, 21);
  transition: width 200ms ease;
  width: ${width};

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
  margin-bottom: 15rem;
  color: red;
`;

const StyledNavItem = styled.li`
  margin-top: auto;

  &:hover {
    color: white;
    border-left: solid 3px green;
  }
`;

const StyledNavIcon = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  text-decoration: none;
  cursor: pointer;

  stroke-width: 2;
  stroke: grey;
  opacity: 0.5;
  transition: opacity 100ms;

  &:hover {
    stroke-width: 2.5;
    stroke: #fff;
    opacity: 0.95;
  }
`;

const StyledSvg = styled.span`
  margin: 0 0.35rem;

  &:hover {
   cursor: pointer;
  }
`;

const visibility = menu ? 'visible' : '';
const opacity = menu ? '1' : '';
const StyledLinkText = styled.span`
  color: white;
  filter: grayscale(100%) opacity(0.7);
  transition: color 200ms;

  transition: opacity 200ms;
  whiteSpace: nowrap;
  visibility: ${visibility};
  opacity: ${opacity};

  &:hover {
    filter: grayscale(0%) opacity(1);
    text-decoration: none;
    color: white;
  }
`;

  return (
    <StyledNav onClick={toggleMenu}>
      <ul>
        <StyledLogo>
          <StyledNavIcon onClick={() => goToPageOnEnableHref('/blank')}>
            {/* Temporarily. Needs a logo svg */}
            <StyledSvg>X</StyledSvg>
            <StyledLinkText>
              Logo
            </StyledLinkText>
          </StyledNavIcon>
        </StyledLogo>
        <StyledNavItem onClick={() => goToPageOnEnableHref('/blank')}>
          <StyledNavIcon>
            <StyledSvg> <FolderIcon className='svg-icon' /> </StyledSvg>
            <StyledLinkText>
              Curriculumm
            </StyledLinkText>
          </StyledNavIcon>
        </StyledNavItem>
        <StyledNavItem onClick={() => goToPageOnEnableHref('/blank')}>
          <StyledNavIcon>
            <StyledSvg> <AccountIcon /> </StyledSvg>
            <StyledLinkText>
              Profile
            </StyledLinkText>
          </StyledNavIcon>
        </StyledNavItem>
        <StyledNavItem onClick={() => goToPageOnEnableHref('/blank')}>
          <StyledNavIcon>
            <StyledSvg> <HelpIcon /> </StyledSvg>
            <StyledLinkText>
              FAQ
            </StyledLinkText>
          </StyledNavIcon>
        </StyledNavItem>
        <StyledNavItem onClick={() => goToPageOnEnableHref('/blank')}>
          <StyledNavIcon>
            <StyledSvg> <LogIcon /> </StyledSvg>
            <StyledLinkText>
              Log Out
            </StyledLinkText>
          </StyledNavIcon>
        </StyledNavItem>
      </ul>
    </StyledNav>
  );
};

export default Header;