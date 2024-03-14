import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new mongoose.Schema({
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      thumbnail: {
         type: String,
         required: true,
      },
      code: {
         type: String,
         unique: true,
         required: true
      },
      stock: {
         type: Number,
         required: true
      },
      status: {
         type: Boolean,
         required: true,
      },     
      category: {
         type: String,
         required: true,
   }
})

ProductSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model("Products", ProductSchema)

export default ProductModel