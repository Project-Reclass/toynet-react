import React from 'react';
import styled from "styled-components";

import logo from 'src/assets/PR-Icon-Square-White.png';

const Styled_splash_footer_body_div = styled.div`
  height: auto;
  background-color: black;
  color: white;
`

const Styled_splash_footer_content = styled.div`
  display: flex;
`

const Styled_splash_footer_section_logo = styled.div`
  margin: auto;
  padding-left: 10%;
`

const Styled_splash_footer_logo = styled.div`
  width: 25%;
`

const Styled_splash_footer_section_info  = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-wrap: wrap;
  max-width: 100%;
  margin-bottom: 0;
`

const Styled_section_part = styled.div`
  padding: 1vh 0;
  padding-right: 25%;
`

const Styled_section_part_one_two = styled.div`
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
`

function SplashFooter() {
  return (
    <Styled_splash_footer_body_div style={{ backgroundColor: 'black' }}>
      <Styled_splash_footer_body_div className="container-1920 mx-auto" id="content">
        <Styled_splash_footer_content>
          <Styled_splash_footer_section_logo>
            <Styled_splash_footer_logo>
              <a href="https://www.projectreclass.org">
                <img src={logo} alt={'white pr logo'} />
              </a>
            </Styled_splash_footer_logo>
            <p>
              Copyright 2020 Project Reclass LTD <br />
              All Rights Reserved
            </p>
          </Styled_splash_footer_section_logo>
          <Styled_splash_footer_section_info>
            <Styled_section_part className='my-auto'>
              <Styled_section_part_one_two>
                <h2>Address</h2>
                <p>
                  1234 Project Reclass Ln. <br />
                  Augusta, Georgia 12345
                </p>
              </Styled_section_part_one_two>
              <br />
              <Styled_section_part_one_two>
                <h2>Contact</h2>
                <p>
                  E: ProjectReclass.info@gmail.com <br />
                </p>
              </Styled_section_part_one_two>
            </Styled_section_part>
          </Styled_splash_footer_section_info>
        </Styled_splash_footer_content>
      </Styled_splash_footer_body_div>
    </Styled_splash_footer_body_div>
  );
}

export default SplashFooter;
