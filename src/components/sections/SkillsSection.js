import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FiCode, FiDatabase, FiLayers, FiTool } from 'react-icons/fi'

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)
  
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: FiCode,
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Java', level: 85 },
        { name: 'C++', level: 75 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 90 },
      ],
    },
    {
      title: 'Frameworks & Libraries',
      icon: FiLayers,
      skills: [
        { name: 'React', level: 80 },
        { name: 'Node.js', level: 75 },
        { name: 'Next.js', level: 70 },
        { name: 'Bootstrap', level: 85 },
        { name: 'TailwindCSS', level: 80 },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: FiTool,
      skills: [
        { name: 'Git/GitHub', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Docker', level: 65 },
        { name: 'Vercel', level: 75 },
        { name: 'Figma', level: 70 },
      ],
    },
    {
      title: 'Databases',
      icon: FiDatabase,
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'Firebase', level: 70 },
        { name: 'PostgreSQL', level: 65 },
        { name: 'Redis', level: 60 },
      ],
    },
  ]
  
  useEffect(() => {
    if (!cardsRef.current) return;
    
    // Register ScrollTrigger to ensure it's available
    gsap.registerPlugin(ScrollTrigger);
    
    const cards = cardsRef.current.querySelectorAll('.skill-card');
    
    // Create a ScrollTrigger for the whole section
    const sectionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      onEnter: () => animateCards()
    });
    
    function animateCards() {
      // Improved card animations with fromTo for better control
      gsap.fromTo(cards, 
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.2,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            // Once cards are visible, animate progress bars
            animateProgressBars();
          }
        }
      );
    }
    
    function animateProgressBars() {
      cards.forEach((card, cardIndex) => {
        const progressBars = card.querySelectorAll('.progress-bar');
        const progressValues = card.querySelectorAll('.progress-value');
        
        // Create a timeline for each card
        const tl = gsap.timeline({
          defaults: {
            duration: 1.5,
            ease: 'power2.inOut'
          }
        });
        
        // Animate each progress bar with a small stagger
        progressBars.forEach((bar, index) => {
          const targetWidth = bar.getAttribute('data-level') + '%';
          
          // Start with width 0
          gsap.set(bar, { width: 0 });
          
          // Add to timeline with staggered delay
          tl.to(bar, {
            width: targetWidth,
            duration: 1.2,
            delay: cardIndex * 0.1 + index * 0.1
          }, index * 0.1);
          
          // If we have counter values, animate those too
          if (progressValues[index]) {
            const value = parseInt(progressValues[index].getAttribute('data-level'), 10);
            
            tl.fromTo(progressValues[index], 
              { textContent: '0' },
              { 
                textContent: value,
                duration: 1.2,
                roundProps: "textContent", // Only integers during animation
                onUpdate: function() {
                  progressValues[index].textContent = Math.round(this.targets()[0].textContent) + '%';
                }
              }, 
              index * 0.1 // To match the start time of the width animation
            );
          }
        });
      });
    }
    
    // Clean up the ScrollTrigger when component unmounts
    return () => {
      sectionTrigger.kill();
    };
  }, []);
  
  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="section"
    >
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            
            return (
              <div 
                key={index}
                className="skill-card p-6 bg-white dark:bg-dark-lighter rounded-lg shadow-lg opacity-0"
              >
                <div className="flex items-center mb-6">
                  <Icon size={24} className="text-primary mr-3" />
                  <h3 className="text-xl">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="progress-value text-sm text-gray-500" data-level={skill.level}>{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="progress-bar h-full bg-primary rounded-full" 
                          data-level={skill.level}
                          style={{ width: 0 }} // Start at 0 width
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 