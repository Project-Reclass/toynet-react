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

const mockData = {
    id: 1,
    name: 'Introduction to Computer Networking',
    introduction: 'Welcome to the demo of our Networking Fundamentals course.',
    modules: [
        {
            id: 100001,
            name: 'Life of a Network Packet',
            introduction: 'Computer need to move lots of information (e.g. emailed files, social media interactions, video streams) from one device to another. Whether it’s through WiFi or over some kind of cable, computers communicate with a series of bits (0s and 1s) in tiny chunks at a time. The most common way of sending these tiny chunks is with a packet. This module is all about packets!',
            submodules: [
                {
                    type: 'SURVEY',
                    id: 6001,
                    name: 'Who are you?',
                    introduction: 'First we want to know a little about you so we can make this program even better for you and other other learns.',
                },
                {
                    type: 'VALUE',
                    id: 5001,
                    name: 'Integrity',
                    introduction: 'At Project Reclass, we are not just focused on what we build but also how we build it. We routinely reflect on values espoused by our military branches, and reflect on what these values mean to us. Throughout your course, we welcome you to do the same!',
                },
                {
                    type: 'LESSON',
                    id: 6001,
                    name: 'Motivation',
                    introduction: 'How does a file move from computer to computer? Let\'s revisit why we need computer networks in the first place.',
                },
                {
                    type: 'ARTICLE',
                    id: 2001,
                    name: 'Fiber Optics in the Sea',
                    introduction: 'Ever wondered how underwater cables are laid? We take a trip on the ship that keeps us online.',
                },
                {
                    type: 'LAB',
                    id: 1,
                    name: 'Connecting Devices',
                    introduction: 'So we now understand why and how we can connect devices through computer networks. Let\'s give it a try in our hands-on lab!',
                },
                {
                    type: 'QUIZ',
                    id: 4001,
                    name: 'Life of a Network Packet',
                    introduction: 'Great job on finishing Module 1! Before you move on, take this quick quiz to make sure you understood the material so we can set you up for success with the rest of this curriculum!',
                },
            ],
        },
        {
            id: 100002,
            name: 'History of the Internet',
            introduction: 'To understand how it works today, it is helpful to understand how and why it was created as well as how it has evolved over the decades. This module takes you on a journey through half a century of innovations which went into our modern world-wide web.',
            submodules: [],
        },
        {
            id: 100003,
            name: 'Routing',
            introduction: 'Coming Soon!',
            submodules: [],
        },
        {
            id: 100003,
            name: 'Routing',
            introduction: 'Coming Soon!',
            submodules: [],
        },
        {
            id: 100004,
            name: 'Domain Name Servers',
            introduction: 'Coming Soon!',
            submodules: [],
        },
        {
            id: 100005,
            name: 'Securing Networks',
            introduction: 'Coming Soon!',
            submodules: [],
        },
        {
            id: 100006,
            name: 'Modern Networks',
            introduction: 'Coming Soon!',
            submodules: [],
        },
        {
            id: 100007,
            name: 'Monitoring Networks',
            introduction: 'Coming Soon!',
            submodules: [],
        },
    ],
};

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
