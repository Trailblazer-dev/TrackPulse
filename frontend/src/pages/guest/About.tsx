import { about } from '../../utils/guest/guest'

const About = () => {
  return (
    <div className="min-h-screen bg-primary transition-colors duration-300">
      {/* Main About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-themed leading-tight transition-colors">
                {about.section.title}
              </h1>
              <p className="text-xl text-muted leading-relaxed transition-colors">
                {about.section.content}
              </p>
              
              {/* Purpose Section */}
              <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 transform hover:scale-[1.01] border border-themed/10 p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg">
                    <about.section2.purpose.icon className="h-6 w-6 text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-themed mb-3 transition-colors">
                      {about.section2.purpose.title}
                    </h3>
                    <p className="text-muted leading-relaxed transition-colors">
                      {about.section2.purpose.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <img 
                  src={about.section.img.src} 
                  alt={about.section.img.alt}
                  className="max-w-full h-auto rounded-xl shadow-themed-lg transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-themed-xl relative z-10"
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500/60 dark:bg-blue-500/80 rounded-full opacity-60 dark:opacity-80 animate-bounce shadow-lg z-0"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500/60 dark:bg-purple-500/80 rounded-full opacity-60 dark:opacity-80 animate-bounce delay-1000 shadow-lg z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section className="py-16 surface-accent transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6 mb-12">
            <div className="bg-green-500/10 dark:bg-green-700/30 p-4 rounded-lg mb-6 md:mb-0 inline-flex shadow-themed-md">
              <about.section2.who.icon className="h-8 w-8 text-green-600 dark:text-green-300 transition-colors" />
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold text-themed mb-8 transition-colors">
                {about.section2.who.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {about.section2.who.content.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 group surface rounded-lg p-4 shadow-themed-sm border border-themed/10 transition-all duration-200 hover:bg-green-50 dark:hover:bg-green-900/40"
                  >
                    <div className="w-2 h-2 bg-green-500 dark:bg-green-300 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-muted dark:text-green-100 group-hover:text-themed transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built With Section */}
      <section className="py-16 md:py-24 bg-primary transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-themed text-center mb-12 transition-colors">
            Our Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Built With Card */}
            <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 transform hover:scale-[1.03] border border-themed/10 p-8 text-center">
              <div className="bg-blue-500/10 dark:bg-blue-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <about.section3.card.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-themed mb-4 transition-colors">
                {about.section3.card.title}
              </h3>
              <p className="text-muted transition-colors">
                {about.section3.card.description}
              </p>
            </div>

            {/* Created By Card */}
            <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 transform hover:scale-[1.03] border border-themed/10 p-8 text-center">
              <div className="bg-purple-500/10 dark:bg-purple-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <about.section3.card2.icon className="h-8 w-8 text-purple-600 dark:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-themed mb-4 transition-colors">
                {about.section3.card2.title}
              </h3>
              <p className="text-muted transition-colors">
                {about.section3.card2.description}
              </p>
            </div>

            {/* Data Source Card */}
            <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 transform hover:scale-[1.03] border border-themed/10 p-8 text-center">
              <div className="bg-green-500/10 dark:bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <about.section3.card3.icon className="h-8 w-8 text-green-600 dark:text-green-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-themed mb-4 transition-colors">
                {about.section3.card3.title}
              </h3>
              <p className="text-muted transition-colors">
                {about.section3.card3.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cta-section rounded-xl p-8 md:p-10 shadow-lg relative overflow-hidden">
            {/* Background gradient orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/2"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to explore your music analytics?</h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join TrackPulse today and discover insights about your listening habits, trends, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/register" 
                  className="cta-sphere-button bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  Get Started Free
                </a>
                <a 
                  href="/explore" 
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all transform hover:scale-105"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About