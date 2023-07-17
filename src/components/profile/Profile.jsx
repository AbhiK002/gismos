import { useNavigate } from "react-router-dom";
import config from "../../config";

function Profile({userDetails}) {
    const navigate = useNavigate()
    return <>
        <div className="profile-card">
            <h2>Name: {userDetails.name}</h2>
            <h2>Email: {userDetails.email}</h2>
            <button onClick={() => {
                sessionStorage.clear()
                localStorage.clear()
                document.location.href = config.prefix
            }}>Logout</button>
        </div>
    </>
}

export default Profile;