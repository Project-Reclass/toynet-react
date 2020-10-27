import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';

import LoadingSpinner from './common/components/LoadingSpinner';
import Header from './Header/Header';
import ModuleList from './ModuleList';
import Article from './ModuleList/Article';
import Quiz from './ModuleList/Quiz';
import { useFeatureFlags } from './FeatureFlags';
import Layout from './layout';

const SplashScreen = React.lazy(() => import('./SplashScreen'));
const Emulator = React.lazy(() => import('./Emulator'));

const data = {
  'id': 1,
  'submoduleNumber': 1,
  'submoduleName': 'Modifying Topology',
  'objective': 'Add and remove devices and their connections.',
  'tasks': [
    'Add a Host (h3)',
    'Attach h3 to s2',
    'Detach h3 from s2',
    'Remove h2',
  ],
};

const LoadingWrapper = styled('div')`
  width: 100%;
  height: 100vh;
`;

function App() {
  const { sideNav } = useFeatureFlags();
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Layout title={'Home'}>
            <Suspense fallback={<LoadingWrapper><LoadingSpinner/></LoadingWrapper>}>
              <SplashScreen/>
            </Suspense>
          </Layout>
        </Route>
        <Route exact path="/module">
          <Layout title={'Modules'}>
            <ModuleList />
          </Layout>
        </Route>
        <Route exact path="/module/:moduleId/quiz/:quizId">
          <Layout title={'Quiz'}>
            <Quiz />
          </Layout>
        </Route>
        <Route exact path="/module/:moduleId/article/:articleId">
          <Layout title={'Article'}>
            <Article />
          </Layout>
        </Route>
        <Route path="/module/:moduleId/emulator/:emulatorId">
          <Layout title={'Emulator'}>
            {sideNav && <Header /> }
            <Suspense fallback={<LoadingWrapper><LoadingSpinner/></LoadingWrapper>}>
                <Emulator panelData={data} />
            </Suspense>
          </Layout>
        </Route>
        <Route path="*">
          <Layout title={'404'}>
            <h1>Page not found...</h1>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
