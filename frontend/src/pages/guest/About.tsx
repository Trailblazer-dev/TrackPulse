import { about } from '../../utils/guest/guest'

const About = () => {
  return (
    <div className="min-h-screen surface">
      {/* Main About Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
                {about.section.title}
              </h1>
              <p className="text-xl text-muted leading-relaxed">
                {about.section.content}
              </p>
              
              {/* Purpose Section */}
              <div className="surface p-6 rounded-xl shadow-lg border">
                <div className="flex items-start space-x-4">
                  <about.section2.purpose.icon className="h-8 w-8 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      {about.section2.purpose.title}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {about.section2.purpose.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="flex justify-center lg:justify-end">
              <img 
                src={about.section.img.src} 
                alt={about.section.img.alt}
                className="max-w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-start space-x-6 mb-12">
            <about.section2.who.icon className="h-10 w-10 text-green-600 mt-2" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {about.section2.who.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {about.section2.who.content.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built With Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Built With Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <about.section3.card.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {about.section3.card.title}
              </h3>
              <p className="text-gray-600">
                {about.section3.card.description}
              </p>
            </div>

            {/* Created By Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <about.section3.card2.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {about.section3.card2.title}
              </h3>
              <p className="text-gray-600">
                {about.section3.card2.description}
              </p>
            </div>

            {/* Data Source Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <about.section3.card3.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {about.section3.card3.title}
              </h3>
              <p className="text-gray-600">
                {about.section3.card3.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About