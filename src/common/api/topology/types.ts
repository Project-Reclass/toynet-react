export interface TopologyResponse {
  id: number;
  author_id: number;
  topology: string;
}

export interface SessionRequest {
  toynet_id: number;
  user_id: number;
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