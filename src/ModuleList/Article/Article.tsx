import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { text } from './mockData';
import ReactMarkdown from 'react-markdown';
import { Heading } from '@chakra-ui/core';
import { HeadingContainer, AuthorContainer, MarkdownWrapper, Div } from './ArticleStyles';
interface ExpectedParams {
  moduleId?: string;
  articleId?: string;
}

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
  const { moduleId, articleId } = useParams<ExpectedParams>();


  return (
    <Div>
      <HeadingContainer><Heading as='h1'size='2xl'>{data.title}</Heading></HeadingContainer>
      <AuthorContainer><Heading as='h2'size='xl'>{data.author}</Heading></AuthorContainer>
      <MarkdownWrapper><ReactMarkdown escapeHtml={false} source={text}/></MarkdownWrapper>
    </Div>
  );
};

export default Article;