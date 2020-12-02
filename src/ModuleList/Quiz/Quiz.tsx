import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleGrid, Box, Flex } from '@chakra-ui/core';
import { SubmitQuiz, CheckIcon, IncorrectIcon, QuestionLabel } from './styled';
import { useQuizMeta } from 'src/common/api/curriculum/quiz';
import { Question } from 'src/common/api/curriculum/quiz/requests';
import { StringMap } from '../../common/types';

interface Params {
  quizId: string;
}

const Quiz = () => {
  const { quizId } = useParams<Params>();

  const { data } = useQuizMeta(Number(quizId));

  const [questionIndexesAnsweredCorrectly, setQuestionIndexesAnsweredCorrectly] = useState<StringMap>({});
  const [quizIsSubmitted, setQuizIsSubmitted] = useState<boolean>(false);

  const handleAnsweredQuestion = (q: Question, qIndex: number, optionIndex: number) => {
    return () => {
      questionIndexesAnsweredCorrectly[qIndex] = q.answer === optionIndex;
      setQuestionIndexesAnsweredCorrectly(questionIndexesAnsweredCorrectly);
    };
  };

  const checkQuiz = () => {
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
      <SimpleGrid columns={1} spacing={10}>
        {Array.isArray(data) && data.map((q: Question, qIndex: number) => (
          <Box p={5} color="white" key={qIndex}>
            <Flex>
              {quizIsSubmitted && (questionIndexesAnsweredCorrectly[qIndex] ?
                <CheckIcon color="green.500"/> : <IncorrectIcon color="red.500" />)}
              <p>{ `${qIndex + 1}. ${q.question}`}</p>
            </Flex>
            <SimpleGrid columns={2} spacingX={1}>
              {q.options.map((option, optionIndex) => (
                <div key={option}>
                  <input
                    type="radio"
                    id={option}
                    name={qIndex.toString()}
                    value={option}
                    onChange={handleAnsweredQuestion(q, qIndex, optionIndex)}
                    style={{margin: '5px'}}
                  />
                  <QuestionLabel
                    htmlFor={option}
                    isIncorrect={quizIsSubmitted &&
                      !questionIndexesAnsweredCorrectly[qIndex] &&
                      q.answer === optionIndex
                    }
                  >
                    {option}
                  </QuestionLabel>
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