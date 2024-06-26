import { useNavigate } from 'react-router-dom'

export default function DropDownMenu() {
    const navigate = useNavigate()

    const handleChange = (e) => {
        const page = e.target.value
        navigate(`/${page}`)
    }
    return (
        <div className="dropdown-container">
            <select name="page" id="page" onChange={handleChange}>
                <option value="posts">Posts</option>
                <option value="users">Users</option>
                <option value="comments">Comments</option>
                <option value="analytics">Analytics</option>   
            </select>            
        </div>
    )
}