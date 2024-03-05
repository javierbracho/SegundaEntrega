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



routerc.get("/api/carts/:cid", async (req,res) => {
    let cid = req.params.cid
    try {
        const carrito = await cartManager.getCartByID(cid)
        const carritoFinal = carrito.Products.map(productos => {
            const {...rest} = productos.toObject()
            return rest
        })
        if (carrito) {
            res.render("cart", { 
                carritoFinal, 
                carritoID: carrito._id });
            console.log(carrito)
        } else {
            res.json ( {
                error: "Producto no encontrado"
            })
        }
    } catch (error) {
        console.log("no se encontraron productos", error)
    }

})

export default routerc