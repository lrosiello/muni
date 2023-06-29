
import { areAllDataFilled, isItExists, fixSpaces } from "../utils/validations";
import { typesValidating } from "../utils/typesValidating";
import { getCategoriesById, deleteCategory, updateCategory } from "../apiModel/categoriesModel";

export default async function handler(req, res) {
  let message;

  //GET ELEMENT BY ID

  if (req.method === "POST") {
    const categoryId = req.query.id;
    if (isNaN(categoryId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const getCategoryById = await getCategoriesById(categoryId);
      if (getCategoryById.rowCount === 0) {
        res.status(500).json({ error: "This category does not exist" });
      } else {
        res.status(200).json({ getCategoryById });
      }
    }
  }

  if (req.method === "DELETE") {
    const categoryId = req.query.id;

    if (isNaN(categoryId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const deletedCategory = await deleteCategory(categoryId);
      const rowCount = deletedCategory.rowCount;
      if (rowCount > 0) {
        message = "category deleted succesfully";
      } else {
        message = "could not delete, this id does not exists";
      }
      res
        .status(200)
        .json({ response: { message: message, categoryId: categoryId } });
    }
  }

  if (req.method === "PUT") {
    const categoryId = req.query.id;

    //VERIFIES IF ID INSERTED IS VALID
    if (isNaN(categoryId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const { orderNumber, available } = req.body;
      let { description, categoryName } = req.body;

      //VERIFIES IF DATA IS FILLED
      if (areAllDataFilled([categoryName, available])) {
        //THIS DELETES THE EMPTY SPACES OF THE NAME
        const fixedElements = fixSpaces([categoryName, description]);
        categoryName = fixedElements[0];
        description = fixedElements[1];

        //VERIFIES IF DATA IS VALID
        const typesValidation = typesValidating("categories", [
          categoryName,
          description,
          available,
        ]);
        if (typesValidation.valid) {
          //VERIFIES IF NAME OF CATEGORY ALREADY EXISTS
          const repeated = await isItExists(
            "categories",
            "category_name",
            categoryName,
            categoryId
          );

          if (!repeated) {
            //UPDATE
            const updatedCategory = await updateCategory(categoryName, description, available, categoryId);

            const rowCount = updatedCategory.rowCount;
            if (rowCount > 0) {
              message = "category updated succesfully";
            } else {
              message = "error, could not update because id does not exists";
            }

            let category = {
              id: categoryId,
              category_name: categoryName,
              description: description,
              order_number: orderNumber,
              available: available,
            };
            res
              .status(200)
              .json({ response: { message: message, category: category } });
          } else {
            res.status(500).json({
              error: "That category already exists, could not update",
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
          error: "Be sure that category name, even (available) are filled",
        });
      }
    }
  }
}
