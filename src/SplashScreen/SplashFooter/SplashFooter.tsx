import React from 'react';

import logo from 'src/assets/PR-Icon-Square-White.png';

import './SplashFooter.css';

function SplashFooter() {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <div className="splash-footer-body container-1920 mx-auto" id="content">
        <div className="splash-footer-content">
          <div className="splash-footer-section logo">
            <div className="splash-footer-logo">
              <a href="">
                <img src={logo} alt={'white pr logo'} />
              </a>
            </div>
            <p>
              Copyright 2020 Project Reclass LTD <br />
              All Rights Reserved
            </p>
          </div>
          <div className="splash-footer-section info">
            <div className='section-part my-auto'>
              <div className="section-part one">
                <h2>Address</h2>
                <p>
                  1234 Project Reclass Ln. <br />
                  Augusta, Georgia 12345
                </p>
              </div>
              <br />
              <div className="section-part two">
                <h2>Contact</h2>
                <p>
                  E: ProjectReclass.info@gmail.com <br />
                  P: +1 000 000 0000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashFooter;
