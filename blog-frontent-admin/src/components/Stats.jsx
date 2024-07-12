import axios from "axios";
import { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Stats = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${backendUrl}/stats`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                
                setStats(response.data);
                setLoading(false); // Set loading state to false after data fetch

            } catch (err) {
                console.log("Error fetching stats (frontend)", err);
                setLoading(false); // Ensure loading state is set to false on error
            }
        };
        
        fetchStats();
    }, []); // Empty dependency array means this effect runs only once on mount
    

    if (loading) {
        return <p>Loading...</p>; // Optional loading indicator
    }

    return (
        <div className="stats-container">
            <div className="stat-box">
                <h2>{stats.totalUsers || 0}</h2>
                <p>Total Users</p>
            </div>
            <div className="stat-box">
                <h2>{stats.totalComments || 0}</h2>
                <p>Total Post Comments</p>
            </div>
            <div className="stat-box">
                <h2>{stats.totalPosts || 0}</h2>
                <p>Total Posts</p>
            </div>
        </div>
    );
};

export default Stats;
