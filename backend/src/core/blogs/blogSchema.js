import mongoose from "mongoose";


const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true,
    },

    imageUrl:{
        type:String,
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;