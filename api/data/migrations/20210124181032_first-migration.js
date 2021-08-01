"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = (knex) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex.schema.createTable("users", (users) => {
        users.increments("user_id");
        users.string("user_email", 320).unique().notNullable();
        users.string("user_password", 200).notNullable();
        users.timestamps(false, true);
    });
});
exports.down = (knex) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex.schema.dropTableIfExists("users");
});
