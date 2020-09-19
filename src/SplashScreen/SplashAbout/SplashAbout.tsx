import React from 'react';
import './SplashAbout.css';
import {ReactComponent as Illustration} from '../../assets/splashScreen/illustration3.svg';

function SplashAbout() {
  return (
    <div className='splash-about-body' id="about">
      <div className='splash-about-content'>
        <h1>
          About Project Reclass
        </h1>
        <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </h3>
      </div>
      <div className='splash-about-image-container'>
        <Illustration />
      </div>
    </div>
  );
}

export default SplashAbout;
