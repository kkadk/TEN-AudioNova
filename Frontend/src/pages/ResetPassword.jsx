import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     setIsSubmitting(true);
//     setMessage("");

//     try {
//       await api.post(`/auth/reset-password/${token}/`, {
//         new_password: newPassword,
//       });
//       setMessage("Password reset successfully! Redirecting to login...");
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       console.error("Reset password error:", error);
//       setMessage("Failed to reset password. Link might be invalid or expired.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    setMessage("Passwords do not match.");
    return;
  }

  setIsSubmitting(true);
  setMessage("");

  try {
    await api.post(`/auth/reset-password/${token}/`, {
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    setMessage("Password reset successfully! Redirecting to login...");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    console.error("Reset password error:", error);
    setMessage("Failed to reset password. Link might be invalid or expired.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e17] via-[#1a1f2e] to-[#0f1419] p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-[#72c4fa] focus:outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-[#72c4fa] focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-[#72c4fa] to-[#a6e1fa] text-white font-semibold rounded-xl hover:shadow-xl transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {message && <p className="text-center text-white/80 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
