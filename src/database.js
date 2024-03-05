import mongoose from "mongoose";

    mongoose.connect("mongodb+srv://jbracho07:coderhouse@cluster0.sd6827y.mongodb.net/E-Commerce?retryWrites=true&w=majority")
        .then( ()=> console.log("estamos conectados a MongoDB"))
        .catch( error => console.log(error))


export default mongoose