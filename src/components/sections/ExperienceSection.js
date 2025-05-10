import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FiBriefcase, FiUsers, FiAward } from 'react-icons/fi'

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  
  const experiences = [
    {
      title: 'oGT MED Team Leader',
      organization: 'AIESEC',
      period: 'July 2024 - Feb 2025',
      description: 'Led a team to facilitate global talent exchanges. Handled outgoing talent management and supported the selection and training of new members.',
      icon: FiUsers,
    },
    {
      title: 'Software Engineer',
      organization: 'AIESEC in Sri Lanka',
      period: 'Feb 2025 - Present',
      description: 'Developed and maintained software applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality solutions.',
      icon: FiAward,
    },
    {
      title: 'Field Representative',
      organization: 'University of Moratuwa',
      period: 'March 2025 - Present',
      description: 'Elected as a Field representative for 23rd batch of Computer Science and Engineering. Coordinated between faculty and students to address academic concerns and improve student experience.',
      icon: FiBriefcase,
    },
  ]
  
  useEffect(() => {
    if (!timelineRef.current) return;
    
    // Register ScrollTrigger to ensure it's available
    gsap.registerPlugin(ScrollTrigger);
    
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    const timelineDots = timelineRef.current.querySelectorAll('.timeline-dot');
    const timelineCards = timelineRef.current.querySelectorAll('.timeline-card');
    
    // Create a master timeline for better sequencing
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    });
    
    // Animate timeline line first
    masterTimeline.fromTo(
      '.timeline-line',
      { height: 0 },
      {
        height: '100%',
        duration: 2.0, // Slower line drawing
        ease: 'power2.inOut',
      }
    );
    
    // Animate timeline dots with increased duration
    masterTimeline.fromTo(
      timelineDots,
      { scale: 0, autoAlpha: 0 },
      {
        scale: 1,
        autoAlpha: 1,
        stagger: 0.6, // Increased stagger time
        duration: 0.7, // Slower animation
        ease: 'back.out(1.7)',
      }, 
      "-=1.5" // Start a bit before the line finishes
    );
    
    // Animate timeline cards with increased stagger and duration
    masterTimeline.fromTo(
      timelineCards,
      { x: (index) => index % 2 === 0 ? 50 : -50, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        stagger: 0.8, // Much slower stagger for a more deliberate reveal
        duration: 1.2, // Longer animation time
        ease: 'power1.inOut', // Smoother easing
      },
      "-=1.8" // Start a bit before the dots finish
    );
    
    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section 
      id="experience"
      ref={sectionRef}
      className="section"
    >
      <div className="container">
        <h2 className="section-title">My Experience</h2>
        
        <div 
          ref={timelineRef}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="timeline-line absolute left-0 md:left-1/2 h-full w-px bg-gray-300 dark:bg-gray-700 transform md:-translate-x-px"></div>
          
          {experiences.map((experience, index) => {
            const Icon = experience.icon
            const isEven = index % 2 === 0
            
            return (
              <div 
                key={index}
                className={`timeline-item relative flex flex-col md:flex-row ${
                  isEven ? 'md:flex-row-reverse' : ''
                } mb-12 last:mb-0 opacity-100`}
              >
                {/* Timeline Dot */}
                <div className="timeline-dot absolute left-0 md:left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white dark:border-dark-lighter transform -translate-x-1/2 flex items-center justify-center z-10 opacity-0">
                  <Icon size={16} className="text-white" />
                </div>
                
                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${
                  isEven ? 'md:pl-0 md:pr-12' : 'md:pl-12 md:pr-0'
                } pl-12`}>
                  <div className="timeline-card bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-lg opacity-0">
                    <div className="mb-2">
                      <h3 className="text-xl mb-1">{experience.title}</h3>
                      <p className="text-primary font-medium">{experience.organization}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{experience.period}</p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 