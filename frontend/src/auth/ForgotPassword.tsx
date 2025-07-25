import React, { useState } from "react";
import { Mail, ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { forgotPassword } from "../utils/auth";
import InlineSpinner from "../components/common/InlineSpinner";
import AuthLayout from "../layouts/AuthLayout";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<"email" | "success">("email");
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!captchaVerified) {
      newErrors.captcha = "Please complete the captcha verification";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

      // Show success step
      setStep("success");
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptchaVerification = () => {
    setCaptchaVerified(!captchaVerified);
    if (errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: "" }));
    }
  };

  const renderEmailStep = () => (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-themed">{forgotPassword.title}</h2>
        <p className="mt-2 text-sm text-muted">
          Enter your email address and we'll send you a link to reset your
          password
        </p>
      </div>

      {errors.submit && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-themed mb-2"
          >
            <Mail className="w-4 h-4 inline mr-2" />
            {forgotPassword.form.fields[0].label}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-themed/30 rounded-lg surface text-themed placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 transform focus:scale-[1.02] hover:shadow-md dark:hover:shadow-black/25"
            placeholder={forgotPassword.form.fields[0].placeholder}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Captcha Simulation */}
        <div className="border border-themed/30 rounded-lg p-4 surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="captcha"
                checked={captchaVerified}
                onChange={handleCaptchaVerification}
                className="h-4 w-4 text-primary focus:ring-primary/50 border-themed/30 rounded"
              />
              <label htmlFor="captcha" className="ml-2 text-sm text-themed">
                {forgotPassword.form.fields[1].label}
              </label>
            </div>
            <div className="text-xs text-muted">reCAPTCHA</div>
          </div>
          {errors.captcha && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.captcha}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="auth-submit-button group"
        >
          <div className="relative flex items-center">
            {isLoading ? <InlineSpinner size="sm" className="mr-2" /> : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            )}
            <span className="auth-button-text">
              {isLoading ? "Sending reset link..." : forgotPassword.form.submitText}
            </span>
          </div>
        </button>
      </form>

      <div className="text-center">
        <a
          href="/signin"
          className="inline-flex items-center text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to sign in
        </a>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="max-w-md w-full space-y-8 text-center">
      <div>
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-themed">Check your email</h2>
        <p className="mt-2 text-sm text-muted">
          We've sent a password reset link to <strong>{formData.email}</strong>
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-medium mb-1">Security tip:</p>
            <p>
              The reset link will expire in 24 hours. If you don't see the
              email, check your spam folder.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setStep("email")}
          className="w-full py-2 px-4 border border-themed/20 rounded-lg surface text-themed hover:bg-themed/5 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md dark:hover:shadow-black/25"
        >
          Resend email
        </button>

        <a
          href="/signin"
          className="inline-flex items-center justify-center w-full py-2 px-4 text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to sign in
        </a>
      </div>
    </div>
  );

  return (
    <AuthLayout pageType="forgot-password">
      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
        {/* Left Side - Visual */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 relative overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20">
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/30 dark:bg-primary/50 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/30 dark:bg-secondary/50 rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/30 dark:bg-accent/50 rounded-full animate-pulse delay-700"></div>
          </div>

          {/* Professional glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 dark:from-slate-800/30 dark:via-slate-900/20 dark:to-slate-800/40 backdrop-blur-sm"></div>
          
          <div className="text-center p-8 relative z-10">
            <div className="mb-8 relative group">
              <img 
                src={forgotPassword.image} 
                alt="Account Recovery" 
                className="w-80 h-80 mx-auto object-cover rounded-2xl shadow-2xl dark:shadow-black/70 transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl dark:group-hover:shadow-black/80 border border-themed/20 dark:border-slate-600/40"
              />
              
              {/* Music-themed decorative elements */}
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
              Secure Account Recovery
            </h3>
            <p className="text-lg text-muted dark:text-slate-300 max-w-md">
              We'll help you regain access to your account safely and securely.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 surface/80 dark:bg-slate-900/95 relative backdrop-blur-sm">
          {/* Enhanced Mobile background image */}
          <div className="lg:hidden absolute inset-0 opacity-5 dark:opacity-10">
            <img 
              src={forgotPassword.image} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-surface/90 via-surface/80 to-surface/90 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95"></div>
          </div>
          
          <div className="relative z-10">
            {step === "email" ? renderEmailStep() : renderSuccessStep()}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
