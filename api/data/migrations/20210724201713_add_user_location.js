exports.up = async (knex) => {
    await knex.schema.table("users", (user) => {
      user.string("location").defaultTo('san+francisco');
    });
  };
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("users");
  };
  