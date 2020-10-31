import React from 'react';

interface IProps {
};

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    	hasError: true
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Please refresh or close tab and reopen site.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
