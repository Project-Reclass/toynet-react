import { useState, useCallback } from 'react';
import { useQuery, useMutation } from 'react-query';

import { useSessionStorage } from 'src/common/hooks/useSessionStorage';
import { getBaseTopology, createToynetSession, getToynetSession } from './requests';

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
  const [topology, setTopology] = useState<string>('');

  const createNewSession = useCallback(async () => {
    const { session_id, topology } = await createToynetSession({
      toynet_id: id,
      user_id: 0,
    });
    setSessionId(session_id);
    setTopology(topology);
  }, [id, setSessionId]);

  return { topology, sessionId, createNewSession };
}