import {
  isValidEmail,
  isValidPassword,
  areAllDataFilled,
  isItExists,
  fixSpaces,
  isValidRange
} from "../utils/validations";
import { typesValidating } from "../utils/typesValidating";
import { getUserById, deleteUser, updateUser, getUserByEmail } from "../apiModel/usersModel";
import { comparePassword } from '../utils/authUtils';

export default async function handler(req, res) {
  let message;
  const bcrypt = require("bcrypt");

if (req.method === 'POST' && req.url === '/api/login') {
    const { email, password } = req.body;

    // Obtener el usuario por email desde la base de datos (reemplaza esta parte con tu función para obtener el usuario por email)
    const user = await getUserByEmail(email);

    if (!user) {
      // El usuario no existe
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Verificar si la contraseña es correcta
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      // La contraseña es incorrecta
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Si el usuario y la contraseña son correctos, envía una respuesta exitosa
    return res.status(200).json({ success: true, message: 'Login successful' });
  }



  //GET USER BY ID
  if (req.method === "POST") {
    const userId = req.query.id;
    if (isNaN(userId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const userById = await getUserById(userId);
      if (userById.rowCount === 0) {
        res.status(500).json({ error: "This user does not exist" });
      } else {
        res.status(200).json({ userById });
      }
    }
  }

  //DELETE USER BY ID

  if (req.method === "DELETE") {
    const userId = req.query.id;

    if (isNaN(userId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const deletedUser = await deleteUser(userId);
      const rowCount = deletedUser.rowCount;
      if (rowCount > 0) {
        message = "User deleted successfully";
      } else {
        message = "Could not delete, this id does not exist";
      }
      res.status(200).json({ response: { message: message, userId: userId } });
    }
  }

  //UPDATE USER BY ID

  if (req.method === "PUT") {
    const userId = req.query.id;

    //VERIFIES IF INSERTED ID IS VALID
    if (isNaN(userId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const { name, surname, email, password, user_role } = req.body;

      //VERIFIES IF DATA IS FILLED
      if (areAllDataFilled([name, surname, email, password])) {
        //THIS DELETES THE EMPTY SPACES OF THE NAME AND EMAIL
        const fixedElements = fixSpaces([name, surname, email, password]);
        const fixedName = fixedElements[0];
        const fixedSurname = fixedElements[1];
        const fixedEmail = fixedElements[2];
        const fixedPassword = fixedElements[3];

        //VERIFIES IF DATA IS VALID
        const typesValidation = typesValidating("users", [
          fixedName,
          fixedSurname,
          fixedEmail,
          fixedPassword,
        ]);
        // VALIDATE EMAIL FORMAT
        if (!isValidEmail(fixedEmail)) {
          return res.status(500).json({ error: "Invalid email format" });
        }
        // VALIDATE PASSWORD FORMAT
        if (!isValidPassword(fixedPassword)) {
          return res.status(500).json({ error: "Invalid password format" });
        }
        // VALIDATE RANGE FORMAT
        if (!isValidRange(user_role)) {
          return res.status(500).json({ error: "Invalid range format" });
        }
        if (typesValidation.valid) {
          //VERIFIES IF EMAIL ALREADY EXISTS
          const repeated = await isItExists(
            "users",
            "email",
            fixedEmail,
            userId
          );

          if (!repeated) {
            //UPDATE USER
            // crypt password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(fixedPassword, saltRounds);

            const updatedUser = await updateUser(
              userId,
              fixedName,
              fixedSurname,
              fixedEmail,
              hashedPassword,
              user_role
            );

            const rowCount = updatedUser.rowCount;
            if (rowCount > 0) {
              message = "User updated successfully";
            } else {
              message = "Error, could not update because id does not exist";
            }

            let user = {
              id: userId,
              name: fixedName,
              surname: fixedSurname,
              email: fixedEmail,
              password: fixedPassword,
              user_role: user_role
            };
            res
              .status(200)
              .json({ response: { message: message, user: user } });
          } else {
            res.status(500).json({
              error: "That email already exists, could not update",
            });
          }
        } else {
          const typeError = typesValidation.message;
          res.status(500).json({
            typeError: typeError,
          });
        }
      } else {
        res.status(500).json({
          error: "Make sure that name, surname, email, and password are filled",
        });
      }
    }
  }
}
