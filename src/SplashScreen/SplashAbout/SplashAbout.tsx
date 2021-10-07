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

import {Box, Link} from '@chakra-ui/core';

import {ReactComponent as Illustration} from '../../assets/splashScreen/v2/illustration3.svg';

import {Body, Content, Title, About, Button, SplashAboutImageContainer} from './SplashAboutStyles';



function SplashAbout() {
  return (
    <Box backgroundColor="white" id="about">
      <Body>
        <Content>
          <Title>
            About Project Reclass
          </Title>
          <About>
              Project Reclass is a nonprofit organization that teaches technical skills to incarcerated veterans.
              Our team of researchers, technologists, and educators has built this learning platform to deliver
              a computer networking curriculum that will prepare users for the CompTIA Network+ Certification.
          </About>
          <Link href="https://www.projectreclass.org" marginTop={6} display="block">
            <Button>
              <h3>Learn more</h3>
            </Button>
          </Link>
        </Content>
        <SplashAboutImageContainer>
          <Illustration />
        </SplashAboutImageContainer>
      </Body>
    </Box>
  );
}



export default SplashAbout;
