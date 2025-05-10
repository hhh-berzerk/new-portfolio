import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

export default function AboutSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const skillsRef = useRef(null)
  
  const skills = [
    'Leadership', 'Communication', 'Problem Solving', 
    'Critical Thinking', 'Creativity', 'Team Work',
    'Adaptability', 'Time Management'
  ]
  
  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !imageRef.current || !skillsRef.current) return;
    
    // Register ScrollTrigger to ensure it's available
    gsap.registerPlugin(ScrollTrigger);
    
    // Fixed animations that properly handle opacity transitions
    gsap.fromTo(textRef.current,
      { y: 50, autoAlpha: 0 },
      { 
        y: 0, 
        autoAlpha: 1, 
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
    
    gsap.fromTo(imageRef.current,
      { y: 50, autoAlpha: 0 },
      { 
        y: 0, 
        autoAlpha: 1, 
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
    
    const skillElements = skillsRef.current.querySelectorAll('.skill-tag');
    
    gsap.fromTo(skillElements,
      { y: 25, autoAlpha: 0 },
      { 
        y: 0, 
        autoAlpha: 1, 
        stagger: 0.1,
        duration: 0.5,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, []);
  
  return (
    <section 
      id="about"
      ref={sectionRef}
      className="section bg-light-darker dark:bg-dark-lighter"
    >
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div ref={textRef} className="opacity-0">
            <p className="mb-6">
              I am a Computer Science and Engineering undergraduate at the University of Moratuwa, 
              with a strong interest in software development and innovative tech solutions. 
              My journey into the world of technology began with simple coding challenges and 
              has evolved into a passion for building efficient, user-friendly applications.
            </p>
            <p className="mb-6">
              Outside of academics, I actively participate in extracurricular activities through 
              organizations like AIESEC and IEEE, where I've developed strong leadership and 
              communication skills. These experiences have shaped my approach to collaborative 
              project work and problem-solving.
            </p>
            <p>
              I'm constantly seeking opportunities to learn new technologies and apply my knowledge 
              to real-world problems. My goal is to develop solutions that make a positive impact 
              and contribute meaningfully to the tech community.
            </p>
          </div>
          
          <div className="flex flex-col space-y-8">
            <div ref={imageRef} className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl opacity-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10"></div>
              {/* Profile image */}
              <div className="relative w-full h-full">
                <Image 
                  src="/Buwaneka.jpg" 
                  alt="Buwaneka Halpage" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  priority
                />
              </div>
            </div>
            
            <div ref={skillsRef} className="flex flex-wrap gap-3 opacity-100">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="skill-tag px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium opacity-0"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 