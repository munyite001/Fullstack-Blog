import { useEffect, useState } from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import { Routes, Route, Link, useLocation, NavLink, useNavigate } from "react-router-dom"
import jwtDecode from "jwt-decode"
import DropDownMenu from "./components/DropDownMenu"
import Posts from "./components/Posts"
import Users from "./components/Users"
import Login from "./components/Login"
import SignUp from "./components/signup"
import CreatePost from "./components/CreatePost"

export default function App () {

  const location = useLocation()
  const navigate = useNavigate()

  // Hide drop down menu paths
  const hideDropDownMenuPaths = ["/posts/create", "/login", "/signup"]

  //  Check if the current path is in the array of paths
  const hideDropDownMenu = hideDropDownMenuPaths.includes(location.pathname)

  const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.reload()
  }

  //  Function to check if the token has expired
  const isTokenExpired = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      return true;
    }

    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000   //  Convert the current time to seconds

    //  Check if the token has expired
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token")
      return true;
    }
    
    return false;
  
  };

  //  Check if the token has expired
  useEffect(() => {
    if (isTokenExpired) {
      navigate("/login")
    }
  }, [location, navigate])

  return (
    <>
      <div className="app">
        {!hideDropDownMenu && <div className="header">
          <h1>Dashboard</h1>
          {
            window.innerWidth > 768 &&
            <ul className="nav-links">
              <li>
                <NavLink style={({ isActive }) => ({ color: isActive ? "#f55e18" : "black" })} to="/posts">Posts</NavLink>
              </li>
              <li>
                <NavLink style={({ isActive }) => ({ color: isActive ? "#f55e18" : "black" })} to="/users">Users</NavLink>
              </li>
              <li>
                <NavLink style={({ isActive }) => ({ color: isActive ? "#f55e18" : "black" })} to="/comments">Comments</NavLink>
              </li>
              <li>
                <NavLink style={({ isActive }) => ({ color: isActive ? "#f55e18" : "black" })} to="/analytics">Analytics</NavLink>
              </li>
            </ul>
          }
          <div className="control-btns">
            <button className="btn">
              <Link to="/posts/create">
                Create Post
              </Link>
            </button>
            <button className="btn" 
              style={{margin: "0 0.5rem"}}
              onClick={handleLogout}
              >Logout</button>

          </div>
        </div>}
      {window.innerWidth < 768 && !hideDropDownMenu && <DropDownMenu />}
      <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Posts />}/>
            <Route path="/posts">
                <Route index element={<Posts />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="edit/:postId" element={<CreatePost />} />
            </Route>
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        </div>
    </>
  )
}