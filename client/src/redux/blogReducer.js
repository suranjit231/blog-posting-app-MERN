import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading, clearLoading} from "./loaderReducer";
import { setError } from "./errorReducer";
import axios from "axios";


const initialState = {
    loadingBlogs:false,
    blogs:[],
    blogError:null
}


export const createBlogApiAsync = createAsyncThunk("blog/createBlogApi",
    async(arg, thunkApi)=>{
        try{
            thunkApi.dispatch(setLoading());
            const res = await axios.post("/api/blogs/addBlog", arg, {withCredentials:true});

            console.log("res.data for create blogs api: ", res.data);
            return res.data;
        }catch(error){
            thunkApi.dispatch(error.response.data.message)
            return thunkApi.rejectWithValue(error.response.data.message);

        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)

//======== get all blogs ==============//
export const getAllBlogsApiAsync = createAsyncThunk("blog/getAllBlogsApi",
    async(arg, thunkApi)=>{
        try{
            thunkApi.dispatch(setLoading());
            const res = await axios.get("/api/blogs/getAll");
            console.log("res.data for get All blogs api: ", res.data);

            return res.data.blogs;

        }catch(error){
            thunkApi.dispatch(error.response.data.message)
            return thunkApi.rejectWithValue(error.response.data.message);
        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)

//======= get one blog api call ===========//
export const getOneBlogApiAsync = createAsyncThunk("blog/getOneBlogApi", 
    async(arg, thunkApi)=>{
        try{

            thunkApi.dispatch(setLoading());
            const { blogId } = arg;
            const res = await axios.get(`/api/blogs/getOne/${blogId}`);

            return res.data.blog;
        }catch(error){
            thunkApi.dispatch(error.response.data.message)
            return thunkApi.rejectWithValue(error.response.data.message);

        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)


//======== delete blogs api call ==========//
export const deleteBlogsApiAsync = createAsyncThunk("blog/deleteBlogApi",
    async(arg, thunkApi)=>{
        try{

            const { blogId } = arg;
            thunkApi.dispatch(setLoading());
            const res = await axios.delete(`/api/blogs/deleteBlog/${blogId}`, {withCredentials:true});

            console.log("res.data for delete blogs api: ", res.data);
            return blogId;

        }catch(error){
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);

        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)

//======== edit blogs api async for editing the blogs ===========================//
export const editBlogApiAsync = createAsyncThunk("blog/editBlogApi",
    async(arg, thunkApi)=>{
        try{

            console.log("arg for editBlog: ", arg);

            const {blogId, ...updateableData} = arg;
            thunkApi.dispatch(setLoading());
            const res = await axios.put(`/api/blogs/editBlog/${blogId}`, updateableData, {withCredentials:true});

            console.log("res.data for edit blog api: ", res.data);

            return res.data.blog;


        }catch(error){
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);

        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)


//=========== search blogs api async ============================================//
export const searchBlogApiAsync = createAsyncThunk("blog/searchBlogApi",
    async(arg, thunkApi)=>{
        try{
            thunkApi.dispatch(setLoading());
            const {searchText } = arg;
            const res = await axios.get(`/api/blogs/searchBlogs`, {
                params: { q: searchText }, 
            });

          

            return res.data.blogs;
        }catch(error){
            thunkApi.dispatch(setError(error.response.data.message));
            return thunkApi.rejectWithValue(error.response.data.message);

        }finally{
            thunkApi.dispatch(clearLoading());
        }
    }
)


//======== create blog slice to manage the state and actions for  blogs ==========//
const blogSlice = createSlice({
    name:"blog",
    initialState:initialState,

    reducers:{},

    extraReducers:(builders)=>{
        builders
        //====== update state for add blogs when add blogsApi fullfilled ==========//
        .addCase(createBlogApiAsync.fulfilled, (state, action)=>{
            state.blogs.push({...action.payload});
        })

        //===== initialzed state regarding getAllBlogs Api ===============//
        .addCase(getAllBlogsApiAsync.fulfilled, (state, action)=>{
            state.blogs = [...action.payload];
        })

        //====== state for delete blogs ==================================//
        .addCase(deleteBlogsApiAsync.fulfilled, (state, action)=>{
            state.blogs = state.blogs.filter((blog)=>blog._id !== action.payload);
        })

        //====== state for edit blogs ====================================//
        .addCase(editBlogApiAsync.fulfilled, (state, action)=>{
            state.blogs=state.blogs.map((blog)=>{
                if(blog._id===action.payload._id){
                    blog={...action.payload}
                }

                return blog;
            })
        })

        //======= state for aecrch blogs ===================================//
        .addCase(searchBlogApiAsync.fulfilled, (state, action)=>{
            state.blogs = [...action.payload];
        })
    }
})


export const blogReducer = blogSlice.reducer;
export const blogActions = blogSlice.actions;
export const blogSelector = (state)=>state.blogReducer;