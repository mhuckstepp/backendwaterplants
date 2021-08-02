import { Knex } from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable("users", (users) => {
    users.increments("user_id");
    users.string("user_email", 320).unique().notNullable();
    users.string("user_password", 200).notNullable();
    users.timestamps(false, true);
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists("users");
};
