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
const emulatorUrlTopoTwo = 'http://localhost:3000/module/1/emulator/2';

const createSwitch = () => {
  cy.get('[data-testid=emulator-add-switch]').click();
  cy.get('[data-testid=drawer-switch-name-input]').clear();
  cy.get('[data-testid=drawer-switch-name-input]').type('S3');
  cy.get('[data-testid=viewbtn-create]').click();
};

const waitUntilLoaded = () => {
  cy.get('[data-testid=emulator-add-switch]').should('exist');
};

describe('The emulator page', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-magic-numbers
    Cypress.config('defaultCommandTimeout', 200000);
    window.sessionStorage.clear();
  });
  it('should allow the user to add a host', () => {
    cy.visit(emulatorUrl);
    cy.get('[data-testid=emulator-add-host]').click();
    cy.get('[data-testid=drawer-host-default_gateway-input]').clear();
    cy.get('[data-testid=drawer-host-default_gateway-input]').type('172.16.0.1');
    cy.get('[data-testid=drawer-host-ip-input]').clear();
    cy.get('[data-testid=drawer-host-ip-input]').type('172.16.0.3/24');
    cy.get('[data-testid=viewbtn-create]').click();
    cy.get('[data-testid^="emulator-visual"]')
     .contains(/^h3$/i).should('exist');
    cy.contains(/Created host H3/i).should('be.visible');
  });
  it('should allow the user to create a switch', () => {
    cy.visit(emulatorUrl);
    cy.get('[data-testid=emulator-add-switch]').click();
    cy.get('[data-testid=drawer-switch-name-input]').clear();
    cy.get('[data-testid=drawer-switch-name-input]').type('S3');
    cy.get('[data-testid=viewbtn-create]').click();
    cy.get('[data-testid^="emulator-visual"]')
      .contains(/^s3$/i).should('exist');
    cy.contains(/created switch s3/i).should('exist');
  });
  it('should allow the user to create a router', () => {
    cy.visit(emulatorUrl);
    cy.get('[data-testid=emulator-add-router]').click();
    cy.get('[data-testid=drawer-router-name-input]').clear();
    cy.get('[data-testid=drawer-router-name-input]').type('R3');
    cy.get('[data-testid=drawer-router-ip-input]').clear();
    cy.get('[data-testid=drawer-router-ip-input]').type('172.16.1.10/24');
    cy.get('[data-testid=ip_input-idx_0]').clear();
    cy.get('[data-testid=ip_input-idx_0]').type('172.16.1.1/24');
    cy.get('[data-testid=add_ip-notone-idx_0]').click();
    cy.get('[data-testid=ip_input-idx_1]').clear();
    cy.get('[data-testid=ip_input-idx_1]').type('192.168.1.1/24');
    cy.get('[data-testid=add_ip-notone-idx_1]').click();
    cy.get('[data-testid=ip_input-idx_2]').clear();
    cy.get('[data-testid=ip_input-idx_2]').type('192.168.2.1/24');
    cy.get('[data-testid=viewbtn-create]').click();
    cy.get('[data-testid^="emulator-visual"]')
      .contains(/^r3$/i).should('exist');
  });

  /**
   * Deleting a node currently does not work. Waiting on that functionality
   * to be re-added in to the backend.
   */

  // it('should be able to remove a node', () => {
  //   cy.visit(emulatorUrl);
  //   cy.contains(/r1/i).should('be.visible');
  //   cy.get('[data-testid=emulator-add-switch]').click();
  //   cy.get('[data-testid=drawer-switch-name-input]').clear();
  //   cy.get('[data-testid=drawer-switch-name-input]').type('S3');
  //   cy.get('[data-testid=viewbtn-create]').click();
  //   cy.get('[data-testid^="emulator-visual"]')
  //     .contains(/^s3$/i).should('exist');
  //   cy.contains(/created switch s3/i).should('exist');

  //   cy.get('[data-testid^="emulator-visual"]')
  //     .contains(/^s3$/i).rightclick();
  //   cy.contains(/delete node/i).click();
  //   cy.get('[data-testid^="emulator-visual"]')
  //     .contains(/^s3$/i).should('not.exist');
  //   cy.contains(/Removed device s3/i).should('be.visible');
  // });
  // it('should be able to delete a connection', () => {
  //   cy.visit(emulatorUrl);
  //   cy.get('[data-testid^="emulator-visual"]')
  //     .contains(/r1/i).should('exist');
  //   cy.get('[data-testid^="emulator-visual"]')
  //     .contains(/r1/i).rightclick();
  //   cy.contains(/delete s1 connection/i).click();
  //   cy.contains(/Removed R1 to S1/i).should('be.visible');
  // });

  // it('should be able to drag nodes', () => {
  //   cy.visit(emulatorUrl);
  //   cy.contains(/r1/i).should('be.visible');
  //   cy.contains(/r1/i).move({ deltaX: 100, deltaY: 100});
  // });

  it('should allow elements to still be visible after reload', () => {
    cy.visit(emulatorUrl);
    cy.contains(/r1/i).should('be.visible');
    cy.get('[data-testid=emulator-add-switch]').click();
    cy.get('[data-testid=drawer-switch-name-input]').clear();
    cy.get('[data-testid=drawer-switch-name-input]').type('S3');
    cy.get('[data-testid=viewbtn-create]').click();
    cy.get('[data-testid^="emulator-visual"]')
      .contains(/^s3$/i).should('exist');
    cy.contains(/created switch s3/i).should('exist');
    cy.reload();

    cy.contains(/^s3$/i).should('be.visible');
  });
  it('should allow history to persist after refresh', () => {
    cy.visit(emulatorUrl);
    cy.contains(/r1/i).should('be.visible');
    cy.get('[data-testid=emulator-add-switch]').click();
    cy.get('[data-testid=drawer-switch-name-input]').clear();
    cy.get('[data-testid=drawer-switch-name-input]').type('S3');
    cy.get('[data-testid=viewbtn-create]').click();
    cy.get('[data-testid^="emulator-visual"]')
      .contains(/^s3$/i).should('exist');
    cy.contains(/created switch s3/i).should('exist');;
    cy.reload(); // refresh the page

    cy.contains(/^s3$/i).should('be.visible');
    cy.contains(/created switch s3/i).should('be.visible');
  });
  it('should show error when device is not selected', () => {
    cy.visit(emulatorUrl);
    cy.contains(/h1/i).should('be.visible');
    cy.contains(/h2/i).should('be.visible');
    cy.get('[data-testid^="console-textarea"]').type('ping h2{enter}');
    cy.contains(/please select a device/i).should('be.visible');
  });
  it('should be able to run a command', () => {
    cy.visit(emulatorUrl);
    cy.contains(/h1/i).should('be.visible');
    cy.contains(/h2/i).should('be.visible');
    cy.get('[data-testid^="console-device-selector"]')
      .select('h1');
    cy.get('[data-testid^="console-textarea"]').type('ping h2{enter}');
    cy.contains(/bytes of data/i).should('be.visible');
  });

  it('should allow emulator history to persist after refresh', () => {
    cy.visit(emulatorUrl);
    cy.contains(/h1/i).should('be.visible');
    cy.contains(/h2/i).should('be.visible');
    cy.get('[data-testid^="console-device-selector"]').
      select('h1');
    cy.get('[data-testid^="console-textarea"]').type('ping h2{enter}');
    cy.contains(/bytes of data/i).should('be.visible');
    cy.reload(); // refresh the page

    cy.get('[data-testid^="console-device-selector"]')
      .select('h1');
    cy.contains(/ping h2/i).should('be.visible');
    cy.contains(/bytes of data/i).should('be.visible');
  });

  it('should allow for different histories for different devices', () => {
    cy.visit(emulatorUrl);

    cy.get('[data-testid^="console-device-selector"]')
      .select('h1');

    cy.get('[data-testid^="console-textarea"]').type('ping h2{enter}');
    cy.contains(/bytes of data/i).should('be.visible');

    cy.get('[data-testid^="console-device-selector"]')
      .select('h2');

    cy.contains(/bytes of data/i).should('not.exist');

    cy.get('[data-testid^="console-device-selector"]')
      .select('h1');
    cy.contains(/bytes of data/i).should('be.visible');
  });
});