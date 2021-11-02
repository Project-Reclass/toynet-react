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
import ReactMarkdown from 'react-markdown';
import { Box, Container, Divider, Flex } from '@chakra-ui/react';

import { ArticleHeader, MarkdownWrapper } from './ArticleStyles';
import { useArticleMeta, useArticleText } from 'src/common/api/curriculum/article';
import { useParams } from 'react-router-dom';
import NavigationWithDivider from 'src/common/components/NavigationWithDivider';

interface Params {
  moduleId: string;
  articleId: string;
}

const Article = () => {
  const { moduleId, articleId } = useParams<Params>();
  const { data: articleText } = useArticleText(Number(articleId));
  const { data: meta } = useArticleMeta(Number(articleId));

  return (
    <Container maxW='container.lg' my='3'>
      <Flex justifyContent='center' alignItems='center' flexDirection='column'>
        <Box my='3'>
          <ArticleHeader as='h1' size='xl'>{meta?.title}</ArticleHeader>
          <ArticleHeader as='h2' size='md'>Written By: {meta?.author}</ArticleHeader>
          <Divider />
        </Box>
        <MarkdownWrapper>
          <ReactMarkdown escapeHtml={false} source={articleText || ''}/>
        </MarkdownWrapper>
      </Flex>
      <NavigationWithDivider
        moduleId={Number(moduleId)}
        submoduleId={Number(articleId)}
        submoduleType='ARTICLE'
      />
    </Container>
  );
};

export default Article;