import React from 'react';
import { useParams } from 'react-router-dom';

import styled from '@emotion/styled';

interface Params {
  valuesId: string;
};

interface Value {
  value: string;
  inspiration: {
    organization: string;
    definition: string;
  }[];
}

const getMockData = (valuesId: string) : Value => valuesId === '5001'
  ? {
      'value': 'Integrity',
      'inspiration': [
          {
              'organization': 'U.S. Air Force',
              'definition': 'Integrity is the adherence to a strong moral code and consistency in one’s actions and values [...] Airmen should be guided by a deeply held sense of honor, not one of personal comfort or uncontrolled selfish appetites.',
          },
          {
              'organization': 'U.S. Army',
              'definition': 'Do what’s right, legally and morally. Integrity is a quality you develop by adhering to moral principles. It requires that you do and say nothing that deceives others. As your integrity grows, so does the trust others place in you […] and, finally, the fundamental acceptance of yourself.',
          },
          {
              'organization': 'U.S. Coast Guard',
              'definition': 'Integrity is our standard. We demonstrate uncompromising ethical conduct and moral behavior in all of our personal actions. We are loyal and accountable to the public trust.',
          },
      ],
  }
  : valuesId === '5002'
  ? {
      'value': 'Respect',
      'inspiration': [
          {
              'organization': 'Army',
              'definition': 'Treat people as they should be treated [...] Respect is what allows us to appreciate the best in other people. Respect is trusting that all people have done their jobs and fulfilled their duty.',
          },
      ],
  }
  : valuesId === '5003'
  ? {
        'value': 'Honor',
        'inspiration': [
            {
                'organization': 'Army',
                'definition': 'Live up to Army values [...] Honor is a matter of carrying out, acting, and living the values of respect, duty, loyalty, selfless service, integrity and personal courage in everything you do.',
            },
            {
                'organization': 'Marines / Navy',
                'definition': 'The quality of maturity, dedication, trust, and dependability that commits Marines to act responsibly; to be accountable for actions; to fulfill obligations; and to hold others accountable for their actions.',
            },
        ],
    }
  : valuesId === '5004'
  ? {
        'value': 'Loyalty',
        'inspiration': [
            {
                'organization': 'U.S. Army',
                'definition': 'Bear true faith and allegiance to the U.S. Constitution, the Army, your unit and other Soldiers. Bearing true faith and allegiance is a matter of believing in and devoting yourself to something or someone … By wearing the uniform of the U.S. Army you are expressing your loyalty. And by doing your share, you show your loyalty to your unit.',
            },
        ],
    }
  : {
        'value': 'None',
        'inspiration': [
            {
                'organization': 'None',
                'definition': 'None',
            },
        ],
    };

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

  h1 {
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

const Values = () => {
  const { valuesId } = useParams<Params>();

  const data = getMockData(valuesId);

  const placeholderText = `What does ${data.value.toLowerCase()} mean to you?`;

  return (
    <div className='container-1920 mx-auto' style={{ padding: '1rem' }}>
      <StyledReflection>Reflection: {data.value}</StyledReflection>

      {data.inspiration.map((org) => (
        <StyledBox key={org.organization}>
          <h1>{org.organization}</h1>
          <p>{org.definition}</p>
        </StyledBox>
      ))}

      <StyledTextArea placeholder={placeholderText}></StyledTextArea>

      <StyledSavebutton>Save</StyledSavebutton>
    </div>
  );
};

export default Values;
