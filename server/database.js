import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

export async function getPhotos(user) {
  const [rows] = await pool.query('SELECT * FROM photos INNER JOIN user USING(userID) WHERE username=?;', [user]);
  return rows;
}

export async function getUserData(user) {
  const [rows] = await pool.query('SELECT * FROM user WHERE username=?;', [user]);
  return rows;
}

export async function getPhoto(id) {
  const [row] = await pool.query('SELECT * FROM photos WHERE id = ?', [id]);
  return row[0];
}

export async function createPhoto(source, location, caption) {
  const [res] = await pool.query(`
    INSERT INTO photos (source, location, caption)
      Value (?, ?, ?)
  `, [source, location, caption]);

  const id = res.insertId;
  return getPhoto(id);
}

export async function userExists(email) {
  const [res] = await pool.query(`
    SELECT * FROM user
      WHERE username=?
  `, [email]);
  return res.length === 1;
}