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

const dashboardUrl = 'http://localhost:3000/dashboard/1';

describe('The dashboard page', () => {
    beforeEach(() => {
    window.sessionStorage.clear();
  });
  it('should render a list of modules', () => {
    cy.visit(dashboardUrl);
    cy.contains(/life of a network packet/i).should('be.visible');
    cy.contains(/history of the internet/i).should('be.visible');
  });
  it('should render a description of the module after clicking it', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(new RegExp('information', 'i')).should('be.visible');
    cy.contains(/who are you/i).should('be.visible');
  });
  it('should render a description of the module after clicking it and revisiting page', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(new RegExp('information', 'i')).should('be.visible');
    cy.contains(/who are you/i).should('be.visible');
    cy.contains(new RegExp('information', 'i')).should('be.visible');
    cy.url().should('include', 'module=1');
    cy.contains(/who are you/i).should('be.visible');
    cy.reload();
    cy.contains(new RegExp('information', 'i')).should('be.visible');
    cy.contains(/who are you/i).should('be.visible');

  });
  it('should show more about a submodule when clicking it', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(/who are you/i).click();
    cy.contains(/first we want to know/i).should('be.visible');
  });
  it('should show more about a submodule when clicking it and revisiting page', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(/who are you/i).click();
    cy.contains(/first we want to know/i).should('be.visible');
    cy.contains(/first we want to know/i).should('be.visible');
    cy.reload();
    cy.contains(/first we want to know/i).should('be.visible');
  });
  it('should take the user to the appropriate submodule for survey', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(/who are you/i).click();
    cy.contains(/survey/i).parent('div').contains(/go to submodule/i).click();
    cy.url().should('include', 'survey');
  });
  it('should take the user to the appropriate submodule for value', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(/value/i).click();
    cy.contains(/value/i).parent('div').contains(/go to submodule/i).click();
    cy.url().should('include', 'value');
  });
  it('should take the user to the appropriate submodule for value, go back and see module and submodule still open', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(/value/i).click();
    cy.contains(/value/i).parent('div').contains(/go to submodule/i).click();
    cy.url().should('include', 'value');
    cy.go('back');
    cy.contains(/module 1/i).should('be.visible');
    cy.contains(/value/i).should('be.visible');
    cy.contains(/value/i).parent('div').contains(/go to submodule/i);
  });
  it('should take the user to the appropriate submodule for lesson', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(/lesson/i).click();
    cy.contains(/lesson/i).parent('div').contains(/go to submodule/i).click();
    cy.url().should('include', 'lesson');
  });
  it('should take the user to the appropriate submodule for quiz', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(/quiz/i).click();
    cy.contains(/quiz/i).parent('div').contains(/go to submodule/i).click();
    cy.url().should('include', 'quiz');
  });
  it('should take the user to the appropriate submodule for lab', () => {
    cy.visit(dashboardUrl);
    cy.contains(/module 1/i).click();
    cy.contains(/lab/i).click();
    cy.contains(/lab/i).parent('div').contains(/go to submodule/i).click();
    cy.url().should('include', 'emulator');
  });
});