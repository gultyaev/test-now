const {Client} = require('pg');

/**
 * Establishes the DB connection
 * @returns {Promise<Client>}
 */
export async function connect(target) {
  const client = target
    ? new Client({connectionString: process.env['PG_URL_' + target.toUpperCase()]})
    : new Client({connectionString: process.env.PG_URL});

  await client.connect();

  return client;
}
