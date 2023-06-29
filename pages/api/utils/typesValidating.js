const types = require("./types.json"); //IMPORT THE TYPES CONFIG

//THIS VERIFIES IF ALL DATA TYPES ARE VALID
export function typesValidating(tableName, data) {
  const array = setTable(tableName); //SELECT WHICH TABLE IS

  console.log(data)
  const validationMessage = validating(data, array); //VALIDATION PROCESS
  if (validationMessage === "success") {
    return {
      valid: true,
    };
  } else {
    return {
      valid: false,
      message: validationMessage,
    };
  }
}

function validating(data, array) {
  let message = "";
  let countValid = 0;
  
  data.forEach((element, index) => {
    element = avoidingStringify(element); //IT AVOIDS THE STRINGIFY BY JSON
    const validtypes = array[index].type;
    if (validtypes.includes(typeof element)) {
      //VERIFIES IF TYPE IS EQUAL
      countValid++;
    } else {
      message += `${element} is not a valid ${array[index].type} for ${array[index].title}. `;
    }
  });

  if (countValid === data.length) {
    message = "success";
  }
  return message;
}

function setTable(tableName) {
  if (tableName === "categories") {
    return Object.values(types[0]);
  } else if (tableName === "layers") {
    return Object.values(types[1]);
  } else if (tableName === "users") {
    return Object.values(types[2]);
  } else {
    return {
      valid: false,
      message: "No valid table.",
    };
  }
}

function avoidingStringify(element) {
  if (element !== null) {
    if (
      !isNaN(element) &&
      typeof element !== "boolean" &&
      element.toString().trim() !== ""
    ) {
      element = parseInt(element);
    } else if (element === "true" || element === "false") {
      let value = element;
      element = Boolean(element);
      if (value === "false") {
        element = false;
      }
    }
    return element;
  }
  return element;
}
