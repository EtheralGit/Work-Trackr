// import mongoose model
import Done from "../models/donemodel.js";

(async () => {
  try {
    await Done.collection.dropIndex("title_1");
    console.log("Index 'title_1' dropped successfully.");
  } catch (error) {
    console.error("Error dropping index: ", error);
  }
})();
