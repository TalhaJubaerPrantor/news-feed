import { Outlet,Navigate } from "react-router-dom";

const Protected = () => {
    let user=null;
    const stored = localStorage.getItem("user");
    if (stored) user="true";
    return user ? <Outlet /> : <Navigate to="/" />;
}

export default Protected;