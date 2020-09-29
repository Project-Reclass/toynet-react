import React from 'react';
import styled from '@emotion/styled';
import { Icon } from '@chakra-ui/core';

import { useErrorBox } from './ErrorBoxProvider';

const ErrorBoxContainer = styled.div`
  font-style: italic;
  color: rgb(194, 194, 194);
  margin: 0.4rem auto;
  display: flex;
`;

const ErrorBox = () => {
  const { showError, errorMessage } = useErrorBox();

  return (
    <>
    {showError &&
      <ErrorBoxContainer>
        <Icon name='info-outline' margin='auto 0.2rem' display='block' />
        <span>
          <span style={{ fontWeight: 'bold' }}>
            Error:
          </span>
          {` ${errorMessage}`}
        </span>
      </ErrorBoxContainer>
    }
    </>
  );
};

export default ErrorBox;