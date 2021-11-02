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

import Layout from './layout';
import ErrorBoundary from './common/components/ErrorBoundary';
import LoadingSpinner from './common/components/LoadingSpinner';

const Login = React.lazy(() => import('./Login'));
const Emulator = React.lazy(() => import('./Emulator'));
const Quiz = React.lazy(() => import('./Curriculum/Quiz'));
const ModuleList = React.lazy(() => import('./Curriculum'));
const Video = React.lazy(() => import('./Curriculum/Video'));
const Lesson = React.lazy(() => import('./Curriculum/Lesson'));
const Survey = React.lazy(() => import('./Curriculum/Survey'));
const Value = React.lazy(() => import('./Curriculum/Value'));
const NotFound = React.lazy(() => import('./common/NotFound'));
const SplashScreen = React.lazy(() => import('./SplashScreen'));
const Article = React.lazy(() => import('./Curriculum/Article'));

const LoadingWrapper = styled('div')`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingWrapper><LoadingSpinner /></LoadingWrapper>}>
          <Switch>
            <Route exact path='/'>
              <Layout title={'Home'} hideSideNav={true}>
                <SplashScreen />
              </Layout>
            </Route>

            <Route exact path="/dashboard/:curriculumId">
              <Layout title={'Dashboard'}>
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
                <Emulator />
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

            <Route exact path="/module/:moduleId/value/:valueId">
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
                <Video />
              </Layout>
            </Route>

            <Route path="*">
              <Layout title={'404'}>
                <NotFound />
              </Layout>
            </Route>

          </Switch>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
