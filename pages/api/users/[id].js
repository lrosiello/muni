import { areAllDataFilled, isItExists, fixSpaces } from "../utils/validations";
import { typesValidating } from "../utils/typesValidating";
import { getUserById, deleteUser, updateUser } from "../apiModel/usersModel";

export default async function handler(req, res) {
  let message;

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
      res
        .status(200)
        .json({ response: { message: message, userId: userId } });
    }
  }

  //UPDATE USER BY ID

  if (req.method === "PUT") {
    const userId = req.query.id;

    //VERIFIES IF INSERTED ID IS VALID
    if (isNaN(userId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const { name, surname, email, password } = req.body;

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
        if (typesValidation.valid) {
          //VERIFIES IF EMAIL ALREADY EXISTS
          const repeated = await isItExists("users", "email", fixedEmail, userId);

          if (!repeated) {
            //UPDATE USER
            const updatedUser = await updateUser(
              userId,
              fixedName,
              fixedSurname,
              fixedEmail,
              fixedPassword
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
