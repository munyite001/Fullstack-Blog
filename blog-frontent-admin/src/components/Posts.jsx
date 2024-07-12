import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Stats from "./Stats"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function Posts() {
    
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate()

    //  Fetch all Posts
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${backendUrl}/posts`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                setPosts(response.data)
                setLoading(false)
            } catch (err) {
                console.log("Error fetching posts: ", err)
                setLoading(false)
            }
        }

        fetchAllPosts()
    }, [])

    const handleEdit = (id) => {
        navigate(`/posts/edit/${id}`)
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?")
        if (confirmDelete) {
            const deletePost = async () => {
                try {
                    const token = localStorage.getItem("token")
                    await axios.delete(
                        `${backendUrl}/posts/${id}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    )

                    setPosts(posts.filter(post => post._id !== id))
                } catch (err) {
                    console.log("Error deleting post: ", err)
                }
            }

            deletePost()
        }
    }
    
    return (
        <>
            <Stats />
            <div className="posts-container">
                <h2>Posts</h2>
                {loading && 
                    <p>Loading...</p>
                }
                {posts && 
                    <ul className="posts-list">
                        {posts.map((post) => 
                            <div className="post-item" key={post._id}>
                                <li>{post.title} ({post.published ? "Published" : "Not Published"}) {post.featured ? "(featured)": ""}</li>
                                <div className="post-btns">
                                    <button className="btn-2" onClick={() => handleEdit(post._id)}>Edit</button>
                                    <button className="btn-2" onClick={() => handleDelete(post._id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </ul>
                }
            </div>
        </>
    )
}