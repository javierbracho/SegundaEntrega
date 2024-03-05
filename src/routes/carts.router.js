import  express  from "express";
import  CartManager  from "../controllers/cart-manager-db.js";

const routerc = express.Router ()

const cartManager = new CartManager ()

routerc.post("/api/carts", async (req, res) => {
    try {
        await cartManager.cartCreate()
        res.status(201).json({message: "Producto agregado de forma correcta"})
    } catch (error) {
        console.log("error al agregar producto", error)
        res.status(500).json({message: "error al agregar producto"})
    }
})

routerc.post("/api/carts/:cid/products/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const quantity = 1;

    try {
        const actualizarProducto = await cartManager.addProductForCart(cid, pid, quantity, res);
        res.json(actualizarProducto.Products);
    } catch (error) {
        console.log("error al agregar producto", error);
        res.status(500).json({ message: "error al agregar producto" });
    }
});



routerc.get("/api/carts/:cid", async (req, res) => {
    let cid = req.params.cid;
    try {
        const carrito = await cartManager.getCartByID(cid);
        if (carrito && carrito.Products && carrito.Products.length > 0) {
            
            const carritoFinal = carrito.Products.map(producto => {
                if (producto) {
                    const { ...rest } = producto.toObject();
                    return rest;
                }
            });
             console.log("Carrito final:", carritoFinal);
            res.render("cart", {
                carritoFinal,
                carritoID: carrito._id
            });
        } else {
            res.json({
                error: "Carrito no encontrado o sin productos"
            });
        }
    } catch (error) {
        console.log("No se encontraron productos", error);
        res.status(500).json({
            error: "Error al obtener el carrito"
        });
    }
});

export default routerc