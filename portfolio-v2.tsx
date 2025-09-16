"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  Code,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpandableCard, type CardItem } from "@/components/expandable-card"

// TypeScript interfaces
interface ExperienceItem {
  company?: string
  position?: string
  duration?: string
  period?: string
  title?: string
  institution?: string
  description: string
  technologies?: string[]
  achievements?: string[]
}

interface ExperienceCardProps {
  item: ExperienceItem
  index: number
  isLeft?: boolean
  experience: ExperienceItem[]
}

// Custom hook for typewriter effect
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, speed)

    return () => {
      clearInterval(typingInterval)
    }
  }, [text, speed])

  return displayText
}

// Card with 3D effect
const Card3D = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const posX = e.clientX - centerX
    const posY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateXValue = (posY / (rect.height / 2)) * -5 // Max 5 degrees
    const rotateYValue = (posX / (rect.width / 2)) * 5 // Max 5 degrees

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    setScale(1.02)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${className} transition-all duration-200 perspective-1000 rounded-xl`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  )
}

// Timeline Item Component with scroll animation
const TimelineItem = ({ children, index, isLeft = false }: { children: React.ReactNode; index: number; isLeft?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="flex gap-6 mb-12 last:mb-0 group"
    >
      {children}
    </motion.div>
  )
}

// Experience Card Component with modal functionality
const ExperienceCard = ({ item, index, isLeft = false, experience }: ExperienceCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const scrollPositionRef = useRef(0)

  // Handle opening the modal
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Store current scroll position
    scrollPositionRef.current = window.scrollY

    setIsModalOpen(true)
    // Disable scrolling on body
    if (typeof window !== "undefined") {
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = "100%"
    }
  }

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false)
    // Re-enable scrolling on body
    if (typeof window !== "undefined") {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""

      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current)
    }
  }

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)

      // Make sure to re-enable scrolling when component unmounts
      if (typeof window !== "undefined") {
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
      }
    }
  }, [isModalOpen])

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.7, delay: index * 0.2 }}
        className="flex gap-6 mb-12 last:mb-0 group"
      >
        <div className="hidden sm:block pt-1">
          <motion.div
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-sm relative group-hover:border-cyan-500/50 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-sm opacity-75"
                animate={{
                  opacity: [0.75, 1, 0.75],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              ></motion.div>
            </div>
          </motion.div>
          {index !== experience.length - 1 && (
            <motion.div
              className="w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-purple-600/50 opacity-30 ml-6 mt-2 group-hover:opacity-50 transition-opacity"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            ></motion.div>
          )}
        </div>

        <Card3D
          className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer"
          onClick={() => openModal({} as React.MouseEvent)}
        >
          <CardContent className="p-6">
            <Badge className="mb-2 bg-indigo-500/10 text-indigo-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
              <span className="relative">{item.period}</span>
            </Badge>
            <h3 className="text-xl font-semibold mb-1 text-white">{item.title}</h3>
            <p className="text-gray-400 mb-4">{item.institution}</p>
            <p className="text-gray-300">{item.description}</p>
          </CardContent>
        </Card3D>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.div
              ref={cardRef}
              className="relative w-full max-w-3xl bg-gradient-to-br from-[#000C40]/95 to-[#0A1A3F]/95 rounded-3xl overflow-hidden border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] max-h-[80vh] overflow-y-auto custom-scrollbar"
              initial={{ scale: 0.7, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 50, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-4 right-4 p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors z-[9999] shadow-lg"
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              <div className="p-8">
                <Badge className="mb-2 bg-indigo-500/10 text-indigo-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                  <span className="relative">{item.period}</span>
                </Badge>
                <h2 className="text-2xl font-bold mb-2 text-white">{item.title}</h2>
                <h3 className="text-xl text-cyan-400 mb-6">{item.institution}</h3>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">Description</h4>
                  <p className="text-gray-200 leading-relaxed">{item.description}</p>
                </div>

                {/* Additional content for the modal */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-lg font-semibold mb-3 text-white">Key Achievements</h4>
                  <ul className="space-y-2 text-gray-200">
                    {item.achievements?.map((achievement: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function PortfolioV2() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Function to download CV
  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/Vinit_Chawda_Resume.pdf"
    link.download = "Vinit_Chawda_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Using EmailJS for form submission - replace with your EmailJS service details
      const response = await fetch("mailto:vinitchawda20@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      // For now, we'll create a mailto link as fallback
      const mailtoLink = `mailto:vinitchawda20@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`
      
      window.location.href = mailtoLink
      alert("Opening your default email client...")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error sending message:", error)
      // Fallback to mailto link
      const mailtoLink = `mailto:vinitchawda20@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`
      
      window.location.href = mailtoLink
    } finally {
      setIsSubmitting(false)
    }
  }

  // Change active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home", icon: <Code size={18} /> },
    { id: "about", label: "About Me", icon: <User size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    { id: "leadership", label: "Leadership", icon: <User size={18} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ]

  const skills = [
    {
      category: "AI & ML",
      items: ["Multi-Agent Systems", "Deep Learning", "Scikit-Learn", "Conversational AI", "LangGraph", "HuggingFace"],
    },
    {
      category: "Programming",
      items: ["Python", "OpenCV", "FastAPI", "NumPy", "Pandas", "LangChain"],
    },
    {
      category: "Tools",
      items: ["Git", "PostgresSQL", "MongoDB", "Redis", "Drools", "Linux", "HubSpot", "Apollo", "Docker"],
    },
  ]

  const projects: CardItem[] = [
    {
      title: "Huberman Health AI Assistant",
      description:
        "End-to-end AI assistant developed in 6 hours using vibe coding, showcasing rapid prototyping skills.",
      longDescription:
        "Developed end-to-end in just 6 hours using vibe coding, showcasing rapid prototyping and execution skills. Built a semantic search and AI-powered recommendation system processing 7,700+ transcript segments with FAISS vector search and BERT embeddings. Delivered personalized health insights from Huberman Lab content, integrating OpenAI/OpenRouter, Prometheus monitoring, and CI/CD with Jenkins.",
      technologies: ["FastAPI", "Streamlit", "FAISS", "Sentence Transformers", "Docker", "Jenkins"],
      src: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/VinitChawda06",
      demo: "#",
    },
    {
      title: "DocInsight Engine",
      description: "AI-powered document analysis system with 90% contextual accuracy using LangChain and ChromaDB.",
      longDescription:
        "Built an AI-powered document analysis tool achieving 90% contextual accuracy for business intelligence. The system supports business intelligence use cases, providing actionable insights from structured and unstructured data. This project demonstrates my ability to work with advanced NLP technologies and create practical solutions for document processing and analysis.",
      technologies: ["LangChain", "ChromaDB", "Python", "NLP"],
      src: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/VinitChawda06",
      demo: "#",
    },
    {
      title: "AttendEase",
      description: "Face-recognition based attendance system with 95% accuracy, saving 180+ manual hours annually.",
      longDescription:
        "Developed a face-recognition based attendance system with 95% accuracy, automating reports and saving 180+ manual hours annually. The system is integrated with automated Excel sheet generation, demonstrating expertise in computer vision and automation. This project showcases my ability to create practical solutions that streamline processes in educational and corporate environments.",
      technologies: ["OpenCV", "Face Recognition", "Python", "Excel Automation"],
      src: "/placeholder.svg?height=200&width=350",
      github: "https://github.com/VinitChawda06",
      demo: "#",
    },
  ]

  const experience = [
    {
      period: "Apr 2025 - Jul 2025",
      title: "AI Engineer Intern",
      institution: "WEQ Technologies, Mumbai, Maharashtra",
      description:
        "Built an AI-powered multi-agent Sales Assistant with Redis-backed memory for scalable lead handling on WhatsApp. Developed Drools based rule engine with Python Fast-API, enabling dynamic lead scoring and CRM integration. Automated workflows with HubSpot and Apollo, reducing manual effort and boosting efficiency.",
      achievements: [
        "Built AI-powered multi-agent Sales Assistant with Redis-backed memory",
        "Developed Drools based rule engine with Python Fast-API",
        "Automated workflows with HubSpot and Apollo integration",
        "Enabled dynamic lead scoring and CRM integration",
      ],
    },
    {
      period: "Sep 2024 - Feb 2025",
      title: "AI Intern",
      institution: "The Mould Story, Mumbai, Maharashtra",
      description:
        "Researched and implemented AI solutions for Shopify, enhancing sales & customer engagement. Designed chatbots and process automation to optimize conversions.",
      achievements: [
        "Researched and implemented AI solutions for Shopify platform",
        "Enhanced sales and customer engagement through AI integration",
        "Designed chatbots for improved customer interaction",
        "Implemented process automation to optimize conversions",
      ],
    },
    {
      period: "Jun 2023 - Aug 2023",
      title: "Backend Developer Intern",
      institution: "Bhagwati Consultancy, Mumbai, Maharashtra",
      description:
        "Led development of a bilingual KYC portal, managing testing and deployment. Built APIs with Flask & Selenium for data scraping; developed the company website on WordPress.",
      achievements: [
        "Led development of bilingual KYC portal",
        "Built APIs with Flask & Selenium for data scraping",
        "Developed company website using WordPress",
        "Managed testing and deployment processes",
      ],
    },
  ]

  const leadership = [
    {
      period: "Jun 2023 - Jul 2024",
      title: "Senior Level Maintainer",
      institution: "TCET - Open Source, Thakur College of Engineering and Technology",
      description:
        "Led a team building an ERP system for 3,000+ students, 100+ faculties, and 50+ employees, emphasizing efficient data management and improving overall system efficiency.",
    },
    {
      period: "Sep 2022 - Sep 2024",
      title: "Creative Lead",
      institution: "SUPER-AI CLUB, Thakur College of Engineering and Technology",
      description:
        "Organized 12+ technical workshops on AI/ML technologies and coding contests, fostering innovation, collaboration, and intra-departmental engagement.",
    },
  ]

  const education = [
    {
      period: "Dec 2021 - May 2025",
      title: "Bachelor of Technology in AI & ML",
      institution: "Thakur College of Engineering and Technology",
      description:
        "GPA - 9.3. Focusing on artificial intelligence and machine learning technologies with strong foundation in multi-agent systems, deep learning, and conversational AI.",
    },
    {
      period: "Jun 2019 - Mar 2021",
      title: "Higher Secondary Certificate (HSC) - Science",
      institution: "Mithibai College",
      description: "Percentage - 88%. Completed science stream with focus on mathematics and computer science.",
    },
  ]

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 relative overflow-hidden text-gray-100 bg-gradient-to-r from-[#000C40] to-[#0A1A3F]">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMyMDIwMjAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10 rounded-b-lg">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">VC</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">Vinit Chawda</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-white/10 text-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                    : "hover:bg-white/5"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-gradient-to-r from-[#000C40] to-[#000C40]/90 pt-16"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/10 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10">{item.icon}</div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-cyan-400" />
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="order-2 md:order-1"
              >
                <div className="flex items-center gap-2 mb-4">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Badge className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 rounded-lg">AI Engineer</Badge>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 rounded-lg">
                      B.Tech Graduate
                    </Badge>
                  </motion.div>
                </div>
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-4 relative text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <span className="block">Hello, I'm</span>
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent relative">
                    Vinit Chawda
                    <motion.span
                      className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-20 blur-lg"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    ></motion.span>
                  </span>
                </motion.h1>
                <motion.div
                  className="h-12 md:h-16 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <span className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                    {useTypewriter("Bu ilding AI-driven applications and multi-agent architectures.")}
                    <span className="animate-pulse">|</span>
                  </span>
                </motion.div>
                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  B.Tech graduate in AI & ML with strong experience in developing AI-driven applications, backend
                  systems, and multi-agent architectures. Passionate about applying AI in real-world projects.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className="bg-black/50 hover:bg-white hover:text-black border-white/20 text-white transition-all duration-300 relative group overflow-hidden rounded-lg"
                      onClick={(e) => {
                        e.preventDefault()
                        const projectsSection = document.getElementById("projects")
                        if (projectsSection) {
                          projectsSection.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"></span>
                      <span className="relative flex items-center">
                        View projects <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className="bg-black/50 hover:bg-white hover:text-black border-white/20 text-white transition-all duration-300 relative group overflow-hidden rounded-lg font-semibold tracking-wide"
                      onClick={downloadCV}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-0 blur-xl transition-opacity duration-300"></span>
                      <span className="relative flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-12 flex gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.1 }}
                >
                  <motion.a
                    href="https://github.com/VinitChawda06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 5,
                      y: -5,
                      transition: { 
                        duration: 0.3,
                        repeat: 0,
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/vinit-chawda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: -5,
                      y: -5,
                      transition: { 
                        duration: 0.3,
                        repeat: 0,
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="mailto:vinitchawda20@gmail.com"
                    className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 5,
                      y: -5,
                      transition: { 
                        duration: 0.3,
                        repeat: 0,
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail size={20} />
                  </motion.a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring", delay: 0.3 }}
                className="order-1 md:order-2 flex justify-center"
              >
                <div className="relative">
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute -inset-4 z-0"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 blur-3xl opacity-20"></div>
                  </motion.div>

                  {/* Futuristic frame */}
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full relative z-10">
                    {/* Rotating border */}
                    <motion.div
                      className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-cyan-500 to-purple-600"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    
                    {/* Static image container */}
                    <div className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full overflow-hidden border-2 border-white/20">
                      <img
                        src="/profile-photo.jpg"
                        alt="Vinit Chawda"
                        className="w-full h-full object-cover object-center"
                        style={{ objectPosition: "center 20%" }}
                      />
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    />
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          {/* AI Visualization */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden z-0 opacity-30">
            <div className="flex justify-around items-end h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-cyan-500 to-purple-600 rounded-t-full"
                  initial={{ height: 0 }}
                  animate={{
                    height: Math.random() * 100 + 20,
                    transition: {
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: i * 0.1,
                      ease: "easeInOut",
                    },
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#000C40]/80 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            {/* Neural Network Visualization */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 800 800" className="w-full h-full">
                <g>
                  {/* Nodes */}
                  {[...Array(20)].map((_, i) => (
                    <motion.circle
                      key={`node-${i}`}
                      cx={100 + Math.random() * 600}
                      cy={100 + Math.random() * 600}
                      r={4 + Math.random() * 4}
                      fill={Math.random() > 0.5 ? "#22d3ee" : "#a855f7"}
                      opacity={0.7}
                      animate={{
                        r: [4 + Math.random() * 4, 6 + Math.random() * 4, 4 + Math.random() * 4],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  ))}

                  {/* Connections */}
                  {[...Array(30)].map((_, i) => {
                    const x1 = 100 + Math.random() * 600
                    const y1 = 100 + Math.random() * 600
                    const x2 = 100 + Math.random() * 600
                    const y2 = 100 + Math.random() * 600
                    return (
                      <motion.line
                        key={`line-${i}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={Math.random() > 0.5 ? "#22d3ee" : "#a855f7"}
                        strokeWidth="1"
                        opacity="0.2"
                        animate={{
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                    )
                  })}
                </g>
              </svg>
            </div>
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                <span className="relative">About Me</span>
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-white">Get to know me better</h2>
              <p className="text-gray-300">
                B.Tech graduate in AI & ML with strong experience in developing AI-driven applications and multi-agent
                architectures.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">My Story</h3>
                <p className="text-gray-300 mb-6">
                  I'm a passionate AI & ML engineer with strong experience in developing AI-driven applications, backend
                  systems, and multi-agent architectures. Skilled in Python, FastAPI, and modern AI frameworks.
                </p>
                <p className="text-gray-300 mb-6">
                  My journey through diverse internships has sharpened my problem-solving and creative thinking skills.
                  I have a proven ability to combine problem-solving and creativity to deliver impactful solutions, and
                  I'm passionate about applying AI in real-world projects.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <Card3D className="overflow-hidden">
                    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                      <div className="text-3xl font-bold text-cyan-400 mb-1">1+</div>
                      <div className="text-gray-300">Year of experience including Internships</div>
                    </div>
                  </Card3D>
                  <Card3D className="overflow-hidden">
                    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                      <div className="text-3xl font-bold text-purple-400 mb-1">9.3</div>
                      <div className="text-gray-300">GPA </div>
                    </div>
                  </Card3D>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-white">My Skills</h3>
                <Tabs defaultValue="AI & ML" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6 bg-white/10 border border-white/10 rounded-lg">
                    {skills.map((skill) => (
                      <TabsTrigger
                        key={skill.category}
                        value={skill.category}
                        className="data-[state=active]:bg-white/10 rounded-md text-white"
                      >
                        {skill.category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {skills.map((skill) => (
                    <TabsContent key={skill.category} value={skill.category} className="mt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {skill.items.map((item, index) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -5 }}
                          >
                            <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"></div>
                              <span className="text-white">{item}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#000C40]/80 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            {/* Data Visualization */}
            <div className="absolute top-20 right-0 w-full md:w-1/3 h-64 opacity-20 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* Scatter plot points */}
                {[...Array(50)].map((_, i) => (
                  <motion.circle
                    key={`point-${i}`}
                    cx={50 + Math.random() * 400}
                    cy={50 + Math.random() * 100}
                    r={2 + Math.random() * 3}
                    fill={Math.random() > 0.5 ? "#22d3ee" : "#a855f7"}
                    opacity={0.7}
                    animate={{
                      opacity: [0.7, 0.3, 0.7],
                      r: [2 + Math.random() * 3, 3 + Math.random() * 3, 2 + Math.random() * 3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                ))}

                {/* Decision boundary */}
                <motion.path
                  d="M50,120 Q150,40 250,100 T450,60"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.5"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </svg>
            </div>
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                <span className="relative">Projects</span>
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-white">My Recent Work</h2>
              <p className="text-gray-300">Here's a selection of projects I've worked on recently.</p>
            </motion.div>

            <ExpandableCard cards={projects} />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#000C40]/80 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                <span className="relative">Experience</span>
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-white">Professional Journey</h2>
              <p className="text-gray-300">My work experience and internships.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {experience.map((item, index) => (
                <ExperienceCard
                  key={index}
                  item={item}
                  index={index}
                  isLeft={index % 2 === 0}
                  experience={experience}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" className="py-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#000C40]/80 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                <span className="relative">Leadership</span>
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-white">Leadership & Extracurricular</h2>
              <p className="text-gray-300">My contributions and leadership roles.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {leadership.map((item, index) => (
                <TimelineItem key={index} index={index} isLeft={index % 2 === 0}>
                  <div className="hidden sm:block pt-1">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-sm relative group-hover:border-cyan-500/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 relative">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-sm opacity-75"
                          animate={{
                            opacity: [0.75, 1, 0.75],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        ></motion.div>
                      </div>
                    </motion.div>
                    {index !== leadership.length - 1 && (
                      <motion.div
                        className="w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-purple-600/50 opacity-30 ml-6 mt-2 group-hover:opacity-50 transition-opacity"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                      ></motion.div>
                    )}
                  </div>

                  <Card3D className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10">
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-indigo-500/10 text-indigo-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                        <span className="relative">{item.period}</span>
                      </Badge>
                      <h3 className="text-xl font-semibold mb-1 text-white">{item.title}</h3>
                      <p className="text-gray-400 mb-4">{item.institution}</p>
                      <p className="text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card3D>
                </TimelineItem>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#000C40]/80 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                <span className="relative">Education</span>
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-white">My Academic Background</h2>
              <p className="text-gray-300">My educational journey and professional training.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {education.map((item, index) => (
                <TimelineItem key={index} index={index} isLeft={index % 2 === 0}>
                  <div className="hidden sm:block pt-1">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-sm relative group-hover:border-cyan-500/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 relative">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-sm opacity-75"
                          animate={{
                            opacity: [0.75, 1, 0.75],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        ></motion.div>
                      </div>
                    </motion.div>
                    {index !== education.length - 1 && (
                      <motion.div
                        className="w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-purple-600/50 opacity-30 ml-6 mt-2 group-hover:opacity-50 transition-opacity"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                      ></motion.div>
                    )}
                  </div>

                  <Card3D className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10">
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-indigo-500/10 text-indigo-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                        <span className="relative">{item.period}</span>
                      </Badge>
                      <h3 className="text-xl font-semibold mb-1 text-white">{item.title}</h3>
                      <p className="text-gray-400 mb-4">{item.institution}</p>
                      <p className="text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card3D>
                </TimelineItem>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#000C40]/80 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-teal-500/10 text-teal-500 hover:bg-white hover:text-black transition-all duration-300 rounded-lg relative group overflow-hidden cursor-pointer">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></span>
                <span className="relative">Contact</span>
              </Badge>
              <h2 className="text-3xl font-bold mb-4 text-white">Let's Talk</h2>
              <p className="text-gray-300">Interested in working together or have a question?</p>
            </motion.div>

            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <Card3D className="overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl max-w-2xl mx-auto">
                <div className="p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="relative">
                        <motion.input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder=" "
                          required
                          whileFocus={{ scale: 1.01 }}
                        />
                        <label
                          htmlFor="name"
                          className="absolute text-sm text-white/70 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Name
                        </label>
                      </div>
                      <div className="relative">
                        <motion.input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder=" "
                          required
                          whileFocus={{ scale: 1.01 }}
                        />
                        <label
                          htmlFor="email"
                          className="absolute text-sm text-white/70 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Email
                        </label>
                      </div>
                      <div className="relative">
                        <motion.input
                          type="text"
                          id="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="peer w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder=" "
                          required
                          whileFocus={{ scale: 1.01 }}
                        />
                        <label
                          htmlFor="subject"
                          className="absolute text-sm text-white/70 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Subject
                        </label>
                      </div>
                      <div className="relative">
                        <motion.textarea
                          id="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          className="peer w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder=" "
                          required
                          whileFocus={{ scale: 1.01 }}
                        />
                        <label
                          htmlFor="message"
                          className="absolute text-sm text-white/70 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2"
                        >
                          Message
                        </label>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-black/50 hover:bg-white hover:text-black border-white/20 text-white transition-all duration-300 relative group overflow-hidden rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-0 blur-xl transition-opacity duration-300"></span>
                          <span className="relative flex items-center justify-center">
                            {isSubmitting ? "Sending..." : "Send Message"} <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </Button>
                      </motion.div>
                    </form>
                  </div>
                </Card3D>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 relative overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-[#000C40]/90 to-[#000C40]/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center gap-2 mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold text-xs relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative">VC</span>
              </div>
              <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Vinit Chawda
              </span>
            </motion.div>

            <motion.div
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              © {new Date().getFullYear()} Vinit Chawda. All rights reserved.
            </motion.div>

            <motion.div
              className="flex gap-4 mt-4 md:mt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.a
                href="https://github.com/VinitChawda06"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 backdrop-blur-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  y: -5,
                  transition: { 
                    duration: 0.3,
                    repeat: 0,
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/vinit-chawda"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 backdrop-blur-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: -5,
                  y: -5,
                  transition: { 
                    duration: 0.3,
                    repeat: 0,
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="mailto:vinitchawda20@gmail.com"
                className="p-2 rounded-full bg-white/5 backdrop-blur-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  y: -5,
                  transition: { 
                    duration: 0.3,
                    repeat: 0,
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={18} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
