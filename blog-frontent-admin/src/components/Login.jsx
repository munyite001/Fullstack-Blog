import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [user, setUser] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/admin/login", user)
            const { token } = response.data

            //  Save the token to local storage
            localStorage.setItem("token", token)

            //  Redirect to the dashboard
            navigate('/posts')
        } catch (err) {
            if (err.response && err.response.status == 403) {
                setError("Access Denied. Admins only")
            } else {
                setError(err.message)
            }
        
        }
    }
    return (
        <div className="login-container">
            <form method="POST" className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            {error  && <p className="error">{error}</p>}
            <div className="input-box">
                <label htmlFor="username"></label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Username" 
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    />
            </div>
            <div className="input-box">
                <label htmlFor="password"></label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="password" 
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    />
            </div>
            <button type="submit" className="btn btn-red">Login</button>
            </form>
        </div>
    )
}