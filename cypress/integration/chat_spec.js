describe('Get details for user', () => {
    it('Setup', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-name=Chat]').click();
    })

    it('Get channels for user', () => {
        cy.get('#1_getChannelsForUser').click();
        cy.get('[data-cy=result]').should('have.text', 'Success');
    })

    it('Get channel details', () => {
        cy.get('#2_getChannelDetails').click();
        cy.get('[data-cy=result]').should('have.text', 'Success');
    })
})