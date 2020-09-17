import React from 'react';
import './SplashAbout.css';
import {ReactComponent as Illustration} from '../../assets/splashScreen/illustration3.svg';

function SplashAbout() {
  return (
    <div className='splash-about-body'>
      <div className='splash-about-text'>
        <div className='splash-about-header'>
          About Project Reclass
        </div>
        <div className='splash-about-subheader'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
      </div>
      <div className='about-svg-container'>
        <Illustration className='splash-about-image'/>
        </div>
    </div>
  );
}

export default SplashAbout;
