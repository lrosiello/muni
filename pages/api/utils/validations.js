import { query } from "../../../lib/db";

//VERIFIES THAT DATA FROM BODY IS FILLED
export function areAllDataFilled(array) {
  let countValid = 0;
  array.map((element, index) => {
    const validationElement = element;
    if (element !== null && element !== undefined){
      if(validationElement.toString().trim() !== ""){
        countValid++;
      }
    }
  });
  if (countValid === array.length) {
    return true;
  } else {
    return false;
  }
}

//FIX SPACES OF IMPORTANT DATA
export function fixSpaces(array) {
  let fixed = [];
  array.map((element, index) => {
    if(element !== null && element !== undefined){
      const fixedElement = element.toString().trim();
      fixed.push(fixedElement);
    }else{
      fixed.push(element);
    }
  });
  return fixed;
}

//VERIFIES IF ANOTHER ELEMENT EXISTS
export async function isItExists(tableName, columnName, elementFromBody, idToCheck) {
  let queryText = `SELECT ${columnName} FROM ${tableName} WHERE ${columnName} = $1`;
  let verify;

  if (idToCheck) {
    queryText += ` AND id != $2`;
    verify = await query(queryText, [elementFromBody, idToCheck]);
  } else {
    verify = await query(queryText, [elementFromBody]);
  }

  return verify.rowCount > 0;
}

