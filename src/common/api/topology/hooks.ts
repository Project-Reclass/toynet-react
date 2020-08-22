import { useQuery, useMutation, queryCache } from 'react-query';

import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

import { SessionId } from './types';
import { createToynetSession, getToynetSession, updateToynetSession } from './requests';

export function useModifyTopology(sessionId: SessionId) {
  return useMutation(updateToynetSession, {
    onSuccess: () => {
      queryCache.invalidateQueries(['toynet-session', {
        sessionId,
        hasInitialized: true,
      }]);
    },
  });
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
        const { session_id } = await createToynetSession({
          user_id: 0, toynet_id: id,
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