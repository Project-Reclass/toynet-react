import React from 'react';

import {ReactComponent as Illustration} from '../../assets/splashScreen/v2/illustration3.svg';

import {Body, Content, Title, About, Button, SplashAboutImageContainer} from './SplashAboutStyles';



function SplashAbout() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Body>
        <Content>
          <Title>
            About Project Reclass
          </Title>
          <About>
              Project Reclass is a Nonprofit Vocational Program teaching technical skills to incarcerated veterans based in
              Atlanta, Georgia. Out team of researchers, technologists, and educators has built this learning platform to deliver
              computer networking curriculum that will prepare users for the CompTIA Network+ Certification.
          </About>
          <a href="https://www.projectreclass.org" style={{ marginTop: '1.5rem', display: 'block' }}>
            <Button>
              <h3>Learn more</h3>
            </Button>
          </a>
        </Content>
        <SplashAboutImageContainer>
          <Illustration />
        </SplashAboutImageContainer>
      </Body>
    </div>
  );
}

export default SplashAbout;
