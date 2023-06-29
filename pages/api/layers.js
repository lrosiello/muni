import { areAllDataFilled, isItExists, fixSpaces } from "./utils/validations";
import { typesValidating } from "./utils/typesValidating";
import { getLayers, insertLayer } from "./apiModel/layersModel";

export default async function handler(req, res) {
  let message;
  let layer;

  //GET ALL LAYERS
  if (req.method === "GET") {
    const layers = await getLayers();
    res.status(200).json({ layers });
  }

  //CREATE A NEW LAYER
  else if (req.method === "POST") {
    const { category, available } = req.body;
    let { description, layerName } = req.body;

    //VERIFIES THAT ALL INPUTS ARE FILLED
    if (areAllDataFilled([layerName, category, available])) {
      //VERIFIES IF DATA IS VALID
      const typesValidation = typesValidating("layers", [
        layerName,
        description,
        category,
        available,
      ]);
      if (typesValidation.valid) {

        //THIS DELETES THE EMPTY SPACES OF THE NAME
        const fixedElements = fixSpaces([layerName, description]);
        layerName = fixedElements[0];
        description = fixedElements[1];

        //VERIFIES THAT THE CATEGORY EXISTS
        const categoryExists = await isItExists(
          "categories",
          "category_name",
          category
        );

        if (categoryExists) {
          //INSERT A NEW LAYER
          const addLayer = await insertLayer(layerName, description, category, available);
          //IT TAKES DATA FROM THE LAYER ADDED
          if (addLayer.rowCount > 0) {
            const layerId = addLayer.rows[0].id;
            const orderNumber = addLayer.rows[0].order_number;
            if (layerId) {
              message = "success";
              layer = {
                id: layerId,
                layer_name: layerName,
                description: description,
                order_number: orderNumber,
                category: category,
                available: available,
              };
            } else {
              message = "error";
              layer = null;
            }
            //RESPONSES
            res
              .status(200)
              .json({ response: { message: message, layer: layer } });
          }
        } else {
          res.status(500).json({ error: "That category does not exist" });
        }
      } else {
        const typeError = typesValidation.message;
        res.status(500).json({
          typeError: typeError,
        });
      }
    } else {
      res.status(500).json({
        error: "Be sure that description, category and available are filled",
      });
      res.status(405).end();
    }
  }
}
