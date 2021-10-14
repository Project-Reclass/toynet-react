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

const surveyUrl = 'http://localhost:3000/module/100001/survey/6001';

describe('The survey page', () => {
  it('should render the survey for module 100001 survey 6001', () => {
    cy.visit(surveyUrl);
    cy.contains('What is your first name').should('be.visible');
    cy.contains(/submit survey/i).scrollIntoView().should('be.visible');
  });
});