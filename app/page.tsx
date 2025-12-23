"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Play,
  Sparkles,
  Globe,
  Palette,
  Video,
  FileText,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Handshake,
  Users,
  Target,
  Award,
  Zap,
  TrendingUp,
  Eye,
  Heart,
} from "lucide-react"
import { useRef, useState } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const heroY = useTransform(smoothProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 0.9])
  const heroBlur = useTransform(smoothProgress, [0, 0.5], [0, 10])

  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false) // Declare isHovered variable

  const services = [
    {
      icon: Sparkles,
      title: "Branding",
      description: "Crafting unique identities that resonate and leave lasting impressions",
    },
    {
      icon: Globe,
      title: "Web Creation",
      description: "Building immersive digital experiences that convert visitors into customers",
    },
    {
      icon: FileText,
      title: "Content Strategy",
      description: "Stories that engage, inspire, and drive meaningful connections",
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Visual excellence crafted with precision and artistic vision",
    },
    {
      icon: Video,
      title: "Video Production",
      description: "Cinematic storytelling that captivates and moves audiences",
    },
    {
      icon: Zap,
      title: "Social Media",
      description: "Dynamic campaigns that amplify your brand's digital presence",
    },
  ]

  const clients = ["Nutribeast", "Zaitouna", "Itkan", "Medhorizons", "Creative Co", "Brand Studio", "Digital Wave"]

  const projects = [
    {
      id: 1,
      title: "Brand Revolution",
      category: "Branding",
      type: "vertical",
      thumbnail: "/vertical-video-modern-branding-campaign.jpg",
      stats: { views: "2.5M", engagement: "94%" },
    },
    {
      id: 2,
      title: "Digital Masterpiece",
      category: "Web Design",
      type: "horizontal",
      thumbnail: "/horizontal-video-modern-web-design-showcase.jpg",
      stats: { views: "1.8M", engagement: "87%" },
    },
    {
      id: 3,
      title: "Motion Magic",
      category: "Animation",
      type: "vertical",
      thumbnail: "/vertical-video-motion-graphics-design.jpg",
      stats: { views: "3.2M", engagement: "96%" },
    },
    {
      id: 4,
      title: "Launch Campaign",
      category: "Commercial",
      type: "horizontal",
      thumbnail: "/horizontal-video-product-launch-commercial.jpg",
      stats: { views: "4.1M", engagement: "92%" },
    },
    {
      id: 5,
      title: "Social Sensation",
      category: "Social Media",
      type: "vertical",
      thumbnail: "/vertical-video-social-media-content.jpg",
      stats: { views: "5.7M", engagement: "98%" },
    },
    {
      id: 6,
      title: "Corporate Vision",
      category: "Corporate",
      type: "horizontal",
      thumbnail: "/horizontal-video-corporate-presentation.jpg",
      stats: { views: "1.2M", engagement: "85%" },
    },
  ]

  const partnerships = [
    {
      icon: Handshake,
      title: "Agency Collaboration",
      description: "Unite forces to deliver exceptional results and expand creative capabilities",
    },
    {
      icon: Target,
      title: "Brand Partnerships",
      description: "Co-create impactful campaigns that resonate deeply with target audiences",
    },
    {
      icon: Award,
      title: "Strategic Alliances",
      description: "Build long-term relationships founded on mutual growth and innovation",
    },
  ]

  const stats = [
    { icon: TrendingUp, value: "150+", label: "Projects Completed" },
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Eye, value: "25M+", label: "Total Views" },
    { icon: Heart, value: "98%", label: "Satisfaction Rate" },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-black" />

      <motion.div
        className="fixed inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 70% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-blue-400/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              x: [0, Math.random() * 200 - 100],
              opacity: [0, 0.6, 0.6, 0],
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between backdrop-blur-2xl bg-zinc-900/60 border border-white/10 rounded-full px-8 py-4 shadow-2xl"
            whileHover={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold cursor-pointer tracking-tight flex items-center gap-1"
            >
              <span className="text-white">abm</span>
              <span className="text-zinc-500 font-light text-xl">...</span>
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">media</span>
            </motion.div>
            {/* </CHANGE> */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { href: "#services", label: "Services" },
                { href: "#work", label: "Work" },
                { href: "#about", label: "About" },
                { href: "#partnerships", label: "Partnerships" },
              ].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-zinc-400 hover:text-white transition-colors group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-blue-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full border-0">
                  <motion.span whileHover={{ scale: 1.05 }} className="inline-block font-medium">
                    Contact
                  </motion.span>
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      <motion.section
        ref={heroRef}
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale,
        }}
        className="relative min-h-screen flex items-center justify-center px-4 pt-32"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <img
              src="/abstract-modern-creative-agency-visual-backdrop.jpg"
              alt="ABM Media Creative Vision"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          </motion.div>
        </div>

        <div className="text-center z-10 max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-white drop-shadow-2xl"
              >
                Créateurs d'Émotions Visuelles
              </motion.div>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-4xl font-light text-balance text-white/90">
              Production • Création • Innovation
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-lg md:text-xl text-zinc-300 mt-6 text-balance max-w-3xl mx-auto"
            >
              Des vidéos qui marquent les esprits et transforment votre vision en expérience inoubliable
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="group relative overflow-hidden bg-blue-600 text-white hover:bg-blue-700 border-0 px-10 py-7 text-lg rounded-full shadow-2xl shadow-blue-500/50 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-3 font-medium">
                  <Play className="w-6 h-6" />
                  <span>Watch Showreel</span>
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="group relative overflow-hidden bg-white/5 backdrop-blur-xl hover:bg-white/10 text-white border border-white/20 hover:border-blue-500/40 px-10 py-7 text-lg rounded-full transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Our Work
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="mt-20">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="inline-flex flex-col items-center gap-2 text-zinc-500"
            >
              <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-zinc-700 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <section className="relative py-20 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 uppercase tracking-wider">Our Expertise</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-white">What We Create</h2>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto text-balance">
              Transforming ideas into extraordinary experiences through innovation and creativity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isHovered={hoveredService === index}
                onHover={() => setHoveredService(index)}
                onLeave={() => setHoveredService(null)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Eye className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 uppercase tracking-wider">Featured Projects</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-white">Our Portfolio</h2>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto text-balance">
              Discover the stories we've brought to life for visionary brands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[350px]">
            <ProjectCard
              project={projects[0]}
              index={0}
              isHovered={hoveredProject === 0}
              onHover={() => setHoveredProject(0)}
              onLeave={() => setHoveredProject(null)}
              className="md:col-span-3 md:row-span-2"
            />
            <ProjectCard
              project={projects[1]}
              index={1}
              isHovered={hoveredProject === 1}
              onHover={() => setHoveredProject(1)}
              onLeave={() => setHoveredProject(null)}
              className="md:col-span-3 md:row-span-1"
            />
            <ProjectCard
              project={projects[2]}
              index={2}
              isHovered={hoveredProject === 2}
              onHover={() => setHoveredProject(2)}
              onLeave={() => setHoveredProject(null)}
              className="md:col-span-2 md:row-span-1"
            />
            <ProjectCard
              project={projects[3]}
              index={3}
              isHovered={hoveredProject === 3}
              onHover={() => setHoveredProject(3)}
              onLeave={() => setHoveredProject(null)}
              className="md:col-span-2 md:row-span-1"
            />
            <ProjectCard
              project={projects[4]}
              index={4}
              isHovered={hoveredProject === 4}
              onHover={() => setHoveredProject(4)}
              onLeave={() => setHoveredProject(null)}
              className="md:col-span-2 md:row-span-1"
            />
            <ProjectCard
              project={projects[5]}
              index={5}
              isHovered={hoveredProject === 5}
              onHover={() => setHoveredProject(5)}
              onLeave={() => setHoveredProject(null)}
              className="md:col-span-3 md:row-span-1"
            />
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 uppercase tracking-wider">Trusted By</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-white">Our Clients</h2>
          </motion.div>

          <div className="relative">
            <div className="flex gap-12 animate-marquee">
              {[...clients, ...clients, ...clients].map((client, index) => (
                <motion.div
                  key={`${client}-${index}`}
                  className="flex-shrink-0 text-4xl md:text-6xl font-bold text-white/20 hover:text-white/40 transition-colors duration-300 whitespace-nowrap"
                  whileHover={{ scale: 1.1 }}
                >
                  {client}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
              >
                <Heart className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 uppercase tracking-wider">About Us</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">Who We Are</h2>
              <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
                <p>
                  ABM Media is a creative powerhouse dedicated to transforming visions into reality. We are a team of
                  passionate storytellers, designers, and strategists who believe in the power of authentic brand
                  experiences.
                </p>
                <p>
                  With years of expertise across multiple industries, we craft campaigns that not only capture attention
                  but create lasting emotional connections with your audience.
                </p>
                <p>
                  From concept to execution, we bring precision, creativity, and innovation to every project, ensuring
                  your brand stands out in today's competitive landscape.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { title: "Creative Excellence", description: "Award-winning designs that push boundaries" },
                { title: "Strategic Thinking", description: "Data-driven approaches for maximum impact" },
                { title: "Client Partnership", description: "Collaborative relationships built on trust" },
                { title: "Innovation Focus", description: "Always ahead with cutting-edge solutions" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 relative text-white">{item.title}</h3>
                  <p className="text-zinc-400 relative leading-relaxed">{item.description}</p>

                  <motion.div
                    className={`mt-6 flex items-center gap-2 text-sm relative transition-colors duration-300 ${isHovered ? "text-blue-400" : "text-white"}`}
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="partnerships" className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Handshake className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 uppercase tracking-wider">Partnerships</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance text-white">Let's Collaborate</h2>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto text-balance">
              Together, we can create extraordinary results and unlock new opportunities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerships.map((partnership, index) => (
              <PartnershipCard key={partnership.title} partnership={partnership} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-32 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "backOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 uppercase tracking-wider">Get In Touch</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">Contact Us</h2>
              <p className="text-xl text-zinc-400 mb-12">
                Ready to bring your vision to life? Let's start a conversation.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Mail, title: "Email", content: "hello@abmmedia.com" },
                  { icon: Phone, title: "Phone", content: "+1 (555) 123-4567" },
                  { icon: MapPin, title: "Location", content: "123 Creative Street, Design City" },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 rounded-full bg-white/5 border border-white/10">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-500 mb-1">{item.title}</h3>
                      <p className="text-lg text-white">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium shadow-lg shadow-blue-500/30"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="relative py-16 px-4 z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">ABM Media</h3>
              <p className="text-zinc-400">Crafting extraordinary brand experiences since 2020</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Branding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Web Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Video Production
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#work" className="hover:text-white transition-colors">
                    Work
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-zinc-500">
            <p>&copy; 2025 ABM Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatsCard({ stat, index }: { stat: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/40 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-full bg-blue-500/10 border border-blue-500/20">
          <stat.icon className="w-6 h-6 text-blue-400" />
        </div>
      </div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.5, ease: "backOut" }}
        className="text-4xl md:text-5xl font-bold mb-2 text-white"
      >
        {stat.value}
      </motion.div>
      <p className="text-zinc-400">{stat.label}</p>
    </motion.div>
  )
}

function ServiceCard({ service, index, isHovered, onHover, onLeave }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <motion.div
        className="relative h-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500"
        animate={{
          borderColor: isHovered ? "rgba(59, 130, 246, 0.4)" : "rgba(255, 255, 255, 0.1)",
        }}
      >
        <motion.div
          className="absolute inset-0 bg-blue-500/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative mb-6 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center"
        >
          <service.icon
            className={`w-7 h-7 transition-colors duration-300 ${isHovered ? "text-blue-400" : "text-white"}`}
          />
        </motion.div>

        <h3 className="text-2xl font-bold mb-3 relative text-white">{service.title}</h3>
        <p className="text-zinc-400 relative leading-relaxed">{service.description}</p>

        <motion.div
          className={`mt-6 flex items-center gap-2 text-sm relative transition-colors duration-300 ${isHovered ? "text-blue-400" : "text-white"}`}
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, isHovered, onHover, onLeave }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
        project.type === "vertical" ? "row-span-2" : "md:col-span-2"
      }`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"
        animate={{ opacity: isHovered ? 0.9 : 0.7 }}
        transition={{ duration: 0.3 }}
      />

      <motion.img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex gap-4 text-sm"
        >
          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
            <Eye className="w-3 h-3 inline mr-1" />
            {project.stats.views}
          </div>
          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
            <Heart className="w-3 h-3 inline mr-1" />
            {project.stats.engagement}
          </div>
        </motion.div>

        <motion.div initial={{ y: 0 }} animate={{ y: isHovered ? -10 : 0 }} transition={{ duration: 0.3 }}>
          <div className="text-sm text-zinc-400 mb-2">{project.category}</div>
          <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
          <motion.div
            className="flex items-center gap-2 text-white"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm">View Project</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function PartnershipCard({ partnership, index }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="h-full p-8 bg-white/5 backdrop-blur-xl border-white/10 hover:border-blue-500/40 transition-all duration-300">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="mb-6 w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
        >
          <partnership.icon className="w-7 h-7 text-blue-400" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-3 text-white">{partnership.title}</h3>
        <p className="text-zinc-400 leading-relaxed">{partnership.description}</p>
      </Card>
    </motion.div>
  )
}
