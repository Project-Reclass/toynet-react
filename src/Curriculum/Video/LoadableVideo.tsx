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
import { useBoolean } from '@chakra-ui/hooks';
import { Skeleton } from '@chakra-ui/react';

const HideableIframe = styled.iframe`
  display: ${({ isLoading }: {isLoading: boolean}) => isLoading ? 'none' : undefined};
`;

interface Props {
  url: string;
  title: string;
}

export default function LoadableVideo({
  url,
  title,
}: Props) {
  const [isLoading, setIsLoading] = useBoolean(true);

  return (
    <>
      {isLoading &&
        <Skeleton height='500' width='100%' colorScheme='blackAlpha' mb='1.45rem' />
      }
      <HideableIframe
        isLoading={isLoading}
        height="500"
        width="100%"
        src={url}
        title={title}
        onLoad={setIsLoading.off}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
}