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
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Text,
} from '@chakra-ui/core';

interface Props {
  isOpen: boolean;

  close: () => any;
}

const RestartModal = ({ isOpen, close }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent backgroundColor='#33373b'>
        <ModalBody>
          <Heading marginBottom="1.45rem">Confirm Restart</Heading>
          <Text marginBottom="1.45rem">Clicking "I'm Sure" will restart your progress and reset your topology.</Text>
          <Text> Are you sure? This cannot be undone.</Text>
        </ModalBody>
        <ModalFooter justifyContent='space-evenly'>
          <Button
            size='sm'
            variant="solid"
            variantColor="red"
            width={80}
            fontSize='sm'
          >
            I'm Sure
          </Button>
          <Button
            size='sm'
            variant="outline"
            variantColor="black"
            width={80}
            fontSize='sm'
            onClick={close}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestartModal;