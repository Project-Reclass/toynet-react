import React, { FC } from 'react';

import Header from './Header/Header';

interface Props {

}

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;