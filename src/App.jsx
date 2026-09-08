import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Land from "./pages/Land"
import About from "./pages/About"
import Tracker from "./pages/Tracker"
import Contact from "./pages/Contact"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "./firebase"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ScrollToTop from "./reusable_comps/ScrollToTop"
import VerifyEmail from "./pages/VerifyEmail"
import ProtectedRoute from "./reusable_comps/ProtectedRoute"


function App() {

  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      
      if (user) {
        console.log("Logged In");
      } else {
        console.log("Logged Out");
      }

      setLoading(false);
    });

    //Cleanup Firbebase listener
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer theme="light" />

      <ScrollToTop />

      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route element={<ProtectedRoute />}>
              <Route path="/land" element={<Land />} />
              <Route path="/about" element={<About />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/contact" element={<Contact />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>   
    </div>
  )
}

export default App
