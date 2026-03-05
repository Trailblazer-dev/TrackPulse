import { useState } from 'react'
import { contact } from '../../utils/guest/guest'
import { contactApi } from '../../services/api/guest/contact'
import type { ContactFormData } from '../../services/api/guest/contact'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await contactApi.submitContactForm(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setError('Failed to send message. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary transition-colors duration-300 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-themed mb-6 transition-colors">
            {contact.title}
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto transition-colors">
            {contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="surface rounded-xl shadow-themed-md hover:shadow-themed-lg transition-all duration-300 border border-themed/10 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-themed mb-2 transition-colors">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 border border-themed/30 rounded-lg surface text-themed placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-themed mb-2 transition-colors">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 border border-themed/30 rounded-lg surface text-themed placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-themed mb-2 transition-colors">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What would you like to tell us?"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-themed/30 rounded-lg surface text-themed placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-vertical"
                    />
                </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">Message sent successfully!</p>}
              <button
                type="submit"
                className="auth-submit-button font-semibold"
                disabled={loading}
              >
                {loading ? 'Sending...' : contact.form.submitText}
              </button>
            </form>
          </div>

          {/* Contact Image and Info */}
          <div className="space-y-8">
            {/* Image */}
            <div className="surface rounded-xl shadow-themed-md p-8 flex items-center justify-center">
              <img 
                src={contact.image.src} 
                alt={contact.image.alt}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Contact Information */}
            <div className="surface rounded-xl shadow-themed-md p-8">
              <h3 className="text-2xl font-bold text-themed mb-6 transition-colors">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-themed">Email</p>
                    <p className="text-muted">contact@trackpulse.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-themed">Phone</p>
                    <p className="text-muted">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-themed">Address</p>
                    <p className="text-muted">123 Music Street, Data City, DC 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
