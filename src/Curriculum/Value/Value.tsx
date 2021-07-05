import { useToast } from '@chakra-ui/core';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {
  useUpdateValueEntry,
  useValueEntry,
  useValueMeta,
} from '../../common/api/curriculum/value';

import {
  StyledReflection,
  StyledBox,
  StyledTextArea,
  StyledSavebutton,
} from './styled';

interface Params {
  valueId: string;
};

const Value = () => {
  const toast = useToast();
  const { valueId } = useParams<Params>();
  const { data } = useValueMeta(Number(valueId));

  const [saveValue] = useUpdateValueEntry(Number(valueId));
  const entryQuery = useValueEntry(Number(valueId));

  const [value, setValue] = useState('');

  useEffect(() => {
    if (!entryQuery.isLoading && entryQuery.isSuccess) {
      setValue(entryQuery.data?.data.entry || '');
    }
  }, [entryQuery.isLoading, entryQuery.isSuccess, entryQuery.data]);

  const placeholderText = `What does ${data?.value.toLowerCase()} mean to you?`;

  const handleSaveValue = async () => {
    let isSuccess = true;
    try {
      await saveValue({ quote: value });
    } catch (error) {
      console.info({error});
      isSuccess = false;
    }
    toast({
      description: isSuccess ? 'Value saved.' : 'Unable to save value.',
      status: isSuccess ? 'success' : 'error',
      isClosable: true,
      // eslint-disable-next-line no-magic-numbers
      duration: 9000,
      position: 'top-right',
    });
  };

  return (
    <div className='container-1920 mx-auto' style={{ padding: '1rem' }}>
      <StyledReflection>Reflection: {data?.value}</StyledReflection>

      {data?.inspiration.map((org) => (
        <StyledBox key={org.organization} data-testid="styled-box">
          <h2>{org.organization}</h2>
          <p>{org.definition}</p>
        </StyledBox>
      ))}

      <StyledTextArea
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        placeholder={placeholderText}
      >
        {value}
      </StyledTextArea>

      <StyledSavebutton onClick={handleSaveValue}>
        Save
      </StyledSavebutton>
    </div>
  );
};

export default Value;
