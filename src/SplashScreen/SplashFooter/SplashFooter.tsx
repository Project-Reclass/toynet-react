import React from 'react';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/core';

import logo from 'src/assets/PR-Icon-Square-White.png';

const StyledContainer = styled.div`
  height: auto;
  background-color: black;
  color: white;
`;

const StyledSectionLogo = styled.div`
  margin: auto;
  padding-left: 10%;
`;

const StyledLogo = styled.div`
  width: 25%;
`;

const StyledSectionInfo  = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-wrap: wrap;
  max-width: 100%;
  margin-bottom: 0;
`;

const StyledSectionPart = styled.div`
  padding: 1vh 0;
  padding-right: 25%;
`;

const StyledSectionPartOneTwo = styled.div`
  position: relative;
  min-width: 100px;
  max-width: 430px;
  flex-direction: column;
  white-space: nowrap;

  h2 {
    margin-bottom: 5px;
    word-spacing: 10px;
    font-size: 1em;
  }

  p {
    font-size: 1.3;
    color: gray;
    margin-bottom: 0;
  }
`;

function SplashFooter() {
  return (
    <StyledContainer>
      <StyledContainer className="container-1920 mx-auto" id="content">
        <Flex>
          <StyledSectionLogo>
            <StyledLogo>
              <a href="https://www.projectreclass.org">
                <img src={logo} alt={'white pr logo'} />
              </a>
            </StyledLogo>
            <p>
              Copyright 2020 Project Reclass LTD <br />
              All Rights Reserved
            </p>
          </StyledSectionLogo>
          <StyledSectionInfo>
            <StyledSectionPart className='my-auto'>
              <StyledSectionPartOneTwo>
                <h2>Address</h2>
                <p>
                  1234 Project Reclass Ln. <br />
                  Augusta, Georgia 12345
                </p>
              </StyledSectionPartOneTwo>
              <br />
              <StyledSectionPartOneTwo>
                <h2>Contact</h2>
                <p>
                  E: ProjectReclass.info@gmail.com <br />
                </p>
              </StyledSectionPartOneTwo>
            </StyledSectionPart>
          </StyledSectionInfo>
        </Flex>
      </StyledContainer>
    </StyledContainer>
  );
}

export default SplashFooter;
