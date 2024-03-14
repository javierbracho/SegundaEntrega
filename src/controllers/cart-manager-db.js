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

    async updateCart (cartId, ActualizarProductos) {
        try {
            const cart = await CartModel.findById(cartId)
                if(!cart) {
                    throw new error ("carrito no encontrado")
                }

                cart.Products = ActualizarProductos;
                cart.markModified("Products");
                await cart.save();
                return cart
        } catch (error) {
            console.error ("Error al actualizar carrito", error);
            throw error
        }
    }

    async updateQuantityProduct (cartId, productId, newQuantity) {
        try {
            const carrito = await CartModel.findById(cartId)
            const existeProducto = carrito.Products.find(p => p._id.toString() === productId);
            if(existeProducto) {
                existeProducto.Quantity = newQuantity
            }
            carrito.markModified('Products')
            await carrito.save()
            return carrito
        } catch (error) {
            console.error("Error al agregar cantidades al producto:", error.message);
            res.status(404).json({ error: "error en el servidor" });
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






    async deleteProductForCart(cartId, productId, res) {
        try {
            const cart = await CartModel.findById(cartId);
    
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
    
            cart.Products = cart.Products.filter(item => item.Product.toString() !== productId);
    
            await cart.save();
            
            return cart;
    
        } catch (error) {
            console.error("Error al eliminar producto:", error.message);
            if (res) {
                res.status(404).json({ error: "Error al eliminar el producto" });
            }
            throw error;
        }
    }
    
    async vaciarCarrito(cartId) {
        try {
            const cart = await CartModel.findByIdAndUpdate(
                cartId,
                { Products: [] },
                { new: true },
            );
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            return cart
        } catch (error) {
            console.log("Error al vaciar el carrito:", error.message);
            throw error;
        }
    }
    
    
    
}

export default CartManager