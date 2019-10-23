
const db = require('../../data/dbConfig')

const campaignModel = require('./campagin-model')

describe('campaigns model', () => {
	beforeEach(async () => {
		await db('campaigns').truncate();
	});



	describe('add function', () => {
		it('should add campaign to database', async () => {
			const initial = await db('campaigns')
			expect(initial).toHaveLength(0)
	
			const campaign = await campaignModel.add({name: 'matthew', sport: 'coding'})
	
			const campaigns = await db('campaigns')
			expect(campaigns).toHaveLength(1)
		})
	
		it('should return the added play', async () => {
			const campaign = await campaignModel.add({name: 'matthew', sport: 'coding'})
			expect(campaign.name).toBe('matthew')
			expect(campaign.sport).toBe('coding')
		})
	})

	describe('remove function', () => {
		it('should remove campaign from db', async () => {
			const campaign = await campaignModel.add({name: 'matthew', sport: 'coding'})

			const initial = await db('campaigns')
			expect(initial).toHaveLength(1)
	
			const deletedcampaign = await campaignModel.remove(campaign.id)
	
			const campaigns = await db('campaigns')
			expect(campaigns).toHaveLength(0)
		})

		it('should return removed campaign', async () => {
			const campaign = await campaignModel.add({name: 'matthew', sport: 'coding'})

			const initial = await db('campaigns')
			expect(initial).toHaveLength(1)
	
			const deletedcampaign = await campaignModel.remove(campaign.id)
	
			expect(deletedcampaign.name).toBe('matthew')
		})

		it('should return message: "could not delete campaign" if id is invalid', async () => {
			const campaign = await campaignModel.add({name: 'matthew', sport: 'coding'})

			const initial = await db('campaigns')
			expect(initial).toHaveLength(1)
	
			const deletedcampaign = await campaignModel.remove(4)
	
			expect(deletedcampaign.message).toBe('could not delete campaign')
		})
	})
})