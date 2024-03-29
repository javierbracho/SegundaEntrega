import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    Products: [
        {
            Product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            Quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

CartSchema.pre("findOne", function (next) {
    this.populate("Products.Product", "_id title price");
    next()
})

const CartModel = mongoose.model("Carts", CartSchema)

export default CartModel