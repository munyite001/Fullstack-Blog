import Stats from "./Stats"
export default function Posts() {
    return (
        <>
            <Stats/>
            <div className="posts-container">
                <h2>Posts</h2>
                <ul>
                    <li>Post 1</li>
                    <li>Post 2</li>
                    <li>Post 3</li>
                </ul>
            </div>
        </>
    )
}