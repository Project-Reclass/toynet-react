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

import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/modal';

interface Props {
  error?: unknown;
}

export default function ErrorModal({
  error,
}: Props) {
  const [isError, setIsError] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  useEffect(() => {
    setIsError(prevIsError => {
      if (!prevIsError && error) {
        return true;
      }
      return prevIsError;
    });
  }, [error]);

  const handleRestart = () => {
    setIsRestarting(true);

    window.sessionStorage.clear();
    window.location.reload();
  };

  return (
    <Modal
      isOpen={isError}
      onClose={() => null}
    >
      <ModalOverlay />
      <ModalContent
        bgColor='#454950'
        color='white'
      >
        <ModalHeader>Unable to find session.</ModalHeader>
        <ModalBody>
          We were unable to find your previous session. Please press the Restart
          button to start a new session and continue.
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='red'
            onClick={handleRestart}
            isLoading={isRestarting}
            loadingText='Restarting...'
          >
            Restart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}