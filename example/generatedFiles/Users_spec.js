describe('Users', () => {
	it('Setup', () => {
		cy.visit('http://localhost:3000');
		cy.get('[data-name=Users]').click();
	})
	it("Register a new user", () => {
		cy.get('#1-registerUser').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it("Register a new user with duplicate email", () => {
		cy.get('#2-registerDuplicateUser').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it("List registered users", () => {
		cy.get('#3-getListOfUsers').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it("Update user's password", () => {
		cy.get('#4-updateUser').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it("Delete user", () => {
		cy.get('#5-deleteUser').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
})
