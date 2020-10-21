import styled from '@emotion/styled';
import React from 'react';
import { CircularProgress } from '@chakra-ui/core';

export const CenteredProgress = styled(CircularProgress)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

const LoadingSpinner = () => {
    return (
        <div style={{position: 'relative', height: '100%'}}>
            <CenteredProgress isIndeterminate color="green"/>
        </div>
    );
};

export default LoadingSpinner;
