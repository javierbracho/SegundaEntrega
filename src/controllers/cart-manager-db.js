import CartModel from "../models/cart.js";

class CartManager {
    async cartCreate  () {
        try {
            const newCart = new CartModel ( {products: []})
             await newCart.save ()
             return newCart 

        } catch (error) {
            console.log("Error al crear un nuevo carrito", error)
            throw error
        }
    }
    async getCartByID(id) {
    try {
        const carrito = await CartModel.findById(id).populate('Products.Product');
        if (!carrito) {
            console.log("Carrito buscado no existe");
            return null;
        }
        return carrito;
    } catch (error) {
        console.log("Error al obtener un nuevo carrito", error);
        throw error;
    }
}

    async addProductForCart(cartId, productId, Quantity = 1, res) {
        try {
            const carrito = await this.getCartByID(cartId);
    
            if (!carrito) {
                throw new Error("Carrito no encontrado");
            }
    
            const existeProducto = carrito.Products.find(p => p.Product.toString() === productId);
            if (existeProducto) {
                existeProducto.Quantity += Quantity;
            } else {
                carrito.Products.push({ Product: productId, Quantity });
            }
    
            await carrito.save();
            return carrito;
        } catch (error) {
            console.error("Error al agregar productos:", error.message);
            res.status(404).json({ error: "Carrito no encontrado" });
            throw error;
        }
    }
    
}

export default CartManager