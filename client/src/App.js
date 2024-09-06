import React,{useEffect} from 'react';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home/HomePage';
import BlogForm from './pages/bolgForm/BlogForm';
import LoginForm from './pages/authForm/LoginForm';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './utils/ProtectedRoutes';
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoginAsync } from './redux/authReducer';
import BlogDetails from './pages/blogDetails/BlogDetails';


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkIsLoginAsync());

  },[dispatch])


  //====== configure router ==========//
  const router = createBrowserRouter([
    {path:"/", element:<Navbar />, 

        children:[
          {index:true, element:<HomePage />},

          {path:"blog/add-blog", element:<ProtectedRoute> <BlogForm /> </ProtectedRoute>},

          {path:"blog/edit-blog/:blogId", element:<ProtectedRoute> <BlogForm/> </ProtectedRoute>},

          {path:"blog/blogDetails/:blogId", element:<ProtectedRoute> <BlogDetails /> </ProtectedRoute>},

          {path:"users/signin", element:<LoginForm />},
          
          {path:"users/signup", element:<LoginForm />},

          
        ]
    }
  ])



  return (
   <div className='App'>
      <RouterProvider router={router} />
      <ToastContainer className="custom-toast-container"/>
   </div>
  );
}

export default App;
