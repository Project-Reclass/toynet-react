import React, { useState } from 'react';
import './Header.css';
import folderIcon from '../assets/headerIcons/folderIcon.svg';

const Header = () => {
  const [Menu, setMenu] = useState(false);

  function openMenu() {
    setMenu(!Menu);
  }

  return (
    <div className='fixed-sidebar' onClick={openMenu}>
      <div className='fixed-sidebar-options'>
        <input type='image' alt='' className='fixed-sidebar-icon'src={folderIcon} />
      </div>
      <header className='sidebar-menu'
      style={{
        marginLeft: Menu ? '2.7vw' : '-200px',
      }}>
        <div className='top'>
          <ul>
            <li>
              <a href='blank' onClick={openMenu}>Logo</a>
            </li>
          </ul>
        </div>
        <div className='options'>
          <ul>
            <li>
              <a href='blank'>Curriculum</a>
            </li>
            <li>
              <a href='blank'>Profile</a>
            </li>
            <li>
              <a href='blank'>FAQ</a>
            </li>
          </ul>
        </div>
        <div className='bottom'>
          <ul>
            <li>
              <a href='blank'>Log out</a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;