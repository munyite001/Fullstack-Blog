import { useState } from "react"
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
    const [postContent, setPostContent] = useState({
        title: "",
        content: "",
        tags: [],
        banner_image: null
    })
    const [mode, setMode] = useState("edit")

    const handleModeChange = (mode) => {
        setMode(mode)
    }

    const navigate = useNavigate()

    const handleImageUpload = (e) => {
        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()

            reader.onload = () => {
                setPostContent({...postContent, banner_image: reader.result})
            }

            reader.readAsDataURL(file)
        }
    }

    const handleTagsChange = (e) => {
        const tags = e.target.value.split(",").map(tag => tag.trim())
        setPostContent({...postContent, tags: tags})
    }

    const handlePostSave = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log('Sending post data:', postContent);
            const response = await axios.post(
                "http://localhost:3000/api/posts",
                postContent,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log("Response: ", response)

            //  Navigate to posts page
            navigate('/posts')

        } catch (err) {
            console.log("Error saving post", err)
        }
    }
    return (
        <div className="create-post-container">
            <div className="control-btns">
                <button className={mode == "edit" ? "btn-2 active":"btn-2"} onClick={() => handleModeChange("edit")}>Edit</button>
                <button className={mode == "preview" ? "btn-2 active":"btn-2"} onClick={() => handleModeChange("preview")}>Preview</button>
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
                            value={postContent.tags}
                            onChange={handleTagsChange}
                            placeholder="Add tags separated by commas"
                        />
                    </div>
                    <div className="input-box editor">
                    <Editor
                        apiKey='lfxzy4rw58a3mnx9kvpzo7px6136mzbk0chc3wm71g760o8w'
                        init={{
                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        initialValue="Write your post content here..."
                        value={postContent.content}
                        onEditorChange={(content) => setPostContent({...postContent, content: content})}
                        />
                    </div>
                    <div className="btns">
                        <button className="btn" onClick={handlePostSave}>Save Draft</button>
                        <button className="btn">Publish</button>
                    </div>
                </div>
            }
            {
                mode == "preview" &&
                <div className="preview-box">
                    <div className="cover-image-box-preview" style={{ backgroundImage: `url(${postContent.banner_image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px' }}>
                        {/* {postContent.banner_image && <img src={postContent.banner_image} alt="cover" />} */}
                    </div>
                    <h1>{postContent.title}</h1>
                    <div className="tags">
                        {postContent.tags.map((tag, index) => (
                            <span key={index} className="tag-item">{tag}</span>
                        ))}
                    </div>
                    <div dangerouslySetInnerHTML={{__html: postContent.content}} className="post-content-preview"></div>
                </div>
            }
        </div>
    )
}