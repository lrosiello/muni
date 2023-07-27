const bcrypt = require('bcrypt');

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}