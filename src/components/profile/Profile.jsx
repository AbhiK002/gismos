import { useNavigate } from "react-router-dom";
import config from "../../config";
import './profile.css';
import { useEffect } from "react";
import { toast } from "react-toastify";

function Profile({userDetails}) {   
    const navigate = useNavigate();
    
    useEffect(() => {
        if (userDetails._id == null) {
            navigate(config.loginPage);
        }
    })
    
    return <div className="profile-main">
        <h1>Profile</h1>
        <div className="profile-card">
            <h2>Name: {userDetails.name}</h2>
            <h2>Email: {userDetails.email}</h2>
            <button onClick={() => {
                sessionStorage.clear()
                localStorage.clear()
                toast.success("Logged Out Successfully")
                document.location.href = config.prefix
            }}>Logout</button>
        </div>
    </div>
}

export default Profile;