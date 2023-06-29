import { query } from "../../../lib/db";

export async function getCategories() {
  const categories = await query("SELECT * FROM categories", []);
  return categories;
}

export async function getCategoriesById(categoryId) {
  const getCategoryById = await query(
    "SELECT * FROM categories WHERE id = $1",
    [categoryId]
  );
  return getCategoryById;
}

export async function insertCategory(categoryName, description, available) {
  const newCategory = await query(
    "INSERT INTO categories (category_name,description,available) VALUES($1, $2, $3) RETURNING *",
    [categoryName, description, available]
  );
  return newCategory;
}

export async function deleteCategory(categoryId) {
  const deletedCategory = await query("DELETE FROM categories WHERE id = $1", [
    categoryId,
  ]);
  return deletedCategory;
}

export async function updateCategory(
  categoryName,
  description,
  available,
  categoryId
) {
  const updatedCategory = await query(
    "UPDATE categories SET category_name = $1, description = $2, available = $3 WHERE id = $4",
    [categoryName, description, available, categoryId]
  );
  return updatedCategory;
}
