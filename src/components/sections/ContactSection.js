import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

export default function ContactSection() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null,
    })
    
    // For demo purposes, simulate form submission
    setTimeout(() => {
      // Success
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null,
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({
          ...prev,
          isSubmitted: false,
        }))
      }, 5000)
    }, 1500)
    
    // In a real application, you would send the data to a server
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   })
    //   
    //   if (!response.ok) throw new Error('Failed to submit form')
    //   
    //   setFormStatus({
    //     isSubmitting: false,
    //     isSubmitted: true,
    //     error: null,
    //   })
    // } catch (error) {
    //   setFormStatus({
    //     isSubmitting: false,
    //     isSubmitted: false,
    //     error: error.message,
    //   })
    // }
  }
  
  useEffect(() => {
    if (!formRef.current || !infoRef.current) return;
    
    // Register ScrollTrigger to ensure it's available
    gsap.registerPlugin(ScrollTrigger);
    
    // Enhanced animations with Y translation for better visibility
    gsap.fromTo(
      formRef.current,
      { y: 50, autoAlpha: 0 },
      { 
        y: 0,
        autoAlpha: 1, 
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
    
    // Staggered animation for contact info items
    const infoItems = infoRef.current.querySelectorAll('.contact-info-item');
    gsap.fromTo(
      infoItems,
      { y: 30, autoAlpha: 0 },
      { 
        y: 0,
        autoAlpha: 1, 
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
    
    // Add hover effect to contact info items
    infoItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          y: -5,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          duration: 0.2,
          ease: 'power1.out'
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          y: 0,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          duration: 0.2,
          ease: 'power1.in'
        });
      });
    });
    
    // Cleanup event listeners
    return () => {
      infoItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      content: 'youremail@example.com',
      link: 'mailto:youremail@example.com',
    },
    {
      icon: FiPhone,
      title: 'Phone',
      content: '+94 76 123 4567',
      link: 'tel:+94761234567',
    },
    {
      icon: FiMapPin,
      title: 'Location',
      content: 'Colombo, Sri Lanka',
      link: 'https://maps.google.com/?q=Colombo,Sri+Lanka',
    },
  ]
  
  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="section"
    >
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div ref={formRef} className="opacity-0">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-lighter p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-dark text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {formStatus.isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
                
                {formStatus.isSubmitted && (
                  <div className="p-4 rounded-md bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100">
                    Your message has been sent successfully. I'll get back to you soon!
                  </div>
                )}
                
                {formStatus.error && (
                  <div className="p-4 rounded-md bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100">
                    {formStatus.error}
                  </div>
                )}
              </div>
            </form>
          </div>
          
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              
              return (
                <a 
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-item flex items-center p-6 bg-white dark:bg-dark-lighter rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl opacity-0 cursor-pointer"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mr-6">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
                  </div>
                </a>
              )
            })}
            
            <div className="mt-10 p-6 bg-primary/5 rounded-lg">
              <h3 className="text-xl mb-4">Social Profiles</h3>
              <div className="flex space-x-4">
                {/* Add your social media links here */}
                {/* Example: */}
                {/* <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                  <FiGithub size={24} className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 