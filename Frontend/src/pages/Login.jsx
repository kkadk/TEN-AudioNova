// ( _ )  ye whatsapp se le rha hoon apka naam mujhe abhi pata nahi hai maine poocha bhi apse lekin aap is par kaar kar sakte ho
// apko signup page bhi banana hai
import React, { useState } from "react";
import {
  IoEye,
  IoEyeOff,
  IoMail,
  IoLockClosed,
  IoMusicalNotes,
  IoLogoGoogle,
  IoLogoApple,
  IoLogoFacebook,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!validateForm()) return;

  //     setIsLoading(true);
  //     // Simulate API call
  //     setTimeout(() => {
  //       setIsLoading(false);
  //       console.log("Login attempted:", formData);
  //     }, 2000);
  //   };

  //   const handleSocialLogin = (provider) => {
  //     console.log(`Login with ${provider}`);
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#1a1f2e] to-[#0f1419] flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#72c4fa]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#a6e1fa]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#72c4fa]/5 to-[#a6e1fa]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Music Notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 15}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          >
            ♪
          </div>
        ))}
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md my-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

          {/* Header */}
          <div className="relative z-10 text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#72c4fa] to-[#a6e1fa] rounded-2xl mb-4 shadow-lg">
              <IoMusicalNotes className="text-2xl text-white" />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-white/70">
              Sign in to continue your music journey
            </p>
          </div>

          <div className="relative z-10 flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/50 text-sm">Sign in with</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Social Login */}
          <div className="relative z-10 grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center py-3 bg-white/10 backdrop-blur-sm cursor-pointer rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
            >
              <IoLogoGoogle className="text-xl text-white/70 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => handleSocialLogin("Apple")}
              className="flex items-center justify-center py-3 bg-white/10 backdrop-blur-sm cursor-pointer rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
            >
              <IoLogoApple className="text-xl text-white/70 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="flex items-center justify-center py-3 bg-white/10 backdrop-blur-sm cursor-pointer rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
            >
              <IoLogoFacebook className="text-xl text-white/70 group-hover:text-white transition-colors" />
            </button>
          </div>

          <div className="relative z-10 flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-white/50 text-sm">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Form */}
          <div className="relative z-10 space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <IoMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border ${
                    errors.email ? "border-red-400" : "border-white/20"
                  } focus:border-[#72c4fa] focus:outline-none focus:ring-2 focus:ring-[#72c4fa]/20 transition-all text-white placeholder-white/50`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <IoLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm rounded-xl border ${
                    errors.password ? "border-red-400" : "border-white/20"
                  } focus:border-[#72c4fa] focus:outline-none focus:ring-2 focus:ring-[#72c4fa]/20 transition-all text-white placeholder-white/50`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-[#72c4fa]/20"
                />
                <span className="ml-2 text-white/70 text-sm">Remember me</span>
              </label>
              <button
                type="button"
                className="text-[#72c4fa] hover:text-[#a6e1fa] text-sm font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#72c4fa] to-[#a6e1fa] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full text-gray-800 animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center text-gray-700 cursor-pointer">
                  Sign In
                </div>
              )}
            </button>
          </div>

          {/* Divider */}

          {/* Sign Up Link */}
          <div className="relative z-10 text-center mt-6">
            <p className="text-white/70">
              <Link to="/signup">
                Don't have an account?{" "}
                <button className="text-[#72c4fa] hover:text-[#a6e1fa] font-medium cursor-pointer transition-colors">
                  Sign up
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.1;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
