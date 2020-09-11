import React, {FC} from 'react';

import './SplashScreen.css';
import SplashNav from './SplashNav';


const Splashscreen: FC = () => {
  return (
    <div className="splash-screen">
      <SplashNav />
      {/* temporary div below is needed for reference to getting to emulator */}
      {/* <div>
        <a  style={{marginLeft: '1000px'}} href='/module/0/emulator/0'>Visit Emulator</a> <br />
        <a href='/module'>Visit Courses</a>
      </div> */}
    </div>
  );
};

export default Splashscreen;
