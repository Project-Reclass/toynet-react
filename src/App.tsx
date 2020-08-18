import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header/Header';
import Emulator from './Emulator/Emulator';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// rename App.js and App.css to navbar component
// Move navbar.js, navbar.css, and logo(?) once file structure is determined

const data = {
  'id': 1,
  'submoduleNumber': 1,
  'submoduleName': 'Local Area Networks',
  'objective': 'Connect two hosts together and check if they\'re able to communicate',
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
    <a href='http://localhost:3000/emulator'>Visit Emulator</a> <br />
    <a href='#'>Visit Courses</a>
  </div>
)

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/emulator' exact component={ () => <Emulator panelData={data} /> } />
      </Switch>
    </Router>
  );
}

export default App;
