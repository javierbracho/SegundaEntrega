import mongoose from "mongoose";
import ProductModel from "./product.js"

const CartSchema = new mongoose.Schema({
    Products: [
        {
            Product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products", // Nombre del modelo de Producto
                required: true,
            },
            Quantity: {
                type: Number,
                required: true
            }
        }
    ]
});


const CartModel = mongoose.model("Carts", CartSchema)

export default CartModel