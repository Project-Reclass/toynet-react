/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/
/* eslint-disable no-magic-numbers */
import React from 'react';
import { ModuleTypes, ModuleInterface } from './Module';

// const mockUsername = 'Tay';
const mockDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque fermentum volutpat. Proin ut iaculis mauris. Aenean commodo mauris at justo faucibus, in vulputate arcu maximus. Maecenas bibendum nisl urna, nec pretium lacus dapibus et. Nullam a diam sollicitudin, dapibus ante nec, pulvinar diam. Pellentesque sit amet dignissim felis. Nulla interdum, lacus ac rhoncus posuere, tortor leo pharetra nulla, a pulvinar quam sapien sed mi. Fusce bibendum mauris massa, at molestie arcu venenatis at. Vivamus in tellus tempus, porttitor diam a, laoreet magna. Morbi pharetra justo risus, non auctor nisl interdum varius.';


const mockData = [
  {
    id: 1,
    moduleId: 0,
    title: 'Example Module',
    progress: 80,
    type: ModuleTypes.PARENT,
    subModules: [
      {
        id: 4001,
        moduleId: 0,
        title: 'Quiz 1',
        progress: 100,
        type: ModuleTypes.QUIZ,
      },
      {
        id: 2001,
        moduleId: 0,
        title: 'Ever wondered how underwater cables are laid?',
        progress: 10,
        type: ModuleTypes.ARTICLE,
      },
      {
        id: 5001,
        moduleId: 0,
        title: 'Values - Integrity',
        progress: 0,
        type: ModuleTypes.VALUE,
      },
    ],
  },
  {
    id: 2,
    moduleId: 0,
    title: 'Second Module',
    progress: 0,
    type: ModuleTypes.PARENT,
    subModules: [
      {
        id: 4002,
        moduleId: 0,
        title: 'Quiz 2',
        progress: 0,
        type: ModuleTypes.QUIZ,
      },
      {
        id: 2002,
        moduleId: 0,
        title: 'Father of the internet, Vint Cerf, on creating the interplanetary internet',
        progress: 50,
        type: ModuleTypes.ARTICLE,
      },
      {
        id: 5002,
        moduleId: 0,
        title: 'Values - Respect',
        progress: 0,
        type: ModuleTypes.VALUE,
      },
    ],
  },
];

interface Data extends ModuleInterface {
  subModules: ModuleInterface[];
}

interface Props {
  username?: string;
  description: string;
  moduleData: Data[];
}

export const withMockData = (Component: React.ComponentType<Props>) => () => {
  return <Component
    moduleData={mockData}
    description={mockDescription}
  />;
};

export default withMockData;
