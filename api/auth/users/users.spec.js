const server = require('../../server')

const createToken = require('../utils/createToken')

const request = require('supertest')

const db = require('../../../dataBase/dbConfig')



describe('server endpoints test', () => {

	describe('POST /api/user/register', () => {

		beforeEach(async () => {
			await db('users').truncate();
		});

		it('should add user to db', async () => {
			const initial = await db('users')
			expect(initial).toHaveLength(0)


			const user = await request(server)
			.post('/api/user/register')
			.send({ username: 'matthew', password: '123', email: 'demo@demo.com' })

			const result = await db('users')
			expect(result).toHaveLength(1)
		})

		it('should send status 400 if proper fields are not sent', async () => {
			const user = await request(server)
			.post('/api/user/register')
			.send({ fail: 'matthew', password: '123',email: 'demo@demo.com' })

			expect(user.status).toBe(400)
			expect(user.body).toEqual({message: 'username, password, and email are required fields'})
		})

		describe('POST /api/user/login',() => {

			beforeEach(async () => {
				await db('users').truncate();
			});
			it('should return status 401 if username and password are not valid', async () => {
			
			const login = await request(server)
			.post('/api/user/login')
			.send({ username: 'fail', password: 'fail' })

			expect(login.status).toBe(401)
			})

			it('should return message "invalid credentials" if username and password are not valid', async () => {
			
				const login = await request(server)
				.post('/api/user/login')
				.send({ username: 'fail', password: 'fail' })
	
				expect(login.body).toEqual({message: "invalid credentials"})
				})

			it('should return  "message": "Welcome username to Kickstarter Success!", if username and password are valid', async () => {
				const user = await request(server)
				.post('/api/user/register')
				.send({ username: 'matthew', password: '123', email: 'demo@demo.com' })

				const login = await request(server)
				.post('/api/user/login')
				.send({ username: 'matthew', password: '123' })
	
				expect(login.body.message).toEqual(`Welcome matthew to Kickstarter Success`)
				})
		})
	})
})
