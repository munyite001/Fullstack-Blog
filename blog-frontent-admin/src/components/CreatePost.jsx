import { useState, useEffect } from "react"
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate, useParams } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function CreatePost() {

    const { postId } = useParams();

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const [postContent, setPostContent] = useState({
        title: "",
        content: "",
        tags: [],
        banner_image: null,
        published: false
    });

    const [mode, setMode] = useState("edit");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${backendUrl}/tags`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setTags(response.data);
            } catch (err) {
                console.log("Error Fetching tags", err);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        const fetchPostData = async () => {
            if (postId && tags.length > 0) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(
                        `${backendUrl}/posts/${postId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    );

                    const postData = response.data;

                    setPostContent({
                        title: postData.title,
                        content: postData.content,
                        tags: postData.tags,
                        banner_image: postData.banner_image
                    });

                    const tagNames = postData.tags.map(tagId => {
                        const tag = tags.find(t => t._id === tagId);
                        return tag ? tag.name : '';
                    }).join(', ');
                    setTagInput(tagNames);
                } catch (err) {
                    console.log("Error fetching post data", err);
                }
            }
        };

        fetchPostData();
    }, [postId, tags]);

    const handleModeChange = (mode) => {
        setMode(mode);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setPostContent({ ...postContent, banner_image: reader.result });
            };

            reader.readAsDataURL(file);
        }
    };

    const handleTagsChange = (e) => {
        const inputTags = e.target.value;
        setTagInput(inputTags);

        const inputTagArray = inputTags.split(",").map(tag => tag.trim());
        const tagIds = inputTagArray.map(tagName => {
            const tag = tags.find(t => t.name === tagName);
            return tag ? tag._id : null;
        }).filter(tagId => tagId !== null);
        setPostContent({ ...postContent, tags: tagIds });
    };

    const handlePostSave = async () => {
        if (postId) {
            return handlePostUpdate();
        }
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${backendUrl}/posts`,
                postContent,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            navigate('/posts');
        } catch (err) {
            console.log("Error saving post", err);
        }
    };

    const handlePostUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${backendUrl}/posts/${postId}`,
                postContent,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            navigate('/posts');
        } catch (err) {
            console.log("Error updating post", err);
        }
    };

    const handlePublish = async () => {
        if (postId) {
            try {
                const token = localStorage.getItem("token");
                await axios.put(
                    `${backendUrl}/posts/${postId}`,
                    { ...postContent, published: true },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                navigate('/posts');
            } catch (err) {
                console.log("Error publishing post", err);
            }
        } else {
            try {
                const token = localStorage.getItem("token")
                await axios.post(
                    `${backendUrl}/posts`,
                    {...postContent, published: true},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                navigate('/posts');
            } catch (err) {
                console.log("Error publishing post", err);
            }
        }
    }

    const handleFeatured = async () => {
        
        try {
            const token = localStorage.getItem("token")
            await axios.put(
                `${backendUrl}/posts/${postId}/feature`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            navigate('/posts');
        } catch(err) {
            console.log("Error setting the post to featured", err)
        }


    }

    return (
        <div className="create-post-container">
            <div className="control-btns">
                <button className={mode === "edit" ? "btn-2 active" : "btn-2"} onClick={() => handleModeChange("edit")}>Edit</button>
                <button className={mode === "preview" ? "btn-2 active" : "btn-2"} onClick={() => handleModeChange("preview")}>Preview</button>
            </div>
            {mode === "edit" && 
                <div className="edit-box">
                    <div className="cover-image-box">
                        {postContent.banner_image && <img src={postContent.banner_image} alt="cover" />}
                    </div>
                    <label htmlFor="cover-image-upload" className="custom-upload">
                        {postContent.banner_image ? "Change" : "Upload Cover Image"}
                        <input 
                            id="cover-image-upload" 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                    {postContent.banner_image ? <span className="remove" onClick={() => setPostContent({...postContent, banner_image: null})}>Remove</span> : ""}
                    <div className="input-box">
                        <input id="post-title" 
                            type="text" 
                            value={postContent.title} 
                            onChange={(e) => setPostContent({...postContent, title: e.target.value})}
                            placeholder="New Post Title Here"
                        />
                    </div>
                    <div className="input-box">
                        <input 
                            type="text" id="tags"
                            value={tagInput}
                            onChange={handleTagsChange}
                            placeholder="Add tags separated by commas"
                        />
                    </div>
                    <div className="input-box editor">
                        <Editor
                            apiKey='lfxzy4rw58a3mnx9kvpzo7px6136mzbk0chc3wm71g760o8w'
                            init={{
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                            }}
                            initialValue={postContent.content}
                            value={postContent.content}
                            onEditorChange={(content) => setPostContent({ ...postContent, content: content })}
                        />
                    </div>
                    <div className="btns">
                        <button className="btn" onClick={handlePostSave}>Save Draft</button>
                        <button className="btn" onClick={handlePublish}>Publish</button>
                        {postId && <button className="btn" onClick={handleFeatured}>Set Featured</button>}
                    </div>
                </div>
            }
            {mode === "preview" &&
                <div className="preview-box">
                    <div className="cover-image-box-preview" style={{ backgroundImage: `url(${postContent.banner_image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }}></div>
                    <h1>{postContent.title}</h1>
                    <div className="tags">
                        {postContent.tags.map((tagId, index) => {
                            const tag = tags.find(t => t._id === tagId);
                            return tag ? <span key={index} className="tag-item">{tag.name}</span> : null;
                        })}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: postContent.content }} className="post-content-preview"></div>
                </div>
            }
        </div>
    );
}
