import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Emulator from './Emulator/Emulator';
import Layout from './layout';

// rename App.js and App.css to navbar component
// Move navbar.js, navbar.css, and logo(?) once file structure is determined

const data = {
  'id': 1,
  'submoduleNumber': 1,
  'submoduleName': 'Local Area Networks',
  'objective': 'Connect two hosts together and check they can communicate',
  'tasks': [
    'Attach h1 to s1.',
    'Attach h2 to s1.',
    'Launch.',
    'In Console, run h1> arp 172.16.0.100.',
    'In Console, run h1> ping 172.16.0.100.',
    'In Console, run h1> arp 172.16.0.100.',
  ],
};

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Layout>
            <div></div>
          </Layout>
        </Route>
        <Route path="/console">
          <Layout>
           <Emulator panelData={data} />
          </Layout>
        </Route>
        <Route path="*">
          <Layout>
            <h1>Page not found...</h1>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
