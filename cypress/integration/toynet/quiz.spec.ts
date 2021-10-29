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

const visitUrl = 'http://localhost:3000/module/100001/quiz/4001';

describe('The quiz page', () => {
  it('can submit and show error', () => {
    cy.visit(visitUrl);
    cy.contains('Which type of fiber is best suited for long distance transmission?')
      .get('[data-testid="Multi-Mode Fiber"]').click({ multiple: true });

    cy.contains('2. What level of the 7 Layer OSI model are Routers in?')
      .get('[data-testid=Physical]').click({ multiple: true });
    cy.contains('3. What part of IP packet determines destination?')
      .get('[data-testid="MAC Address"]').click({ multiple: true });
    cy.contains('4. What part of IP packet determines what we seek?')
      .get('[data-testid="MAC Address"]').click({ multiple: true });
    cy.contains('5. What is the name of a network spanning a small area?')
      .get('[data-testid="Local Area Network (LAN)"]').click({ multiple: true });
    cy.contains('6. In order to send an IP Packet, what is the first step before it can get sent?')
      .get('[data-testid=Deencapsulation]').click({ multiple: true });
    cy.contains('7. Which Small Factor Pluggable is capable of speeds over 40 Gbps?')
      .get('[data-testid="Small Factor Pluggable (SFP)"]').click({ multiple: true });
    cy.contains('8. Which Cable type is divided into categories abbreviated CAT?')
      .get('[data-testid="Multi-mode Fiber"]').click({ multiple: true });

    cy.contains(/submit quiz/i).click();
    cy.contains('25').should('be.visible');
    cy.contains(/try again/i).should('be.visible');
  });
});
