import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SimpleGrid, Box, Flex, Text, useDisclosure } from '@chakra-ui/core';

import { StringMap } from 'src/common/types';
import { useQuizMeta } from 'src/common/api/curriculum/quiz';
import { Question } from 'src/common/api/curriculum/quiz/requests';
import LoadingContainer from 'src/common/components/LoadingContainer';

import {
  SubmitQuiz,
  CheckIcon,
  IncorrectIcon,
  QuestionLabel,
  QuizContainer,
  AnswerContainer,
} from './styled';
import QuizModal from './QuizModal';

interface Params {
  quizId: string;
}

const Quiz = () => {
  const { quizId } = useParams<Params>();
  const { data, isLoading } = useQuizMeta(Number(quizId));
  const { isOpen, onClose, onOpen } = useDisclosure(false);

  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [questionIsCorrect, setQuestionIsCorrect] = useState<StringMap>({});

  const handleAnsweredQuestion = (q: Question, qIndex: number, answerPicked: number) => {
    return () => {
      questionIsCorrect[qIndex] = q.answer === answerPicked;
      setQuestionIsCorrect(questionIsCorrect);
    };
  };

  const submitQuiz = () => {
    onOpen();
    setIsQuizSubmitted(true);
  };

  // We refresh the page so that the radio boxes are cleared.
  // This is because there is not simple way to clear radio
  // boxes programmatically.
  const resetQuiz = () => {
    // Add a `#` to the href to ensure that the screen scrolls to the top on refresh
    if (!window.location.href.endsWith('#'))
      window.location.href = `${window.location.href}#`;

    window.location.reload();
  };

  const numCorrect = (
    Object.values(questionIsCorrect || {})
      .filter(Boolean).length
  );

  return (
    <QuizContainer id="#">
      <LoadingContainer isLoading={isLoading}>
        <SimpleGrid columns={1} spacing={10}>
          {Array.isArray(data) && data.map((q: Question, qIndex: number) => (
            <Box p={5} color="white" key={q.question}>
              <Flex>
                {isQuizSubmitted && (questionIsCorrect[qIndex] ?
                  <CheckIcon color="green.500"/> : <IncorrectIcon color="red.500" />)}
                <Text fontSize='lg'>{ `${qIndex + 1}. ${q.question}`}</Text>
              </Flex>
              <AnswerContainer>
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
                        as={'label'}
                        fontSize='lg'
                        isIncorrect={isQuizSubmitted &&
                          !questionIsCorrect[qIndex] &&
                          q.answer === optionIndex
                        }
                      >
                        {option}
                      </QuestionLabel>
                    </div>
                  ))}
                </SimpleGrid>
              </AnswerContainer>
            </Box>
          ))}
        </SimpleGrid>
        <Flex>
          <SubmitQuiz
            variantColor='blue'
            onClick={!isQuizSubmitted ? submitQuiz : resetQuiz}
          >
            {!isQuizSubmitted ? 'Submit Quiz' : 'Try Again'}
          </SubmitQuiz>
        </Flex>
        <QuizModal
          done={onClose}
          isOpen={isOpen}
          tryAgain={resetQuiz}
          numCorrect={numCorrect}
          total={data?.length || 0}
        />
      </LoadingContainer>
    </QuizContainer>
  );
};

export default Quiz;