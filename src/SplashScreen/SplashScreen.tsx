import React, {FC} from 'react';

import './SplashScreen.css';
import SplashNav from './SplashNav/SplashNav';


const Splashscreen: FC = () => {
  return (
    <div className="splash-screen">
      <SplashNav />
      {/* <div>
        <a  style={{marginLeft: '1000px'}} href='/module/0/emulator/0'>Visit Emulator</a> <br />
        <a href='/module'>Visit Courses</a>
      </div> */}
    </div>
  );
};

export default Splashscreen;
