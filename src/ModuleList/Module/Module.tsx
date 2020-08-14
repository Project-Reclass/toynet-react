import React, { FC, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

import Caret from './Caret.svg';

import styles from './Dropdown.module.css';
import SubModule from './SubModule';

export enum ModuleTypes {
  QUIZ = 'quiz',
  ARTICLE = 'article',
  PARENT = 'parent',
  EMULATOR = 'emulator',
}

export interface IModule {
  id: number | string;
  moduleId: number | string;
  title: string;
  progress: number;
  type: ModuleTypes;
}

interface Props {
  subModules: IModule[];
}

const SubModules: FC<Props> = ({ subModules }) => (
  <div className={styles.dropdownItemContainer}>
    {subModules.map(module => (
      <SubModule {...module} />
    ))}
  </div>
);

const Module: FC<Props & IModule> = ({ title, progress, subModules }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className={styles.dropdownContainer}>
        <span className={`${styles.arrow} ${show && styles.rotated}`} onClick={() => setShow(!show)}>
          <Caret />
        </span>
        <span className={styles.title}>
          {title}
        </span>
        <span className={styles.progress}>
          <ProgressBar label={`${progress}%`} now={progress} />
        </span>
      </div>
      {show && <SubModules subModules={subModules} />}
    </div>
  );
};

export default Module;