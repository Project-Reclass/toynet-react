import { useQuery, useMutation, queryCache } from 'react-query';

import { useSessionStorage } from 'src/common/hooks/useSessionStorage';

import { SessionId } from './types';
import { createToynetSession, getToynetSession, updateToynetSession, visualizeToynetSession } from './requests';

export function useModifyTopology(sessionId: SessionId) {
  return useMutation(updateToynetSession, {
    onSuccess: () => {
      queryCache.invalidateQueries(['toynet-session', {
        sessionId,
        hasInitialized: true,
      }]);

      queryCache.invalidateQueries(['toynet-session-image', { sessionId }]);
    },
  });
}

/**
 * Returns the mininet session image.
 *
 * This is used instead of just using a url as the `src` for the `img` tag
 * because react-query will invalidate the cache and re-fetch the image whenever
 * there is a mutation. This is useful so that we do not have to worry about
 * re-fetching the image manually.
 */
export function useVisualizeToynetImage(sessionId: SessionId) {
  return useQuery(['toynet-session-image', { sessionId }], async (_, { sessionId }) => {
    if (sessionId < 0)
      return '';

    const urlCreator = window.URL || window.webkitURL;
    const blob = await fetch(visualizeToynetSession(sessionId)).then(res => res.blob());
    return urlCreator.createObjectURL(blob);
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