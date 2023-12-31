import mariadb from 'mariadb';

console.log({host: process.env});

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 4,
  socketTimeout: 100000,
  acquireTimeout: 100000,
});

export default pool;
