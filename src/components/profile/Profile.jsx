import { useNavigate } from "react-router-dom";
import config from "../../config";
import './profile.css';

function Profile({userDetails}) {    
    return <div className="profile-main">
        <h1>Profile</h1>
        <div className="profile-card">
            <h2>Name: {userDetails.name}</h2>
            <h2>Email: {userDetails.email}</h2>
            <button onClick={() => {
                sessionStorage.clear()
                localStorage.clear()
                alert("Logged Out Successfully")
                document.location.href = config.prefix
            }}>Logout</button>
        </div>
    </div>
}

export default Profile;