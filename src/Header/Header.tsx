import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import {ReactComponent as FolderIcon} from '../assets/headerIcons/folderIcon.svg';
import {ReactComponent as AccountIcon} from '../assets/headerIcons/accountIcon.svg';
import {ReactComponent as HelpIcon} from '../assets/headerIcons/helpIcon.svg';
import {ReactComponent as LogIcon} from '../assets/headerIcons/logIcon.svg';

const Header = () => {
  const history = useHistory()
  const [menu, setMenu] = useState(false);
  const [enableHref, setEnableHref] = useState(false);

  function toggleMenu() {
    setMenu(prevMenu => !prevMenu);
    setEnableHref(prevEnableHref => !prevEnableHref);
  }

  function routeChange(path: any) {
    const path2='blank'
    history.push(path2)
  }

  function blank() {
    console.log('placeholder')
  }

  const linkTextStyle = {
    visibility: menu ? 'visible' : '',
    opacity: menu ? '1' : '',
    transition: 'opacity 200ms',
    whiteSpace: 'nowrap',
  } as React.CSSProperties;

  return (
    <nav className='fixed-sidebar' onClick={toggleMenu}
    style={{
      width: menu ? '14rem' : '',
    }}>
      <ul className='navbar-nav'>
        <li className='logo'>
          <div className='nav-icon'>
            {/* Temporarily. Needs a logo svg */}
            <span className='svg'>X</span>
            <a href='blank' className='link-text' style={linkTextStyle}>
              Logo
            </a>
          </div>
        </li>
        
        <div className='divset-2' >
        <li className='nav-item' onClick={enableHref ? blank : routeChange}>
          <div className='nav-icon'>
            <span className='svg'> <FolderIcon className='svg-icon' /> </span>
            <a href='blank' className='link-text' style={linkTextStyle}>
              Curriculum
            </a>
          </div>

        </li>
        </div>
        <li className='nav-item'>
          <div className='nav-icon'>
            <span className='svg'> <AccountIcon /> </span>
            <a href='blank' className='link-text' style={linkTextStyle}>Profile</a>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-icon'>
            <span className='svg'> <HelpIcon /> </span>
            <a href='blank' className='link-text' style={linkTextStyle}>
              FAQ
            </a>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-icon'>
            <span className='svg'> <LogIcon /> </span>
            <a href='blank' className='link-text' style={linkTextStyle}>
              Log Out
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;