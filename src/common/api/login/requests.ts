
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