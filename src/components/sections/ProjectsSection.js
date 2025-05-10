import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  
  const projects = [
    {
      title: 'Full-Stack Product Store',
      description: 'An e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product search, cart functionality, and payment integration.',
      image: '/placeholder-project.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      liveLink: '#',
      githubLink: '#',
      inProgress: true,
    },
    {
      title: 'HTML Portfolio',
      description: 'Personal portfolio website built with HTML, CSS, and vanilla JavaScript. Responsive design with smooth animations and contact form.',
      image: '/placeholder-project.jpg',
      tags: ['HTML', 'CSS', 'JavaScript'],
      liveLink: '#',
      githubLink: '#',
    },
    {
      title: 'TinDOG Website Clone',
      description: 'A creative clone of a popular website with a dog-themed twist. Built using Bootstrap for responsive design and modern UI components.',
      image: '/placeholder-project.jpg',
      tags: ['HTML', 'CSS', 'Bootstrap'],
      liveLink: '#',
      githubLink: '#',
    },
  ]
  
  useEffect(() => {
    if (!cardsRef.current) return;
    
    // Register ScrollTrigger to ensure it's available
    gsap.registerPlugin(ScrollTrigger);
    
    const cards = cardsRef.current.querySelectorAll('.project-card');
    
    // Improved animation using fromTo for better control
    gsap.fromTo(cards, 
      { y: 50, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
    
    // Add hover animations programmatically for more control
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    });
    
    // Cleanup event listeners
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="section bg-light-darker dark:bg-dark-lighter"
    >
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card group bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 opacity-0"
            >
              <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                {/* Replace with actual project images */}
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                  <p>Project Image</p>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 transition-opacity group-hover:opacity-100">
                  {project.liveLink && (
                    <Link 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full text-primary hover:bg-gray-100 transition-colors"
                      aria-label="View live project"
                    >
                      <FiExternalLink size={20} />
                    </Link>
                  )}
                  
                  {project.githubLink && (
                    <Link 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full text-primary hover:bg-gray-100 transition-colors"
                      aria-label="View source code"
                    >
                      <FiGithub size={20} />
                    </Link>
                  )}
                </div>
                
                {/* In Progress Badge */}
                {project.inProgress && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                    In Progress
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl mb-2">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 