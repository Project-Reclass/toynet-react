import React from 'react';

import {ReactComponent as Illustration} from '../../assets/splashScreen/v2/content-with-text.svg';
import {Body, ImageContainer, Content, Wrapper} from './SplashContentStyles';



function SplashContent() {
  return (
    <Body>
      <Wrapper>
        <ImageContainer className='container-1920 mx-auto'>
          <Illustration />
        </ImageContainer>
        <Content>
          <h1>
            Why Toynet?
          </h1>
          <h3>
            ToyNet eliminates common learning hurdles in studying computer networks. Topics such as construction and the provisioning
            of devices are covered in virtualized scenarios and made more comprehensible through hands-on learning, conceptual lectures
            and skills assessments.
          </h3>
        </Content>
      </Wrapper>
    </Body>
  );
}

export default SplashContent;
