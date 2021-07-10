export type SessionId = string | number;

export interface TopologyResponse {
  id: number;
  author_id: number;
  topology: string;
}

export interface SessionRequest {
  toynet_topo_id: number;
  toynet_user_id: string;
}

export interface CommandRequest {
  id: SessionId;
  command: string;
}

export interface SessionRequestResponse {
  toynet_session_id: number;
}

export interface ToynetSession {
  topo_id: number;
  topology: string;
  user_id: string;
}

export interface ToynetSessionResponse {
  id: number;
  topology: string;
  user_id: number;
  image: string;
  time: string;
  last_update_time: string;
  toynetconfig: number;
}