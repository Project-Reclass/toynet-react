import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Emulator from './Emulator';
import Header from './Header/Header';
import ModuleList from './ModuleList';
import Article from './ModuleList/Article';
import Quiz from './ModuleList/Quiz';
import SplashScreen from './SplashScreen';
import { useFeatureFlags } from './FeatureFlags';

// rename App.js and App.css to navbar component
// Move navbar.js, navbar.css, and logo(?) once file structure is determined

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

function App() {
  const { sideNav } = useFeatureFlags();
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <SplashScreen />
        </Route>
        <Route exact path="/module">
          {sideNav && <Header /> }
          <ModuleList />
        </Route>
        <Route exact path="/module/:moduleId/quiz/:quizId">
          {sideNav && <Header /> }
          <Quiz />
        </Route>
        <Route exact path="/module/:moduleId/article/:articleId">
          {sideNav && <Header /> }
          <Article />
        </Route>
        <Route path="/module/:moduleId/emulator/:emulatorId">
          {sideNav && <Header /> }
          <Emulator panelData={data} />
        </Route>
        <Route path="*">
          {sideNav && <Header /> }
          <h1>Page not found...</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
