import React, {FC} from 'react';

import { Flex } from 'src/common/components';

import SplashNav from './SplashNav';
import SplashHeader from './SplashHeader';
import SplashContent from './SplashContent';
import SplashAbout from './SplashAbout';
import SplashFooter from './SplashFooter';

const Splashscreen: FC = () => {
  return (
    <Flex direction={'column'}>
      <SplashNav />
      <SplashHeader />
      <SplashContent />
      <SplashAbout />
      <section id='contact'>
        <SplashFooter />
      </section>
    </Flex>
  );
};

export default Splashscreen;
