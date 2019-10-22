
exports.up = function (knex) {
	return knex.schema.createTable('campaign', tbl => {
		tbl
			.increments()

		tbl
			.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		
		tbl
			.string('name',255)
			.notNullable()
		
		tbl
			.text('blurb')
			.notNullable()

		tbl
			.float('goal')
			.notNullable()

		tbl	
			.string('country', 2)
			.notNullable()
		
		tbl
			.integer('duration', 128)
			.notNullable()

		tbl
			.string('category', 128)
			.notNullable()
		
		tbl
			.float('success')

	})
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('campaign')
};
