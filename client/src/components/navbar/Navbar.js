import styles from "./Navbar.module.css";
import { Outlet, Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, logoutApiAsync } from "../../redux/authReducer";
import { toast } from "react-toastify";
import { searchBlogApiAsync } from "../../redux/blogReducer";


export default function Navbar() {
    const [theme, setTheme] = useState("light");
    const [isSearchBar, setSearchBar] = useState(false);
    const [ searchText, setSearchText ] = useState("");
    const searchInputRef = useRef();
    const { isLoggedIn } = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    }

    function toggleSearchBar(){
        setSearchBar(prev => !prev);
        setTimeout(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, 300); // Delay focus until after animation
    }

      //======= search the todo implemnts here =====//
      useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchText) {
    
                dispatch(searchBlogApiAsync({searchText:searchText}));
            }
        }, 300); 
    
        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);


    //===== function handle click logout =========//
    function handleClickLogout(){
        dispatch(logoutApiAsync());
        toast.success("logout sucessfully!");
    }

    return (
        <>
            <div className={styles.navbarContainer}>
                {!isSearchBar ? (
                    <>
                        <div className={styles.leftNavbar}>
                            <p className={styles.logo}>
                                <Link to={"/"} className={styles.logo}>Blog Post</Link>
                            </p>
                        </div>
                        <div className={styles.rightNavbar}>

                            <div
                                className={`${styles.themeButtonDiv} ${
                                    theme === "dark" ? styles.dark : ""
                                }`}
                                onClick={toggleTheme}>
                                <span></span>
                            </div>


                            <IoSearchSharp 
                                onClick={toggleSearchBar} 
                                className={styles.searchIcons} 
                            />

                        {isLoggedIn ? <>
                            
                            <Link className={styles.addBlogLink} to={"/blog/add-blog"}>
                                <p >Add Blog</p>
                            </Link>

                            <p onClick={()=>handleClickLogout()} className={styles.logoutBtn}>Logout</p>

                        
                        </>:(  
                            <Link className={styles.addBlogLink} to={"/users/signin"}>
                              <p >Login</p>
                          </Link>

                        )}
                           
                          
                            
                            
                        </div>
                    </>
                ) : null}


                    <div className={`${styles.searchDiv} ${isSearchBar ? styles.active : ""}`}>
                        <IoIosArrowRoundBack 
                            onClick={toggleSearchBar} 
                            className={`${styles.backIcons} ${isSearchBar ? styles.active : ""}`}
                        />
                        <input onChange={(e)=>setSearchText(e.target.value)}
                         type="text" ref={searchInputRef} placeholder="Search..." />


                        <IoSearchSharp className={`${styles.inputSearchIcon} ${isSearchBar ? styles.active : ""}`}/>
                    </div>


            </div>
            <Outlet />
        </>
    );
}
