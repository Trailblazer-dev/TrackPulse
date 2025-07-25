import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Github,
  Chrome,
  Apple,
  Mail,
  Lock,
  User,
  Shield,
} from "lucide-react";
import { register } from "../utils/auth";
import InlineSpinner from "../components/common/InlineSpinner";
import AuthLayout from "../layouts/AuthLayout";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    newsletterSubscribe: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    if (!captchaVerified) {
      newErrors.captcha = "Please complete the captcha verification";
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock success response
      setShowSuccess(true);
      setTimeout(() => {
        window.location.href = "/signin";
      }, 3000);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Signing up with ${provider}`);
  };

  const handleCaptchaVerification = () => {
    setCaptchaVerified(!captchaVerified);
    if (errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: "" }));
    }
  };

  return (
    <AuthLayout pageType="register">
      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
        {/* Left Side - Visual/Branding */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 relative overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 bg-secondary/30 dark:bg-secondary/50 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/30 dark:bg-primary/50 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/30 dark:bg-accent/50 rounded-full animate-pulse delay-700"></div>
            {/* Dark theme exclusive elements */}
            <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-secondary/20 to-primary/20 dark:from-secondary/40 dark:to-primary/40 rounded-full animate-float"></div>
            <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-tr from-accent/20 to-secondary/20 dark:from-accent/40 dark:to-secondary/40 rounded-full animate-float delay-1000"></div>
          </div>

          {/* Professional glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 dark:from-slate-800/30 dark:via-slate-900/20 dark:to-slate-800/40 backdrop-blur-sm"></div>
          
          <div className="text-center p-8 relative z-10">
            <div className="mb-8 relative group">
              <img 
                src={register.image} 
                alt="Join TrackPulse" 
                className="w-80 h-80 mx-auto object-cover rounded-2xl shadow-2xl dark:shadow-black/70 transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl dark:group-hover:shadow-black/80 border border-themed/20 dark:border-slate-600/40"
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
            <h3 className="text-2xl font-bold text-themed dark:text-slate-100 mb-4">
              Join the Community
            </h3>
            <p className="text-lg text-muted dark:text-slate-300 max-w-md">
              Connect with fellow music enthusiasts, share your discoveries, and
              build your musical identity.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 surface/80 dark:bg-slate-900/95 relative backdrop-blur-sm">
          {/* Enhanced Mobile background image */}
          <div className="lg:hidden absolute inset-0 opacity-5 dark:opacity-10">
            <img 
              src={register.image} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-surface/90 via-surface/80 to-surface/90 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95"></div>
          </div>
          
          <div className="max-w-md w-full space-y-8 relative z-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-themed">
                {register.title}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Join thousands of music lovers today
              </p>
            </div>

            {errors.submit && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            {/* Social Sign Up */}
            <div className="space-y-3">
              <button
                onClick={() => handleSocialSignUp("google")}
                className="w-full flex items-center justify-center px-4 py-3 border border-themed/20 dark:border-slate-600/30 rounded-lg surface dark:bg-slate-800/60 hover:bg-themed/5 dark:hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md dark:hover:shadow-black/30 backdrop-blur-sm"
              >
                <Chrome className="w-5 h-5 mr-3 text-primary" />
                <span className="text-themed font-medium">
                  Continue with Google
                </span>
              </button>

              <button
                onClick={() => handleSocialSignUp("github")}
                className="w-full flex items-center justify-center px-4 py-3 border border-themed/20 dark:border-slate-600/30 rounded-lg surface dark:bg-slate-800/60 hover:bg-themed/5 dark:hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md dark:hover:shadow-black/30 backdrop-blur-sm"
              >
                <Github className="w-5 h-5 mr-3 text-themed" />
                <span className="text-themed font-medium">
                  Continue with GitHub
                </span>
              </button>

              <button
                onClick={() => handleSocialSignUp("apple")}
                className="w-full flex items-center justify-center px-4 py-3 border border-themed/20 dark:border-slate-600/30 rounded-lg surface dark:bg-slate-800/60 hover:bg-themed/5 dark:hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md dark:hover:shadow-black/30 backdrop-blur-sm"
              >
                <Apple className="w-5 h-5 mr-3 text-themed" />
                <span className="text-themed font-medium">
                  Continue with Apple
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-themed/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 surface text-muted">
                  Or create with email
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-themed dark:text-slate-300 mb-2"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    {register.form.fields[0].label}
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-themed/30 dark:border-slate-600/50 rounded-lg surface dark:bg-slate-800/60 text-themed dark:text-slate-200 placeholder-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50 focus:border-primary dark:focus:border-blue-400 transition-all duration-300 transform focus:scale-[1.02] hover:shadow-md dark:hover:shadow-black/30 backdrop-blur-sm hover:border-themed/50 dark:hover:border-slate-500/70"
                    placeholder={register.form.fields[0].placeholder}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-themed dark:text-slate-300 mb-2"
                  >
                    <Mail className="w-4 h-4 inline mr-2" />
                    {register.form.fields[1].label}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-themed/30 dark:border-slate-600/50 rounded-lg surface dark:bg-slate-800/60 text-themed dark:text-slate-200 placeholder-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50 focus:border-primary dark:focus:border-blue-400 transition-all duration-300 transform focus:scale-[1.02] hover:shadow-md dark:hover:shadow-black/30 backdrop-blur-sm hover:border-themed/50 dark:hover:border-slate-500/70"
                    placeholder={register.form.fields[1].placeholder}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-themed dark:text-slate-300 mb-2"
                  >
                    <Lock className="w-4 h-4 inline mr-2" />
                    {register.form.fields[2].label}
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
                      placeholder={register.form.fields[2].placeholder}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {register.form.fields[2].helperText && (
                    <p className="mt-1 text-xs text-muted">{register.form.fields[2].helperText}</p>
                  )}
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-themed dark:text-slate-300 mb-2"
                  >
                    <Shield className="w-4 h-4 inline mr-2" />
                    {register.form.fields[3].label}
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-themed/30 dark:border-slate-600/50 rounded-lg surface dark:bg-slate-800/60 text-themed dark:text-slate-200 placeholder-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50 focus:border-primary dark:focus:border-blue-400 transition-all duration-300 transform focus:scale-[1.02] hover:shadow-md dark:hover:shadow-black/30 backdrop-blur-sm hover:border-themed/50 dark:hover:border-slate-500/70"
                      placeholder={register.form.fields[3].placeholder}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-primary transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Captcha Simulation */}
              <div className="border border-themed/30 dark:border-slate-600/50 rounded-lg p-4 surface dark:bg-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="captcha"
                      checked={captchaVerified}
                      onChange={handleCaptchaVerification}
                      className="h-4 w-4 text-primary dark:text-blue-400 focus:ring-primary/50 dark:focus:ring-blue-400/50 border-themed/30 dark:border-slate-600/50 dark:bg-slate-800/60 rounded backdrop-blur-sm"
                    />
                    <label
                      htmlFor="captcha"
                      className="ml-2 text-sm text-themed"
                    >
                      I'm not a robot
                    </label>
                  </div>
                  <div className="text-xs text-muted">reCAPTCHA</div>
                </div>
                {errors.captcha && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.captcha}</p>
                )}
              </div>

              {/* Terms and Newsletter */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary dark:text-blue-400 focus:ring-primary/50 dark:focus:ring-blue-400/50 border-themed/30 dark:border-slate-600/50 dark:bg-slate-800/60 rounded mt-0.5 backdrop-blur-sm"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-themed dark:text-slate-300">
                    By creating an account, you agree to our{" "}
                    <a href="/terms" className="text-primary dark:text-blue-400 hover:underline">
                      Terms of use
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-primary dark:text-blue-400 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.terms}</p>
                )}

                <div className="flex items-center">
                  <input
                    id="newsletter"
                    name="newsletterSubscribe"
                    type="checkbox"
                    checked={formData.newsletterSubscribe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary dark:text-blue-400 focus:ring-primary/50 dark:focus:ring-blue-400/50 border-themed/30 dark:border-slate-600/50 dark:bg-slate-800/60 rounded backdrop-blur-sm"
                  />
                  <label
                    htmlFor="newsletter"
                    className="ml-2 text-sm text-themed dark:text-slate-300"
                  >
                    Subscribe to our newsletter for music updates
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="auth-submit-button group"
              >
                <div className="relative flex items-center">
                  {isLoading ? (
                    <InlineSpinner size="sm" className="mr-2" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-1 11a1 1 0 112 0 1 1 0 01-2 0zm.168-6.676a1 1 0 011.664 0l.2.3a1 1 0 01-.832 1.553h-.404a1 1 0 01-.832-1.553l.204-.3z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="auth-button-text">
                    {isLoading ? "Creating account..." : register.form.submitText}
                  </span>
                </div>
              </button>
            </form>

            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-50 dark:bg-green-900/50 border border-green-300 dark:border-green-700/50 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-center backdrop-blur-sm">
                <p className="font-medium">Account created successfully!</p>
                <p className="text-sm">Redirecting to sign in...</p>
              </div>
            )}

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="font-medium text-primary dark:text-blue-400 hover:underline hover:text-primary/80 dark:hover:text-blue-300 transition-colors"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
