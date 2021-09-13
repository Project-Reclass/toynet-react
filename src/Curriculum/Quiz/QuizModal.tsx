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
          {percentage >= MIN_SCORE &&
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