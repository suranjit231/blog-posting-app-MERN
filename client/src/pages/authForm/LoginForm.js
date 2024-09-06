import React, {useState, useEffect} from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { useSelector, useDispatch} from "react-redux";
import { errorSelector, clearError } from '../../redux/errorReducer';
import { loadingSelector } from '../../redux/loaderReducer';
import { signinApiAsync, signupApiAsync, authSelector } from '../../redux/authReducer';
import { ClipLoader } from "react-spinners";

import { toast} from "react-toastify";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const { loading } = useSelector(loadingSelector);
  const {errorMessage} = useSelector(errorSelector);
  const {isLoggedIn} = useSelector(authSelector);


  const dispatch = useDispatch();
  const navigate = useNavigate();
 const location = useLocation();
 const from = location.state?.from?.pathname || "/";


  
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


  //========= if loggedIn successfully then redirect to the home page ====//
  useEffect(() => {
    if (isLoggedIn) {
        navigate(from, { replace: true });
    }
}, [isLoggedIn, navigate, from]);


  useEffect(()=>{
    if(location.pathname==='/users/signup'){
      setIsSignup(true);
    }else{
      setIsSignup(false);
    }

  },[location.pathname]);


  //======= function auth form submit ===========//
 async function handleAuthFormSubmit(e){
    e.preventDefault();

    if(isSignup){
      if(!name || !email || !password){
        toast.error("Please fill all input fields!")
        return;

      }

      const result = await dispatch(signupApiAsync({name:name, email:email, password:password}));
      if(result.type==='auth/signupApi/fulfilled'){
        toast.success("signup sucessfully!");
        clearInput();
        setIsSignup(false);
      }


    }else{
      if(!email || !password){
        toast.error("Please fill all input fields!")
        return;

      }

      const result = await dispatch(signinApiAsync({email:email, password:password}));
   
      if(result.type==="auth/signinApi/fulfilled"){
        console.log("result: ", result);
        toast.success("Login sucessfully");
        clearInput();
      }

      
    }


  }


  function clearInput(){
    setName("");
    setEmail("");
    setPassword("");
  }



  return (
    <div className={styles.container}>
      <form onSubmit={handleAuthFormSubmit}
      
      className={styles.form}>
        <h2 className={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {isSignup && (
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)}
             type="text" id="name" className={styles.input} />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)}
           type="email" id="email" className={styles.input} />
        </div>


        <div className={styles.inputGroup}>

          <label htmlFor="password" className={styles.label}>Password</label>

          <input value={password} onChange={(e)=>setPassword(e.target.value)}
          type="password" id="password" className={styles.input} />

        </div>
        
        {/* <button type="submit" className={styles.button}>
          {isSignup ? 'Sign Up' : 'Login'}
        </button> */}

        <button className={styles.button} type="submit" disabled={loading}>
              {loading ? <ClipLoader size={15} color={"#fff"} /> : isSignup ? 'Sign Up' : 'Login'}
       </button>
        
        <div className={styles.switchForm}>
          {isSignup ? (
            <p>
              Already have an account? <Link to="/users/signin" className={styles.link}>Login here</Link>
            </p>
          ) : (
            <p>
              Don't have an account? <Link to="/users/signup" className={styles.link}>Sign up here</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
