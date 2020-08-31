import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [Menu, setMenu] = useState(false);

  function openMenu() {
    setMenu(!Menu);
  }

  return (
    <div>
      <header className='sidebar-menu'
      style={{
        marginLeft: Menu ? '2.7vw' : '-250px',
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
      <img className='temporary-sidebar' alt='' onClick={openMenu} src='https://via.placeholder.com/50' />
    </div>
  );
};

export default Header;