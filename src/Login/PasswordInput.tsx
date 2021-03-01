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