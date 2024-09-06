import data from "../../data";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { FaHeart } from "react-icons/fa";
import { loadingSelector } from "../../redux/loaderReducer";
import { blogSelector, getAllBlogsApiAsync } from "../../redux/blogReducer";
import { errorSelector, clearError } from "../../redux/errorReducer";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { authSelector } from "../../redux/authReducer";
import { useNavigate } from "react-router-dom";



export default function HomePage(){
    const { blogs } = useSelector(blogSelector);
    const { loading } = useSelector(loadingSelector);
    const { errorMessage} = useSelector(errorSelector);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(authSelector);
    const navigate = useNavigate();

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

    //======= load all the blogs when this page loads ========//
    useEffect(()=>{
        dispatch(getAllBlogsApiAsync());

    },[dispatch]);


    //====== function handle click view details page ==========//
    function handleClickViewDetailsPage(blogId){
        if(!isLoggedIn){
            navigate("/users/signin");

        }else{

            navigate(`/blog/blogDetails/${blogId}`);
        }
    }


    return(
    <>

        { loading? <ClipLoader size={50} color="#0096FF" className="loader" />:
        blogs?.length<1?<h1>No Blogs is Founds</h1>:(
            <div className={styles.homePageContainer}>

            { blogs.length>0 && blogs.map((blog)=>(

            <div key={blog._id} className={styles.blogContainer}>
                <div className={styles.blogImageBox}>
                    <img src={blog.imageUrl} alt="blog" />
                </div>

                <div className={styles.blogFotterDiv}>
                    <p className={styles.blogTitle}>{blog.title}</p>

                    {/* <p className={styles.likeDiv} >
                        <FaHeart className={styles.likeIcons}/>
                        <span className={styles.likeCount}>5</span>
                    </p> */}

                
                    <button onClick={()=>handleClickViewDetailsPage(blog._id)}
                      className={styles.viewPostBtn}>View Post</button>
                </div>
            </div>



            ))}
                
        </div>

        )}
        

    </>
    )

}