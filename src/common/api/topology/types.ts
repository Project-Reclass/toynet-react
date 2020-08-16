export type SessionId = string | number;

export interface TopologyResponse {
  id: number;
  author_id: number;
  topology: string;
}

export interface SessionRequest {
  toynet_id: SessionId;
  user_id: number;
}

export interface CommandRequest {
  id: SessionId;
  command: string;
}

export interface SessionRequestResponse {
  message: string;
  session_id: number;
  topology: string;
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