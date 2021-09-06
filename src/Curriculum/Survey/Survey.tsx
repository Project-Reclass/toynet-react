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
    QuestionLabel,
  } from './SurveyStyled';

interface Params {
    surveyId: string;
}


const Survey = () => {

    const { surveyId } = useParams<Params>();
    const { data, isLoading } = useSurveyMeta(Number(surveyId));
    const dataLength = data ? data.items.length : 0;

    const [surveyAnswers, setSurveyAnswers] = useState<string[]>(new Array<string>(dataLength));

    const UpdateSurveyFunc = (resp: string, id: number) => {
        return () => {
            surveyAnswers[id] = resp;
            setSurveyAnswers(surveyAnswers);
        };
    };
    const UpdateSurvey = (resp: string, id: number) => {
        surveyAnswers[id] = resp;
        setSurveyAnswers(surveyAnswers);
    };

    const RenderInput: FC<{question:SurveyQuestion, id:number}> = ({question, id}) => {
        let inputForm;
        switch (question.item_type) {
            case 'CHOICE':
                inputForm = (
                    <SimpleGrid columns={2} spacingX={1}>
                    {question.options?.map((option) => (
                    <div key={option}>
                        <input
                        type="radio"
                        id={option}
                        data-testid={option}
                        name={id.toString()}
                        value={option}
                        onChange={UpdateSurveyFunc(option, id)}
                        style={{margin: '5px'}}
                        />
                        <QuestionLabel
                            as={'label'}
                            fontSize='lg'
                            isIncorrect={false}
                        >
                            {option}
                        </QuestionLabel>
                    </div>
                    ))}
                    </SimpleGrid>
                );
                break;
            case 'SCALE':
                if (question.options) {
                    inputForm = (
                        <SimpleGrid columns={question.options?.length} spacingX={1}>
                        {question.options?.map((option) => (
                        <div key={option}>
                            <QuestionLabel
                                as={'label'}
                                fontSize='lg'
                                isIncorrect={false}
                            >
                                {option}
                            </QuestionLabel>
                            <br/>
                            <input
                            type="radio"
                            id={option}
                            data-testid={option}
                            name={id.toString()}
                            value={option}
                            onChange={UpdateSurveyFunc(option, id)}
                            style={{margin: '5px'}}
                            />
                        </div>
                        ))}
                        </SimpleGrid>
                    );
                } else {
                    inputForm = (
                        <Slider
                        aria-label="slider1"
                        defaultValue={10}
                        max={10}
                        onChange={(val) => UpdateSurvey((val+1).toString(), id)}>
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
                            onChange={(val: React.ChangeEvent<HTMLInputElement>) => UpdateSurvey(val.target.value, id)}
                            placeholder="Write Here"
                            color="black"/>
                            <InputRightAddon children={question.unit} color="black"/>
                        </InputGroup>
                    );
                } else {
                    inputForm = <Input
                    onChange={(val: React.ChangeEvent<HTMLInputElement>) => UpdateSurvey(val.target.value, id)}
                    placeholder="Write Here"
                    color="black"/>;
                }
                break;
            case 'LONGTEXT':
                inputForm = <Textarea
                onChange={(val: React.ChangeEvent<HTMLInputElement>) => UpdateSurvey(val.target.value, id)}
                placeholder="type here!"
                color="black"/>;
                break;
            default:
                inputForm = <p>default</p>;
        };
        return inputForm;
    };

    return (
        <SurveyContainer id="#">
            <LoadingContainer isLoading={isLoading}>
                <SimpleGrid columns={1} spacing={10}>
                    <p>Feedback Survey</p>
                    {data?.items && data.items.map((q: SurveyQuestion, surveyId: number) => (
                        <div key={surveyId}>
                            <p>{surveyId + 1}. {q.question}</p>
                            <RenderInput question={q} id={surveyId}/>
                        </div>
                    ))}
                    <SubmitSurvey
                    variantColor='blue'
                    onClick={() => (console.log(surveyAnswers))}
                    >
                    Submit Survey
                    </SubmitSurvey>
                </SimpleGrid>
            </LoadingContainer>
        </SurveyContainer>
    );
};
export default Survey;