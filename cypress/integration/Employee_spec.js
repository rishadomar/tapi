describe('Employee', () => {
	it('Setup', () => {
		cy.visit('http://localhost:3000');
		cy.get('[data-name=Employee]').click();
	})
	it('undefined', () => {
		cy.get('#badEmployee').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it('undefined', () => {
		cy.get('#getEmployee').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
})
