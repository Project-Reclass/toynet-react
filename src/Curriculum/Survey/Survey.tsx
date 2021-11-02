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
import React, { useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSurvey } from 'src/common/api/curriculum/survey';
import LoadingContainer from 'src/common/components/LoadingContainer';
import ToyNetInput from 'src/common/components/ToyNetInput';
import ToyNetTextarea from 'src/common/components/ToyNetTextarea';

import {
  SimpleGrid,
  InputGroup,
  InputRightAddon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
  FormLabel,
  FormControl,
  Container,
  Button,
  Box,
  Text,
  Divider,
  Stack,
} from '@chakra-ui/react';

// TODO: Change this back on the next version of chakra
import {
  Radio,
  RadioGroup,
} from '@chakra-ui/radio';

import {
  SurveyContainer,
} from './SurveyStyled';
import { SurveyQuestion } from 'src/common/types';
import NavigationWithDivider from 'src/common/components/NavigationWithDivider';

interface Params {
  moduleId: string;
  surveyId: string;
}
interface InputValues {
  question: SurveyQuestion;
  id: number;
  updateResp: (resp: string, id: number) => any;
}

const answeredIndices = new Set();

const RenderInput: FC<InputValues> = ({ question, id, updateResp }) => {
  let inputForm;
  switch (question.item_type) {
    case 'CHOICE':
      inputForm = (
        <SimpleGrid columns={2} spacingX={1}>
          {question.options?.map((option) => (
            <Radio
              key={option}
              id={option}
              data-testid={option}
              name={id.toString()}
              value={option}
              onChange={() => updateResp(option, id)}
              style={{ margin: '5px' }}
            >
              <Text color='white'>{option}</Text>
            </Radio>
          ))}
        </SimpleGrid>
      );
      break;
    case 'SCALE':
      if (question.options) {
        inputForm = (
          <SimpleGrid columns={question.options?.length} spacingX={1}>
            {question.options?.map((option) => (
              <Radio
                key={option}
                id={option}
                textColor='white'
                data-testid={option}
                name={id.toString()}
                value={option}
                onChange={() => updateResp(option, id)}
                style={{ margin: '5px' }}
              >
                <Text color='white'>{option}</Text>
              </Radio>
            ))}
          </SimpleGrid>
        );
      } else {
        inputForm = (
          <Slider
            data-testid={question.question}
            aria-label="slider1"
            defaultValue={10}
            textColor='white'
            max={10}
            onChange={(val) => updateResp((val + 1).toString(), id)}
          >
            <SliderTrack height="10px" textColor='white'>
              <SliderFilledTrack height="10px" textColor='white' />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        );
      };
      break;
    case 'TEXT':
      if (question.unit) {
        inputForm = (
          <InputGroup>
            <ToyNetInput
              data-testid={question.question}
              onChange={(val: React.ChangeEvent<HTMLInputElement>) => updateResp(val.target.value, id)}
              placeholder="Type Here" />
            <InputRightAddon children={question.unit} color="black" />
          </InputGroup>
        );
      } else {
        inputForm = <ToyNetInput
          color='white'
          data-testid={question.question}
          onChange={(val: React.ChangeEvent<HTMLInputElement>) => updateResp(val.target.value, id)}
          placeholder="Type Here" />;
      }
      break;
    case 'LONGTEXT':
      inputForm = <ToyNetTextarea
        color='white'
        data-testid={question.question}
        onChange={val => updateResp(val.target.value, id)}
        placeholder="Type Here" />;
      break;
    default:
      inputForm = <p>default</p>;
  };
  return inputForm;
};

const Survey = () => {
  const { moduleId, surveyId } = useParams<Params>();
  const { data, isLoading } = useSurvey(Number(moduleId), Number(surveyId));
  const dataLength = data ? data.items.length : 0;
  const [surveyAnswers, setSurveyAnswers] = useState<string[]>(new Array<string>(dataLength));

  const updateSurvey = (resp: string, id: number) => {
    answeredIndices.add(id);
    surveyAnswers[id] = resp;
    setSurveyAnswers(surveyAnswers);
  };

  const submitSurvey = () => {
    if (data?.items.length !== answeredIndices.size) {
      alert(`You answered ${answeredIndices.size}  out of  ${data?.items.length} questions!`);
    } else {
      console.log(surveyAnswers);
    };
  };

  return (
    <SurveyContainer id="#">
      <LoadingContainer isLoading={isLoading}>
        <Container maxW='container.xl'>
          <RadioGroup>
            <SimpleGrid columns={1} spacing={5}>
              <Stack spacing={2}>
                <Heading size="lg">{`Survey: ${data?.name}`}</Heading>
                <Text size='sm' color='whiteAlpha.800'>{data?.description}</Text>
                <Divider />
              </Stack>
              {data?.items && data.items.map((q: SurveyQuestion, surveyId: number) => (
                <FormControl key={surveyId}>
                  <FormLabel>{surveyId + 1}. {q.question}</FormLabel>
                  <RenderInput question={q} id={surveyId} updateResp={updateSurvey} />
                </FormControl>
              ))}
              <Box>
                <Button
                  colorScheme='teal'
                  size='md'
                  onClick={submitSurvey}
                >
                  Submit Survey
                </Button>
              </Box>
            </SimpleGrid>
          </RadioGroup>
          <NavigationWithDivider
            moduleId={Number(moduleId)}
            submoduleId={Number(surveyId)}
            submoduleType='SURVEY'
          />
        </Container>
      </LoadingContainer>
    </SurveyContainer>
  );
};
export default Survey;