import mongoose from "mongoose";


const connectMongodb = async()=>{
    try{
        await mongoose.connect(`${process.env.DB_URL}/blogApp`)
        console.log("Mongodb is connected")

    }catch(error){
        console.log("error in connecting mongodb: ", error);
    }
}


export default connectMongodb;