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
<http://www.gnu.org/licenses/>.  */
import React, { FC, useState } from 'react';
import { InputGroup, InputProps, InputRightElement } from '@chakra-ui/core';

import { ToyNetButton, ToyNetInput } from './styled';

const PasswordInput: FC<React.PropsWithChildren<InputProps<HTMLInputElement>>> = ({ ...rest }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <ToyNetInput
        pr="4.5rem"
        {...rest}
        type={show ? 'text' : 'password'}
        data-testid='password-input'
      />
      <InputRightElement width="4.5rem">
        <ToyNetButton h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </ToyNetButton>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;