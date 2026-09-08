import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, resendVerificationEmail, checkEmailVerified, logOut } from "../firebase";

function VerifyEmail() {

    const navigate = useNavigate();

    const [checking, setChecking] = useState(false);

    const user = auth.currentUser;

    const checkVerification = async () => {
        setChecking(true);

        const verified = await checkEmailVerified();

        if (verified) {
            navigate("/land");
        } else {
            alert("Your email is not verified yet. Please check your inbox.");
        }

        setChecking(false);
    };


    const handleResend = async () => {
        await resendVerificationEmail();
    };


    const handleLogout = async () => {
        await logOut();
        navigate("/login");
    };


    return (
        <section
            className="relative h-screen flex justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: `url('/homeBg.png')` }}
        >

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-10 w-[90%] max-w-md text-center">

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Verify your email
                </h1>

                <p className="text-gray-600 mb-6">
                    We've sent a verification link to:
                </p>

                <p className="font-semibold text-gray-800 break-all mb-6">
                    {user?.email}
                </p>

                <p className="text-gray-500 text-sm mb-8">
                    Please check your inbox and click the verification
                    link to activate your account.
                </p>


                <button
                    onClick={checkVerification}
                    disabled={checking}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer disabled:opacity-50"
                >
                    {checking ? "Checking..." : "I've verified my email"}
                </button>


                <button
                    onClick={handleResend}
                    className="w-full mt-4 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 cursor-pointer"
                >
                    Resend verification email
                </button>


                <button
                    onClick={handleLogout}
                    className="mt-6 text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                    Use a different account
                </button>

            </div>

        </section>
    );
}

export default VerifyEmail;