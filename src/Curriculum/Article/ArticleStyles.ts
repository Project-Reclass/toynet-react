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
import styled from '@emotion/styled';
import { Heading } from '@chakra-ui/react';

export const MarkdownWrapper = styled('h3')`
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

export const ArticleHeader = styled(Heading)`
  color: white;
  width: 80%;
  margin-bottom: 1rem;
`;
