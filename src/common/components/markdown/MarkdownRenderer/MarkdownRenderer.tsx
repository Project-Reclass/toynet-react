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
import { Box, Center, Text } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import { Image, ImageProps } from '@chakra-ui/image';

const MarkdownWrapper = styled(Box)`
  color: white;

  line-height: 1.5rem;
  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  b {
    font-size: 1.5rem;
    font-weight: 700;
  }
  hr {
    width: 100%;
    border-bottom: 2pt solid rgba(255, 255, 255, 0.5);
    margin: 1rem;
  }
`;

const ImageRenderer = (props: ImageProps) => (
  <Center>
    <Image width='700px' {...props} />
  </Center>
);

export interface MarkdownRendererProps {
  source?: string;
  children?: string;
}

export const MarkdownRenderer = ({
  source,
  children = '',
}: MarkdownRendererProps) => (
  <MarkdownWrapper>
    <ReactMarkdown
      skipHtml={false}

      components={{
        img: ({ node, ...props }) => <ImageRenderer {...props} />,
        p: ({ node, ...props }) => <Text {...props} my='1rem' />,
      }}
    >
      {source || children}
    </ReactMarkdown>
  </MarkdownWrapper>
);

export default MarkdownRenderer;