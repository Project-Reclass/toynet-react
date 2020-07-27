import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header/Header';
import Emulator from './Emulator/Emulator';

// rename App.js and App.css to navbar component
// Move navbar.js, navbar.css, and logo(?) once file structure is determined

const data = {
  'id': 1,
  'submodule_number': 1,
  'submodule_name': 'Local Area Networks',
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
    <>
      <Header />
      <Emulator panelData={data} />
    </>
  );
}

export default App;
