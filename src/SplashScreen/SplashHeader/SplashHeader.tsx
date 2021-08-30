/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
import React from 'react';
import './SplashHeader.css';

import {ReactComponent as Grid} from 'src/assets/splashScreen/v2/grid-background.svg';
import {ReactComponent as Illustration} from '../../assets/splashScreen/v2/illustration-header.svg';
import { useHistory } from 'react-router-dom';

function SplashHeader() {
  const history = useHistory();

  const goToEmulator = () => history.push('/module/1/emulator/1');

  return (
    <div className='spash-header__container '>
      <div className='spash-header__grid-container '>
        <Grid />
      </div>
      <div className='splash-header-body container-1920 mx-auto' id="home">
        <div className='splash-header-content'>
          <h1>
            Toynet, your <br />
            computer networking <br />
            companion
          </h1>
          <h3>
            Learn anywhere, anytime
          </h3>
          <button className='how-it-works' onClick={goToEmulator}>
            <h3 className='splash-button-text'>Try it</h3>
          </button>
        </div>
        <div className='splash-header-image-container'>
          <Illustration />
        </div>
      </div>
    </div>
  );
}

export default SplashHeader;

