import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Flex } from '@chakra-ui/core';

import { ArticleHeader, MarkdownWrapper } from './ArticleStyles';
import { useArticleMeta, useArticleText } from 'src/common/api/curriculum/article';
import { useParams } from 'react-router-dom';

interface Params {
  articleId: string;
}

const Article = () => {
  const { articleId } = useParams<Params>();
  const { data: articleText } = useArticleText(Number(articleId));
  const { data: meta } = useArticleMeta(Number(articleId));

  return (
    <Flex justifyContent='center' alignItems='center' flexDirection='column'>
      <ArticleHeader as='h1' size='2xl'>{meta?.title}</ArticleHeader>
      <ArticleHeader as='h2' size='lg'>Author: {meta?.author}</ArticleHeader>
      <MarkdownWrapper>
        <ReactMarkdown escapeHtml={false} source={articleText || ''}/>
      </MarkdownWrapper>
    </Flex>
  );
};

export default Article;