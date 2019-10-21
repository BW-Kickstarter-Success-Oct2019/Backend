const db = require('../../dataBase/dbConfig')

module.exports = {
	add,
	get,
	getBy,
	update,
	remove,
}

async function add(campaign) {
	const [id] = await db('campaign').insert(campaign, "id")

	return db('campaign').where({ id }).first()
}

function get() {
	return db('campaign')
}

function getBy(filter) {
	return db('campaign').where({ filter }).first()
}

function update(id) {
	
}

async function remove(id) {
	const campaign = await db('campaign').where({id}).first()

	await db('campaign').where({id}).delete()

	return campaign
}