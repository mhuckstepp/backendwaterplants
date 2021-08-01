const knex = require('knex')
const configs = require('../../knexfile')
import * as dotenv from "dotenv";
dotenv.config();

const currEnv: any = process.env.NODE_ENV

export default knex(configs[currEnv])
