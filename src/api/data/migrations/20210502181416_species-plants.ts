import { Knex } from "knex";

exports.up = function (knex: Knex) {
  return knex.schema
    .createTable("species", (tbl) => {
      tbl.increments();
      tbl.string("species").notNullable().unique();
    })
    .createTable("plants", (tbl) => {
      tbl.increments();
      tbl.string("nickname").notNullable();
      tbl.string("water_freq");
      tbl.string("img");
      tbl.integer("baseDate");
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("species_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("species")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex: Knex) {
  return knex.schema.dropTableIfExists("plants").dropTableIfExists("species");
};
