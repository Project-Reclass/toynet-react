import React, {FC} from 'react';

import './SplashScreen.css';
import SplashNav from './SplashNav';
import SplashHeader from './SplashHeader';
import SplashContent from './SplashContent';
import SplashAbout from './SplashAbout';
import SplashFooter from './SplashFooter';


const Splashscreen: FC = () => {
  return (
    <div className="splash-screen">
      <SplashNav />
      <SplashHeader />
      <SplashContent />
      <SplashAbout />
      <section id='contact'>
        <SplashFooter />
      </section>
      {/* temporary div below is needed for reference to getting to emulator */}
      {/* <div>
        <a  style={{marginLeft: '1000px'}} href='/module/0/emulator/0'>Visit Emulator</a> <br />
        <a href='/module'>Visit Courses</a>
      </div> */}
    </div>
  );
};

export default Splashscreen;
