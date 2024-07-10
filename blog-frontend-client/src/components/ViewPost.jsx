import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { sanitizeHtml } from "../utils/utils";


export default function ViewPost() {


    const { postId } = useParams();


    const [post, setPost] = useState(null)


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${postId}`);
                setPost(response.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchPost()
    }, [])

    return (
        <div className="post-box">
            {console.log(postId)}
            {post ? (
                <div className="view-post-item">
                    <div className="post-image">
                        <img src={post.banner_image} alt="post image banner" />
                    </div>
                    <div className="post-content">
                        <div className="post-info">
                            <ul className="post-tags">
                                {post.tags.map((tag) => <li key={tag._id}>{tag.name}</li>)}
                            </ul>
                            <div className="date">
                                <p>{format(post.date_published, "PPpp")}</p>
                            </div>
                        </div>
                        <div className="title">
                            <h1>{post.title}</h1>
                        </div>
                        <div className="post-data" dangerouslySetInnerHTML={{__html: sanitizeHtml(post.content)}}></div>
                    </div>
                </div>
        ): (<p className="no-data">Sorry this post doesn't exist</p>)}
        </div>
    )
}