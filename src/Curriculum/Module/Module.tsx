import React, { FC, useMemo, useState } from 'react';
import { Box, Collapse, Flex, Text, Tooltip } from '@chakra-ui/core';

import { RotatableIcon } from './styled';
import SubModuleList from './SubModuleList';
import { ModuleInterface } from './types';

interface Props {
  locked: boolean;
  description: string;
  subModules: ModuleInterface[];

  paddingTop?: string;
}

const getCompletedSubModules = (subModules: ModuleInterface[]) =>
  subModules.reduce<number>((prev, curr) => prev + (curr.completed ? 1 : 0), 0);

const getInProgressSubModules = (subModules: ModuleInterface[]) =>
  subModules.reduce<number>((prev, curr) => prev + (curr.completed ? 1 : 0), 0);

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

const Module: FC<Props & ModuleInterface> = ({ description, title, subModules, locked, paddingTop }) => {
  const [isOpen, setOpen] = useState(false);

  const numberCompleted = useMemo(() => getCompletedSubModules(subModules), [subModules]);
  const numberInProgress = useMemo(() => getInProgressSubModules(subModules), [subModules]);

  const handleToggle = () =>
    setOpen(!locked && !isOpen);


  return (
    <Box
    paddingTop={paddingTop}
    color={locked ? 'grey' : 'white'}
    borderLeft={`2pt solid ${locked ? 'grey' : 'white'}`}
    >
      <Flex onClick={handleToggle} cursor='pointer'>
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
              {title}
            </Text>
          </CoolTooltip>
          <Text fontSize='1xl' userSelect='none' m='auto 0'>
            {`${numberCompleted} / ${subModules.length} completed, ${numberInProgress} in progress`}
          </Text>
        </Flex>
      </Flex>
      <Collapse isOpen={isOpen}>
        <Text fontSize='1xl' userSelect='none' m='1rem'>
          {description}
        </Text>
        <SubModuleList subModules={subModules} />
      </Collapse>
    </Box>
  );
};

export default Module;