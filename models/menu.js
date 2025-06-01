import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  S_No: Number,
  Course_Type: String,
  Classification: String,
  Cuisine: String,
  Dish_Name: String,
  Remarks: String,
}, { strict: false });

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema, "menus");
export default Menu; 