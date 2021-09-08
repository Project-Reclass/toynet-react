import React, { useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSurveyMeta } from 'src/common/api/curriculum/survey';
import LoadingContainer from 'src/common/components/LoadingContainer';
import { SurveyQuestion } from 'src/common/api/curriculum/survey/requests';

import {
    SimpleGrid,
    InputGroup,
    Input,
    InputRightAddon,
    Textarea,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/core';

import {
    SubmitSurvey,
    SurveyContainer,
    AnswerContainer,
  } from './SurveyStyled';

interface Params {
    surveyId: string;
}
interface InputValues {
    question: SurveyQuestion;
    id: number;
    updateResp: (resp: string, id: number) => any;
}

const answeredIndices = new Set();

const RenderInput: FC<InputValues> = ({question, id, updateResp}) => {
    let inputForm;
    switch (question.item_type) {
        case 'CHOICE':
            inputForm = (
                <AnswerContainer>
                <SimpleGrid columns={2} spacingX={1}>
                {question.options?.map((option) => (
                <div key={option}>
                    <label>
                    <input
                      type="radio"
                      id={option}
                      data-testid={option}
                      name={id.toString()}
                      value={option}
                      onChange={() => updateResp(option, id)}
                      style={{margin: '5px'}}
                    />
                    {option}
                    </label>
                </div>
                ))}
                </SimpleGrid>
                </AnswerContainer>
            );
            break;
        case 'SCALE':
            if (question.options) {
                inputForm = (
                    <AnswerContainer>
                    <SimpleGrid columns={question.options?.length} spacingX={1}>
                    {question.options?.map((option) => (
                    <div key={option}>
                        <label>
                            {option}
                            <br/>
                            <input
                            type="radio"
                            id={option}
                            data-testid={option}
                            name={id.toString()}
                            value={option}
                            onChange={() => updateResp(option, id)}
                            style={{margin: '5px'}}
                            />
                        </label>
                    </div>
                    ))}
                    </SimpleGrid>
                    </AnswerContainer>
                );
            } else {
                inputForm = (
                    <Slider
                      data-testid={question.question}
                      aria-label="slider1"
                      defaultValue={10}
                      max={10}
                      onChange={(val) => updateResp((val+1).toString(), id)}>
                        <SliderTrack height="10px">
                            <SliderFilledTrack height="10px" />
                        </SliderTrack>
                        <SliderThumb/>
                    </Slider>
                );
            };
            break;
        case 'TEXT':
            if (question.unit) {
                inputForm = (
                    <InputGroup>
                        <Input
                          data-testid={question.question}
                          onChange={(val: React.ChangeEvent<HTMLInputElement>) => updateResp(val.target.value, id)}
                          placeholder="Type Here"
                          color="black"/>
                        <InputRightAddon children={question.unit} background="teal"/>
                    </InputGroup>
                );
            } else {
                inputForm = <Input
                  data-testid={question.question}
                  onChange={(val: React.ChangeEvent<HTMLInputElement>) => updateResp(val.target.value, id)}
                  placeholder="Type Here"
                  color="black"/>;
            }
            break;
        case 'LONGTEXT':
            inputForm = <Textarea
              data-testid={question.question}
              onChange={(val: React.ChangeEvent<HTMLInputElement>) => updateResp(val.target.value, id)}
              placeholder="Type Here"
              color="black"/>;
            break;
        default:
            inputForm = <p>default</p>;
    };
    return inputForm;
};

const Survey = () => {

    const { surveyId } = useParams<Params>();
    const { data, isLoading } = useSurveyMeta(Number(surveyId));
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
                <SimpleGrid columns={1} spacing={10}>
                    <p>Feedback Survey</p>
                    {data?.items && data.items.map((q: SurveyQuestion, surveyId: number) => (
                        <div key={surveyId}>
                            <p>{surveyId + 1}. {q.question}</p>
                            <RenderInput question={q} id={surveyId} updateResp={updateSurvey}/>
                        </div>
                    ))}
                    <SubmitSurvey
                      type="submit"
                      variantColor='teal'
                      onClick={submitSurvey}
                    >
                    Submit Survey
                    </SubmitSurvey>
                </SimpleGrid>
            </LoadingContainer>
        </SurveyContainer>
    );
};
export default Survey;