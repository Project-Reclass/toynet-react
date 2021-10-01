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
import { useCallback } from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import { DeviceType } from 'src/common/types';
import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

import { SessionId } from './types';
import { createToynetSession, getToynetSession, runToynetCommand, updateToynetSession } from './requests';

const getNameFromDevice = (key: string): string => {
  if (key.length < 1) return '';
  switch (key[0].toLocaleLowerCase()) {
    case 'h': return 'host';
    case 's': return 'switch';
    case 'r': return 'router';
    default: return '';
  }
};

export function useModifyTopology(sessionId: SessionId) {
  const [mutate, state] = useMutation(updateToynetSession, {
    onSuccess: () => {
      queryCache.invalidateQueries(['toynet-session', {
        sessionId,
        hasInitialized: true,
      }]);
    },
  });

  const createDevice = useCallback(async (type: DeviceType, name: string) => {
    return mutate({ id: sessionId, command: `add ${type} ${name}` });
  }, [mutate, sessionId]);

  const createLink = useCallback(async (to: string, from: string) => {
    return mutate({ id: sessionId, command: `add link ${to} ${from}` });
  }, [mutate, sessionId]);

  const deleteLink = useCallback(async (to: string, from: string) => {
    if (to === from) {
      return mutate({ id: sessionId, command: `remove ${getNameFromDevice(from)} ${from}` });
    }
    return mutate({ id: sessionId, command: `remove link ${from} ${to}` });
  }, [mutate, sessionId]);

  return {
    createDevice,
    createLink,
    deleteLink,
    ...state,
  };
}

/**
 * Fetches the base topology if there is not a session that is saved.
 * If there is a session saved, then we grab the topology saved with the
 * session id that is stored in session storage.
 */
export function useToynetSession(id: number) {
  const [sessionId, setSessionId, hasInitialized] = useSessionStorage(
    `toynet-session-${id}`, -1,
    (value) => parseInt(value),
  );

  return useQuery(['toynet-session', { sessionId, hasInitialized }], async (_, { sessionId }) => {
    if (sessionId < 0) {
      if (hasInitialized) {
        const { toynet_session_id: session_id } = await createToynetSession({
          toynet_user_id: 'bot@projectreclass.org', toynet_topo_id: id,
        });
        setSessionId(session_id);
      }
      return {
        sessionId,
        topology: '',
      };
    }

    const { topology } = await getToynetSession(sessionId);
    return {
      sessionId,
      topology,
    };
  });
}

export function useToynetCommand(id: SessionId) {
  return useMutation((command: string) => runToynetCommand(id, command));
}