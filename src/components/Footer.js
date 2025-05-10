import Link from 'next/link'
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/yourusername', icon: FiGithub },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/buwanekahalpage', icon: FiLinkedin },
    { name: 'Twitter', href: 'https://twitter.com/yourusername', icon: FiTwitter },
    { name: 'Email', href: 'mailto:your.email@example.com', icon: FiMail },
  ]
  
  return (
    <footer className="bg-light-darker dark:bg-dark-lighter py-8">
      <div className="container">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div>
            <p className="text-center md:text-left">
              &copy; {currentYear} Buwaneka Halpage. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
} 