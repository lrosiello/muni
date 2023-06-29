import { areAllDataFilled, isItExists, fixSpaces } from "./utils/validations";
import { typesValidating } from "./utils/typesValidating";
import { getUsers, insertUser } from "./apiModel/usersModel";

export default async function handler(req, res) {
  let message;
  let user;

  //GET ALL USERS
  if (req.method === "GET") {
    const users = await getUsers();
    res.status(200).json({ users });
  }

  //CREATE A NEW USER
  else if (req.method === "POST") {
    const { name, surname, email, password } = req.body;

    //VERIFIES THAT ALL INPUTS ARE FILLED
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
      if (typesValidation.valid) {
        //VERIFIES THAT THE USER DOES NOT EXISTS
        const verifyEmail = await isItExists("users", "email", fixedEmail);

        if (!verifyEmail) {
          //INSERT A NEW USER
          const addUser = await insertUser(
            fixedName,
            fixedSurname,
            fixedEmail,
            fixedPassword
          );
          //IT TAKES DATA FROM THE USER ADDED
          if (addUser.rowCount > 0) {
            const userId = addUser.rows[0].id;
            if (userId) {
              message = "success";
              user = {
                id: userId,
                name: fixedName,
                surname: fixedSurname,
                email: fixedEmail,
                password: fixedPassword,
              };
            } else {
              message = "error";
              user = null;
            }
            //RESPONSES
            res
              .status(200)
              .json({ response: { message: message, user: user } });
          }
        } else {
          res
            .status(500)
            .json({
              error: "That email already exists, could not create the user",
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
        error: "Be sure that name, surname, email, and password are filled",
      });
      res.status(405).end();
    }
  }
}
