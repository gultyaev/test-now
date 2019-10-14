const {Client} = require('pg');

/**
 * Establishes the DB connection
 * @returns {Promise<Client>}
 */
export async function connect() {
  const client = new Client({
    connectionString: process.env.PG_URL
  });

  await client.connect();

  return client;
}
