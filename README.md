# Full Stack Blogs Application

This is a Full Stack Blogs Application built using React, Redux, and React Router DOM for the frontend, and Node.js, Express, and MongoDB for the backend. It features user authentication with JWT tokens and provides CRUD operations for managing blogs.

## Features

- User Signup, Signin, and Logout
- JWT-based authentication
- Create, Read, Update, and Delete (CRUD) operations for blogs
- Search functionality for blogs
- Only the creator of a blog can edit or delete it

## Project Structure

- **Backend**: Node.js, Express, MongoDB, JWT Authentication
- **Frontend**: React, Redux, React Router DOM
- **Middleware**: JWT Authentication, CORS

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/suranjit231/blog-posting-app-MERN.git
   ```
2. **Navigate to the backend directory:**
    ```cd backend```

3. **Install the required packages:**
    ```npm install```

4. **Set up the environment variables:**
    -Create a .env file in the backend directory and add the following variables (if .env file not present):
    ```
    PORT=5000
    DB_URL=mongodb://localhost:27017
    JWT_SECRET=HMMI8ygIrtW8ym8qGzvv60is5W8DqQgH
    ```
5. Configure CORS for frontend access:
    -In server.js, add the following code to set up CORS if your frontend is running on a different port:
    ```
    const cors = require('cors');
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    ```
6. Start the backend server:
    ```node server.js```
7. The backend server will run on http://localhost:5000.

### Frontend Setup

1. **Open a new terminal and navigate to the client directory:**
    ```cd client```

2. **Install the required packages:**
    ```npm install```

3. **Configure the frontend Axios requests:**
    -In client/src/redux/authReducer.js, ensure the backend URL is correctly set. If you've changed the backend port, update the Axios base URL:
    ```
    import axios from "axios"; 
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:5000';
    ```

4. **Start the frontend application:**
    ```npm start```

### Usage

1. **Signup and Login:**
    -Open the frontend application in your browser at http://localhost:3000.
    -If you don't have an account, click on "Signup" to create one.
    -After signing up, log in with your credentials.

2. **Managing Blogs:**
    -Once logged in, you will be redirected to the blogging page where you can add new blogs.
    -Only the user who created a blog can edit or delete it.

3. **Searching Blogs:**
    -Use the search functionality to find blogs by keywords.

## API Routes

### User Routes
```
| Route       | Method | Description                |
|-------------|--------|----------------------------|
| `/signup`   | POST   | User signup                |
| `/signin`   | POST   | User signin                |
| `/logout`   | GET    | User logout                |
| `/isLogin`  | GET    | Check if user is logged in |
```
### Blog Routes
```
| Route               | Method | Description               |
|---------------------|--------|---------------------------|
| `/addBlog`          | POST   | Add a new blog            |
| `/editBlog/:blogId` | PUT    | Edit an existing blog     |
| `/deleteBlog/:blogId` | DELETE | Delete a blog           |
| `/getAll`           | GET    | Get all blogs             |
| `/getOne/:blogId`   | GET    | Get a single blog by ID   |
| `/searchBlogs`      | GET    | Search blogs by keywords  |
```
