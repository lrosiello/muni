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

export async function insertUser(name, surname, email, password, user_role) {
  const newUser = await query(
    "INSERT INTO users (name, surname, email, password, user_role) VALUES ($1, $2, $3, $4, CAST($5 AS user_role)) RETURNING *",
    [name, surname, email, password, user_role]
  );
  return newUser;
}

export async function deleteUser(userId) {
  const deletedUser = await query("DELETE FROM users WHERE id = $1", [userId]);
  return deletedUser;
}

export async function updateUser(userId, name, surname, email, password, user_role) {
  const updatedUser = await query(
    "UPDATE users SET name = $1, surname = $2, email = $3, password = $4, user_role = CAST($5 AS user_role) WHERE id = $6",
    [name, surname, email, password, user_role, userId]
  );
  return updatedUser;
}
