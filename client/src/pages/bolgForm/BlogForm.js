import styles from "./BlogForm.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector } from "../../redux/loaderReducer";
import { errorSelector, clearError } from "../../redux/errorReducer";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { createBlogApiAsync, editBlogApiAsync, getOneBlogApiAsync } from "../../redux/blogReducer";

export default function BlogForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        imageUrl: "",
    });

    const dispatch = useDispatch();
    const { loading } = useSelector(loadingSelector);
    const { errorMessage } = useSelector(errorSelector);
    const navigate = useNavigate();
    const location = useLocation();
    const { blogId } = useParams();

    const [isUpdateBlogs, setIsUpdateBlogs] = useState(false);


        // ======= showing error toast if any login error ======//
        useEffect(() => {
            if (errorMessage) {
              toast.error(errorMessage);
              const timer = setTimeout(() => {
                dispatch(clearError());
              }, 3000);
        
              return () => clearTimeout(timer);
            }
          }, [errorMessage, dispatch]);


    useEffect(() => {
        if (location.pathname === `/blog/edit-blog/${blogId}`) {
            setIsUpdateBlogs(true);
            dispatch(getOneBlogApiAsync({ blogId })).then((result) => {
                if (result.type === "blog/getOneBlogApi/fulfilled") {
                    setFormData({
                        title: result.payload.title,
                        description: result.payload.description,
                        imageUrl: result.payload.imageUrl,
                    });
                }
            });
        }else{
            setIsUpdateBlogs(false);
            clearInput()
        }
    }, [location.pathname, dispatch, blogId]);

    async function handleBlogFormSubmit(e) {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.imageUrl) {
            toast.error("Please fill all input fields!");
            return;
        }

        try {
            if (isUpdateBlogs) {
                const result = await dispatch(editBlogApiAsync({
                    blogId,
                    ...formData,
                }));
                if (result.type === 'blog/editBlogApi/fulfilled') {
                    toast.success("Blog updated successfully");
                    navigate(`/blog/blogDetails/${blogId}`);
                }
            } else {
                const result = await dispatch(createBlogApiAsync({
                    title: formData.title,
                    description: formData.description,
                    imageUrl: formData.imageUrl,
                }));
                if (result.type === 'blog/createBlogApi/fulfilled') {
                    toast.success("New blog added successfully");
                    clearInput();
                    navigate("/");
                }
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    function clearInput() {
        setFormData({
            title: "",
            description: "",
            imageUrl: ""
        });
    }

    return (
        <div className={styles.blogFormContainer}>
            <form onSubmit={handleBlogFormSubmit} className={styles.blogForm}>
                <h2>{isUpdateBlogs ? "Update Blog" : "Add New Blog"}</h2>

                <div className={styles.formControl}>
                    <label htmlFor="title">Title</label>
                    <input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        type="text"
                        id="title"
                        placeholder="Title..."
                    />
                </div>

                <div className={styles.formControl}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        id="description"
                        placeholder="Description..."
                        rows="3"
                    />
                </div>

                <div className={styles.formControl}>
                    <label htmlFor="image">Image</label>
                    <input
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        id="image"
                        placeholder="Image URL..."
                    />
                </div>

                <button className={styles.button} type="submit" disabled={loading}>
                    {loading ? <ClipLoader size={15} color={"#fff"} /> : isUpdateBlogs ? "Edit Blog" : "Add Blog"}
                </button>
            </form>
        </div>
    );
}
