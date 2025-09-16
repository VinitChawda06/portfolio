# 🚀 Vinit Chawda - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, featuring stunning animations, interactive components, and a sleek dark theme.

## ✨ Features

- **🎨 Modern Design**: Dark theme with gradient animations and glassmorphism effects
- **📱 Fully Responsive**: Optimized for all device sizes
- **🎭 Smooth Animations**: Framer Motion powered animations and transitions
- **🎯 Interactive Components**: 3D card effects, hover animations, and modal dialogs
- **📧 Contact Form**: Integrated contact form with email functionality
- **⚡ Performance Optimized**: Built with Next.js 14 for optimal performance
- **🎪 Sections Included**:
  - Hero Section with animated profile photo
  - About Me with skills tabs
  - Projects showcase with detailed modals
  - Experience timeline
  - Leadership experience
  - Education background
  - Contact form

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Components**: Shadcn/ui
- **Icons**: Lucide React
- **Email**: Nodemailer (for contact form)

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   └── expandable-card.tsx
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/               # Static assets
│   ├── favicon.png       # Custom favicon
│   └── profile-photo.jpg # Profile image
├── portfolio-v2.tsx     # Main portfolio component
└── README.md
```

## 🎨 Customization

### Personal Information
Update the personal information in `portfolio-v2.tsx`:
- Name and title
- Skills and technologies
- Project details
- Experience timeline
- Education background
- Contact email

### Styling
- Modify Tailwind classes for styling changes
- Update gradient colors in the CSS for theme changes
- Adjust animation timings in Framer Motion components

## 📧 Contact Form Setup

The contact form supports multiple email sending methods:

1. **API Route** (Primary): Uses Nodemailer for server-side email sending
2. **Mailto Fallback**: Opens user's email client as backup

### Environment Variables (Optional)
Create a `.env.local` file for email configuration:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms
The project can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## 🎯 Performance

- ⚡ Lighthouse Score: 95+ (Performance)
- 🎨 Modern CSS with minimal bundle size
- 📱 Mobile-first responsive design
- 🖼️ Optimized images and assets

## 📞 Contact

**Vinit Chawda**
- Email: vinitchawda20@gmail.com
- GitHub: [@VinitChawda06](https://github.com/VinitChawda06)
- LinkedIn: [Vinit Chawda](https://linkedin.com/in/vinit-chawda)

---

⭐ **If you like this project, please give it a star on GitHub!** ⭐
