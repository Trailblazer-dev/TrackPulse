import { footer } from '../../utils/footer'
import { ExternalLink, ArrowRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Compact CTA Section */}
      <div className="footer-cta py-12 sm:py-16 relative overflow-hidden">
        {/* Dark Effect Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
        
        {/* Subtle Dark Patterns */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-8 w-24 h-24 bg-black/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 right-12 w-32 h-32 bg-black/8 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-black/6 rounded-full blur-lg"></div>
        </div>
        
        {/* Inner Shadow Effect */}
        <div className="absolute inset-0 shadow-inner-dark"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Text Content Container - Left Side */}
            <div className="flex-1 text-center lg:text-left">
              {/* Compact Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Ready to Explore Music Analytics?
              </h2>
              
              {/* Shorter Description */}
              <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed">
                Discover insights from music data with our analytics platform.
              </p>
            </div>
            
            {/* Sphere Button - Right Side */}
            <div className="flex justify-center lg:justify-end">
              <button className="cta-sphere-button relative overflow-hidden group">
                <div className="sphere-gradient absolute inset-0"></div>
                <span className="relative z-10 text-white font-semibold text-base flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo and Description */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center mb-4">
              <img 
                src="/logo.png" 
                alt="TrackPulse Logo" 
                className="h-8 sm:h-10 w-auto mr-3"
                onError={(e) => {
                  console.error("Logo failed to load in footer");
                  e.currentTarget.style.display = 'none';
                  // Show text instead
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const textNode = document.createElement('span');
                    textNode.className = "text-xl sm:text-2xl font-bold text-primary";
                    textNode.textContent = "TP";
                    parent.prepend(textNode);
                  }
                }}
              />
              <span className="text-xl sm:text-2xl font-bold text-primary">TrackPulse</span>
            </div>
            <p className="text-muted max-w-md text-base sm:text-lg">
              Discover music trends from real-world data. Analyze genres, artists, and global sales with our comprehensive analytics platform.
            </p>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {footer.sections.map((section, index) => (
              <div key={index} className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4 border-b border-muted/20 pb-2">
                  {section.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : '_self'}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="footer-link inline-flex items-center space-x-1 group text-sm sm:text-base"
                      >
                        <span>{link.text}</span>
                        {link.href.startsWith('http') && (
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media & Newsletter */}
          <div className="footer-social-section border-t border-muted/20 pt-6 sm:pt-8 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              {/* Social Media Links */}
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
                <span className="text-muted font-medium text-sm sm:text-base">Follow us:</span>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Trailblazer-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="GitHub"
                  >
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <span className="text-muted font-medium text-sm sm:text-base">Stay updated:</span>
                <div className="flex w-full sm:w-auto max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="newsletter-input px-3 sm:px-4 py-2 rounded-l-lg border focus:outline-none focus:border-blue-500 transition-colors duration-200 flex-1 text-sm sm:text-base"
                  />
                  <button className="btn-primary px-4 sm:px-6 py-2 rounded-r-lg font-medium text-sm sm:text-base">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright border-t border-muted/20 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-muted text-xs sm:text-sm space-y-4 md:space-y-0">
              <p>{footer.footer}</p>
              <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
                <a href="/privacy-policy" className="footer-link">
                  Privacy Policy
                </a>
                <a href="/terms-of-service" className="footer-link">
                  Terms of Service
                </a>
                <a href="/cookies" className="footer-link">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer