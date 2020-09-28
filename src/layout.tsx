import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

const description = 'A network emulator to help teach incarcerated veterans networking concepts';

interface Props {
  title: string;
}

const Layout: FC<Props> = ({ children, title }) => {
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
      {children}
    </>
  );
};

export default Layout;