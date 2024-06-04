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
  const [rows] = await pool.query('SELECT * FROM photos INNER JOIN user USING(userID) WHERE email=?;', [user]);
  return rows;
}

export async function getPhoto(id) {
  const [row] = await pool.query('SELECT * FROM photos WHERE photoId = ?', [id]);
  return row[0];
}

export async function createPhoto(source, location, caption, userID) {
  const [res] = await pool.query(`
    INSERT INTO photos (source, location, caption, userID)
      Value (?, ?, ?, ?)
  `, [source, location, caption, userID]);

  
  const id = res.insertId;
  return getPhoto(id);
}

export async function deletePhoto(id) {
  const [res] = await pool.query(`
    DELETE FROM photos 
      WHERE photoId = ?;
  `, [id]);
}

export async function getUserData(email) {
  const [rows] = await pool.query('SELECT * FROM user WHERE email=?;', [email]);
  return rows;
}

export async function postUserData(firstName, lastName, email, hashed_password) {
  const bio = "";
  const [rows] = await pool.query(
    `INSERT INTO user (email, firstName, lastName, password, bio)
      Value (?, ?, ?, ?, ?);
    `, [email, firstName, lastName, hashed_password, bio]);
  
  return getUserData(email);
}

export async function updateUserData(userID, bio, pfp) {
  const [rows] = await pool.query(
    `UPDATE user
     SET bio = ?, pfp = ?
     WHERE userID = ?;`,
    [bio, pfp, userID]
  );
  
  return rows;
}

export async function userExists(email) {
  const [res] = await pool.query(`
    SELECT * FROM user
      WHERE email=?
  `, [email]);
  return res.length === 1;
}