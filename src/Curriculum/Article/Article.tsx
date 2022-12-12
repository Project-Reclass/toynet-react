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
import { Box, Container, Divider, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useArticleMeta, useArticleText } from 'src/common/api/curriculum/article';
import NavigationWithDivider from 'src/common/components/NavigationWithDivider';

import { ArticleContainer, ArticleHeader } from './ArticleStyled';
import MarkdownRenderer from 'src/common/components/markdown/MarkdownRenderer/MarkdownRenderer';

interface Params {
  moduleId: string;
  articleId: string;
}

const Article = () => {
  const { moduleId, articleId } = useParams<Params>();
  const { data: articleText } = useArticleText(Number(articleId));
  const { data: meta } = useArticleMeta(Number(articleId));

  return (
    <ArticleContainer id="#">
      <Container maxW='700px'>
        <Flex justifyContent='center' alignItems='center' flexDirection='column'>
          <Box>
            <ArticleHeader as='h1' size='xl'>{meta?.title}</ArticleHeader>
            <ArticleHeader as='h2' size='md'>Written By: {meta?.author}</ArticleHeader>
            <Divider />
          </Box>
          <MarkdownRenderer>
            {articleText || ''}
          </MarkdownRenderer>
        </Flex>
        <NavigationWithDivider
          moduleId={Number(moduleId)}
          submoduleId={Number(articleId)}
          submoduleType='ARTICLE'
        />
        </Container>
      </ArticleContainer>
  );
};

export default Article;