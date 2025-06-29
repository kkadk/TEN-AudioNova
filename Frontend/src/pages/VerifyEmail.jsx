import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/auth"; 

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
    
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.error("Email verification failed:", error);
        setStatus("error");
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-4">
      {status === "loading" && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      )}
      {status === "success" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-green-400">Email Verified!</h1>
          <p className="mb-6">Redirecting to login...</p>
        </div>
      )}
      {status === "error" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-400">Verification Failed</h1>
          <p className="mb-6">The verification link is invalid or has expired.</p>
          <Link
            to="/signup"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow hover:scale-105 transition-transform"
          >
            Go to Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
