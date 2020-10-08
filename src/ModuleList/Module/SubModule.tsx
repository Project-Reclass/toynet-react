import React, { FC } from 'react';
import styled from '@emotion/styled';

import { ModuleInterface } from './Module';

const DropdownItem = styled.div`
  width: 75%;
  font-size: 1rem;
  box-shadow:  0pt 0px 3px rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.05);
  display: grid;
  grid-template-columns: 1fr 1fr;

  padding: 0.5rem 0;
  margin: 0.229rem;

  span {
    margin: auto 0.5rem;
    text-align: center;
    user-select: none;
  }
`;

const SubModule: FC<ModuleInterface> = ({ title, progress, id, moduleId, type }) => (
  <DropdownItem>
    <span>
      <a href={`/module/${moduleId}/${type.toString()}/${id}`}>
        {title}
      </a>
    </span>
    <span>
      {/* <ProgressBar label={`${progress}%`} now={progress} /> */}
    </span>
  </DropdownItem>
);

export default SubModule;