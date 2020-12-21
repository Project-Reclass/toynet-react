import React, { FC } from 'react';
import styled from '@emotion/styled';

import LoadingSpinner from './LoadingSpinner';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const LoadingContainer: FC<{isLoading:boolean}> = ({children, isLoading}) => (
  <>
    {
      isLoading ?
        <Container>
          <LoadingSpinner />
        </Container> :
        children
    }
  </>
);

export default LoadingContainer;