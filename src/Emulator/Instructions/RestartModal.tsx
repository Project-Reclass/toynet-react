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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;

  close: () => any;
}

const RestartModal = ({ isOpen, close }: Props) => {

  /*
  Triggered by onClick of I'm sure button on the modal.
  It will clear the session storage then reload the page.
  */
  const handleRestart = () => {
      window.sessionStorage.clear();
      window.location.reload();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent backgroundColor='#33373b'>
        <ModalHeader color='white'>Confirm Restart</ModalHeader>
        <ModalCloseButton color='white' />
        <ModalBody>
          <Text marginBottom="1.45rem">Clicking "I'm Sure" will restart your progress and reset your topology.</Text>
          <Text> Are you sure? This cannot be undone.</Text>
        </ModalBody>
        <ModalFooter justifyContent='space-between'>
          <Button
            size='sm'
            variant="solid"
            fontSize='sm'
            colorScheme='red'
            onClick={handleRestart}
          >
            I'm Sure
          </Button>
          <Button
            size='sm'
            color='white'
            variant='ghost'
            colorScheme='whiteAlpha'
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