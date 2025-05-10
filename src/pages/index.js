import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Layout from '@/components/Layout'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  useEffect(() => {
    // Make sure ScrollTrigger is registered in this component too
    gsap.registerPlugin(ScrollTrigger);
    
    // Force a refresh of ScrollTrigger when all components have mounted
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true); // true = forces a refresh even if no change is detected
    }, 500); // small delay to ensure all components have fully rendered
    
    return () => clearTimeout(refreshTimeout);
  }, []);
  
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </Layout>
  )
} 