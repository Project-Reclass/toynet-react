import React from 'react';
import './SplashHeader.css';
import {ReactComponent as Illustration} from '../../assets/splashScreen/v2/illustration-header.svg';
import { useHistory } from 'react-router-dom';

function SplashHeader() {
  const history = useHistory();

  const goToEmulator = () => history.push('/module/1/emulator/1');

  return (
    <div className='spash-header__container '>
      <div className='splash-header-body container-1920 mx-auto' id="home">
        <div className='splash-header-content'>
          <h1>
            Toynet, your new <br />
            computer networking <br />
            companion.
          </h1>
          <h3>
            learn anywhere, anytime.
          </h3>
          <button className='how-it-works' onClick={goToEmulator}>
            <h3 className='splash-button-text'>Try it out!</h3>
          </button>
        </div>
        <div className='splash-header-image-container'>
          <Illustration />
        </div>
      </div>
    </div>
  );
}

export default SplashHeader;

