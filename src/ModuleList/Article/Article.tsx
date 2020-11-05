import React from 'react';
import { text } from './mockData';
import ReactMarkdown from 'react-markdown';
import { ArticleHeader, MarkdownWrapper, Div } from './ArticleStyles';


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


const Article = () => {


  return (
    <Div>
      <ArticleHeader as='h1'size='2xl'>{data.title}</ArticleHeader>
      <ArticleHeader as='h2'size='xl'>Author: {data.author}</ArticleHeader>
      <MarkdownWrapper><ReactMarkdown escapeHtml={false} source={text}/></MarkdownWrapper>
    </Div>
  );
};

export default Article;