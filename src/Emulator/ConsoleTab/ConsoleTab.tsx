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
import { Box, Flex, Heading, Select, Text, Textarea } from '@chakra-ui/core';
import React, { useState } from 'react';

import {
  EmulatorInnerSection,
  EmulatorSection,
} from 'src/common/components/Emulator';

interface ToynetCommand {
  command: string;
  output: string;
  color: string;
}

const AppliedCommand = ({command, color, output}: ToynetCommand) => (
  <Box>
    <Text>{`${command}`}</Text>
    <Text color={color}>{output}</Text>
  </Box>
);

const ConsoleTab = () => {
  const [currInput, setCurrInput] = useState('>> ');
  const [history, setHistory] = useState<ToynetCommand[]>([
    {
      command: '>> ls',
      output: 'name',
      color: 'white',
    },
  ]);

  return (
    <EmulatorSection>
      <Flex paddingBottom='0.559rem' justifyContent='space-between'>
        <Heading size='lg' color='white'>
          Console
        </Heading>
        <Flex width='fit-content' height='fit-content'>
          <Text my='auto' marginRight='1rem'>Device</Text>
          <Select
            size='sm'
            color='white'
            backgroundColor='#212529'
            placeholder='Select device'
            width='fit-content'
            borderWidth='1'
            borderRadius={3}
          >
            <option>H1</option>
          </Select>
        </Flex>
      </Flex>
      <EmulatorInnerSection padding='1rem'>
        {history.map(cmd => (
          <AppliedCommand {...cmd} />
        ))}
        <Textarea
          _hover={{ borderColor: 'rgba(0,0,0,0)' }}
          padding='0'
          focusBorderColor='rgba(0,0,0,0)'
          borderColor='rgba(0,0,0,0)'
          backgroundColor='rgba(0,0,0,0)'
          resize='none'
          value={currInput}
          height='fit-content'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              const { value } = e.currentTarget;
              if (value.length > 2 && !value.endsWith('\n'))
                setCurrInput(`${e.currentTarget.value}`);
            }
          }
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.shiftKey && e.key === 'Enter') {
              setCurrInput(curr => `${curr}\n`);
              return;
            }
            if (e.key === 'Enter') {
              setHistory(prev => [...prev, {
                command: currInput,
                output: 'ls',
                color: 'tomato',
              }]);
              setCurrInput('>> ');
              console.log('pressed enter');
            }
          }}
        />
      </EmulatorInnerSection>
    </EmulatorSection>
  );
};

export default ConsoleTab;
