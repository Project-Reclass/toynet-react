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

beforeEach(() => {
    // eslint-disable-next-line no-magic-numbers
    Cypress.config('defaultCommandTimeout', 20000);
  window.sessionStorage.clear();
});

it('create a host', function() {
  cy.visit('http://localhost:3000/module/1/emulator/1');
  cy.get('[data-testid=emulator-add-host]').click();
  cy.get('[data-testid=drawer-host-default_gateway-input]').clear();
  cy.get('[data-testid=drawer-host-default_gateway-input]').type('172.16.0.1');
  cy.get('[data-testid=drawer-host-ip-input]').clear();
  cy.get('[data-testid=drawer-host-ip-input]').type('172.16.0.3/24');
  cy.get('[data-testid=viewbtn-create]').click();
  cy.contains(/created host h3/i).should('be.visible');
});

it('should be able to create a router', () => {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/module/1/emulator/1');
  cy.get('[data-testid=emulator-add-router]').click();
  cy.get('[data-testid=drawer-router-ip-name]').clear();
  cy.get('[data-testid=drawer-router-ip-name]').type('172.16.1.10/24');
  cy.get('[data-testid=ip_input-idx_0]').clear();
  cy.get('[data-testid=ip_input-idx_0]').type('172.16.1.1/24');
  cy.get('.css-1im46kq').click();
  cy.get('#drawer-1-body > .css-j7qwjs').click();
  cy.get('[data-testid=ip_input-idx_1]').clear();
  cy.get('[data-testid=ip_input-idx_1]').type('192.168.1.1/24');
  cy.get('[data-testid=add_ip-notone-idx_1] > .css-1im46kq').click();
  cy.get('[data-testid=ip_input-idx_2]').clear();
  cy.get('[data-testid=ip_input-idx_2]').type('192.168.2.1/24');
  cy.get('[data-testid=viewbtn-create]').click();
  cy.get('.css-1xhj18k').click();
  cy.get('.css-1p6z0ig').should('be.visible');

  /* ==== End Cypress Studio ==== */
});