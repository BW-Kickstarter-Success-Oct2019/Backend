
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
			.string('campaign_name',255)
			.notNullable()
		
		tbl
			.text('campaign_description')
			.notNullable()

		tbl
			.float('goal_amount')
			.notNullable()

		tbl	
			.string('country', 2)
			.notNullable()
		
		tbl
			.string('duration', 128)
			.notNullable()

		tbl
			.string('category', 128)
			.notNullable()
		
		tbl
			.float('campaign_success')

	})
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('campaign')
};
