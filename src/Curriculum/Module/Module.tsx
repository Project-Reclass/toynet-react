import React, { FC, useState } from 'react';
import { Box, Collapse, Flex, Text, Tooltip } from '@chakra-ui/core';
import { ModuleIntf } from 'src/common/types/curriculum';

import { RotatableIcon } from './styled';
import SubModuleList from './SubModuleList';

interface Props {
  index: number;
  locked: boolean;
  paddingTop: string;
}

const withToolTip = (Component: React.ReactNode) => (
  <Tooltip
    hasArrow
    label='🔒 This module is currently locked.'
    {...{'aria-label': 'This module is currently locked.'}}
  >
    {Component}
  </Tooltip>
);

const CoolTooltip: React.FC<{isLocked: boolean}> = ({children, isLocked}) => {
  if (isLocked)
    return withToolTip(children);

  return <>{children}</>;
};

const Module: FC<ModuleIntf & Props> = ({ index, locked, introduction, name, submodules, paddingTop }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Box
    paddingTop={paddingTop}
    borderLeft={'2pt solid white'}
    >
      <Flex onClick={() => setOpen(open => !open)} cursor='pointer'>
        <RotatableIcon
          name={'triangle-up'}
          rotated={isOpen}
          size='1.5rem'
          marginY='auto'
          marginX='1rem'
        />
        <Flex justifyContent='space-between' width='100%'>
          <CoolTooltip isLocked={locked}>
            <Text fontSize='2xl' userSelect='none'>
              {`Module ${index + 1}: ${name}`}
            </Text>
          </CoolTooltip>
          <Text fontSize='1xl' userSelect='none' m='auto 0'>
            {`${submodules.length} / ${submodules.length} completed, ${submodules.length} in progress`}
          </Text>
        </Flex>
      </Flex>
      <Collapse isOpen={isOpen}>
        <Text fontSize='1xl' userSelect='none' m='1rem'>
          {introduction}
        </Text>
        <SubModuleList submodules={submodules} />
      </Collapse>
    </Box>
  );
};

export default Module;