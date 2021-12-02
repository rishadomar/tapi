describe('Chat', () => {
	it('Setup', () => {
		cy.visit('http://localhost:3000');
		cy.get('[data-name=Chat]').click();
	})
	it('Get all the channels a user belongs to', () => {
		cy.get('#1_getChannelsForUser').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it('Get the channel for a specific channelId', () => {
		cy.get('#2_getChannelDetails').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it('createChannel: create a chat channel', () => {
		cy.get('#3_createNewChannel').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it('Update a channel', () => {
		cy.get('#4_updateChannel').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it('Delete a chat channel', () => {
		cy.get('#5_deleteChannel').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it('Delete an unknown chat channel', () => {
		cy.get('#6_deleteUnknownChannel').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it('Get all channels', () => {
		cy.get('#7_getPageChannels').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it('Get the channel for a specific channelId', () => {
		cy.get('#8_queryChannels').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
	it('Get the channel for a specific channelId', () => {
		cy.get('#9_queryChannels_alternative').within(() => {
			cy.get('[data-method=1]').click();
			cy.get('[data-cy=result]').should('have.text', 'Success');
		})
	})
})
