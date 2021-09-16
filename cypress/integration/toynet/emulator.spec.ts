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

const emulatorUrl = 'http://localhost:3000/module/1/emulator/1';

describe('The emulator page', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });
  it('should allow the user to add a host', () => {
    cy.visit(emulatorUrl);
    cy.contains(/h1/i);
    cy.contains(/h2/i);
    cy.get('[data-testid^=emulator-add-host]:first').click();
    cy.contains(/h3/i).should('exist');
  });
  it('should allow the user to create a switch', () => {
    cy.visit(emulatorUrl);
    cy.contains(/s1/i);
    cy.contains(/s2/i);
    cy.get('[data-testid^=emulator-add-switch]:first').click();
    cy.contains(/s3/i).should('exist');
  });
  it('should allow the user to create a router', () => {
    cy.visit(emulatorUrl);
    cy.contains(/r1/i);
    cy.get('[data-testid^=emulator-add-router]:first').click();
    cy.contains(/r2/i).should('exist');
  });
  it('should have a link to take the user back to the splash screen', () => {
    cy.visit(emulatorUrl);
    cy.contains(/back to site/i).click();
    cy.url().should('equal', 'http://localhost:3000/');
  });
});