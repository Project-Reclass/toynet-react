import React from 'react';
import { Stack, Icon } from '@chakra-ui/core';

import { StatusIconBox } from './styled';

interface SIProps {
  status: 'locked' | 'unlocked' | 'done'
}

const StatusIcon = ({ status }: SIProps) => (
  <Stack>
    <StatusIconBox type={status !== 'done' ? 'lock' : 'check'}>
      <Icon
        name={status === 'done' ? 'check' :
          status === 'locked' ? 'lock' : 'unlock'
        }
        margin='auto'
        marginTop='0.2rem'
        display='block'
        color={status !== 'done' ? 'grey' : 'white'}
      />
    </StatusIconBox>
  </Stack>
);


export default StatusIcon;
