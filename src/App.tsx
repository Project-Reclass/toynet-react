import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Emulator from './Emulator/Emulator';
import Header from './Header/Header';
import ModuleList from './ModuleList';
import Article from './ModuleList/Article';
import Quiz from './ModuleList/Quiz';

// rename App.js and App.css to navbar component
// Move navbar.js, navbar.css, and logo(?) once file structure is determined

const data = {
  'id': 1,
  'submoduleNumber': 1,
  'submoduleName': 'Local Area Networks',
  'objective': 'Connect two hosts together and check if they\'re communicate',
  'tasks': [
    'Attach h1 to s1',
    'Attach h2 to s1',
    'Run',
    'In Console, run h1> arp 172.16.0.100',
    'In Console, run h1> ping 172.16.0.100',
    'In Console, run h1> arp 172.16.0.100',
  ],
};

const Home = () => (
  <div>
    <a  style={{marginLeft: '1000px'}} href='/module/0/emulator/0'>Visit Emulator</a> <br />
    <a href='/module'>Visit Courses</a>
  </div>
);

function App() {
  return (
    <Router>
      <Header />
      <div className='main'>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path="/module">
            <ModuleList />
        </Route>
        <Route exact path="/module/:moduleId/quiz/:quizId">
            <Quiz />
        </Route>
        <Route exact path="/module/:moduleId/article/:articleId">
            <Article />
        </Route>
        <Route path="/module/:moduleId/emulator/:emulatorId">
           <Emulator panelData={data} />
        </Route>
        <Route path="*">
            <h1>Page not found...</h1>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
