import React, { FC } from 'react';
import { Divider, Flex, Link, Stack, Text, Icon, Collapse, useDisclosure, Tooltip } from '@chakra-ui/core';
import { SubModuleIntf } from 'src/common/types/curriculum';

import { ModuleName } from './styled';

interface Props extends SubModuleIntf {
  moduleId: number;
  index: number;
  count: number;
}

const createLink = ({ type, id, moduleId }: Pick<Props, 'moduleId' | 'type' | 'id'>) => {
  if (type === 'VALUE') {
    return `/value/${id}`;
  }
  return `/module/${moduleId}/${type.toString().toLowerCase()}/${id}`;
};

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
  const { isOpen, onToggle } = useDisclosure(false);
  return (
    <Flex>
      <Icon
        name='star'
        size='1.5rem'
        color='green.500'
      />
      <Stack spacing={2} width='100%' marginLeft='1.5rem'>
        <Flex justifyContent='space-between'>
          <ModuleName locked={false}>
            <Tooltip
              hasArrow
              label={isOpen ? 'Show less' : 'Show more'}
              {...{'aria-label': 'More information'}}
            >
              <Text onClick={onToggle}>
                {`${capitalize(type.toString())}: ${name}`}
              </Text>
            </Tooltip>
          </ModuleName>
          <ModuleName locked={false} hoverColor='rgba(84,143,155)'>
            <Link href={createLink({ moduleId, type, id })}>
              {'Go to Submodule >'}
            </Link>
          </ModuleName>
        </Flex>
        <Collapse isOpen={isOpen}>
          {introduction}
        </Collapse>
        {index !== count -1 && <Divider />}
      </Stack>
    </Flex>
  );
};


export default SubModule;