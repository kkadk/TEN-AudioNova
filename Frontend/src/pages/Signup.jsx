// import React, { useState } from "react";
// import { Eye, EyeOff, Mail, Lock, User, Music, Check } from "lucide-react";
// import { Link } from "react-router-dom";
// import { register } from "../api/auth";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [agreeToTerms, setAgreeToTerms] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const fullNameNoSpaces = formData.fullName.replace(/\s/g, "");
//     if (!fullNameNoSpaces) {
//       newErrors.fullName = "Full name is required";
//     } else if (fullNameNoSpaces.length < 2) {
//       newErrors.fullName = "Name must be at least 2 characters (excluding spaces)";
//     }

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       newErrors.password =
//         "Password must contain uppercase, lowercase, and number";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     if (!agreeToTerms) {
//       newErrors.terms = "Please agree to the terms and conditions";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!validateForm()) return;

//   //   setIsLoading(true);
//   //   try {
//   //     const data = await register(formData.fullName,formData.email, formData.password);
//   //     console.log('Login successful:', data);
//   //     // store token, redirect, etc.
//   //   } catch (err) {
//   //     console.error('Login failed:', err);
//   //     alert('Invalid credentials'); // simple error display
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   setIsLoading(true);
//   try {
//     const data = await register(formData.fullName, formData.email, formData.password);
//     console.log("Registration successful:", data);

//     // Optionally show a success message or redirect
//     alert("Registration successful! Check your email to verify your account.");
//   } catch (err) {
//     console.error("Registration failed:", err);
//     // Check for API error response
//     if (err.response?.data) {
//       const apiErrors = err.response.data;
//       const newErrors = {};
//       if (apiErrors.email) newErrors.email = apiErrors.email[0];
//       if (apiErrors.password) newErrors.password = apiErrors.password[0];
//       setErrors(newErrors);
//     } else {
//       alert("Something went wrong. Please try again.");
//     }
//   } finally {
//     setIsLoading(false);
//   }
// };


//   const handleSocialSignUp = (provider) => {
//     console.log(`Sign up with ${provider}`);
//     alert(`Sign up with ${provider} clicked`);
//   };

//   const getPasswordStrength = () => {
//     const password = formData.password;
//     let score = 0;

//     if (password.length >= 8) score++;
//     if (/[a-z]/.test(password)) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/\d/.test(password)) score++;
//     if (/[^a-zA-Z\d]/.test(password)) score++;

//     return score;
//   };

//   const getStrengthColor = () => {
//     const strength = getPasswordStrength();
//     if (strength <= 2) return "bg-red-500";
//     if (strength <= 3) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   const getStrengthText = () => {
//     const strength = getPasswordStrength();
//     if (strength <= 2) return "Weak";
//     if (strength <= 3) return "Medium";
//     return "Strong";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
//       </div>

//       {/* Floating Music Notes */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(10)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute text-white/5 animate-bounce"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               fontSize: `${Math.random() * 15 + 15}px`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${Math.random() * 3 + 4}s`,
//             }}
//           >
//             {["♪", "♫", "♬", "♩"][Math.floor(Math.random() * 4)]}
//           </div>
//         ))}
//       </div>

//       {/* Sign Up Card */}
//       <div className="relative w-full max-w-md z-10">
//         <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl my-6 border border-white/20 p-8 relative overflow-hidden">
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

//           {/* Header */}
//           <div className="relative z-10 text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
//               <Music className="text-2xl text-white" />
//             </div>
//             <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2">
//               Join the Beat
//             </h1>
//             <p className="text-white/70">
//               Create your account and start discovering music
//             </p>
//           </div>

//           {/* Divider */}
//           <div className="relative z-10 flex items-center my-6">
//             <div className="flex-1 border-t border-white/20"></div>
//             <span className="px-4 text-white/50 text-sm">Sign up with</span>
//             <div className="flex-1 border-t border-white/20"></div>
//           </div>

//           {/* Social Sign Up */}
//           {/* <div className="relative z-10 grid grid-cols-3 gap-3">
//             <button
//               onClick={() => handleSocialSignUp("Google")}
//               className="flex items-center justify-center py-3 cursor-pointer bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
//             >
//               <svg
//                 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                 />
//               </svg>
//             </button>
//             <button
//               onClick={() => handleSocialSignUp("Apple")}
//               className="flex items-center justify-center py-3 cursor-pointer bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
//             >
//               <svg
//                 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
//                 />
//               </svg>
//             </button>
//             <button
//               onClick={() => handleSocialSignUp("Facebook")}
//               className="flex items-center justify-center py-3 cursor-pointer bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
//             >
//               <svg
//                 className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
//                 />
//               </svg>
//             </button>
//           </div> */}


//  {/* Divider */}
//           <div className="relative z-10 flex items-center my-6">
//             <div className="flex-1 border-t border-white/20"></div>
//             <span className="px-4 text-white/50 text-sm">or</span>
//             <div className="flex-1 border-t border-white/20"></div>
//           </div>

//           {/* Form */}
//           <div className="relative z-10 space-y-5">
//             {/* Full Name Field */}
//             <div>
//               <label className="block text-white/90 text-sm font-medium mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border ${
//                     errors.fullName ? "border-red-400" : "border-white/20"
//                   } focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-white/50`}
//                   placeholder="Enter your full name"
//                 />
//               </div>
//               {errors.fullName && (
//                 <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div>
//               <label className="block text-white/90 text-sm font-medium mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border ${
//                     errors.email ? "border-red-400" : "border-white/20"
//                   } focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-white/50`}
//                   placeholder="Enter your email"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-red-400 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-white/90 text-sm font-medium mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className={`w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm rounded-xl border ${
//                     errors.password ? "border-red-400" : "border-white/20"
//                   } focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-white/50`}
//                   placeholder="Create a strong password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//               {formData.password && (
//                 <div className="mt-2">
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-xs text-white/70">
//                       Password strength:
//                     </span>
//                     <span
//                       className={`text-xs font-medium ${
//                         getPasswordStrength() <= 2
//                           ? "text-red-400"
//                           : getPasswordStrength() <= 3
//                           ? "text-yellow-400"
//                           : "text-green-400"
//                       }`}
//                     >
//                       {getStrengthText()}
//                     </span>
//                   </div>
//                   <div className="w-full bg-white/20 rounded-full h-1.5">
//                     <div
//                       className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColor()}`}
//                       style={{ width: `${(getPasswordStrength() / 5) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               )}
//               {errors.password && (
//                 <p className="text-red-400 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div>
//               <label className="block text-white/90 text-sm font-medium mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className={`w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm rounded-xl border ${
//                     errors.confirmPassword
//                       ? "border-red-400"
//                       : "border-white/20"
//                   } focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all text-white placeholder-white/50`}
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-red-400 text-sm mt-1">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>

//             {/* Terms and Conditions */}
//             <div>
//               <label className="flex items-start space-x-3 cursor-pointer">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     checked={agreeToTerms}
//                     onChange={(e) => setAgreeToTerms(e.target.checked)}
//                     className="sr-only"
//                   />
//                   <div
//                     className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
//                       agreeToTerms
//                         ? "bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-500"
//                         : "bg-white/10 border-white/30"
//                     }`}
//                   >
//                     {agreeToTerms && <Check className="w-3 h-3 text-white" />}
//                   </div>
//                 </div>
//                 <span className="text-white/70 text-sm leading-5">
//                   I agree to the{" "}
//                   <button className="text-blue-400 hover:text-cyan-400 transition-colors underline">
//                     Terms of Service
//                   </button>{" "}
//                   and{" "}
//                   <button className="text-blue-400 hover:text-cyan-400 transition-colors underline">
//                     Privacy Policy
//                   </button>
//                 </span>
//               </label>
//               {errors.terms && (
//                 <p className="text-red-400 text-sm mt-1">{errors.terms}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                   Creating account...
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center cursor-pointer">
//                   Create account
//                 </div>
//               )}
//             </button>
//           </div>

//           {/* Sign In Link */}
//           <div className="relative z-10 text-center mt-6">
//             <p className="text-white/70 text-sm">
//               <Link to="/login">
//                 Already have an account?{" "}
//                 <button className="text-blue-400 hover:text-cyan-400 transition-colors font-medium cursor-pointer">
//                   Sign in
//                 </button>
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { register } from "../api/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Must contain uppercase, lowercase & number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.terms = "Please agree to terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const data = await register(formData.fullName, formData.email, formData.password);
      console.log("Registration successful:", data);
      alert("Registration successful! Please check your email to verify your account.");
      // Optionally redirect to login page
    } catch (err) {
      console.error("Registration failed:", err);
      if (err.response?.data) {
        const apiErrors = err.response.data;
        const newErrors = {};
        if (apiErrors.email) newErrors.email = apiErrors.email[0];
        if (apiErrors.password) newErrors.password = apiErrors.password[0];
        setErrors(newErrors);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
              <User className="text-white" />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2">Join us</h1>
            <p className="text-white/70">Create your account to start</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-white/90 text-sm mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 rounded-xl border ${
                    errors.fullName ? "border-red-400" : "border-white/20"
                  } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/90 text-sm mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 rounded-xl border ${
                    errors.email ? "border-red-400" : "border-white/20"
                  } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/90 text-sm mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 rounded-xl border ${
                    errors.password ? "border-red-400" : "border-white/20"
                  } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                  placeholder="Create password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white/90 text-sm mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 rounded-xl border ${
                    errors.confirmPassword ? "border-red-400" : "border-white/20"
                  } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                  placeholder="Confirm password"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start space-x-2 text-white/70 text-sm">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="accent-blue-500"
                />
                <span>I agree to Terms and Privacy Policy</span>
              </label>
              {errors.terms && <p className="text-red-400 text-sm mt-1">{errors.terms}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-white/70 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-cyan-400 underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
