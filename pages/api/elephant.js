import { connect } from "../../db/connect";

export default async (req, res) => {
  const client = await connect();
  const start = process.hrtime();

  client.query('SELECT * from todos', (err, sqlRes) => {
    if (err) {
      console.error(err);

      sqlRes.json({
        statusCode: 500,
        message: 'Something went wrong'
      })
    }

    const end = process.hrtime(start);

    res.json({
      statusCode: 200,
      data: {
        time: `${end[0]}s | ${end[1]}ms`,
        list: sqlRes.rows
      }
    });

    client.end();
  })
}
