//GET ALL CATEGORIES
export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`);
  const response = await res.json();
  const sortedCategories = response.categories.rows.sort(
    (a, b) => a.numero_orden - b.numero_orden
  );
  return sortedCategories;
}

export async function getCategory(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/categories/${id}`
    );
    // Verifies if it worked
    if (res.status === 200) {
      const response = await res.json();
      return response.categoryById.rows[0];
    } else {
      console.log("Error fetching category: ", id);
    }
  } catch (error) {
    console.error("Error fetching category: ", error);
  }
}

export async function getLayer(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/layers/${id}`
    );
    // Verifies if it worked
    if (res.status === 200) {
      const response = await res.json();
      return response.layerById.rows[0];
    } else {
      console.log("Error fetching layer: ", id);
    }
  } catch (error) {
    console.error("Error fetching layer: ", error);
  }
}

//GET ALL LAYERS
export async function getLayers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/layers`);
  const response = await res.json();
  const sortedLayers = response.layers.rows.sort(
    (a, b) => a.numero_orden - b.numero_orden
  );
  return sortedLayers;
}

//DELETE CATEGORY
export async function deleteCategory(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/categories/${id}`,
      {
        method: "DELETE",
      }
    );
    // Verifies if it worked
    if (res.status === 200) {
      console.log("Deleting was successful", id);
    } else {
      console.log("Error eliminating: ", id);
    }
  } catch (error) {
    console.error("Error eliminating: ", error);
  }
}
//DELETE LAYER
export async function deleteLayer(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/layers/${id}`, {
      method: "DELETE",
    });
    // Verifies if it worked
    if (res.status === 200) {
      console.log("Deleting was successful", id);
    } else {
      console.log("Error eliminating: ", id);
    }
  } catch (error) {
    console.error("Error eliminating: ", error);
  }
}

export async function updating(url, id, format) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(format),
    });

    if (response.ok) {
      console.log("Updating was successful", id);
    } else {
      console.log("Error Updating: ", id);
    }

    return response; // Devuelve la respuesta completa
  } catch (error) {
    console.error("Error Updating: ", error);
    throw error; // Lanza el error para que pueda ser capturado en el componente
  }
}


export async function creating(url, bodyToSubmit, tableName) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyToSubmit),
    });

    if (response.ok) {
      if(tableName==="categories"){
        const responseData = await response.json();
        const category = responseData.response.category; 
        console.log("Item created successfully", category);
        return { category: category, error: null };
      }else if(tableName==="layers"){
          const responseData = await response.json();
          const layer = responseData.response.layer; 
          console.log("Item created successfully", layer);
          return { layer: layer, error: null };
      }
    } else {
      const errorMessage = await response.json();
      return { error: errorMessage };
    }

   
  } catch (error) {
    console.error("Error creating item", error);
    return { error: error.message };
  }
}

