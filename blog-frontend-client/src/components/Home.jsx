import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function App() {

    const [ posts, setPosts ] = useState(null)
    const [ featured, setFeatured ] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/posts/published`
                );
                setPosts(response.data);
                setFeatured(response.data.find((post) => post.featured == true))

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
        <div className='home'>
            <h1 className="heading">Home</h1>
            <div className="posts">
                {posts && 
                    <div className="featured-post post" onClick={() => {handlePostClick(featured._id)}}>
                        <div className="image-banner">
                            <img src={featured.banner_image} alt="Featured Post Banner Image" />
                        </div>
                        <div className="post-content">
                            <ul className="post-tags">
                                {featured.tags.map((tag) => <li key={tag._id}>{tag.name}</li>)}
                            </ul>
                            <div className="title">
                                <h2>{featured.title}</h2>
                            </div>
                            <div className="date">
                                <p>{format(featured.date_published, "PPpp")}</p>
                            </div>
                        </div>
                    </div>
                }
                <h2 className="heading">Latest posts</h2>
                { posts && 
                    <div className="post-grid">
                        {posts.map((post) => 
                            <div className="post-item post" key={post._id} onClick={() => {handlePostClick(post._id)}}>
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