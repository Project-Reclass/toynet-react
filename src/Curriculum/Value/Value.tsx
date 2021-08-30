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
import { useParams } from 'react-router-dom';

import { useValueMeta } from '../../common/api/curriculum/value';
import { StyledReflection, StyledBox, StyledTextArea, StyledSavebutton } from './styled';

interface Params {
  valueId: string;
};

const Value = () => {
  const { valueId } = useParams<Params>();

  const { data } = useValueMeta(Number(valueId));

  const placeholderText = `What does ${data?.value.toLowerCase()} mean to you?`;

  return (
    <div className='container-1920 mx-auto' style={{ padding: '1rem' }}>
      <StyledReflection>Reflection: {data?.value}</StyledReflection>

      {data?.inspiration.map((org) => (
        <StyledBox key={org.organization} data-testid="styled-box">
          <h2>{org.organization}</h2>
          <p>{org.definition}</p>
        </StyledBox>
      ))}

      <StyledTextArea placeholder={placeholderText}></StyledTextArea>

      <StyledSavebutton>Save</StyledSavebutton>
    </div>
  );
};

export default Value;
