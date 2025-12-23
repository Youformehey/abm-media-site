"use client"

import { motion } from "framer-motion"
import { Play, TrendingUp } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Project {
  id: number
  title: string
  category: string
  image: string
  views: string
}

interface ProjectCardProps {
  project: Project
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  className?: string
}

export function ProjectCard({ project, index, isHovered, onHover, onLeave, className }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/5 cursor-pointer h-full",
        className,
      )}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-blue-500/0"
        animate={{
          backgroundColor: isHovered ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={false}
          animate={{
            y: isHovered ? -10 : 0,
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-xs text-blue-300 font-medium">
            {project.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <TrendingUp className="w-3 h-3" />
            <span>{project.views}</span>
          </div>
        </motion.div>

        <div>
          <motion.h3
            className="text-2xl font-bold mb-2 text-white"
            initial={false}
            animate={{
              y: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
          >
            <Play className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Watch Project</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
