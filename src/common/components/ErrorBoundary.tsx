import React from 'react';
import '../../SplashScreen/SplashHeader/SplashHeader.css';

import {ReactComponent as Grid} from 'src/assets/splashScreen/v2/grid-background.svg';
import {ReactComponent as Illustration} from 'src/assets/splashScreen/v2/illustration-header.svg';

interface Props {
  children: React.ReactNode
};

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: object) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='spash-header__container '>
          <div className='spash-header__grid-container '>
            <Grid />
          </div>
          <div className='splash-header-body container-1920 mx-auto' id="home">
            <div className='splash-header-content'>
              <h1>
                Please refresh or close tab and reopen site.
              </h1>
            </div>
            <div className='splash-header-image-container'>
              <Illustration />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
