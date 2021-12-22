const express = require('express');
const app = express();
const port = 8000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'liuwenzhuo521',
  database: 'records_of_life',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('数据库连接成功!');
});

module.exports = {
  express,
  app,
  db: connection,
};
