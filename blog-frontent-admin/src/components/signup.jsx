import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const [user, setUser] = useState({
        username: "",
        password: "",
        email: ""
    })
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/users/register", user)

            //  Redirect to the dashboard
            navigate('/login')
        } catch (err) {
            setError(err.message)
        
        }
    }
    return (
        <div className="login-container">
            <form method="POST" className="login-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
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
                <label htmlFor="email"></label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="someone@example.com" 
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
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
            <button type="submit" className="btn btn-red">Sign Up</button>
            </form>
        </div>
    )
}