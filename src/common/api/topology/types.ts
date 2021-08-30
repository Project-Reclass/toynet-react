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
<http://www.gnu.org/licenses/>.  */
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