import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";

function ProtectedRoute() {

    const user = auth.currentUser;

    // No user is logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is logged in but email is not verified
    if (!user.emailVerified) {
        return <Navigate to="/verify-email" replace />;
    }

    // User is logged in and email is verified
    return <Outlet />;
}

export default ProtectedRoute;