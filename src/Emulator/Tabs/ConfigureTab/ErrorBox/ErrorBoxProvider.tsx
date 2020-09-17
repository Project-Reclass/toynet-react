import React, { FC, useState, useCallback, useContext } from 'react';

const ERROR_TIMEOUT = 5000; // five seconds

interface ErrorBoxInterface {
  showError: boolean;
  errorMessage: string;
  setError: (message: string) => any;
}

const ErrorBoxContext = React.createContext<ErrorBoxInterface>({
  showError: false,
  errorMessage: '',
  setError: () => null,
});

const ErrorBoxProvider: FC = ({ children }) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setError = useCallback((message: string) => {
    setShowError(true);
    setErrorMessage(message);
    setTimeout(() => {
      setShowError(false);
      setErrorMessage('');
    }, ERROR_TIMEOUT);
  }, []);

  return (
    <ErrorBoxContext.Provider value={{ setError, showError, errorMessage }}>
      {children}
    </ErrorBoxContext.Provider>
  );
};

export const useErrorBox = () => useContext(ErrorBoxContext);
export function withErrorBoxProvider<T>(Component: React.ComponentType<T>) {
  return (props: T) => (
    <ErrorBoxProvider>
      <Component {...props} />
    </ErrorBoxProvider>
  );
}

export default ErrorBoxProvider;