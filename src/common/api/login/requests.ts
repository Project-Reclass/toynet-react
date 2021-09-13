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

const MOCK_USERNAME = 'admin@reclass.org';
const MOCK_PASSWORD = 'supersecret';

interface User {
  id: string | number;
  username: string;
}

interface UsernameNPassword {
  username: string;
  password: string
}

export const login = async ({ username, password }: UsernameNPassword): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    if (username === MOCK_USERNAME && password === MOCK_PASSWORD)
      resolve({ id: 0, username: MOCK_USERNAME });
    else
      reject(null);
  });
};