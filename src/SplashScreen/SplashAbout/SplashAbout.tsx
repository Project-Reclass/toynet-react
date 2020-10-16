import React from 'react';

import {ReactComponent as Illustration} from '../../assets/splashScreen/v2/illustration3.svg';

import {SplashAboutBody, SplashAboutContent, H1, H3, H3s, Button, SplashAboutImageContainer} from './SplashAboutStyles';



function SplashAbout() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <SplashAboutBody>
        <SplashAboutContent>
          <H1>
            About Project Reclass
          </H1>
          <H3>
              Project Reclass is a Nonprofit Vocational Program teaching technical skills to incarcerated veterans based in
              Atlanta, Georgia. Out team of researchers, technologists, and educators has built this learning platform to deliver
              computer networking curriculum that will prepare users for the CompTIA Network+ Certification.
          </H3>
          <a href="https://www.projectreclass.org" style={{ marginTop: '1.5rem', display: 'block' }}>
            <Button>
              <H3s>Learn more</H3s>
            </Button>
          </a>
        </SplashAboutContent>
        <SplashAboutImageContainer>
          <Illustration />
        </SplashAboutImageContainer>
      </SplashAboutBody>
    </div>
  );
}

export default SplashAbout;
