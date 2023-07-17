import config from '../../config';
import './home.css'

function Home() {
    return <>
        <button onClick={()=>{window.location.href = config.loginPage}}>Login</button>
        <button onClick={()=>{localStorage.clear(); sessionStorage.clear(); alert("Logged out")}}>Logout</button>
    </>
}

export default Home;