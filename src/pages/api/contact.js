export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message } = req.body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // In a real application, you would send an email or save to a database
    // For example using a service like SendGrid, Mailgun, or saving to a database

    // This is a placeholder for demonstration
    console.log('Contact form submission:', { name, email, subject, message })

    // Return success response
    return res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error in contact form submission:', error)
    return res.status(500).json({ message: 'Failed to send message' })
  }
} 