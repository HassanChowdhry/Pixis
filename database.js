import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

export async function getPhotos() {
  const [rows] = await pool.query('SELECT * FROM photos');
  return rows;
}

export async function getPhoto(id) {
  const [row] = await pool.query('SELECT * FROM photos WHERE id = ?', [id]);
  return row[0];
}

export async function createPhoto(source, location, description) {
  const [res] = await pool.query(`
    INSERT INTO photos (source, location, description)
      Value (?, ?, ?)
  `, [source, location, description]);

  const id = res.insertId;
  return getPhoto(id);
}