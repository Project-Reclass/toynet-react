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

import React, { memo } from 'react';
import { Stack, IconButton } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';

interface Props {
  index: number;
  isLast: boolean;
  isDisabled?: boolean;
  deleteIp: (index: number) => any;
  createNewIp: () => any;
}

const CreateIpBtns = ({
  index,
  isLast,
  isDisabled,
  deleteIp,
  createNewIp,
}: Props) => (
  <Stack direction='row' spacing={3} margin='2rem 0 auto 1rem'>
    {
      isLast ?
        <Stack direction='row' spacing={2}>
          {index !== 0 &&
            <IconButton
              data-testid={`remove_ip-idx_${index}`}
              width='fit-content'
              isDisabled={isDisabled}
              colorScheme='red'
              variant='outline'
              aria-label='Call Segun'
              size='sm'
              icon={<MinusIcon />}
              onClick={() => deleteIp(index)}
            />
          }
          <IconButton
            data-testid={`add_ip-notone-idx_${index}`}
            width='fit-content'
            isDisabled={isDisabled}
            colorScheme='teal'
            variant='outline'
            aria-label='Call Segun'
            size='sm'
            icon={<AddIcon />}
            onClick={createNewIp}
          />
        </Stack> :
        <IconButton
          data-testid={`add_ip-idx_${index}`}
          width='fit-content'
          isDisabled={isDisabled}
          colorScheme='red'
          variant='outline'
          aria-label='Call Segun'
          size='sm'
          icon={<AddIcon />}
          onClick={() => deleteIp(index)}
        />
    }
  </Stack>
);

export default memo(CreateIpBtns);