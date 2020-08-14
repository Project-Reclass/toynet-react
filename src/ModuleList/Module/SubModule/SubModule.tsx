import React, { FC } from 'react';
import { ProgressBar } from 'react-bootstrap';

import { IModule } from '../Module';

import styles from './SubModule.module.css';

const SubModule: FC<IModule> = ({ title, progress, id, moduleId, type }) => (
  <div className={styles.dropdownItem}>
    <span className={styles.title}>
      <a href={`/module/${moduleId}/${type.toString()}/${id}`}>
        {title}
      </a>
    </span>
    <span className={styles.progress}>
      <ProgressBar label={`${progress}%`} now={progress} />
    </span>
  </div>
);

export default SubModule;