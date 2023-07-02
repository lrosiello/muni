import { query } from "../../../lib/db";

export async function getUsers() {
  const users = await query("SELECT * FROM users", []);
  return users;
}

export async function getUserById(userId) {
  const userById = await query("SELECT * FROM users WHERE id = $1", [userId]);
  return userById;
}

export async function getUserByEmail(email) {
  const userByEmail = await query("SELECT * FROM users WHERE email = $1", [email]);
  return userByEmail;
}

export async function insertUser(name, surname, email, password) {
  const newUser = await query(
    "INSERT INTO users (name, surname, email, password) VALUES($1, $2, $3, $4) RETURNING *",
    [name, surname, email, password]
  );
  return newUser;
}

export async function deleteUser(userId) {
  const deletedUser = await query("DELETE FROM users WHERE id = $1", [userId]);
  return deletedUser;
}

export async function updateUser(userId, name, surname, email, password) {
  const updatedUser = await query(
    "UPDATE users SET name = $1, surname = $2, email = $3, password = $4 WHERE id = $5",
    [name, surname, email, password, userId]
  );
  return updatedUser;
}
