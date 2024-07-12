import { Routes, Route, Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Posts from './components/Posts';
import ViewPost from './components/ViewPost';
import Login from './components/Login';
import SignUp from './components/SignUp';

export default function App() {

  return (
    <div className='app'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/articles' element={<Posts />}/>
        <Route path='/articles/:postId' element={<ViewPost />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )

}