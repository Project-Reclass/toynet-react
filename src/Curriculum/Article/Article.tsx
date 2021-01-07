import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Flex } from '@chakra-ui/core';

import { text } from './mockData';
import { ArticleHeader, MarkdownWrapper } from './ArticleStyles';

const data = {
  'source': 'https://www.wired.co.uk/article/subsea-internet-cable-ship-boat',
  'title': 'Ever wondered how underwater cables are laid? We take a trip on the ship that keeps us online',
  'author': 'Matt Burgess',
  'images': [
      { 'file': '1.jpeg' },
      { 'file': '2.jpeg' },
      { 'file': '3.jpeg' },
      { 'file': '4.jpeg' },
      { 'file': '5.jpeg' },
      { 'file': '6.jpeg' },
      { 'file': '7.jpeg' },
  ],
};

const Article = () => (
  <Flex justifyContent='center' alignItems='center' flexDirection='column'>
    <ArticleHeader as='h1' size='2xl'>{data.title}</ArticleHeader>
    <ArticleHeader as='h2' size='lg'>Author: {data.author}</ArticleHeader>
    <MarkdownWrapper>
      <ReactMarkdown escapeHtml={false} source={text}/>
    </MarkdownWrapper>
  </Flex>
);

export default Article;