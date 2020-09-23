import React from 'react';
import './SplashContent.css';
import {ReactComponent as Illustration} from '../../assets/splashScreen/v2/content-with-text.svg';

function SplashContent() {
  return (
    <div className='splash-content-body container-1920 mx-auto' id="content">
      <div className='wrapper'>
        <div className='splash-content-image-container'>
          <Illustration />
        </div>
        <div className='splash-content-content'>
          <h1>
            Why Toynet?
          </h1>
          <h3>
            ToyNet eliminates common learning hurdles in studying computer networks. Topics such as construction and the provisioning
            of devices are covered in virtualized scenarios and made more comprehensible through hands-on learning, conceptual lectures
            and skills assessments.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default SplashContent;
