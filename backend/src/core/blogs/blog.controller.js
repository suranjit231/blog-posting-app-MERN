import BlogRepository from "./blog.repository.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";


//====== a cotroller class for communicate betweeen blog router and blog repository ======//
export default class BlogController{
    constructor(){
        this.blogRepository = new BlogRepository();
    }

    async getAllBlogs(req, res, next){
        try{
            const result = await this.blogRepository.getAllBlogs();

            return res.status(200).json(result);


        }catch(error){
            next(error);
        }

    }

    //====== function get one blog =========//
    async getOneBlog(req, res, next){

        try{

            const blogId = req.params.blogId;
            const result = await this.blogRepository.getOneBlogs(blogId);

            if(result){
                return res.status(200).json(result);
            }

        }catch(error){
            next(error);
        }
    }




    //===== create new blogs controller =====//
    async createNewBlog(req, res, next){
        const {title, description, imageUrl} = req.body;
        const userId = req.userId;

        try{
            const result = await this.blogRepository.createNewBlogs({title, description, imageUrl, userId});

            if(result){
                return res.status(201).json(result);
            }

        }catch(error){
            next(error);
        }

    }


    //======== update blogs ==========//
    async updateBlogs(req, res, next){
        try{
            const userId = req.userId;
            const blogId = req.params.blogId;

            const updateAbleData = req.body;

            const result = await this.blogRepository.updateBlogs(userId, blogId, updateAbleData);

            if(result){
                return res.status(200).json(result);
            }

        }catch(error){
            next(error);
        }
    }


    //======== delete the blogs =========//
    async deleteBlog(req, res, next){
        try{
            const userId = req.userId;
            const blogId = req.params.blogId;

            const result = await this.blogRepository.deleteBlog(blogId, userId);
            if(result){
                return res.status(200).json(result);
            }


        }catch(error){
            next(error);
        }
    }


    //========== function search blogs controller =========//
    async searchBlogs(req, res, next){
        try{
            const searchText = req.query.q;
           
            const blogs = await this.blogRepository.searchBlogs(searchText);
    
            if (blogs) {
                return res.status(200).json(blogs);
            }


        }catch(error){
            next(error);
        }
    }
}