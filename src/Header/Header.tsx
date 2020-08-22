import React, { useState } from 'react';
import './Header.css';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const [Menu, setMenu] = useState(false);

  function openMenu() {
    setMenu(!Menu);
  }

  return (
    <div>
      <header className='sidebar-menu'
      style={{
        marginLeft: Menu ? '50px' : '-250px',
      }}>
        <div className='top'>
          <ul>
            <li>
              <a href='#' onClick={openMenu}>Logo</a>
            </li>
          </ul>
        </div>
        <div className='options'>
          <ul>
            <li>
              <a href='#'>Curriculum</a>
            </li>
            <li>
              <a href='#'>Profile</a>
            </li>
            <li>
              <a href='#'>FAQ</a>
            </li>
          </ul>
        </div>
        <div className='bottom'>
          <ul>
            <li>
              <a href='#'>Log out</a>
            </li>
          </ul>
        </div>
      </header>
      <img className='temporary-sidebar' alt='' onClick={openMenu} src='https://via.placeholder.com/50' />
    </div>
  );
};

export default Header;