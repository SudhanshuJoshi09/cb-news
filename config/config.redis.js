const redis = require('redis');
require('dotenv').config({path:__dirname+'/../.env'})

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_USER = process.env.REDIS_USER
const REDIS_PASS = process.env.REDIS_PASS

const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USER,
  password: REDIS_PASS,
});

client.connect();

module.exports = {
  client
}