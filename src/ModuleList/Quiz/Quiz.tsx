import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleGrid, Box, Flex } from '@chakra-ui/core';
import { SubmitQuiz } from './styled';

import { useQuizMeta } from 'src/common/api/curriculum/quiz';

interface Params {
  moduleId: string;
  quizId: string;
}

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface StringMap {
  [key: string]: boolean;
}

const Quiz = () => {
  const { moduleId, quizId } = useParams<Params>();

  const { data } = useQuizMeta(Number(quizId));

  const [inputsAreDisabled, setInputsAreDisabled] = useState<boolean>(false);
  const [questionIndexesAnsweredCorrectly, setQuestionIndexesAnsweredCorrectly] = useState<StringMap>({});
  const [quizIsSubmitted, setQuizIsSubmitted] = useState<boolean>(false);

  const handleAnsweredQuestion = (q: Question, qIndex: number, optionIndex: number) => {
    return (e: React.ChangeEvent<any>) => {
      questionIndexesAnsweredCorrectly[qIndex] = q.answer === optionIndex;
      setQuestionIndexesAnsweredCorrectly(questionIndexesAnsweredCorrectly);
    };
  };

  const checkQuiz = () => {
    setInputsAreDisabled(true);
    setQuizIsSubmitted(true);
  };

  const getLabelStyle = (q: Question, qIndex: number, optionIndex: number) => {
    let color = '#FFFFFF';
    if (quizIsSubmitted &&
      !!questionIndexesAnsweredCorrectly[qIndex] === false &&
      q.answer === optionIndex) {
      color = '#C5A3B4';
    }
    return { color };
  };

  return (
    <div>
      <h1>
        Module: {moduleId}
      </h1>
      <h2>
        Quiz: {quizId}
      </h2>

      <SimpleGrid columns={1} spacing={10}>
        {data?.map((q: Question, qIndex: number) => (
          <Box p={5} color="white" key={qIndex}>
            <p>{ `${qIndex + 1}. ${q.question}`}</p>
            <SimpleGrid columns={2} spacingX={1}>
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    disabled={inputsAreDisabled}
                    type="radio"
                    id={option}
                    name={qIndex.toString()}
                    value={option}
                    onChange={handleAnsweredQuestion(q, qIndex, optionIndex)}
                  />
                  <label htmlFor={option} style={getLabelStyle(q, qIndex, optionIndex)}>{option}</label>
                </div>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </SimpleGrid>
      <Flex>
        <SubmitQuiz onClick={checkQuiz}>Submit Quiz</SubmitQuiz>
      </Flex>
    </div>
  );
};

export default Quiz;