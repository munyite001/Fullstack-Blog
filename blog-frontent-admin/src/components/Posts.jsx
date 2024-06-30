import { useEffect, useState } from "react";
import axios from "axios"
import Stats from "./Stats"

export default function Posts() {
    
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)


    //  Fetch all Posts
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:3000/api/posts",
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
    
    return (
        <>
            <Stats/>
            <div className="posts-container">
                <h2>Posts</h2>
                {loading && 
                    <p>Loading...</p>
                }
                {posts && 
                    <ul className="posts-list">
                        {posts.map((post) => 
                            <div className="post-item" key={post._id}>
                                <li>{post.title}</li>
                            </div>
                        )}
                    </ul>
                }
            </div>
        </>
    )
}