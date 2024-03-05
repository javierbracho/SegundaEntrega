import  express  from "express";

const routerm = express.Router()

routerm.get ("/", async (req, res) => {
    res.render ("chat")
})

export default routerm