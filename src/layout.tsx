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
import { Box, Flex } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useFeatureFlags } from './FeatureFlags';
import Sidebar from './Sidebar/Sidebar';

const description = 'A network emulator to help teach incarcerated veterans networking concepts';

interface Props {
  hideSideNav?: boolean;
  title: string;
}

const Layout: FC<Props> = ({ children, title, hideSideNav = false }) => {
  const { sideNav } = useFeatureFlags();
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
        title={title}
        titleTemplate={'%s | ToyNet'}
        meta={[
          {
            name: 'description',
            content: description,
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            property: 'og:description',
            content: description,
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            name: 'twitter:card',
            content: description,
          },
          {
            name: 'twitter:creator',
            content: '@ProjectReclass',
          },
          {
            name: 'twitter:title',
            content: title,
          },
          {
            name: 'twitter:description',
            content: description,
          },
        ]}
      >
        <link rel="canonical" href="https://projectreclass.org" />
      </Helmet>
      <Flex>
        {(!hideSideNav && sideNav) && <Sidebar />}
        <Box minW='calc(100% - 5rem)' flex='1 1 auto'>
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default Layout;