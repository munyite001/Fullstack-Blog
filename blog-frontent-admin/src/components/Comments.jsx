import axios from "axios"
import { useEffect, useState } from "react"
import { format } from "date-fns"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function Comments() {
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(false)

    //  Fetch all comments
    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${backendUrl}/comments`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setComments(response.data)
                setLoading(false)
            } catch(err) {
                console.log("Error Fetching Comments")
                setLoading(false)
            }
        }
        fetchAllComments()
    }, [])

    return (
        <div className="comments-container">
            <h2>Comments</h2>
            {console.log(comments)}
            {loading && <p>Loading...</p>}
            {comments && 
                <ul className="comments-list">
                    {comments.map((comment) => 
                        <li className="comment-box">
                            <div>{comment.content}</div>
                            <div>{comment.user.username}</div>
                        </li>
                    )}
                </ul>
            }
            {!comments && <p className="no-data">No Comments</p>}
        </div>
    )
}

