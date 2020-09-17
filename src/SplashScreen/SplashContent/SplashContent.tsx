import React from 'react';
import './SplashContent.css';
import {ReactComponent as Illustration} from '../../assets/splashScreen/illustration2.svg';

function SplashContent() {
  return (
    <div className='splash-content-body'>
      <div className='splash-content-text'>
        <h1 className='splash-content-header'>Why Toynet?</h1>
        <br />
        <p className='splash-content-subtext'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className='splash-content-image'> 
        <Illustration />
        <h4 className='splash-content-image-text1'>
          Modules
          <br />
          <h5>
            Structured as module by module demos of different netowrking configurations.
            </h5>
        </h4>
      </div>
    </div>
  );
}

export default SplashContent;
