import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body } = await request.json()

    // For Vercel deployment, we'll log the email and return success
    // In production, you would integrate with an email service like:
    // - Resend, SendGrid, Mailgun, etc.
    
    console.log('Contact form submission:', {
      to,
      subject,
      body,
      timestamp: new Date().toISOString()
    })

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you soon.' 
    }, { status: 200 })

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    }, { status: 500 })
  }
}