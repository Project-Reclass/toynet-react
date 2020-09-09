import React, { useState } from 'react';
import './Header.css';
import {ReactComponent as FolderIcon} from '../assets/headerIcons/folderIcon.svg';
import {ReactComponent as AccountIcon} from '../assets/headerIcons/accountIcon.svg';
import {ReactComponent as HelpIcon} from '../assets/headerIcons/helpIcon.svg';
import {ReactComponent as LogIcon} from '../assets/headerIcons/logIcon.svg';

const Header = () => {
  const [menu, setMenu] = useState(false);

  function toggleMenu() {
    setMenu(prevMenu => !prevMenu);
  }

  const linkTextStyle = {
    visibility: menu ? 'visible' : '',
  } as React.CSSProperties;

  return (
    <nav className='fixed-sidebar' onClick={toggleMenu}
    style={{
      width: menu ? '16rem' : '',
    }}>
      <ul className='navbar-nav'>
        <li className='logo'>
          <div className='nav-icon'>
            <span className='svg' onClick={toggleMenu}>X</span>
            <a href='blank' className='link-text' style={linkTextStyle}>
              Logo
            </a>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-icon'>
            <span className='svg' onClick={toggleMenu}> <FolderIcon /> </span>
            <a href='blank' className='link-text' style={linkTextStyle}>
              Curriculum
            </a>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-icon'>
            <span className='svg' onClick={toggleMenu}> <AccountIcon /> </span>
            <a href='blank' className='link-text' style={linkTextStyle}>Profile</a>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-icon'>
            <span className='svg' onClick={toggleMenu}> <HelpIcon /> </span>
            <a href='blank' className='link-text' style={linkTextStyle}>
              FAQ
            </a>
          </div>
        </li>
        <li className='nav-item'>
          <div className='nav-icon'>
            <span className='svg' onClick={toggleMenu}> <LogIcon /> </span>
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