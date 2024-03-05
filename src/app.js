import Express  from "express";
import  ExpressHandlebars  from "express-handlebars";
import multer from "multer";
import database from "./database.js"
import router from "../src/routes/products.router.js"
import routerc from "../src/routes/carts.router.js"
import routerm from "../src/routes/views.router.js"
import { Server } from "socket.io";
import messagesModel from "./models/messages.js";

const app = Express ()
const PUERTO = 8080

app.use(Express.json())
app.use(Express.urlencoded({extended:true}))
app.use(Express.static("./src/public"))

app.engine("handlebars", ExpressHandlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", router)
app.use("/", routerc)
app.use("/", routerm)

const HttpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
  });

const io = new Server (HttpServer)  

io.on("connection", async (socket) => {
  console.log("Se conectó un usuario");


  const messages = await messagesModel.find();
  socket.emit("messages", messages);

  socket.on("message", async (data) => {
    await messagesModel.create(data);
    const updatedMessages = await messagesModel.find();
    io.sockets.emit("messages", updatedMessages);
  });
});