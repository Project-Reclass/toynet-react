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

import { ReactComponent as Grid } from 'src/assets/splashScreen/v2/grid-background.svg';
import { ReactComponent as Illustration } from '../../assets/splashScreen/v2/illustration-header.svg';
import { useHistory } from 'react-router-dom';

import {
  Container,
  ContainerGrid,
  HeaderContent,
  HeaderContentH1,
  HeaderContentH3,
  HeaderContentButtonText,
  HeaderContentButton,
  HeaderContentImageContainer,
  ContainerBody
} from './SplashHeaderStyles';

function SplashHeader() {
  const history = useHistory();

  const goToEmulator = () => history.push('/dashboard/1?module=0');

  return (
    <Container>
      <ContainerGrid>
        <Grid />
      </ContainerGrid>
      <ContainerBody id="home">
        <HeaderContent>
          <HeaderContentH1>
            Toynet, your <br />
            computer networking <br />
            companion
          </HeaderContentH1>
          <HeaderContentH3>
            Learn anywhere, anytime
          </HeaderContentH3>
          <HeaderContentButton onClick={goToEmulator}>
            <HeaderContentButtonText>Try it</HeaderContentButtonText>
          </HeaderContentButton>
        </HeaderContent>
        <HeaderContentImageContainer>
          <Illustration />
        </HeaderContentImageContainer>
      </ContainerBody>
    </Container>
  );
}

export default SplashHeader;

