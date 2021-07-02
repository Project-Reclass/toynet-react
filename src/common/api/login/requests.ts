import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';

export const TOKEN_KEY = 'toynet-token';

interface User {
  username: string;
  token: string;
}

interface UsernameNPassword {
  username: string;
  password: string
}

export const login = async ({ username, password }: UsernameNPassword): Promise<User | null> => {
  const { data } = await axios.post<User>('/api/login', { username, password });
  return {
    username,
    token: data.token,
  };
};

function authorizedRequestConfig<TData>(config: AxiosRequestConfig) {
  const token = localStorage.getItem(TOKEN_KEY);

  return axios({
    ...config,
    headers: {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    },
  }) as AxiosPromise<TData> ;
}

export function authorizedRequest<TData>(url: string, method: Method, data?: any) {
  return authorizedRequestConfig<TData>({
    url,
    data,
    method,
  });
}