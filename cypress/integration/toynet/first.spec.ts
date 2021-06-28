/* eslint-disable no-magic-numbers */

describe('The first test', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('renders the correct number of elements', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.contains('Try it').click();
    cy.contains(/router/i);
    cy.contains(/r0/);

    for (let i = 0; i < 5; i++) {
      cy.get('[data-testid=plus-icon]').first().click();
      cy.wait(500);
    }

    cy.contains(/r6/i).should('not.exist');
  });
});



// // Checking for pannel jump
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000')

    // Click the "Try it" button to enter the emulator
    cy.contains('Try it').click()
    cy.url().should('include', '/module/1/emulator/1')

    // Check if the user adds a new device, the scroll bar will go to the bottom, showing the newly added device.
    cy.get('[data-testid^=plus-icon]:first').click()
    cy.get('[data-testid^=plus-icon]:first').click()
    cy.get('[data-testid^=plus-icon]:first').click()

    // Check for panel jump
    cy.contains('r1').trigger('dragstart')
    cy.contains('r2').trigger('drop')
  })
})



// - - - Emulator/ - - - //
// - - - Emulator.test.jsx - - - //
describe('The emulator', () => {
  it('should show an error sign if there are too many devices added', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Try it').click()

    for (let i = 0; i < 12; i++) {
      cy.get('[data-testid=plus-icon]').first().click();
    }

    // cy.contains('Max number of devices').should('exist');
    cy.get('div').contains('Max number of devices').should('exist')

    // check if disappeared after few seconds
    cy.wait(1000);
    cy.get('div').contains('Max number of devices').should('not.exist')
  })
})


// - - - EmulatorProvider.test.jsx - - - //
describe('The EmulatorProvider', () => {
  it('should be able to add new hosts', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Try it').click()

    //
  })

  it('should provide switches, router, and hosts if a session key does not exits', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Try it').click()

    cy.get('div').contains('r0').should('exist')
    cy.get('div').contains('s1').should('exist')
    cy.get('div').contains('h1').should('exist')
  })
})


// - - -  useTopology.test.jsx - - - //
// describe('The useTopology custom hook', () => {
//   it('should be able to add new hosts', () => {
//     cy.visit('http://localhost:3000')
//     cy.contains('Try it').click()

//     //
//   })

//   it('should be able to add switches', () => {
//     cy.visit('http://localhost:3000')
//     cy.contains('Try it').click()

//     //
//   })

//   it('should be able to add routers', () => {
//     cy.visit('http://localhost:3000')
//     cy.contains('Try it').click()

//     //
//   })
// })




// - - -  Emulator/Tabs/ConfigureTab/ - - - //
// - - -  ConfigureTab.test.jsx - - - //
describe('ConfigureTab helper functions', () => {
  it('should increment numbers correctly', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Try it').click()

    //
  })

  it('should handle empty initial configs correctly', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Try it').click()

    cy.get('[data-testid=plus-icon]').first().click();
    cy.get('div').contains('r1').should('exist')

  //   cy.get('[data-testid=plus-icon]').second().click();
  //   cy.get('div').contains('s1').should('exist')

    cy.get('[data-testid=plus-icon]').last().click();
    cy.get('div').contains('h1').should('exist')
  })

  it('should increment device names correctly', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Try it').click()

    cy.get('[data-testid=plus-icon]').first().click();
    cy.get('div').contains('r0').should('exist')
    cy.get('[data-testid=plus-icon]').first().click();
    cy.get('div').contains('r1').should('exist')
    // Router starts from 'r0' instead of 'r2'

    // cy.get('[data-testid=plus-icon]').second().click();
    // cy.get('div').contains('s1').should('exist')
    // cy.get('[data-testid=plus-icon]').second().click();
    // cy.get('div').contains('s2').should('exist')

    cy.get('[data-testid=plus-icon]').last().click();
    cy.get('div').contains('h1').should('exist')
    cy.get('[data-testid=plus-icon]').last().click();
    cy.get('div').contains('h2').should('exist')
  })
})




// - - - Emulator/Tabs/ConfigureTab/DeviceContainer/ - - - //
// - - - DeviceContainer.test.jsx - - - //
// describe('should add device when plus icon is clicked', () => {
//   it('should be able to add new hosts', () => {
//     cy.visit('http://localhost:3000')
//     cy.contains('Try it').click()

//     //
//   })
// })





// - - - Emulator/Tabs/ConfigureTab/DeviceContainer/Device/ - - - //
// - - - Device.test.jsx  - - - //
// describe('The Device', () => {
//   it('should be able to delete connection', () => {
//     cy.visit('http://localhost:3000')
//     cy.contains('Try it').click()


//     cy.get('[id=s1]').first().trigger('dragstart').click({force:true})
//     cy.get('[data-testid=trach-icon]').first().trigger('drop').click({force:true})
//   })
// })
