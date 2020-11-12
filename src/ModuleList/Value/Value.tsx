import React from 'react';
import { useParams } from 'react-router-dom';

import styled from '@emotion/styled';

import { useValueMeta } from '../../common/api/curriculum/value';

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

const StyledReflection = styled.h1`
  font-size: 25px;
  color: white;
  font-weight: bold;
  margin: 1.25rem auto;
`;

const StyledBox = styled.div`
  width: auto;
  border: 2px solid white;
  padding: 20px;
  margin: 1.25rem auto;
  font-style: italic;

  h2 {
    text-align: center;
    color: white;
    font-weight: bold;
  }

  p {
    color: white;
    text-align: center;
  }
`;

const StyledTextArea = styled.textarea`
  background-color: #bbd3ea;
  width: 100%;
  height: 150px;
  border: 2px solid white;
  padding: 10px;
  margin: 1.25rem auto;


  ::placeholder {
    color: black;
  }
`;

const StyledSavebutton = styled.button`
  background-color: #6ca2d8;
  border: 2px solid white;
  color: white;
  padding: 10px 32px;
  text-align: center;
  font-size: 16px;
  margin: 1.25rem auto;
  border-radius: 10px;

  float: right;
`;

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
