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
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';

import ErrorBoundary from './common/components/ErrorBoundary';
import LoadingSpinner from './common/components/LoadingSpinner';
import ModuleList from './Curriculum';
import Article from './Curriculum/Article';
import Quiz from './Curriculum/Quiz';
import Lesson from './Curriculum/Lesson';
import Survey from './Curriculum/Survey';
import Value from './Curriculum/Value';
import Login from './Login';
import Layout from './layout';
import NotFound from './common/NotFound';

const SplashScreen = React.lazy(() => import('./SplashScreen'));
const Emulator = React.lazy(() => import('./Emulator'));
const Video = React.lazy(() => import('./Curriculum/Video'));

const LoadingWrapper = styled('div')`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Layout title={'Home'} hideSideNav={true}>
              <Suspense fallback={<LoadingWrapper><LoadingSpinner /></LoadingWrapper>}>
                <SplashScreen />
              </Suspense>
            </Layout>
          </Route>
          <Route exact path="/dashboard/:curriculumId">
            <Layout title={'Dashboard'} hideSideNav={true}>
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
              <Suspense fallback={<LoadingWrapper><LoadingSpinner /></LoadingWrapper>}>
                <Emulator />
              </Suspense>
            </Layout>
          </Route>
          <Route exact path="/module/:moduleId/lesson/:lessonId">
            <Layout title={'Lesson'}>
              <Lesson />
            </Layout>
          </Route>
          <Route exact path="/module/:moduleId/survey/:surveyId">
            <Layout title={'Survey'}>
              <Survey />
            </Layout>
          </Route>
          <Route exact path="/value/:valueId">
            <Layout title={'Value'}>
              <Value />
            </Layout>
          </Route>

          <Route exact path="/login">
            <Layout title={'Login'}>
              <Login />
            </Layout>
          </Route>

          <Route path='/module/:moduleId/video/:videoId'>
            <Layout title={'Video'}>
              <Suspense fallback={<LoadingWrapper><LoadingSpinner /></LoadingWrapper>}>
                <Video />
              </Suspense>
            </Layout>
          </Route>

          <Route path="*">
            <Layout title={'404'}>
              <NotFound />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
