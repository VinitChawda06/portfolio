"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Code,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Change active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 300

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
    { id: "education", label: "Education", icon: <GraduationCap size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ]

  const skills = [
    { name: "HTML", level: 85 },
    { name: "CSS", level: 80 },
    { name: "JavaScript", level: 75 },
    { name: "React", level: 70 },
    { name: "Node.js", level: 65 },
    { name: "Git", level: 75 },
  ]

  const projects = [
    {
      title: "E-commerce App",
      description: "An e-commerce application with shopping cart and payment gateway.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "/placeholder.svg?height=200&width=350",
      github: "#",
      demo: "#",
    },
    {
      title: "Task Manager",
      description: "Application to manage daily tasks with drag and drop functionality.",
      technologies: ["JavaScript", "HTML", "CSS"],
      image: "/placeholder.svg?height=200&width=350",
      github: "#",
      demo: "#",
    },
    {
      title: "Weather App",
      description: "Application that displays current weather and forecast using an external API.",
      technologies: ["React", "REST API", "Tailwind CSS"],
      image: "/placeholder.svg?height=200&width=350",
      github: "#",
      demo: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100 font-sans">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#121212]/90 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            YourName
          </span>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-4"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeSection === item.id ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-8 top-1/2 transform -translate-y-1/2 flex-col gap-6 z-50">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`flex items-center gap-2 p-2 rounded-full transition-all ${
              activeSection === item.id
                ? "bg-gray-800 text-blue-400 shadow-lg shadow-blue-500/20"
                : "hover:bg-gray-800/50"
            }`}
            title={item.label}
          >
            {item.icon}
            <span
              className={`${
                activeSection === item.id ? "opacity-100 w-auto" : "opacity-0 w-0"
              } overflow-hidden transition-all duration-300`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-20 md:pt-0">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center py-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                Junior Web Developer
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Hello, I'm{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  YourName
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Frontend developer passionate about creating attractive and functional web experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  Contact me
                </Button>
              </div>
            </motion.div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <User size={24} className="text-blue-400" />
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-300 mb-6">
                  I'm a junior web developer with a passion for learning new technologies and creating innovative
                  solutions. My goal is to combine design and functionality to create exceptional user experiences.
                </p>
                <p className="text-gray-300 mb-6">
                  I'm currently focused on frontend development with React, but I also have experience with Node.js and
                  databases. I love solving problems and collaborating in multidisciplinary teams.
                </p>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  Download CV
                </Button>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">My Skills</h3>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Briefcase size={24} className="text-blue-400" />
              My Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover border-b border-gray-800"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-gray-800 text-gray-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        className="text-sm flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Github size={16} /> Code
                      </a>
                      <a
                        href={project.demo}
                        className="text-sm flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink size={16} /> Demo
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap size={24} className="text-blue-400" />
              Education
            </h2>

            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-gray-800 pb-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                <div className="mb-1 text-blue-400">2020 - 2023</div>
                <h3 className="text-xl font-semibold">Degree in Web Development</h3>
                <p className="text-gray-400">Example University</p>
                <p className="mt-2 text-gray-300">
                  Studies focused on web development, programming, and interface design.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-800 pb-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500" />
                <div className="mb-1 text-purple-400">2023</div>
                <h3 className="text-xl font-semibold">Frontend Development Bootcamp</h3>
                <p className="text-gray-400">Code Academy</p>
                <p className="mt-2 text-gray-300">
                  Intensive training in React, modern JavaScript, and web application development.
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-gray-800">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500" />
                <div className="mb-1 text-green-400">In progress</div>
                <h3 className="text-xl font-semibold">UX/UI Design Certification</h3>
                <p className="text-gray-400">Online Platform</p>
                <p className="mt-2 text-gray-300">Learning user experience and interface design principles.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
              <Mail size={24} className="text-blue-400" />
              Contact
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-300 mb-6">
                  Interested in working together or have a question? Feel free to contact me through the form or my
                  social media.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-400" />
                    <span>yourname@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="text-blue-400" />
                    <a href="#" className="hover:text-blue-400 transition-colors">
                      github.com/yourname
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="text-blue-400" />
                    <a href="#" className="hover:text-blue-400 transition-colors">
                      linkedin.com/in/yourname
                    </a>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} YourName. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
