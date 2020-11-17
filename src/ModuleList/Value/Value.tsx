import React from 'react';
import { useParams } from 'react-router-dom';

import { useValueMeta } from '../../common/api/curriculum/value';
import { StyledReflection, StyledBox, StyledTextArea, StyledSavebutton } from './styled';

interface Params {
  valueId: string;
};

interface Value {
  value: string;
  inspiration: {
    organization: string;
    definition: string;
  }[];
}

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
