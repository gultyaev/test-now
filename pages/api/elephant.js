import { connect } from "../../db/connect";

export default async (req, res) => {
  const client = await connect();
  const start = process.hrtime();

  client.query('SELECT * from todos', (err, sqlRes) => {
    if (err) {
      console.error(err);

      res.json({
        statusCode: 500,
        message: 'Something went wrong'
      });

      client.end();
    }

    const end = process.hrtime(start);

    res.json({
      statusCode: 200,
      data: {
        time: `${end[1] / 1000000}ms`,
        list: sqlRes.rows
      }
    });

    client.end();
  })
}
