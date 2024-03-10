import  express  from "express";
import  ProductManager  from "../controllers/product-manager-db.js";

const router = express.Router()
const productManager = new ProductManager();


router.get("/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || undefined;
        const sort = req.query.sort || "";
        const category = req.query.category || "";
        const page = req.query.page || 1; 

        const productos = await productManager.getProducts(sort, category, limit, page); 
        console.log(productos)

        const productosFinal = productos.docs.map(producto => {
            const { ...rest } = producto.toObject();
            return rest
        });


        res.render("products", {
            status: "success", // Estado de éxito
            payload: productosFinal,
            totalPages: productos.totalPages,
            prevPages: productos.prevPages,
            nextPages: productos.nextPages,
            pages: productos.page,
            hasPrevPages: productos.hasPrevPage,
            hasNextPages: productos.hasNextPage,
            prevLink: productos.prevPage,
            nextLink: productos.nextPage,
            limit: productos.limit,
        });
    } catch (error) {
        console.log("Error al buscar productos:", error);
        res.render("products", {
            status: "error", // Estado de error
            error: "Error al buscar productos"
        });
    }
});

router.get("/api/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || undefined;
        const sort = req.query.sort || "";
        const category = req.query.category || "";
        const page = req.query.page || 1; 

        const productos = await productManager.getProducts(sort, category, limit, page); 
        console.log(productos)

        const productosFinal = productos.docs.map(producto => {
            const { ...rest } = producto.toObject();
            return rest
        });


        res.json( {
            status: "success", // Estado de éxito
            payload: productosFinal,
            totalPages: productos.totalPages,
            prevPages: productos.prevPages,
            nextPages: productos.nextPages,
            pages: productos.page,
            hasPrevPages: productos.hasPrevPage,
            hasNextPages: productos.hasNextPage,
            prevLink: productos.prevPage,
            nextLink: productos.nextPage,
            limit: productos.limit,
        });
    } catch (error) {
        console.log("Error al buscar productos:", error);
        res.render("products", {
            status: "error", // Estado de error
            error: "Error al buscar productos"
        });
    }
});


router.get("/api/products/:pid", async (req, res) => {
    let pid = req.params.pid
    try {
        const producto = await productManager.getProductById(pid);
        if (producto) {
            res.json(producto)
        } else {
            res.json ({ 
                error: "Producto no encontrado"
            })
        }
    } catch (error) {
        console.log("no se encontraron productos", error)

    }
})

router.post("/api/products", async (req, res) => {
    const nuevoProducto = req.body
    try {
        await productManager.addProduct(nuevoProducto)
        res.status(201).json({message: "Producto agregado de forma correcta"})
    } catch (error) {
        console.log("error al agregar producto", error)
        res.status(500).json({message: "error al agregar producto"})
    }
})

router.put ("/api/products/:pid", async (req,res) => {
    let id = req.params.pid;
    const productoActualizado = req.body;
    try {
        await productManager.updateProduct (id, productoActualizado)
        res.json({message:"Producto actualizado de manera correcta"})
    } catch (error) {
        console.log("No se pudo actializar los productos");
        res.status(500).json({message: "error al actualizar producto"})
    }
})

router.delete ("/api/products/:pid", async(req, res) => {
    let id = req.params.pid;
    try {
        await productManager.deleteProduct(id)
        res.json ({message: "Producto eliminado de forma correcta"})
    } catch (error) {
        console.log("No se pudo eliminar el producto")
        res.status(500).json({message:"error al eliminar el producto"})
        
    }

})

export default router