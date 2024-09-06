import blogModel from "./blogSchema.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";
import userModel from "../users/userSchema.js";


//======== a repository class contains methods for database operations for blogs =======//
export default class BlogRepository{



    //====== get all blogs ==========//
    async getAllBlogs(){
        try{
            const blogs = await blogModel.find({});

            if(blogs?.length<1){
                return { success:false, message:"No blogs founds!", blogs:[]};

            }else{
                return { success:true, message:`Total ${blogs.length} founds!`, blogs:blogs};
            }

        }catch(error){
            throw error;
        }
    }

    //======== function get one blogs ========//
    async getOneBlogs(blogId){
        try{
            const blog = await blogModel.findOne({_id:blogId});

            if(!blog){
                throw new AppError("Blog not found!", 404);
            }

            return { success:true, blog:blog};
            
        }catch(error){
            throw error;
        }
    }


    //====== create new blogs =====//
    async createNewBlogs(blogsData){
        try{

            const newBlog = new blogModel({
                title:blogsData.title,
                description:blogsData.description,
                imageUrl:blogsData.imageUrl,
                user:blogsData.userId,
            });


            const savedBlog = await newBlog.save();
            const user = await userModel.findById(blogsData.userId);
            
            user.blogs.push(savedBlog._id);
            await user.save();

            return { success:true, message:"Now blogt is created", blog:savedBlog};


        }catch(error){
            throw error;
        }
    }


    //======= function for update blogs ============//
    async updateBlogs(userId,blogId, updateAbleData){
        try{
            const blog = await blogModel.findOne({_id:blogId});
            if(!blog){
                throw new AppError("blog not found!", 404);
            }

            if(userId.toString() !== blog.user.toString()){
                throw new AppError("You are not authorized to edit the blogs", 400);
            }

            for (let key in updateAbleData) {
                if (updateAbleData.hasOwnProperty(key)) {
                    blog[key] = updateAbleData[key];
                }
            }

            const updatedBlog = await blog.save();

            return { success: true, message: "Blog updated successfully", blog: updatedBlog };


        }catch(error){
            throw error;
        }

    }



    //====== Delete a blog =====//
    async deleteBlog(blogId, userId) {
        try {
            const blog = await blogModel.findOne({ _id:blogId, user:userId});

            if (!blog) {
                throw new AppError('Blog not found', 404);
            }

            // Remove blog reference from the user
            const user = await userModel.findById(blog.user);
            if (user) {
                user.blogs.pull(blogId);
                await user.save();
            }

            // Delete the blog
            await blogModel.findByIdAndDelete(blogId);

            return { success: true, message: "Blog deleted successfully", blog:blog };

        } catch (error) {
            throw error;
        }
    }


    //========== function search blogs =============//
    async searchBlogs(searchText){

        try{
            const blogs = await blogModel.find({
                $or: [
                    { title: new RegExp(searchText, 'i') },
                    { description: new RegExp(searchText, 'i') }
                ]
            })

            if (blogs.length < 1) {
                return { success: false, message: "No blogs found!", blogs:[] };

            }


            return { success:true, blogs:blogs};


        }catch(error){
            throw error;
        }
    }
}