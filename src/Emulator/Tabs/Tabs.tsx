import React from 'react';
import styled from '@emotion/styled';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

import ConfigureTab from './ConfigureTab';
import ConsoleTab from './ConsoleTab/ConsoleTab';
import HistoryTab from './HistoryTab/HistoryTab';

const CustomTab = styled(Tab)`
  color: white;
  opacity: 0.75;
  font-size: large;
  border-radius: 5px;
`;

const TabsPanel = () => {
  return (
    <Tabs variant='unstyled'>
      <TabList
        width='calc(300px + 2rem)'
        backgroundColor='#454950'
        borderRadius='10px 10px 0 0'
        padding='0.459rem'
      >
        <CustomTab
          _selected={{ backgroundColor: 'rgb(17, 15, 15)', opacity: 1 }}
        >
          Configure
        </CustomTab>
        <CustomTab
          _selected={{ backgroundColor: 'rgb(17, 15, 15)', opacity: 1 }}
        >
          Console
        </CustomTab>
        <CustomTab
          _selected={{ backgroundColor: 'rgb(17, 15, 15)', opacity: 1 }}
        >
          History
        </CustomTab>
      </TabList>

      <TabPanels
        minHeight='17rem'
        backgroundColor='#454950'
        borderRadius='0 10px 10px 10px'
      >
        <TabPanel>
          <ConfigureTab />
        </TabPanel>
        <TabPanel>
          <ConsoleTab />
        </TabPanel>
        <TabPanel>
          <HistoryTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsPanel;
