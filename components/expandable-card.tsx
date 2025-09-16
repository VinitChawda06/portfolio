"use client"

import type React from "react"
import { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export type CardItem = {
  title: string
  description: string
  longDescription?: string
  src: string
  technologies: string[]
  github?: string
  demo?: string
  content?: () => React.ReactNode
}

interface ExpandableCardProps {
  cards: CardItem[]
}

export const ExpandableCard = ({ cards }: ExpandableCardProps) => {
  const [active, setActive] = useState<CardItem | null>(null)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef(0)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Store the projects section reference
  useEffect(() => {
    sectionRef.current = document.getElementById("projects")
  }, [])

  // Handle scroll locking when modal is open
  useEffect(() => {
    if (active) {
      // Store current scroll position
      scrollPositionRef.current = window.scrollY

      // Apply fixed position to body to prevent scrolling
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = "100%"
    } else {
      // Restore scrolling when modal is closed
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""

      // Restore scroll position without jumping to home
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "instant", // Use instant to prevent smooth scrolling
      })
    }

    // Handle escape key
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && active) {
        setActive(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)

      // Clean up scroll locking when component unmounts
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  // Handle card click with proper event handling
  const handleCardClick = (e: React.MouseEvent, card: CardItem) => {
    e.preventDefault()
    e.stopPropagation()
    setActive(card)
  }

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md h-full w-full z-[9999]"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setActive(null)
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[10000] p-4 pt-20 pb-20 overflow-hidden">
            <motion.button
              key={`button-${active.title}-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex absolute top-24 right-4 items-center justify-center bg-black/70 text-white hover:bg-black/90 transition-colors rounded-full h-10 w-10 shadow-lg"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setActive(null)
              }}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-3xl max-h-[70vh] flex flex-col bg-gradient-to-br from-[#000C40]/95 to-[#0A1A3F]/95 rounded-3xl overflow-hidden border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative">
                <img
                  src={active.src || "/placeholder.svg"}
                  alt={active.title}
                  className="w-full h-48 object-cover object-center"
                />
              </motion.div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-4">
                  <div>
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="text-2xl font-bold mb-2 text-white">
                      {active.title}
                    </motion.h3>
                    <motion.p layoutId={`description-${active.description}-${id}`} className="text-gray-200 mb-6">
                      {active.longDescription || active.description}
                    </motion.p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-cyan-400">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {active.technologies.map((tech) => (
                        <span key={tech} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {active.github && (
                      <Button
                        className="bg-black/50 hover:bg-white hover:text-black border-white/20 text-white transition-all duration-300 rounded-lg"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(active.github, "_blank")
                        }}
                      >
                        <Github className="mr-2 h-4 w-4" /> View Code
                      </Button>
                    )}
                    {active.demo && (
                      <Button
                        variant="outline"
                        className="border-white/20 text-white bg-black/50 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 rounded-lg"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(active.demo, "_blank")
                        }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={(e) => handleCardClick(e, card)}
            className="h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group rounded-xl overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div layoutId={`image-${card.title}-${id}`} className="relative">
              <img src={card.src || "/placeholder.svg"} alt={card.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                <div className="flex gap-3">
                  {card.github && (
                    <motion.a
                      href={card.github}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open(card.github, "_blank")
                      }}
                    >
                      <Github size={18} className="text-white" />
                    </motion.a>
                  )}
                  {card.demo && (
                    <motion.a
                      href={card.demo}
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open(card.demo, "_blank")
                      }}
                    >
                      <ExternalLink size={18} className="text-white" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
            <div className="p-6 relative z-10">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors text-white"
              >
                {card.title}
              </motion.h3>
              <motion.p layoutId={`description-${card.description}-${id}`} className="text-gray-300 mb-4">
                {card.description}
              </motion.p>
              <div className="flex flex-wrap gap-2">
                {card.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white/5 text-gray-200 border border-white/10 transition-colors rounded-lg px-2 py-1 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}
