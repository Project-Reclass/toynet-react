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
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  SimpleGrid,
  Box,
  Flex,
  Text,
  useDisclosure,
  Divider,
  Heading,
  Stack,
  Container,
  Button,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

import { StringMap } from 'src/common/types';
import { useQuiz } from 'src/common/api/curriculum/quiz';
import { Question } from 'src/common/api/curriculum/quiz/requests';
import LoadingContainer from 'src/common/components/LoadingContainer';
import NavigationWithDivider from 'src/common/components/NavigationWithDivider';

import {
  CheckIcon,
  IncorrectIcon,
  QuestionLabel,
  QuizContainer,
  AnswerContainer,
} from './styled';
import QuizModal from './QuizModal';

interface Params {
  moduleId: string;
  quizId: string;
}

const answeredIndices = new Set();

const Quiz = () => {
  const { moduleId, quizId } = useParams<Params>();
  const { data, isLoading } = useQuiz(Number(moduleId), Number(quizId));
  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState<StringMap>({});


  const handleAnsweredQuestion = (q: Question, qIndex: number, answerPicked: number) => {
    return () => {
      answeredIndices.add(qIndex);
      answerIsCorrect[qIndex] = q.answer === answerPicked;
      setAnswerIsCorrect(answerIsCorrect);
    };
  };

  const submitQuiz = () => {
    if (data?.items.length !== answeredIndices.size) {
      alert('You answered ' + answeredIndices.size + ' out of ' + data?.items.length + ' questions!');
    } else {
      onOpen();
      setIsQuizSubmitted(true);
    };
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
    Object.values(answerIsCorrect || {})
      .filter(Boolean).length
  );

  return (
    <QuizContainer id="#">
      <LoadingContainer isLoading={isLoading}>
        <Container maxW='container.xl'>
          <SimpleGrid columns={1} spacing={5}>
            <Stack spacing={2}>
              <Heading size="lg">{`Survey: ${data?.name}`}</Heading>
              <Text size='sm' color='whiteAlpha.800'>{data?.description}</Text>
              <Divider />
            </Stack>
            {data?.items && data.items.map((q: Question, qIndex: number) => (
              <Box px={5} py={2} color="white" key={q.question}>
                <Flex>
                  {isQuizSubmitted && (answerIsCorrect[qIndex] ?
                    <CheckIcon color="green.500" /> : <IncorrectIcon color="red.500" />)}
                  <Text fontSize='lg'>{`${qIndex + 1}. ${q.question}`}</Text>
                </Flex>
                <AnswerContainer>
                  <RadioGroup>
                    <SimpleGrid columns={2} spacingX={1}>
                      {q.options.map((option, optionIndex) => (
                        <Radio
                          key={option}
                          id={option}
                          color='white'
                          data-testid={option}
                          name={qIndex.toString()}
                          value={option}
                          onChange={handleAnsweredQuestion(q, qIndex, optionIndex)}
                          margin='5px'
                        >
                          <QuestionLabel
                            as={'label'}
                            key={option}
                            fontSize='lg'
                            isIncorrect={isQuizSubmitted &&
                              !answerIsCorrect[qIndex] &&
                              q.answer === optionIndex
                            }
                          >
                            {option}
                          </QuestionLabel>
                        </Radio>
                      ))}
                    </SimpleGrid>
                  </RadioGroup>
                </AnswerContainer>
              </Box>
            ))}
          </SimpleGrid>
          <Flex my={5}>
            <Button
              colorScheme='teal'
              onClick={!isQuizSubmitted ? submitQuiz : resetQuiz}
            >
              {!isQuizSubmitted ? 'Submit Quiz' : 'Try Again'}
            </Button>
          </Flex>
          <NavigationWithDivider
            moduleId={Number(moduleId)}
            submoduleId={Number(quizId)}
            submoduleType='QUIZ'
          />
          <QuizModal
            done={onClose}
            isOpen={isOpen}
            tryAgain={resetQuiz}
            numCorrect={numCorrect}
            total={data?.items.length || 0}
          />
        </Container>
      </LoadingContainer>
    </QuizContainer>
  );
};

export default Quiz;