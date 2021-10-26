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

import React, { forwardRef, useCallback, useState } from 'react';
import { Textarea } from '@chakra-ui/react';

interface Props {
  isLoading: boolean;
  onSubmit: (input: string) => Promise<any>;
  onClear: () => any;
}

const ConsoleTextarea = forwardRef<HTMLTextAreaElement, Props>(({
  isLoading,
  onSubmit,
  onClear,
}, ref) => {
  const [currInput, setCurrInput] = useState('>> ');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    if (value.length > 2 && !value.endsWith('\n'))
      setCurrInput(`${e.currentTarget.value}`);
  }, []);

  const handleKeyPress = useCallback(async (e: React.KeyboardEvent) => {
    if (e.shiftKey && e.key === 'Enter') {
      setCurrInput(`${currInput}\n`);
      return;
    }
    if (e.key === 'Enter') {
      if (currInput.replace('>> ', '') === 'clear') {
        setCurrInput('>> ');
        onClear();
        return;
      }

      if (await onSubmit(currInput)) {
        setCurrInput('>> ');
      }
    }
  }, [currInput, onClear, onSubmit]);

  return (
    <Textarea
      ref={ref}
      isDisabled={isLoading}
      data-testid='console-textarea'
      _hover={{ borderColor: 'rgba(0,0,0,0)' }} // this disables any hover styles
      padding='0'
      focusBorderColor='rgba(0,0,0,0)'
      borderColor='rgba(0,0,0,0)'
      backgroundColor='rgba(0,0,0,0)'
      resize='none'
      value={currInput}
      height='fit-content'
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
});

export default ConsoleTextarea;