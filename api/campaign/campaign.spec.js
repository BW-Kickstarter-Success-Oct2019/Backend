const server = require('../server')

const createToken = require('../auth/utils/createToken')

const request = require('supertest')

const db = require('../../dataBase/dbConfig')

describe('campaign router', () => {
	beforeEach(async () => {
		await db('campaign').truncate();
		await db('users').truncate();
	});


	describe('POST to /api/resricted/campaigns', () => {

		it('should be a resricted route', async () => {
			const user = await request(server)
				.post('/api/user/register')
				.send({ username: 'matthew', password: '123', email: 'demo@demo.com' })

				const login = await request(server)
				.post('/api/user/login')
				.send({ username: 'matthew', password: '123' })

			const response = await request(server).get('/api/restricted/campaigns')
			expect(response.status).toBe(400)

			const secondResponse = await request(server).get('/api/restricted/campaigns')
			.set('authorization', login.body.token)

			expect(secondResponse.status).toBe(200)
		})

		it('should add campaign to database', async () => {
			const initial = await db('campaign')
			expect(initial).toHaveLength(0)

			const user = await request(server)
				.post('/api/user/register')
				.send({ username: 'matthew', password: '123', email: 'demo@demo.com' })

			const login = await request(server)
				.post('/api/user/login')
				.send({ username: 'matthew', password: '123' })

			const postCampaign = await request(server).post('/api/restricted/campaigns')
				.send({
					"user_id": 1,
					"name": "software designs33",
					"blurb": "A software company",
					"goal": 1000,
					"country": "us",
					"duration": 30,
					"category": "fashion"
				})
				.set('authorization', login.body.token)

			const campaigns = await db('campaign')
			expect(campaigns).toHaveLength(1)
		})

		it('should return campaign', async () => {
			const initial = await db('campaign')
			expect(initial).toHaveLength(0)

			const user = await request(server)
				.post('/api/user/register')
				.send({ username: 'matthew', password: '123', email: 'demo@demo.com' })

			const login = await request(server)
				.post('/api/user/login')
				.send({ username: 'matthew', password: '123' })

			const campaign = await request(server).post('/api/restricted/campaigns')
				.send({
					"user_id": 1,
					"name": "software designs33",
					"blurb": "A software company",
					"goal": 1000,
					"country": "us",
					"duration": 30,
					"category": "fashion"
				})
				.set('authorization', login.body.token)

			expect(campaign.body.id).toBe(1)
		})
	})


	describe('DELETE to /api/resricted/campaigns', () => {
		it('should remove campaign from db', async () => {


			const user = await request(server)
				.post('/api/user/register')
				.send({ username: 'matthew', password: '123', email: 'demo@demo.com' })

			const login = await request(server)
				.post('/api/user/login')
				.send({ username: 'matthew', password: '123' })

			const campaign = await request(server).post('/api/restricted/campaigns')
				.send({
					"user_id": 1,
					"name": "software designs33",
					"blurb": "A software company",
					"goal": 1000,
					"country": "us",
					"duration": 30,
					"category": "fashion"
				})
				.set('authorization', login.body.token)

			const campaigns = await request(server).get('/api/restricted/campaigns')
				.set('authorization', login.body.token)

			expect(campaigns.body).toHaveLength(1)

			const deleteCampaign = await request(server).delete('/api/restricted/campaigns/1')
				.set('authorization', login.body.token)


			const result = await request(server).get('/api/restricted/campaigns')
				.set('authorization', login.body.token)

			expect(result.body).toHaveLength(0)
		})
	})
})