
import { areAllDataFilled, isItExists, fixSpaces } from "./utils/validations";
import { typesValidating } from "./utils/typesValidating";
import { getCategories, insertCategory } from "./apiModel/categoriesModel";

export default async function handler(req, res) {
  let message;
  let category;

  //GET ALL CATEGORIES
  if (req.method === "GET") {
    const categories = await getCategories();
    res.status(200).json({ categories });
  }

  //CREATE A NEW CATEGORY
  else if (req.method === "POST") {
    const { available } = req.body;
    let { description, categoryName } = req.body;

    //VERIFIES THAT ALL INPUTS ARE FILLED
    if (areAllDataFilled([categoryName, available])) {
      //VERIFIES IF DATA IS VALID
      const typesValidation = typesValidating("categories", [
        categoryName,
        description,
        available,
      ]);
      if (typesValidation.valid) {

          //THIS DELETES THE EMPTY SPACES OF THE NAME
          const fixedElements = fixSpaces([categoryName, description]);
          categoryName = fixedElements[0];
          description = fixedElements[1];
          
        //VERIFIES THAT THE CATEGORY DOES NOT EXISTS
        const verifyName = await isItExists(
          "categories",
          "category_name",
          categoryName
        );

        if (!verifyName) {
          //INSERT A NEW CATEGORY
          const addCategory =  await insertCategory(categoryName, description, available);
          //IT TAKES DATA FROM THE CATEGORY ADDED
          if (addCategory.rowCount > 0) {
            const categoryId = addCategory.rows[0].id;
            const orderNumber = addCategory.rows[0].order_number;
            if (categoryId) {
              message = "success";
              category = {
                id: categoryId,
                category_name: categoryName,
                description: description,
                order_number: orderNumber,
                available: available,
              };
            } else {
              message = "error";
              category = null;
            }
            //RESPONSES
            res
              .status(200)
              .json({ response: { message: message, category: category } });
          }
        } else {
          res
            .status(500)
            .json({ error: "That category already exists, could not create" });
        }
      } else {
        const typeError = typesValidation.message;
        res.status(500).json({
          typeError: typeError,
        });
      }
    } else {
      res.status(500).json({
        error: "Be sure that description, even (available) are filled",
      });
      res.status(405).end();
    }
  }
}
