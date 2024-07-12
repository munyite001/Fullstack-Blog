import axios from "axios"
import { useEffect, useState } from "react"
import { format } from 'date-fns';

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function Users() {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)

    //  Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${backendUrl}/users`, 
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                setUsers(response.data)
                setLoading(false)
            } catch(err) {
                console.log("Error Fetching Users")
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])


    return (
        <div className="users-container">
            <h2>Users</h2>
            {loading && 
                    <p>Loading...</p>
            }
            {users &&
                <ol className="users-list">
                    {users.map((user) => 
                        <div className="user-item" key={user._id}>
                            <li>{user.username}</li>
                            <div className="user-details">
                                <p>Date Joined: {format(new Date(user.created_at), 'PPpp')}</p>
                            </div>
                        </div>
                    )}
                </ol>
            }
            {!users && <p>Currently No Registered Users</p>}
        </div>
    )
}