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
import React from 'react';

const styles = {
  container: {
    fontSize: '3.5rem',
    marginTop: '10rem',
    display: 'flex',
    justifyContenr: 'center',
    alignItems: 'center',
    flexDirection: 'column' as 'column',
  },
  a: {
    fontSize: '2.5rem',
    textDecoration: 'underline',
    marginTop: '2rem',
  },
};

const NotFound = () => {
    return <div style={styles.container}>
    <h1>Sorry the page you're lookin for</h1>
    <h1>Cannot be found.</h1>
    <a href="/" style={styles.a}>Return Home</a>
  </div>;
};

export default NotFound;
