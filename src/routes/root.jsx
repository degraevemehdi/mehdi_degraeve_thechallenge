import { Outlet } from "react-router-dom";

export default function Root(){
    
    return(
        <div>
            <nav className="navbar">
                <h1>Where in the World ?</h1>
                <p>Dark Mode</p>
            </nav>
            <div>
                <Outlet />

            </div>
            
        </div>
    );
    
}