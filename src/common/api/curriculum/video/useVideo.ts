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

import axios from 'axios';
import { useQuery } from 'react-query';
import { Video } from 'src/common/types';

export default function useVideo(submoduleId: number, videoId: number) {
  return useQuery(['video-meta', { submoduleId, videoId }], async (_, { submoduleId, videoId }) => {
    const { data } = await axios.get<Video>(`/data/video/${submoduleId}/${videoId}.json`);
    return data;
  });
}