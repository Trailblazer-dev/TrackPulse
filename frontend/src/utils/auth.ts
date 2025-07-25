import AuthImage from "../assets/auth.png"

// -----------------------------------------------------------------------------
//  register header content
export const rheader = {
  logo: {
    src: "/logo.png",
    alt: "TrackPulse Logo", 
    text: "TrackPulse"
  },
  authLinks: [
    {
      text: "Sign In",
      href: "/signin",
      variant: "primary" as const,
    },
    {
      text: "Home",
      href: "/",
      variant: "secondary" as const,
    },
  ],
};

//  register page
export const register = {
    title:"Create an account",
    form:{
        fields: [
            {
                name: "username",
                type: "text",
                placeholder: "Enter your username",
                label: "Username",
                required: true,
            },
            {
                name: "email",
                type: "email",
                placeholder: "Enter your email",
                label: "Email",
                required: true,
            },
            {
                name: "password",
                type: "password",
                placeholder: "Enter your password",
                label: "Password",
                required: true,
                helperText: "Use 8 or more characters with a mix of letters, numbers & symbols"
            },
            {
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirm your password",
                label: "Confirm Password",
                required: true,
            },
            {
                name: "captcha",
                type: "captcha",
                label: "I'm not a robot",
                required: true,
            },
            {
                name: "termsAgreement",
                type: "checkbox",
                label: "By creating an account, you agree to our Terms of use and Privacy Policy",
                required: true,
            },
        ],
        submitText: "Register",
        additionalText: "Already have an account? <a href='/login'>Log in</a>"
    },
    image: AuthImage
}
// -------------------------------------------------------------------------------

// login page content
export const login = {
    title:"Welcome back",
    form:{
        fields: [
            {
                name: "email",
                type: "email",
                placeholder: "Enter your email",
                label: "Email",
                required: true,
            },
            {
                name: "password",
                type: "password",
                placeholder: "Enter your password",
                label: "Password",
                required: true,
            },
            {
                name: "rememberMe",
                type: "checkbox",
                label: "Remember me",
                required: false,
            },
        ],
        submitText: "Log In",
        additionalText: "Don't have an account? <a href='/register'>Register</a>",
        forgotPassword: "<a href='/forgot-password'>Forgot your password</a>"
    },
    socialAuth: [
        {
            provider: "google",
            icon: "google-icon",
            text: "Continue with Google"
        },
        {
            provider: "facebook",
            icon: "facebook-icon",
            text: "Continue with Facebook"
        }
    ],
    image: AuthImage
}


//  login header content
export const lheader = {
  logo: {
    src: "/logo.png",
    alt: "TrackPulse Logo",
    text: "TrackPulse"
  },
  authLinks: [
    {
      text: "Home",
      href: "/",
      variant: "secondary" as const,
    },
    {
      text: "Register",
      href: "/register",
      variant: "primary" as const,
    },
  ],
};



// ------------------------------------------------------------------------------
// forgot password page content
export const forgotPassword = {
    title: "Reset your password",
    form: {
        fields: [
            {
                name: "email",
                type: "email",
                placeholder: "Enter your email",
                label: "Email",
                required: true,
            },
            {
                name: "captcha",
                type: "captcha",
                label: "I'm not a robot",
                required: true,
            },
            {
                name: "termsAgreement",
                type: "checkbox",
                label: "By resetting your password, you agree to our Terms of use and Privacy Policy",
                required: true,
            }
        ],
        submitText: "Send reset link",
        additionalText: "<a href='/signin'>Back to sign in</a>"
    },
    image: AuthImage
}

// forgot password header content
export const fpheader = {
  logo: {
    src: "/logo.png",
    alt: "TrackPulse Logo",
    text: "TrackPulse"
  },
  authLinks: [
    {
      text: "Home",
      href: "/",
      variant: "secondary" as const,
    },
    {
      text: "Sign In",
      href: "/signin",
      variant: "primary" as const,
    },
  ],
};


// ------------------------------------------------------------------------------

// reset password page content this will be triggered in the settings pages

export const resetPassword = {
    title: "Create a new password",
    form: {
        fields: [
            {
                name: "newPassword",
                type: "password",
                placeholder: "Enter your new password",
                label: "New Password",
                required: true,
            },
            {
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirm your new password",
                label: "Confirm Password",
                required: true,
            },
        ],
        submitText: "Reset Password",
        additionalText: "<a href='/signin'>Back to sign in</a>"
    },
    image: AuthImage
}

// reset password header content
export const rpheader = {
  logo: {
    src: "/logo.png",
    alt: "TrackPulse Logo", 
    text: "TrackPulse"
  },
  authLinks: [
    {
      text: "Home",
      href: "/",
      variant: "secondary" as const,
    },
    {
      text: "Sign In",
      href: "/signin",
      variant: "primary" as const,
    },
  ],
};