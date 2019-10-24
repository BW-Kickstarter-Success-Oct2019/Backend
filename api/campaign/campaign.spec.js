const server = require('../server')

const createToken = require('../auth/utils/createToken')

const request = require('supertest')

const db = require('../../dataBase/dbConfig')

describe('campaign router', () => {
	beforeEach(async () => {
		await db('campaign').truncate();
	});


	describe('Post to /api/resricted/campaigns', () => {
		
		it('should be a resricted route', async () => {
			const user = { username: "matthew", password: "1234",  }
			const token = createToken(user)

			const response = await request(server.get('/api/resricted/campaigns'))
			console.log(response)
			expect(response.status).toBe(400)

			const secondResponse = await request(server).get('/api/resricted/campaigns')
				.set('authorization', token)

			expect(secondResponse.status).toBe(200)
		})
		// it('should add campaign to database', async () => {
		// 	const initial = await db('campaign')
		// 	expect(initial).toHaveLength(0)

		// 	const user = await request(server)
		// 	.post('/api/user/register')
		// 	.send({
		// 		username: 'matthew',
		// 		password: '123', 
		// 		email: 'demo@demo.com' 
		// 	})
	
		// 	const campaign = await campaignModel.add({
		// 	"user_id": 1,	
		// 	"name":"software designs33",
		// 	"blurb": "A software company",
		// 	"goal": 1000,
		// 	"country": "us",
		// 	"duration": 30,
		// 	"category":"fashion"
		// })
	
		// 	const campaigns = await db('campaign')
		// 	expect(campaigns).toHaveLength(1)
		// })
	
		// it('should return the added campign', async () => {
		// 	const campaign = await campaignModel.add({	
		// 	"user_id": 1,
		// 	"name":"software designs33",
		// 	"blurb": "A software company",
		// 	"goal": 1000,
		// 	"country": "us",
		// 	"duration": 30,
		// 	"category":"fashion"
		// })
		// 	expect(campaign.name).toBe('software designs33')
		// })
	})

// 	describe('remove function', () => {
// 		it('should remove campaign from db', async () => {
// 			const campaign = await campaignModel.add({name: 'matthew', sport: 'coding'})

// 			const initial = await db('campaign')
// 			expect(initial).toHaveLength(1)
	
// 			const deletedcampaign = await campaignModel.remove(campaign.id)
	
// 			const campaigns = await db('campaigns')
// 			expect(campaigns).toHaveLength(0)
// 		})

// 		it('should return removed campaign', async () => {
// 			const campaign = await campaignModel.add({name: 'matthew', sport: 'coding'})

// 			const initial = await db('campaigns')
// 			expect(initial).toHaveLength(1)
	
// 			const deletedcampaign = await campaignModel.remove(campaign.id)
	
// 			expect(deletedcampaign.name).toBe('matthew')
// 		})

// 		it('should return message: "could not delete campaign" if id is invalid', async () => {
// 			const campaign = await campaignModel.add({name: 'matthew', sport: 'coding'})

// 			const initial = await db('campaigns')
// 			expect(initial).toHaveLength(1)
	
// 			const deletedcampaign = await campaignModel.remove(4)
	
// 			expect(deletedcampaign.message).toBe('could not delete campaign')
// 		})
// 	})
})