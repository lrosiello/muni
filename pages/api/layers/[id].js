
import { areAllDataFilled, isItExists, fixSpaces } from "../utils/validations";
import { typesValidating } from "../utils/typesValidating";
import {
  getLayerById,
  deleteLayer,
  updateLayer,
} from "../apiModel/layersModel";

export default async function handler(req, res) {
  let message;

  //GET ELEMENT BY ID

  if (req.method === "GET") {
    const layerId = req.query.id;
    if (isNaN(layerId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const layerById = await getLayerById(layerId);
      if (layerById.rowCount === 0) {
        res.status(500).json({ error: "This layer does not exist" });
      } else {
        res.status(200).json({ layerById });
      }
    }
  }

  if (req.method === "DELETE") {
    const layerId = req.query.id;

    if (isNaN(layerId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const deletedLayer = await deleteLayer(layerId);

      const rowCount = deletedLayer.rowCount;
      if (rowCount > 0) {
        message = "layer deleted succesfully";
      } else {
        message = "could not delete, this id does not exists";
      }
      res
        .status(200)
        .json({ response: { message: message, layerId: layerId } });
    }
  }

  //UPDATE A LAYER
  if (req.method === "PUT") {
    const layerId = req.query.id;

    if (isNaN(layerId)) {
      res.status(500).json({ error: "The id value is not valid" });
    } else {
      const { orderNumber, category, available } = req.body;
      let { description, layerName } = req.body;

      //VERIFIES IF DATA IS FILLED
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
            category,
            layerId
          );

          if (categoryExists) {
            //UPDATE
            const updatedLayer = await updateLayer(
              layerName,
              description,
              category,
              available,
              layerId
            );

            const rowCount = updatedLayer.rowCount;
            if (rowCount > 0) {
              message = "layer updated succesfully";
            } else {
              message = "error, could not update because id does not exists";
            }
            let layer = {
              id: layerId,
              layer_name: layerName,
              description: description,
              order_number: orderNumber,
              category: category,
              available: available,
            };

            res
              .status(200)
              .json({ response: { message: message, layer: layer } });
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
          error: "Be sure that layer_name, category and available are filled",
        });
      }
    }
  }
}
