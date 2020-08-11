import { useEffect, useRef, useState, useCallback } from 'react';
import { useQuery, useMutation } from 'react-query';

import { useSessionStorage } from 'src/common/hooks/useSessionStorage';
import { getBaseTopology, createToynetSession, getToynetSession } from './requests';
import { TopologyResponse } from './types';

export function useBaseTopology(id: number) {
  return useQuery(`base-topology-${id}`, () => getBaseTopology(id));
}

export function useCreateSession() {
  return useMutation(createToynetSession);
}

export function useToynetSession(id: number) {
  return useQuery(`toynet-session-${id}`, () => getToynetSession(id));
}

/**
 * Fetches the base topology if there is not a session that is saved.
 * If there is a session saved, then we grab the topology saved with the
 * session id that is stored in session storage.
 */
export function useToynetTopology(id: number) {
  const [sessionId, setSessionId] = useSessionStorage('toynet-session', -1, (value) => parseInt(value));
  const [topology, setTopology] = useState<Omit<TopologyResponse, 'author_id'> | undefined>();

  const [hasLoaded, setHasLoaded] = useState(false);

  const createNewSession = useCallback(async () => {
    const { data } = await createToynetSession({
      toynet_id: id,
      user_id: 0,
    });
    setSessionId(data);
  }, [id, setSessionId]);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    (async () => {
      if (hasLoaded) {
        if (sessionId < 0) {
          setTopology(await getBaseTopology(id));
          createNewSession();
          return;
        }
        const data = await getToynetSession(sessionId);
        setTopology(data);
      }
    })();
  }, [createNewSession, hasLoaded, id, sessionId]);

  return { topology };
}