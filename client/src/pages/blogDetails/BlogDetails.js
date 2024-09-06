import styles from "./BlogDetails.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { blogSelector, deleteBlogsApiAsync, getOneBlogApiAsync } from "../../redux/blogReducer";
import { loadingSelector } from "../../redux/loaderReducer";
import { errorSelector, clearError } from "../../redux/errorReducer";
import { authSelector } from "../../redux/authReducer";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaHeart } from "react-icons/fa";

export default function BlogDetails() {
    const { loading } = useSelector(loadingSelector);
    const { errorMessage } = useSelector(errorSelector);
    const { user } = useSelector(authSelector);
    const { blogId } = useParams();
    const dispatch = useDispatch();
    const [blog, setBlog] = useState(null);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(clearError());
        }
    }, [errorMessage, dispatch]);

    useEffect(() => {
        async function getDetails() {
            const result = await dispatch(getOneBlogApiAsync({ blogId }));
            if (result.type === "blog/getOneBlogApi/fulfilled") {
                setBlog(result.payload);
            }
        }
        getDetails();
    }, [dispatch, blogId]);

    const handleDelete = async () => {
        await dispatch(deleteBlogsApiAsync({ blogId }));
        toast.success("Blog deleted successfully");
        navigate("/");
    };

    const handleLike = () => {
        setLiked(!liked);
    };


    //====== handle editButton click ========//
    function handleEditBtnClick(blogId){
        navigate(`/blog/edit-blog/${blogId}`);

    }

    if (loading) {
        return <ClipLoader className='loader' size={50} color={"#123abc"} />;
    }

    return (
      <>

      {blog && (
        <div className={styles.blogDetailsContainer}>

        <div className={styles.blogImageBox}>
          {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className={styles.blogImage} />}
          <h1 className={styles.blogTitle}>{blog.title}</h1>

        </div>

        <div className={styles.rightBolgDetails}>

          <div className={styles.blogContent}>{blog.description}</div>
          <div className={styles.actionsContainer}>
              <FaHeart
                  className={styles.heartIcon}
                  onClick={handleLike}
                  style={{ color: liked ? "red" : "gray" }}
              />
              {blog.user === user._id && (
                  <>
                      <FaEdit className={styles.iconButton} onClick={() => handleEditBtnClick(blog._id)} />
                      <FaTrash className={styles.iconButton} onClick={handleDelete} />
                  </>
              )}
          </div>

        </div>
        
    </div>
      )}
        
   </> );
}
