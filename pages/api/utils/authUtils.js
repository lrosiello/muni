const bcrypt = require('bcrypt');

export async function comparePassword(password, hashedPassword) {
    console.log(password)
    console.log(hashedPassword)
  return await bcrypt.compare(password, hashedPassword);
}