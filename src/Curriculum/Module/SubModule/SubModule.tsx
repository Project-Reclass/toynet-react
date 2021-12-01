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
import { FC } from 'react';
import { Divider, Flex, Link, Stack, Text, Collapse, Tooltip } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { BsPlayCircle } from 'react-icons/bs';
import { SubModuleIntf } from 'src/common/types/curriculum';

import { ModuleName } from './styled';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';
import { createLink } from 'src/common/utils';

interface Props extends SubModuleIntf {
  moduleId: number;
  index: number;
  count: number;
}


const capitalize = (s: string): string =>
  `${s[0].toUpperCase()}${s.toLowerCase().slice(1)}`;

export const SubModule: FC<Props> = (
  {
    name,
    id,
    moduleId,
    type,
    index,
    count,
    introduction,
  },
) => {
  const [isOpen, setOpen] =
    useSessionStorage<boolean>(`submodule-${moduleId}-${id}-${index}`, true,
      value => JSON.parse(value));

  return (
    <Flex my='1'>
      <StarIcon
        w='1.5rem'
        h='1.5rem'
        color='yellow.400'
      />
      <Stack spacing={2} width='100%' marginLeft='1.5rem'>
        <Flex justifyContent='space-between'>
          <ModuleName locked={false}>
            <Tooltip
              hasArrow
              label={isOpen ? 'Show less' : 'Expand submodule'}
            >
              <Text onClick={() => setOpen(open => !open)}>
                {`${capitalize(type.toString())}: ${name}`}
              </Text>
            </Tooltip>
          </ModuleName>
          <ModuleName locked={false} hoverColor='rgba(84,143,155)'>
            <Link href={createLink({ moduleId, type, id })}>
              <BsPlayCircle data-testid='submodule_play_icon' />
            </Link>
          </ModuleName>
        </Flex>
        <Collapse in={isOpen} color='white'>
          <Text>
            {introduction}
          </Text>
        </Collapse>
        {index !== count -1 && <Divider />}
      </Stack>
    </Flex>
  );
};


export default SubModule;