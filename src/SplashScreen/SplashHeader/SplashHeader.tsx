import React from 'react';
import './SplashHeader.css';
import {ReactComponent as Illustration} from '../../assets/splashScreen/illustration1.svg';

function SplashHeader() {
  return (
    <div className='splash-header-body' id="home">
      <div className='splash-header-text'>
        <h1 className='splash-h1'>
          Toynet, your new <br />
          computer networking <br />
          companion.</h1>
        <h3 className='splash-header-subtext'>learn anywhere, anytime.</h3>
        <button className='how-it-works'>
          <h3 className='splash-button-text'>How it works</h3>
        </button>
      </div>
      <div>
        <Illustration className='splash-header-image' />
      </div>
    </div>
  );
}

export default SplashHeader;

