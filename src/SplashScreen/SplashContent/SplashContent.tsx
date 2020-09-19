import React from 'react';
import './SplashContent.css';
import {ReactComponent as Illustration} from '../../assets/splashScreen/illustration2.svg';

function SplashContent() {
  return (
    <div className='splash-content-body' id="content">
      <div className='wrapper'>
        <div className='splash-content-image-container'>
          <Illustration />
        </div>
        <div className='splash-content-content'>
          <h1>
            Why Toynet?
          </h1>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default SplashContent;
