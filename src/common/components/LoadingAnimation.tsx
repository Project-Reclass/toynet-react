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
import { Box, Stack } from '@chakra-ui/core';
import styled from '@emotion/styled-base';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const Sphere = styled(Box)`
  div {
    background-color: white;
    border-radius: 180px;
    width: 50px;
    height: 50px;
  }
`;

const translate = 100;
const Cool = ({
  delay,
  backgroundColor = '#ffff',
  translateY = [null, 0, 0, 0, -translate, 0],
}: {
  backgroundColor?: string;
  delay: number;
  translateY?: any;
}) => (
  <motion.div
  animate={{ translateY }}
    style={{ backgroundColor }}
    transition={{ repeat: Infinity, duration: 1, delay }}
  />
);

export const LoadingAnimation: FC = ({ children }) => (
  <Box position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'>
    <Stack spacing={3} direction='row' justifyContent='center'>
      <Sphere>
        <Cool
          delay={0}
          backgroundColor='#9E1059'
        />
      </Sphere>
      <Sphere>
        <Cool
          delay={0.45}
          backgroundColor='#008A9E'
        />
      </Sphere>
      <Sphere>
        <Cool
          delay={0.25}
          backgroundColor='#BDA913'
        />
      </Sphere>
    </Stack>
    <Stack spacing={3} marginTop='1rem'>
      {children}
    </Stack>
  </Box>
);

export default LoadingAnimation;