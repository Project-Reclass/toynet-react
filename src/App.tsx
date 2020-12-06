import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';

import LoadingSpinner from './common/components/LoadingSpinner';
import Header from './Header/Header';
import ModuleList from './Curriculum';
import Article from './Curriculum/Article';
import Quiz from './Curriculum/Quiz';
import Lesson from './Curriculum/Lesson';
import Value from './Curriculum/Value';
import { useFeatureFlags } from './FeatureFlags';
import Layout from './layout';
import ErrorBoundary from './common/components/ErrorBoundary';

const SplashScreen = React.lazy(() => import('./SplashScreen'));
const Emulator = React.lazy(() => import('./Emulator'));

const LoadingWrapper = styled('div')`
  width: 100%;
  height: 100vh;
`;

function App() {
  const { sideNav } = useFeatureFlags();
  return (
    <ErrorBoundary>
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
                  <Emulator />
              </Suspense>
            </Layout>
          </Route>
          <Route exact path="/module/:moduleId/lesson/:lessonId">
            <Layout title={'Lesson'}>
              <Lesson />
            </Layout>
          </Route>

          <Route exact path="/value/:valueId">
            <Layout title={'Value'}>
              <Value />
            </Layout>
          </Route>

          <Route path="*">
            <Layout title={'404'}>
              <h1>Page not found...</h1>
            </Layout>
          </Route>
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
