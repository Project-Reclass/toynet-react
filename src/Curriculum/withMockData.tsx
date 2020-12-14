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
export default (Component: React.ComponentType<Props>) => () => {
  return <Component
    moduleData={mockData}
    description={mockDescription}
  />;
};