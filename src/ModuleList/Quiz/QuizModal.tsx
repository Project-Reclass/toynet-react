import React, { useMemo } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/core';
import { CheckIcon, IncorrectIcon, QuizScore } from './styled';

const MIN_SCORE = 0.7;

interface Props {
  total: number;
  isOpen: boolean;
  numCorrect: number;

  done: () => any;
  tryAgain: () => any;
}

const QuizModal = ({ total, numCorrect, isOpen, done, tryAgain}: Props) => {
  const percentage = useMemo(() => numCorrect / total, [numCorrect, total]);

  return (
    <Modal isOpen={isOpen} onClose={done}>
      <ModalOverlay />
      <ModalContent backgroundColor='#33373b'>
        <ModalCloseButton />

        <ModalBody textAlign='center'>
          <Heading>Quiz Score</Heading>
          <Text>{percentage >= MIN_SCORE ?
            'Great Job!' :
            'So close! Let\'s try again.'}
          </Text>
          <QuizScore
            fontSize='3xl'
            percent={percentage}
            minScore={MIN_SCORE}
          >
            {`${(percentage * 100).toFixed(2)}%`}
          </QuizScore>
          <Flex justifyContent='space-evenly'>
            <Text display='flex' fontSize='2xl'>
              <CheckIcon />
              {numCorrect}
            </Text>
            <Text display='flex' fontSize='2xl'>
              <IncorrectIcon />
              {total - numCorrect}
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter display='flex' justifyContent='space-evenly'>
          {percentage > MIN_SCORE &&
            <Button variantColor="blue" mr={3} onClick={done}>
              I'm Done
            </Button>
          }
          <Button variantColor="blue" mr={3} onClick={tryAgain}>
            Try Again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default QuizModal;