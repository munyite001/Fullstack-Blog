import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function Login() {

    const [user, setUser] = useState({
        email:"",
        username: "",
        password: "",
    })
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendUrl}/users/register`, user)

            //  Redirect to the the login page
            navigate('/login')
        } catch (err) {
            if (err.response && err.response.status == 400) {
                setError("User already exists")
            } else {
                setError(err.message)
            }
        
        }
    }
    return (
        <div className="signup">
            <form method="POST" className="signup-form" onSubmit={handleSignup}>
            <h2>Sign Up</h2>
            {error  && <p className="error">{error}</p>}
            <div className="input-box">
                <label htmlFor="email"></label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    />
            </div>
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
                    placeholder="Password" 
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    />
            </div>
            <button type="submit" className="btn btn-red">Sign Up</button>
            </form>
        </div>
    )
}