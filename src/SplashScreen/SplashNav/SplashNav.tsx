import React from 'react';

import logo from 'src/assets/PR-Logo-Long-FullColor.png';

import './SplashNav.css';

function SplashNav() {
  return (
    <header className='splash-header'>
      <div className='splash-header-container container-1920'>
        <div style={{ maxWidth: '25%' }}>
          <a href="https://www.projectreclass.org">
            <img src={logo} alt='logo' className='splash-logo' style={{ width: '65%', height: 'auto' }} />
          </a>
        </div>
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

export default SplashNav;

