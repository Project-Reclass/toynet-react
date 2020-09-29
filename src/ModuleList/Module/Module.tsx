import React, { FC, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

import { ReactComponent as CaretIcon } from 'src/assets/caret-up-solid.svg';

import styles from './Module.module.css';
import SubModule from './SubModule';

export enum ModuleTypes {
  QUIZ = 'quiz',
  ARTICLE = 'article',
  PARENT = 'parent',
  EMULATOR = 'emulator',
}

export interface ModuleInterface {
  id: number | string;
  moduleId: number | string;
  title: string;
  progress: number;
  type: ModuleTypes;
}

interface Props {
  subModules: ModuleInterface[];
}

const SubModules: FC<Props> = ({ subModules }) => (
  <div className={styles.dropdownItemContainer}>
    {subModules.map(module => (
      <SubModule
        {...module}
        key={`${module.id}-${module.title}-${module.moduleId}`}
      />
    ))}
  </div>
);

const Module: FC<Props & ModuleInterface> = ({ title, progress, subModules }) => {
  const [showSubModules, setShowSubModules] = useState(true);

  return (
    <div>
      <div className={styles.dropdownContainer}>
        <span
          data-testid="caret"
          className={`${styles.arrow} ${showSubModules && styles.rotated}`}
          onClick={() => setShowSubModules(!showSubModules)}
        >
          <CaretIcon />
        </span>
        <span>
          {title}
        </span>
        <span>
          <ProgressBar label={`${progress}%`} now={progress} />
        </span>
      </div>
      {showSubModules && <SubModules subModules={subModules} />}
    </div>
  );
};

export default Module;