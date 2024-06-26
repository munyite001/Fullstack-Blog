import { useState } from "react"
import ProtectedRoute from "./components/ProtectedRoute"
import { Routes, Route, Link, useLocation, NavLink } from "react-router-dom"
import DropDownMenu from "./components/DropDownMenu"
import Posts from "./components/Posts"
import Users from "./components/Users"
import Login from "./components/Login"
import SignUp from "./components/signup"
import CreatePost from "./components/CreatePost"

export default function App () {

  const location = useLocation()

  // Hide drop down menu paths
  const hideDropDownMenuPaths = ["/posts/create", "/login", "/signup"]

  //  Check if the current path is in the array of paths
  const hideDropDownMenu = hideDropDownMenuPaths.includes(location.pathname)

  const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.reload()
  }

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