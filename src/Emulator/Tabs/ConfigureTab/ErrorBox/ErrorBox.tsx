import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { useErrorBox } from './ErrorBoxProvider';

const ErrorBoxContainer = styled.div`
  font-style: italic;
  color: rgb(194, 194, 194);
  margin: 0.4rem auto;
`;

const ErrorBox = () => {
  const { showError, errorMessage } = useErrorBox();

  return (
    <>
    {showError &&
      <ErrorBoxContainer>
        <span style={{ margin: 'auto 0.2rem' }}>
          <FontAwesomeIcon icon={faInfoCircle} />
        </span>
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