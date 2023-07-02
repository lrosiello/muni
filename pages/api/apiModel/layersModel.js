import { query } from "../../../lib/db";

export async function getLayers() {
  const layers = await query("SELECT * FROM layers", []);
  return layers
}

export async function getLayerById(layerId) {
  const layerById = await query("SELECT * FROM layers WHERE id = $1", [
    layerId,
  ]);
  return layerById;
}

export async function insertLayer(layerName, description, category, available) {
  const newLayer = await query(
    "INSERT INTO layers (layer_name,description,category,available) VALUES($1, $2, $3, $4) RETURNING *",
    [layerName, description, category, available]
  );
  return newLayer;
}

export async function deleteLayer(layerId) {
  const deletedLayer = await query("DELETE FROM layers WHERE id = $1", [
    layerId,
  ]);
  return deletedLayer;
}

export async function updateLayer(
  layerName,
  description,
  category,
  available,
  layerId
) {
  const updatedLayer = await query(
    "UPDATE layers SET layer_name = $1, description = $2, category = $3, available = $4 WHERE id = $5",
    [layerName, description, category, available, layerId]
  );
  return updatedLayer;
    
}
