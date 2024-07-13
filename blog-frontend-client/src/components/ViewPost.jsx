import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { sanitizeHtml } from "../utils/utils";
import LoadingScreen from "./LoadingScreen";

const backendUrl = import.meta.env.VITE_BACKEND_URL


export default function ViewPost() {


    const { postId } = useParams();

    const token = localStorage.getItem("token")

    const [post, setPost] = useState(null)

    const [comment, setComment] = useState("")

    const [postComments, setPostComments] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${backendUrl}/posts/${postId}`);
                setPost(response.data)
                setLoading(false)
            } catch(err) {
                console.log(err)
                setLoading(false)
            }
        }
        fetchPost()
    }, [])

    const handleCommentInput = (e) => {
        setComment(e.target.value)
    }

    //  Fetch All Post Comments
    useEffect(() => {
        const fetchAllPostComments = async () => {
            try {
                const response = await axios.get(`${backendUrl}/posts/${postId}/comments`);
                setPostComments(response.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllPostComments()
    }, [])


    const handleSubmitComment = async () => {
        await axios.post(`${backendUrl}/posts/${postId}/comment`, {content: comment}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setPostComments(response.data)
            setComment("")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="post-box">
            {loading && <LoadingScreen />}
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
                    {token ? (
                        <div className="comment-box">
                            <h2>Comments</h2>
                            <hr />
                            <div className="user-comment">
                                <textarea placeholder="Add a comment" onChange={handleCommentInput} value={comment}></textarea>
                                <button onClick={handleSubmitComment}>Submit</button>
                            </div>
                        </div>
                    ) : (
                        <div className="no-comment">
                            <p className="no-data">You have to be logged in before you can add a comment</p>
                        </div>
                    ) }
                    <div className="comment-list">
                        <h3>Community Comments</h3>
                        {postComments.length > 0 ?  postComments.map((comment) => (
                            <div key={comment._id} className="comment">
                                <div className="comment-info">
                                    <p className="comment-author">{comment.user.username}</p>
                                    <p className="comment-date">{format(comment.updated_at, "PP")}</p>
                                </div>
                                <p className="comment-content">{comment.content}</p>
                            </div>
                        )) : <p className="no-data" style={{ margin: "1rem"}}>No comments yet</p>}
                    </div>
                </div>
        ): (loading ? '' : <p className="no-data">No post found</p>)}
        </div>
    )
}