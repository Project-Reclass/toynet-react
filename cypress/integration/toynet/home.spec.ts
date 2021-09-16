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
describe('The home splash screen', () => {
  it('should have a "Try It" button that takes the user to the emulator', () => {
    cy.visit('http://localhost:3000');
    cy.contains(/try it/i).click();
    cy.url().should('include', '/module/1/emulator/1');
  });
  it('should have a button "Learn More" which takes you to the org website', () => {
    cy.visit('http://localhost:3000');
    cy.contains(/learn more/i);
  });
  it('should have a button that takes you to the about section', () => {
    cy.visit('http://localhost:3000');

    cy.contains(/about/i).should('be.visible').click();
    cy.contains(/about project reclass/i).should('be.visible');
  });
});