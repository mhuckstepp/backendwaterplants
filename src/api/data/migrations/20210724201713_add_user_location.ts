import { Knex } from "knex";

exports.up = async (knex: Knex) => {
  await knex.schema.table("users", (user) => {
    user.string("location").defaultTo("san+francisco");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists("users");
};
