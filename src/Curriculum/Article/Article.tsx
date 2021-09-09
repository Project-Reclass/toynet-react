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