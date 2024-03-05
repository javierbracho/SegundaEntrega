import CartModel from "../models/cart.js";
import ProductModel from "../models/product.js"

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
            return await CartModel.findById(id).populate('Products');
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
    
            let existeProducto = carrito.Products.find(p => p.Product && p.Product.toString() === productId);
    
            if (existeProducto) {
                existeProducto.Quantity += Quantity;
            } else {
                const product = await ProductModel.findById(productId);
                if (!product) {
                    throw new Error("Producto no encontrado");
                }
                carrito.Products.push({ Product: product, Quantity });
            }
    
            await carrito.save();
            return carrito;
        } catch (error) {
            console.error("Error al agregar productos:", error.message);
            res.status(404).json({ error: error.message });
            throw error;
        }
    }
    
    
    
}

export default CartManager