import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FiAward, FiBookOpen, FiCheck } from 'react-icons/fi'

export default function EducationSection() {
  const sectionRef = useRef(null)
  const educationRef = useRef(null)
  const certificationsRef = useRef(null)
  
  const education = [
    {
      institution: 'University of Moratuwa',
      degree: 'B.Sc(Hons) in Computer Science and Engineering',
      period: '2024 - Present',
      description: 'Currently pursuing a bachelor\'s degree with a focus on Cyber Security, software engineering, and artificial intelligence.',
    },
    {
      institution: 'Rahula College Matara',
      degree: 'Advanced Level Education',
      period: '2020 - 2023',
      description: 'Completed advanced level studies with a focus on Mathematics, Physics, and Chemistry, achieving excellent results that secured admission to the University of Moratuwa.',
    },
  ]
  
  const certifications = [
    {
      title: 'The Complete Web Development Bootcamp',
      issuer: 'Udemy - Dr. Angela Yu',
      year: '2023',
      description: 'Comprehensive course covering HTML, CSS, JavaScript, Node.js, React, MongoDB, and more.',
    },
    {
      title: 'HackerRank Gold in Python',
      issuer: 'HackerRank',
      year: '2023',
      description: 'Achieved gold-level proficiency in Python programming through various challenges and problem-solving tasks.',
    },
    {
      title: 'C++ Beginner Course',
      issuer: 'Sololearn',
      year: '2022',
      description: 'Introduction to C++ programming language covering basic syntax, data types, control structures, and object-oriented programming concepts.',
    },
  ]
  
  useEffect(() => {
    if (!educationRef.current || !certificationsRef.current) return;
    
    // Register ScrollTrigger to ensure it's available
    gsap.registerPlugin(ScrollTrigger);
    
    const educationItems = educationRef.current.querySelectorAll('.education-item');
    const certificationItems = certificationsRef.current.querySelectorAll('.certification-item');
    
    // Enhanced animation for education items with border effect
    educationItems.forEach((item, index) => {
      // First animate the border appearance
      gsap.fromTo(
        item,
        { borderLeftWidth: 0, autoAlpha: 0, x: -30 },
        { 
          borderLeftWidth: 4, 
          autoAlpha: 1, 
          x: 0,
          duration: 0.8,
          delay: index * 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: educationRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
    
    // Staggered animation for certification items
    gsap.fromTo(
      certificationItems,
      { y: 30, autoAlpha: 0 },
      { 
        y: 0, 
        autoAlpha: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: certificationsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      }
    );
    
    // Add subtle hover effect to certification items
    certificationItems.forEach(item => {
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
      certificationItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
  return (
    <section 
      id="education"
      ref={sectionRef}
      className="section bg-light-darker dark:bg-dark-lighter"
    >
      <div className="container">
        <h2 className="section-title">Education & Certifications</h2>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Education Column */}
          <div>
            <div className="flex items-center mb-6">
              <FiBookOpen size={24} className="text-primary mr-3" />
              <h3 className="text-2xl">Academic Journey</h3>
            </div>
            
            <div 
              ref={educationRef}
              className="space-y-8"
            >
              {education.map((item, index) => (
                <div 
                  key={index}
                  className="education-item bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-lg border-l-4 border-primary opacity-0"
                >
                  <h4 className="text-xl mb-1">{item.institution}</h4>
                  <p className="text-primary font-medium mb-1">{item.degree}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.period}</p>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Certifications Column */}
          <div>
            <div className="flex items-center mb-6">
              <FiAward size={24} className="text-primary mr-3" />
              <h3 className="text-2xl">Certifications</h3>
            </div>
            
            <div 
              ref={certificationsRef}
              className="space-y-4"
            >
              {certifications.map((item, index) => (
                <div 
                  key={index}
                  className="certification-item bg-white dark:bg-dark-lighter p-6 rounded-lg shadow-lg opacity-0 cursor-pointer transition-shadow"
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <span className="text-sm text-gray-500">{item.year}</span>
                  </div>
                  <p className="text-primary text-sm mb-3">{item.issuer}</p>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 