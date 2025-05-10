import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@/context/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ]
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-md' : ''
    }`}>
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link 
          href="/"
          className="text-xl font-bold text-primary"
        >
          Buwaneka Halpage
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center">
          <ul className="flex items-center space-x-8 mr-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Theme Toggle Button - Desktop */}
          <button
            onClick={toggleTheme}
            className="p-2 ml-4 rounded-full bg-light-darker dark:bg-dark-lighter transition-colors hover:text-primary"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
        
        {/* Mobile Menu and Theme Toggle */}
        <div className="flex items-center md:hidden">
          {/* Theme Toggle Button - Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full bg-light-darker dark:bg-dark-lighter transition-colors hover:text-primary"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-dark pt-16">
          <nav className="container py-5">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
} 