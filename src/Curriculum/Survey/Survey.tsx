import React, { useState, FC } from 'react';
import { useParams } from 'react-router-dom';
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

const data = ({
    'items': [
        {
            'item_type': 'TEXT',
            'question': 'What is your first name?',
        },
        {
            'item_type': 'CHOICE',
            'question': 'Are you interested in a career in the technology industry?',
            'options': [
                'As of now, I dont plan on it.',
                'Not sure...',
                'Im open to it. :)',
                'Absolutely!',
            ],
        },
        {
            'item_type': 'LONGTEXT',
            'question': 'What do you hope to get out of this course?',
        },
        {
            'item_type': 'SCALE',
            'question': 'How familiar would you say you are with computer networking concepts?',
            'options': [
                'Not at all',
                'Some familiarity',
                'Quite a bit',
                'Very familiar',
                'Professional Experience',
            ],
        },
        {
            'item_type': 'LONGTEXT',
            'question': 'How did you get involved with our program?',
        },
        {
            'item_type': 'CHOICE',
            'question': 'Have you ever worked with computer networks during you time in service?',
            'options': [
                'Yes',
                'No',
            ],
        },
        {
            'item_type': 'TEXT',
            'question': 'How many months do you plan to dedicate to this program?',
            'unit': 'months',
        },
    ],
});


// temporary, eventually want to move to api dir
interface SurveyQuestion {
    item_type: string;
    question: string;
    options?: string[];
    unit?: string;
}




const Survey = () => {

    const { surveyId } = useParams<Params>();

    const RenderInput: FC<{question:SurveyQuestion}> = ({question}) => {

        //Do I need this initialization?
        let inputForm = <p>Nada</p>;
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
                        value={option}
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
                inputForm = (
                    <Slider aria-label="slider1" defaultValue={10} max={10}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                );
                break;
            case 'TEXT':
                inputForm = (
                    <InputGroup>
                        <Input placeholder="Write Here" />
                        <InputRightAddon children={question.unit} color="black"/>
                    </InputGroup>
                );
                break;
            case 'LONGTEXT':
                inputForm = <Textarea placeholder="type here!"/>;
                break;
            default:
                inputForm = <p>default</p>;
        }

        return inputForm;
    };

    return (
        <SurveyContainer id="#">
            <section>
            <p>Hello World!!!</p>
            <p>{ surveyId}</p>
            <SimpleGrid columns={1} spacing={10}>
                {data?.items && data.items.map((q: SurveyQuestion, surveyId: number) => (
                    <div>
                        <p>{surveyId}</p>
                        <p>{q.question}</p>
                        <RenderInput question={q}/>
                    </div>
                ))}
            </SimpleGrid>
            </section>
            <SubmitSurvey>Submit</SubmitSurvey>
        </SurveyContainer>
    );
};
export default Survey;