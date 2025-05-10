import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, title = 'Buwaneka Halpage - Software Engineer' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Portfolio website of Buwaneka Halpage, Computer Science and Engineering undergraduate at the University of Moratuwa." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
} 