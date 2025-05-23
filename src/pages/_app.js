import '@/styles/globals.css'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ThemeProvider } from '@/context/ThemeContext'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Make sure ScrollTrigger is registered
    if (typeof window !== 'undefined') {
      // Register plugins
      gsap.registerPlugin(ScrollTrigger);
      
      // Default GSAP settings
      gsap.config({
        nullTargetWarn: false,
      });
      
      // Force GSAP to refresh on page load to handle any scroll position issues
      ScrollTrigger.refresh();
    }
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp 