import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await api.post("/auth/forgot-password/", { email });
      setMessage("Password reset email sent. Check your inbox!");
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("Failed to send reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e17] via-[#1a1f2e] to-[#0f1419] p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-[#72c4fa] focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-[#72c4fa] to-[#a6e1fa] text-white font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="text-center text-white/80 mt-4">{message}</p>}
        <div className="text-center mt-4">
          <Link to="/login" className="text-[#72c4fa] hover:text-[#a6e1fa]">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
