import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { FiDownload, FiMail } from 'react-icons/fi'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)
  const particlesRef = useRef(null)
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create a dedicated container for particles that won't affect content visibility
    const particlesContainer = document.createElement('div')
    particlesContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none z-0'
    sectionRef.current.appendChild(particlesContainer)
    
    const numParticles = 20 // Even fewer particles
    const particles = []
    
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full bg-primary opacity-10'
      
      const size = Math.random() * 20 + 5 // Smaller particles
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      
      // Position particles away from the center/text area
      const leftPosition = Math.random() * 100
      const topPosition = Math.random() * 100
      
      particle.style.left = `${leftPosition}%`
      particle.style.top = `${topPosition}%`
      particle.style.zIndex = '0' // Ensure particles are below content
      
      particlesContainer.appendChild(particle)
      particles.push(particle)
      
      // Small, gentle animations
      gsap.to(particle, {
        x: Math.random() * 80 - 40, // Smaller movement range
        y: Math.random() * 80 - 40,
        duration: Math.random() * 7 + 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }
    
    // Fixed animations for content - Using from animations with autoAlpha for better visibility handling
    gsap.fromTo(headingRef.current, 
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }
    )
    
    gsap.fromTo(textRef.current, 
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    )
    
    gsap.fromTo(buttonsRef.current, 
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' }
    )
    
    return () => {
      if (particles.length) {
        particles.forEach(particle => {
          gsap.killTweensOf(particle)
        })
      }
      
      particlesContainer?.remove();
    }
  }, [])
  
  return (
    <section 
      id="hero"
      ref={sectionRef}
      className="relative flex items-center min-h-screen pt-20 overflow-hidden"
    >
      {/* Static background gradient for additional visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 z-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            ref={headingRef}
            className="mb-6 opacity-0" // Start with opacity 0 to avoid flash
          >
            Buwaneka Halpage
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-primary">
              Aspiring Software Engineer
            </span>
          </h1>
          
          <p 
            ref={textRef}
            className="mb-8 text-lg md:text-xl text-gray-700 dark:text-gray-300 opacity-0" // Start with opacity 0
          >
            A Computer Science and Engineering undergraduate at the University of Moratuwa,
            driven by curiosity and passionate about technology. Ready to bring innovative
            solutions to the digital world.
          </p>
          
          <div 
            ref={buttonsRef}
            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center opacity-0" // Start with opacity 0
          >
            <Link 
              href="/resume.pdf"
              className="btn-primary"
              target="_blank"
            >
              <FiDownload className="mr-2" />
              Download CV
            </Link>
            
            <Link 
              href="#contact"
              className="btn-outline"
            >
              <FiMail className="mr-2" />
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 