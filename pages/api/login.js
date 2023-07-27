import { comparePassword } from './utils/authUtils'; 
import { getUserByEmail } from './apiModel/usersModel'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // TAKE THE USER BY EMAIL
    const user = await getUserByEmail(email);
    const hashedPassword =user.rows[0].password;

    if (!user) {
      // IF IT DOES NOT EXISTS
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // VERIFY PASSWORD
    const passwordMatch = await comparePassword(password, hashedPassword);

    if (!passwordMatch) {
      // IF PASSWORD IS NOT VALID
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // IF PASSWORD IS VALID, LOGIN SUCCESFUL
    return res.status(200).json({ success: true, message: 'Login successful' });
  }

  // IF THE REQ IS NOT POST
  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}