/* eslint-disable no-magic-numbers */
import React from 'react';
import { Link, Text } from '@chakra-ui/core';
import { ModuleTypes, ModuleInterface } from './Module';

// const mockUsername = 'Tay';
// const mockDescription = 'Welcome to the demo of our Networking Fundamentals course. You can click on each module’s chevron to see its submodules. You must go through the modules and their submodules in order. To start or revisit a submodule, click Go To Submodule >.';
const MockDescription = () => (
  <Text>
    Welcome to the demo of our <Text as={'span'} fontWeight='bold'>Networking Fundamentals</Text> course.
    You can click on each module's chevron to see its submodules.
    You must go through the modules and their submodules in order.
    To start or revisit a submodule, click {' '}
    <Link fontWeight='bold' textDecoration='underline'>Go To Submodule {' >.'}</Link>
  </Text>
);

const mockData = [
  {
    id: 1,
    moduleId: 0,
    title: 'Example Module',
    completed: false,
    inProgress: false,
    description: 'Computer need to move lots of information (e.g. emailed files, social media interactions, video streams) from one device to another. Whether it’s through WiFi or over some kind of cable, computers communicate with a series of bits (0s and 1s) in tiny chunks at a time. The most common way of sending these tiny chunks is with a packet. This module is all about packets! For details about the submodule, click on its star.',
    type: ModuleTypes.PARENT,
    subModules: [
      {
        id: 4001,
        moduleId: 0,
        title: 'Life of a Network Packet',
        completed: true,
        inProgress: false,
        type: ModuleTypes.QUIZ,
      },
      {
        id: 2001,
        moduleId: 0,
        title: 'Ever wondered how underwater cables are laid?',
        completed: true,
        inProgress: false,
        type: ModuleTypes.ARTICLE,
      },
      {
        id: 5001,
        moduleId: 0,
        title: 'Integrity',
        completed: false,
        inProgress: true,
        type: ModuleTypes.VALUE,
      },
    ],
  },
  {
    id: 2,
    moduleId: 0,
    title: 'Second Module',
    description: '',
    completed: false,
    inProgress: false,
    type: ModuleTypes.PARENT,
    subModules: [
      {
        id: 4002,
        moduleId: 0,
        title: 'Quiz 2',
        completed: false,
        inProgress: false,
        type: ModuleTypes.QUIZ,
      },
      {
        id: 2002,
        moduleId: 0,
        title: 'Father of the internet, Vint Cerf, on creating the interplanetary internet',
        completed: false,
        inProgress: false,
        type: ModuleTypes.ARTICLE,
      },
      {
        id: 5002,
        moduleId: 0,
        title: 'Values - Respect',
        completed: false,
        inProgress: false,
        type: ModuleTypes.VALUE,
      },
    ],
  },
];

interface Data extends ModuleInterface {
  description: string;
  subModules: ModuleInterface[];
}

interface Props {
  username?: string;
  description: JSX.Element | string;
  moduleData: Data[];
}

export const withMockData = (Component: React.ComponentType<Props>) => () => {
  return <Component
    moduleData={mockData}
    description={<MockDescription />}
  />;
};

export default withMockData;
