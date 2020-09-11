import React from 'react';
import './SplashNav.css';

function SplashHeader() {
  return (
    <header className='splash-header'>
      <div className='splash-header-container'>
        <img src='LOGO' alt='logo' className='splash-logo' />
        <nav className='splash-nav'>
          <ul>
            <li>
              <a href='#home' className='splash-nav-link'>Home</a>
            </li>
            <li>
              <a href='#about' className='splash-nav-link'>About</a>
            </li>
            <li>
              <a href='#contact' className='splash-nav-link'>Contact</a>
            </li>
            <li>
              <a href='#login' className='splash-login'>Log in</a>
            </li>
            <li>
              <a href='#signup' className='splash-signup'>Sign up</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default SplashHeader;

