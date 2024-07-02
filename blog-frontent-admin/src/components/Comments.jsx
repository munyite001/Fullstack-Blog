import axios from "axios"
import { useEffect, useState } from "react"
import { format } from "date-fns"

export default function Comments() {
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(false)

    //  Fetch all comments
    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:3000/api/comments",
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setComments(response.date)
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
            {loading && <p>Loading...</p>}
            {comments && 
                <ul className="comments-list">
                    {comments.map((comment) => 
                        <div className="comment-box">
                            <li>{comment.content}</li>
                        </div>
                    )}
                </ul>
            }
            {!comments && <p className="no-data">No Comments</p>}
        </div>
    )
}

