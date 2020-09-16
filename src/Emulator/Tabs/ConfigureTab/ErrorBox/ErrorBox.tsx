import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { useErrorBox } from './ErrorBoxProvider';

import styles from './errorBox.module.css';

const ErrorBox = () => {
  const { showError, errorMessage } = useErrorBox();

  return (
    <>
    {showError &&
      <div className={styles.errorBox}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faInfoCircle} />
        </span>
        <span>
          <span className={styles.error}>
            Error:
          </span>
          {` ${errorMessage}`}
        </span>
      </div>
    }
    </>
  );
};

export default ErrorBox;