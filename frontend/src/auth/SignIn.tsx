import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Github, Apple, Mail, Lock } from "lucide-react";
import { login } from "../utils/auth";
import InlineSpinner from "../components/common/InlineSpinner";
import AuthLayout from "../layouts/AuthLayout";
import { authService } from "../services/api/auth";
// Import logo images
import FacebookLogo from "../assets/Facebook_logo_(square).png"; 
import GoogleLogo from "../assets/google_logo.webp"; 
const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.warn('Failed to load authentication image');
    setImageLoaded(true); // Still show the container
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Use the authService for login
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      console.log("Login successful:", response);

      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Login error:", error);
      setErrors({
        submit: error.message || "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider: string) => {
    // This will be implemented when social auth is ready
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <AuthLayout pageType="signin">
      <div className={`flex flex-1 min-h-[calc(100vh-4rem)] transition-all duration-700 auth-theme-transition ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {/* Left Side - Visual */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gradient-to-br from-primary/8 via-secondary/6 to-accent/8 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 relative overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/30 dark:bg-primary/50 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/30 dark:bg-secondary/50 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/30 dark:bg-accent/50 rounded-full animate-pulse delay-700"></div>
            {/* Dark theme exclusive elements */}
            <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/40 dark:to-secondary/40 rounded-full animate-float"></div>
            <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-tr from-accent/20 to-primary/20 dark:from-accent/40 dark:to-primary/40 rounded-full animate-float delay-1000"></div>
          </div>

          {/* Professional glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 dark:from-slate-800/30 dark:via-slate-900/20 dark:to-slate-800/40 backdrop-blur-sm"></div>
          
          <div className={`text-center p-8 relative z-10 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-8 relative group">
              {/* Enhanced Loading Skeleton */}
              {!imageLoaded && (
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-surface/80 to-surface/60 dark:from-slate-800/80 dark:to-slate-700/60 rounded-2xl shadow-2xl dark:shadow-black/70 animate-pulse border border-themed/10 dark:border-slate-600/30">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-muted">
                      <svg className="w-16 h-16 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              
              <img 
                src={login.image} 
                alt="Authentication" 
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`w-80 h-80 mx-auto object-cover rounded-2xl shadow-2xl dark:shadow-black/70 transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl dark:group-hover:shadow-black/80 border border-themed/20 dark:border-slate-600/40 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0 blur-sm'
                }`}
              />
              
              {/* Enhanced Floating Animation Elements */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500/60 dark:bg-blue-500/80 rounded-full opacity-60 dark:opacity-80 animate-bounce shadow-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500/60 dark:bg-purple-500/80 rounded-full opacity-60 dark:opacity-80 animate-bounce delay-1000 shadow-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute top-1/4 -right-8 w-6 h-6 bg-indigo-500/70 dark:bg-indigo-500/90 rounded-full opacity-50 dark:opacity-70 animate-ping delay-1500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" />
                </svg>
              </div>
            </div>
            
            <h3 className={`text-2xl font-bold text-themed mb-4 transition-all duration-500 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Welcome to TrackPulse
            </h3>
            <p className={`text-lg text-muted max-w-md transition-all duration-500 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Your personal music analytics dashboard. Track your listening habits and discover new insights.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 surface/80 dark:bg-slate-900/95 relative backdrop-blur-sm">
          {/* Enhanced Mobile background image */}
          <div className="lg:hidden absolute inset-0 opacity-5 dark:opacity-10">
            <img 
              src={login.image} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-surface/90 via-surface/80 to-surface/90 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95"></div>
          </div>
          
          <div className={`max-w-md w-full space-y-8 transition-all duration-700 delay-200 relative z-10 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="text-center">
              <h2 className={`text-3xl font-bold text-themed transition-all duration-500 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                {login.title}
              </h2>
              <p className={`mt-2 text-sm text-muted transition-all duration-500 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Sign in to your account to continue
              </p>
            </div>

            {errors.submit && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg animate-shake backdrop-blur-sm">
                {errors.submit}
              </div>
            )}

            {/* Social Sign In - Updated with actual logo images */}
            <div className={`space-y-3 transition-all duration-500 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {login.socialAuth.map((social, index) => {
                const getLogo = () => {
                  switch (social.provider) {
                    case 'google':
                      return <img src={GoogleLogo} alt="Google" className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />;
                    case 'facebook':
                      return <img src={FacebookLogo} alt="Facebook" className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />;
                    case 'github':
                      return <Github className="w-5 h-5 mr-3 text-themed transition-transform group-hover:scale-110" />;
                    case 'apple':
                      return <Apple className="w-5 h-5 mr-3 text-themed transition-transform group-hover:scale-110" />;
                    default:
                      return null;
                }
              };

              return (
                <button
                  key={index}
                  onClick={() => handleSocialSignIn(social.provider)}
                  className={`group w-full flex items-center justify-center px-4 py-3 border border-themed/20 dark:border-slate-600/30 rounded-lg surface dark:bg-slate-800/60 hover:bg-themed/5 dark:hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-black/30 animate-fade-in-up backdrop-blur-sm ${
                    isVisible ? '' : 'opacity-0'
                  }`}
                  data-delay={`${(index + 10) * 100}ms`}
                >
                  {getLogo()}
                  <span className="text-themed font-medium">
                    {social.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Divider */}
              <div className="relative transition-all duration-500 delay-1100 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-themed/20 dark:border-slate-600/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 surface dark:bg-slate-900/95 text-muted dark:text-slate-400 backdrop-blur-sm">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className={`space-y-6 transition-all duration-500 delay-1300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="space-y-4">
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-themed dark:text-slate-300 mb-2 transition-colors group-focus-within:text-primary dark:group-focus-within:text-blue-400"
                  >
                    <Mail className="w-4 h-4 inline mr-2 transition-transform group-focus-within:scale-110" />
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-themed/30 dark:border-slate-600/50 rounded-lg surface dark:bg-slate-800/60 text-themed dark:text-slate-200 placeholder-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50 focus:border-primary dark:focus:border-blue-400 transition-all duration-300 transform focus:scale-[1.02] hover:shadow-md dark:hover:shadow-black/30 backdrop-blur-sm hover:border-themed/50 dark:hover:border-slate-500/70"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-shake">{errors.email}</p>
                  )}
                </div>

                <div className="group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-themed dark:text-slate-300 mb-2 transition-colors group-focus-within:text-primary dark:group-focus-within:text-blue-400"
                  >
                    <Lock className="w-4 h-4 inline mr-2 transition-transform group-focus-within:scale-110" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-themed/30 dark:border-slate-600/50 rounded-lg surface dark:bg-slate-800/60 text-themed dark:text-slate-200 placeholder-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50 focus:border-primary dark:focus:border-blue-400 transition-all duration-300 transform focus:scale-[1.02] hover:shadow-md dark:hover:shadow-black/30 backdrop-blur-sm hover:border-themed/50 dark:hover:border-slate-500/70"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-primary transition-all duration-200 transform hover:scale-110"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400 animate-shake">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center group">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary dark:text-blue-400 focus:ring-primary/50 dark:focus:ring-blue-400/50 border-themed/30 dark:border-slate-600/50 surface dark:bg-slate-800/60 rounded transition-all duration-200 transform focus:scale-110 backdrop-blur-sm"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-themed dark:text-slate-300 transition-colors group-hover:text-primary dark:group-hover:text-blue-400 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>

                <a
                  href="/forgot-password"
                  className="text-sm text-primary dark:text-blue-400 hover:underline transition-all duration-200 hover:text-primary/80 dark:hover:text-blue-300 transform hover:scale-105"
                >
                  Forgot your password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit-button group"
              >
                {/* Button ripple effect */}
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-10 
                  dark:from-white/5 dark:to-transparent transition-opacity duration-300"></span>
                </span>
                
                {/* Loading overlay */}
                {isLoading && (
                  <div className="absolute inset-0 bg-blue-600/80 dark:bg-blue-500/80 animate-pulse rounded-lg"></div>
                )}
                
                <div className="flex items-center relative z-10">
                  {isLoading ? (
                    <InlineSpinner size="sm" className="mr-2" />
                  ) : null}
                  <span className="auth-button-text">
                    {isLoading ? "Signing in..." : login.form.submitText}
                  </span>
                </div>
              </button>
            </form>

            

            {/* Sign Up Link */}
            <div className={`text-center transition-all duration-500 delay-1500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-sm text-muted">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary dark:text-blue-400 hover:underline transition-all duration-200 hover:text-primary/80 dark:hover:text-blue-300 transform hover:scale-105 inline-block"
                >
                  Create one now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
