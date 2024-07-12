import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function Posts() {

    const [posts, setPosts] = useState(null)
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/posts/published`
                );
                setPosts(response.data);

            } catch(err) {
                console.log(`Error Fetching posts ${err}`)
            }
        }
        fetchPosts()
    }, [])


    const handlePostClick = (id) =>  {
        navigate(`/articles/${id}`)
    }

    return (
        <div className='articles'>
            <h1 className="heading">Articles</h1>
            <div className="posts">
                { posts && 
                    <div className="post-grid">
                        {posts.map((post) => 
                            <div className="post-item post" key={post._id} onClick={() => handlePostClick(post._id)}>
                                <div className="post-image">
                                    <img src={post.banner_image} alt="Post Image" />
                                </div>
                                <ul className="post-tags">
                                    {post.tags.map((tag) => <li key={tag._id}>{tag.name}</li>)}
                                </ul>
                                <div className="title">
                                    <h4>{post.title}</h4>
                                </div>
                                <div className="date">
                                    <p>{format(post.date_published, "PPpp")}</p>
                                </div>

                            </div>
                        )}
                    </div>
                }
                {!posts && <p className="no-data">There are no posts</p>}
            </div>
        </div>
    )
}