function stringIdsToArrayNumbersIds(stringIds) {
  if (!stringIds || !stringIds.trim()) {
    // throw new Error("Input string is empty or contains only spaces.");
    return { ids: null, error: "Input string is empty or contains only spaces."}
  }
  // Split by commas, trim spaces, filter out empty strings
  const parts = stringIds.split(",").map(part => part.trim()).filter((p) => p !== "");

  // check for empty segments (like "1,,2" or "1, ,3")
  if (parts.some(p => p === "")) {
    // throw new Error("Invalid format: double commas or empty entries detected.");
    return { ids: null, error: "Invalid format: double commas or empty entries detected."}
  }

  // test if it's all numbers
  if (parts.some(p => !/^\d+$/.test(p))) {
    // throw new Error("Invalid format: all IDs must be numeric.");
    return { ids: null, error: "Invalid format: Only digits and commas are allowed."}
  }

  const ids = parts.map(Number);
  return { ids, error: null};
}

function getItemFromInventoryById(inventoryItems, id) {
  return inventoryItems.find(item => item.id === id) || null;
}



export { stringIdsToArrayNumbersIds, getItemFromInventoryById };
// // ✅ Step 1: Parse and validate the input
    // const array_itemsIds = formData.string_itemsIds
    //   ? formData.string_itemsIds
    //       .split(",")                   // split by comma
    //       .map(str => str.trim())       // remove spaces
    //       .filter(str => /^\d+$/.test(str)) // keep only numeric values
    //       .map(Number)                  // convert to numbers
    //   : [];