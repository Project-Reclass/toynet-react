import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import {ReactComponent as FolderIcon} from '../assets/headerIcons/folderIcon.svg';
import {ReactComponent as AccountIcon} from '../assets/headerIcons/accountIcon.svg';
import {ReactComponent as HelpIcon} from '../assets/headerIcons/helpIcon.svg';
import {ReactComponent as LogIcon} from '../assets/headerIcons/logIcon.svg';

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
      console.log({ path });
      history.push(path);
    }
  };

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
      }}
    >
      <ul className='navbar-nav'>
        <li className='logo'>
          <div className='nav-icon' onClick={() => goToPageOnEnableHref('/blank')}>
            {/* Temporarily. Needs a logo svg */}
            <span className='svg'>X</span>
            <span className='link-text' style={linkTextStyle}>
              Logo
            </span>
          </div>
        </li>
        <li className='nav-item' onClick={() => goToPageOnEnableHref('/blank')}>
          <div className='nav-icon'>
            <span className='svg'> <FolderIcon className='svg-icon' /> </span>
            <span className='link-text' style={linkTextStyle}>
              Curriculum
            </span>
          </div>
        </li>
        <li className='nav-item' onClick={() => goToPageOnEnableHref('/blank')}>
          <div className='nav-icon'>
            <span className='svg'> <AccountIcon /> </span>
            <span className='link-text' style={linkTextStyle}>
              Profile
            </span>
          </div>
        </li>
        <li className='nav-item' onClick={() => goToPageOnEnableHref('/blank')}>
          <div className='nav-icon'>
            <span className='svg'> <HelpIcon /> </span>
            <span className='link-text' style={linkTextStyle}>
              FAQ
            </span>
          </div>
        </li>
        <li className='nav-item' onClick={() => goToPageOnEnableHref('/blank')}>
          <div className='nav-icon'>
            <span className='svg'> <LogIcon /> </span>
            <span className='link-text' style={linkTextStyle}>
              Log Out
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;