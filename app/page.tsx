"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Play, Sparkles, Globe, Palette, Video, FileText, ArrowRight,
  Mail, Phone, MapPin, Briefcase, Users, Target, Award, Zap,
  TrendingUp, Eye, Heart, Lightbulb, Layers, Rocket, Quote, Menu,
  Facebook, Twitter, Instagram, Linkedin, Github, Camera, Clapperboard, BrainCircuit, PlayCircle
} from "lucide-react"
import { useRef, useState, useEffect } from "react"

// --- COMPOSANTS INTERNES ---

const StatsCard = ({ stat, index }: { stat: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 text-center hover:bg-zinc-800/50 hover:border-white/10 transition-all duration-300 backdrop-blur-sm"
  >
    <div className="inline-flex p-3 rounded-full bg-blue-500/10 mb-4 border border-blue-500/20">
      <stat.icon className="w-5 h-5 text-blue-400" />
    </div>
    <div className="text-3xl font-medium text-white mb-1 tracking-tight">{stat.value}</div>
    <div className="text-xs text-zinc-500 uppercase tracking-widest">{stat.label}</div>
  </motion.div>
)

const ServiceCard = ({ service, index, isHovered, onHover, onLeave }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className={`group relative p-8 rounded-xl border transition-all duration-500 cursor-default h-full flex flex-col justify-between ${
      isHovered ? "bg-zinc-800/80 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]" : "bg-zinc-900/40 border-white/5"
    }`}
  >
    <div>
      <div className="mb-6 inline-flex p-3 rounded-lg bg-white/5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
        <service.icon className="w-6 h-6" />
      </div>
      <h3 className="text-2xl font-medium mb-3 text-white group-hover:text-blue-400 transition-colors">
        {service.title}
      </h3>
      <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors whitespace-pre-line">
        {service.description}
      </p>
    </div>
    <div className="mt-8 flex items-center text-xs font-bold uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
       Découvrir <ArrowRight className="w-3 h-3 ml-2 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
    </div>
  </motion.div>
)

// --- PROJECT CARD INTELLIGENTE (VIDEO & IMAGE) ---
const ProjectCard = ({ project, index, onHover, onLeave, className }: any) => {
  // Fonction pour vérifier si c'est une vidéo (mp4 ou mov, insensible à la casse)
  const isVideoFile = (filename: string) => {
      const lowerName = filename.toLowerCase();
      return lowerName.endsWith('.mp4') || lowerName.endsWith('.mov');
  };

  const isVideo = isVideoFile(project.thumbnail);

  return (
    <motion.div
        className={`relative rounded-xl overflow-hidden cursor-pointer group bg-zinc-900 border border-white/5 ${className}`}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
    >
        <div className="absolute inset-0 overflow-hidden">
            {isVideo ? (
                <video 
                    src={project.thumbnail} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
                    muted 
                    loop 
                    autoPlay 
                    playsInline 
                />
            ) : (
                <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/40 to-transparent" />
            
            {/* Petit indicateur si c'est une vidéo */}
            {isVideo && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 z-20">
                    <Video className="w-4 h-4 text-white" />
                </div>
            )}
        </div>
        
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-2 block">
                {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-2 tracking-tight leading-tight">{project.title}</h3>
                
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                    <div className="flex items-center gap-4 md:gap-6 pt-4 text-sm text-zinc-300 border-t border-white/10 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span>{project.stats.views} Vues</span>
                    <span className="w-1 h-1 bg-zinc-500 rounded-full"/>
                    <span>{project.stats.engagement} Engagement</span>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

const PartnershipCard = ({ partnership, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className="bg-zinc-900/50 border border-white/5 p-8 rounded-xl hover:border-blue-500/30 transition-colors group"
  >
    <partnership.icon className="w-8 h-8 text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
    <h3 className="text-xl font-medium text-white mb-3">{partnership.title}</h3>
    <p className="text-sm text-zinc-400 leading-relaxed">{partnership.description}</p>
  </motion.div>
)

const ProcessStep = ({ step, index, isLast }: any) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        className="flex gap-6 relative"
    >
        {!isLast && (
            <div className="absolute left-6 top-16 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 to-transparent" />
        )}
        <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-zinc-900 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <step.icon className="w-5 h-5" />
        </div>
        <div className="pb-12 pt-2">
            <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
            <p className="text-zinc-400 leading-relaxed max-w-md">{step.description}</p>
        </div>
    </motion.div>
)

const TestimonialCard = ({ testimonial, index }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-zinc-900 border border-white/5 p-8 rounded-2xl relative"
    >
        <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />
        <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {testimonial.initials}
            </div>
            <div>
                <div className="text-white font-medium">{testimonial.name}</div>
                <div className="text-blue-500 text-xs uppercase tracking-wider">{testimonial.role}</div>
            </div>
        </div>
        <p className="text-zinc-400 italic">"{testimonial.text}"</p>
    </motion.div>
)

// --- COMPOSANT PRINCIPAL ---

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  // Gestion du formulaire WhatsApp
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      service: "Développement Web",
      message: ""
  })

  const handleInputChange = (e: any) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppSubmit = (e: any) => {
      e.preventDefault()
      const phoneNumber = "21658639342"
      const text = `*Nouvelle Demande via Site Web*%0A%0A👤 *Nom:* ${formData.name}%0A📧 *Email:* ${formData.email}%0A🛠 *Service:* ${formData.service}%0A📝 *Message:* ${formData.message}`
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
  }

  // Mouse move effect for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Smooth Scroll function
  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroY = useTransform(smoothProgress, [0, 1], ["0%", "40%"]) 
  // J'ai réduit le mouvement du gros texte ABM pour qu'il ne gêne pas la nouvelle phrase
  const bigTextY = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]) 
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])

  const [hoveredService, setHoveredService] = useState<number | null>(null)

  // DATA SERVICES
  const services = [
    { icon: Globe, title: "Développement Web", description: "Plateformes digitales sur mesure, pensées pour convertir. Sites optimisés, performants et alignés avec votre vision." },
    { icon: Palette, title: "Branding & Identité", description: "Construction de marques fortes et mémorables. Identité visuelle et storytelling pour renforcer votre crédibilité." },
    { icon: Video, title: "Création de Contenu", description: "Vidéos, visuels et formats social media stratégiques conçus pour attirer, engager et convertir votre audience." },
    { icon: Camera, title: "Shooting & DA", description: "Direction artistique, mises en scène et shootings photo/vidéo professionnels pour valoriser votre image de marque." },
    { icon: Clapperboard, title: "FX & Post-Production", description: "Montage dynamique, motion design et effets visuels modernes pour maximiser l'impact sur les réseaux." },
    { icon: BrainCircuit, title: "Stratégie Digitale", description: "Accompagnement personnalisé basé sur l'analyse et la performance pour accélérer votre croissance concrète." },
  ]

  // DATA CLIENTS - Noms de fichiers exacts + facteur d'échelle pour les agrandir
  const clients = [
      { name: "Nutribeast", logo: "/logos_01.gif", scale: 1.2 },
      { name: "ITKAN", logo: "/itkanongblue.png", scale: 1 },
      { name: "DUKA", logo: "/logos_07.gif", scale: 1.2 },
      { name: "SS Logo", logo: "/logos_03.gif", scale: 1 },
      // Répétition
      { name: "Nutribeast", logo: "/logos_01.gif", scale: 1.2 },
      { name: "ITKAN", logo: "/itkanongblue.png", scale: 1 },
      { name: "DUKA", logo: "/logos_07.gif", scale: 1.2 },
      { name: "SS Logo", logo: "/logos_03.gif", scale: 1 },
  ]

  // DATA PROJETS - Noms exacts, ajout de DUKA et Unviral
  const projects = [
    // VIDEO 1 : Nutribeast Tour
    { id: 1, title: "Nutribeast Store Concept", category: "Retail Design & Branding", thumbnail: "/nutri TOUR.mov", stats: { views: "25k", engagement: "94%" } },
    
    // IMAGE 1 : Velar Tour
    { id: 2, title: "Velar Tour Experience", category: "Web Design UI/UX", thumbnail: "/IMG_1006.JPG", stats: { views: "42k", engagement: "89%" } },
    
    // VIDEO 2 : ABE Energy
    { id: 3, title: "ABE Energy Campaign", category: "Production Vidéo & FX", thumbnail: "/ABE.mp4", stats: { views: "150k+", engagement: "98%" } },
    
    // VIDEO 3 : Unviral (Remplacement de ITKAN)
    { id: 4, title: "Unviral Growth Strategy", category: "Data-Driven Marketing", thumbnail: "/Unviral.mp4", stats: { views: "50k+", engagement: "96%" } },
    
    // IMAGE 2 : Shooting Dalmatian
    { id: 5, title: "Streetwear Lifestyle", category: "Shooting Studio", thumbnail: "/_DSC0518.JPG", stats: { views: "35k", engagement: "95%" } },
    
    // VIDEO 4 : Anas Video
    { id: 6, title: "Athlete Lifestyle Reels", category: "Social Media Content", thumbnail: "/1 video anas.mp4", stats: { views: "200k+", engagement: "99%" } },

    // VIDEO 5 : DUKA (Nouveau projet)
    { id: 7, title: "DUKA Brand Launch", category: "Motion Design & Branding", thumbnail: "/DUKA.MP4", stats: { views: "85k", engagement: "93%" } },
  ]

  const partnerships = [
    { icon: Briefcase, title: "Collaboration Agence", description: "Unir nos forces pour des résultats exceptionnels." },
    { icon: Target, title: "Partenariats Marque", description: "Co-création de campagnes impactantes." },
    { icon: Award, title: "Alliances Stratégiques", description: "Construire des relations long-terme." },
  ]
  const stats = [
    { icon: TrendingUp, value: "20+", label: "Projets Terminés" },
    { icon: Users, value: "15+", label: "Clients Heureux" },
    { icon: Eye, value: "1M+", label: "Vues Totales" },
    { icon: Heart, value: "90%", label: "Satisfaction" },
  ]
  const processSteps = [
      { icon: Lightbulb, title: "Découverte", description: "Nous analysons en profondeur l'essence de votre marque, vos objectifs et votre audience." },
      { icon: Layers, title: "Stratégie & Design", description: "Nos architectes créent le plan pendant que les designers façonnent l'identité visuelle." },
      { icon: Video, title: "Production", description: "C'est ici que la magie opère : développement, tournage, montage et création." },
      { icon: Rocket, title: "Lancement & Croissance", description: "Déploiement du projet et suivi des performances pour un ROI maximal." }
  ]
  const testimonials = [
      { name: "Sarah Connor", role: "CMO chez Cyberdyne", initials: "SC", text: "ABM Media a transformé notre présence digitale. Le ROI de la dernière campagne était irréel." },
      { name: "John Wick", role: "Fondateur Continental", initials: "JW", text: "Précis, professionnels et créatifs. La meilleure agence avec laquelle nous avons travaillé." },
      { name: "Ellen Ripley", role: "Directrice Weyland", initials: "ER", text: "Ils ont compris notre vision immédiatement. Le branding nous a aidé à sécuriser nos fonds." }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020202] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- NAVBAR --- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-0 right-0 z-50 px-4 flex justify-center`}
      >
        <div className={`
            flex items-center justify-between px-8 py-4 rounded-2xl transition-all duration-500
            ${scrolled ? "bg-black/40 backdrop-blur-2xl border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] w-full max-w-6xl" : "bg-transparent border border-transparent w-full max-w-[1500px]"}
        `}>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                <div className="relative">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm tracking-tighter shadow-[0_0_20px_rgba(37,99,235,0.6)] z-10 relative">ABM</div>
                    <div className="absolute inset-0 bg-blue-600 rounded-lg blur-lg opacity-50 animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-white leading-none">ABM MEDIA</span>
                    <span className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase">Global Agency</span>
                </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 bg-zinc-900/50 rounded-full p-1.5 border border-white/5 backdrop-blur-md">
              {[{name: 'Services', id: 'services'}, {name: 'Projets', id: 'work'}, {name: 'Process', id: 'process'}, {name: 'À propos', id: 'about'}].map((item) => (
                <button key={item.name} onClick={() => scrollToSection(item.id)} className="px-6 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300">
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
                <Button onClick={() => scrollToSection('contact')} className="rounded-xl h-11 px-8 bg-white text-black hover:bg-zinc-200 font-bold text-sm transition-all duration-300 transform hover:scale-105">
                    Démarrer un Projet
                </Button>
                <Button size="icon" variant="ghost" className="md:hidden text-white hover:bg-white/10 rounded-xl">
                    <Menu className="w-6 h-6" />
                </Button>
            </div>
        </div>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <motion.section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
            <img src="/_DSC0518.JPG" alt="Background" className="w-full h-full object-cover opacity-20 scale-110 grayscale" />
            <div className="absolute inset-0 bg-[#020202]/70 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/80" />
            <motion.div style={{ y: bigTextY }} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="text-[25vw] md:text-[35vw] font-black text-white/5 leading-none tracking-tighter mix-blend-overlay whitespace-nowrap blur-sm">ABM</span>
            </motion.div>
        </motion.div>

        <motion.div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10" style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.15), transparent 80%)` }} />

        <div className="relative z-20 text-center max-w-7xl mx-auto flex flex-col items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-8 flex items-center gap-3 px-5 py-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span></span>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Agence Digitale Premium</span>
            </motion.div>

            <div className="mb-8 relative">
                <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-6xl md:text-9xl font-bold tracking-tighter text-white leading-[0.9] text-center">
                    We Build <br />
                    <span className="relative inline-block">
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">Legacies.</span>
                        <div className="absolute -bottom-2 left-0 right-0 h-4 bg-blue-600/50 blur-xl"></div>
                    </span>
                </motion.h1>
            </div>

            {/* NOUVELLE PHRASE D'ACCROCHE */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-lg md:text-xl text-zinc-300 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
              Your vision. Our inspiration. <br/> ABM Media engineers cultural moments through strategy, storytelling and digital production built to influence, engage and convert.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row gap-6 justify-center w-full">
                <Button onClick={() => scrollToSection('contact')} className="h-16 px-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all hover:scale-105 shadow-[0_0_50px_rgba(37,99,235,0.4)] ring-2 ring-blue-500/50 ring-offset-2 ring-offset-black">
                    <Play className="w-5 h-5 mr-3 fill-white" /> Démarrer maintenant
                </Button>
                <Button onClick={() => scrollToSection('work')} variant="outline" className="h-16 px-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-lg backdrop-blur-sm transition-all hover:scale-105 group">
                    Notre Portfolio <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
            </motion.div>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-black/50 backdrop-blur-md py-4 px-6 flex justify-between items-center text-xs text-zinc-500 uppercase tracking-widest hidden md:flex">
            <span>Basé à Sousse, Tunisie</span>
            <span className="animate-pulse text-blue-500">Scroll to Explore</span>
            <span>Disponible Worldwide</span>
        </motion.div>
      </motion.section>

      {/* STATS STRIP */}
      <section className="border-b border-white/5 bg-[#050505] relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center group cursor-default">
                    <span className="text-5xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">{stat.value}</span>
                    <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium group-hover:text-white transition-colors duration-300">{stat.label}</span>
                </div>
            ))}
         </div>
      </section>

      {/* SERVICES GRID */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Nos Services</h2>
                <p className="text-zinc-500 max-w-md">De la stratégie à la production, nous maîtrisons chaque étape.</p>
            </div>
            <Button variant="link" onClick={() => scrollToSection('contact')} className="text-white decoration-transparent border-b border-white/30 hover:border-white rounded-none px-0 pb-1 h-auto">Discuter d'un projet</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} isHovered={hoveredService === index} onHover={() => setHoveredService(index)} onLeave={() => setHoveredService(null)} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-32 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-20">
                <div className="lg:w-1/3">
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">La Méthode</span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">Comment nous opérons</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                        Nous ne comptons pas uniquement sur la créativité ; nous suivons un processus éprouvé. De l'étincelle initiale au lancement final, tout est calculé pour l'impact.
                    </p>
                    <Button onClick={() => scrollToSection('contact')} variant="outline" className="rounded-full border-white/10 hover:bg-white/10">Démarrer un Projet</Button>
                </div>
                <div className="lg:w-2/3 pl-0 lg:pl-12">
                    {processSteps.map((step, index) => (
                        <ProcessStep key={index} step={step} index={index} isLast={index === processSteps.length - 1} />
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* WORK SECTION (VOS VRAIS PROJETS AVEC VIDEO AUTO) */}
      <section id="work" className="py-32 px-6 bg-zinc-900/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
            <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white">Créations Récentes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[350px] md:auto-rows-[450px]">
            {/* Mise en page type "Bento Grid" pour 7 projets */}
            <ProjectCard project={projects[0]} index={0} className="md:col-span-3 md:row-span-1" />
            <ProjectCard project={projects[1]} index={1} className="md:col-span-3 md:row-span-1" />
            
            <ProjectCard project={projects[2]} index={2} className="md:col-span-2 md:row-span-1" />
            <ProjectCard project={projects[3]} index={3} className="md:col-span-2 md:row-span-1" />
            <ProjectCard project={projects[4]} index={4} className="md:col-span-2 md:row-span-1" />
            
            <ProjectCard project={projects[5]} index={5} className="md:col-span-3 md:row-span-1" />
            <ProjectCard project={projects[6]} index={6} className="md:col-span-3 md:row-span-1" />
          </div>
           <div className="mt-12 text-center">
               <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/10 px-8">Voir plus de projets</Button>
           </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE (LOGOS AGRANDIS) */}
      <section className="py-20 border-y border-white/5 bg-black/80 overflow-hidden relative z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202] z-10 pointer-events-none" />
        <div className="flex animate-marquee whitespace-nowrap items-center">
             {/* On triple la liste pour un scroll infini fluide */}
             {[...clients, ...clients, ...clients].map((client, i) => (
                 <div key={i} className="mx-12 flex-shrink-0 group">
                     {/* Utilisation du scale pour agrandir, h-24 pour une plus grande taille de base */}
                     <img 
                        src={client.logo} 
                        alt={client.name}
                        style={{ transform: `scale(${client.scale})` }}
                        className="h-24 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 filter grayscale brightness-200 contrast-125"
                        onError={(e) => {e.currentTarget.style.display = 'none'}}
                     />
                 </div>
             ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
             <div className="mb-16 flex justify-between items-end">
                <h2 className="text-3xl md:text-5xl font-medium">Ils nous font confiance</h2>
                <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
                    <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {testimonials.map((t, i) => (
                     <TestimonialCard key={i} testimonial={t} index={i} />
                 ))}
             </div>
        </div>
      </section>

      {/* ABOUT & PARTNERSHIPS */}
      <section id="about" className="py-32 px-6 bg-zinc-900/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20">
            <div>
                <h2 className="text-4xl md:text-5xl font-medium mb-8">Qui sommes-nous ?</h2>
                <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
                    <p>ABM Media est une centrale créative dédiée à transformer vos visions en réalité. Nous sommes une équipe de passionnés, storytellers et stratèges.</p>
                    <p>Du concept à l'exécution, nous apportons précision, créativité et innovation à chaque projet pour garantir que votre marque se démarque.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {partnerships.map((p, i) => (
                        <PartnershipCard key={i} partnership={p} index={i} />
                    ))}
                </div>
            </div>
            {/* Remplacement de l'image de l'équipe par une des vôtres */}
            <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 relative h-full min-h-[500px]">
                <img src="/_DSC0518.JPG" alt="Team Work" className="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-80 transition-all duration-700 scale-105 hover:scale-100"/>
                <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black to-transparent w-full">
                    <div className="text-white text-xl font-bold">Notre QG Créatif</div>
                    <div className="text-zinc-400">Sousse, Tunisie</div>
                </div>
            </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 border-t border-white/10 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8">Créons quelque chose <br/> d'<span className="text-blue-600">unique.</span></h2>
                    <p className="text-zinc-400 text-xl mb-12 max-w-md">Prêt à démarrer ? Remplissez le formulaire et discutons directement sur WhatsApp.</p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-lg">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10"><Mail className="w-5 h-5 text-white"/></div>
                            <span className="text-zinc-300">contact@abmmedia.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-lg">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10"><Phone className="w-5 h-5 text-white"/></div>
                            <span className="text-zinc-300">+216 58 639 342</span>
                        </div>
                        <div className="flex items-center gap-4 text-lg">
                            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10"><MapPin className="w-5 h-5 text-white"/></div>
                            <span className="text-zinc-300">Sousse, Tunisie</span>
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5">
                    <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-zinc-500">Nom</label>
                                <input name="name" value={formData.name} onChange={handleInputChange} type="text" required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="Votre Nom" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-zinc-500">Email</label>
                                <input name="email" value={formData.email} onChange={handleInputChange} type="email" required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="votre@email.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-zinc-500">Service souhaité</label>
                            <select name="service" value={formData.service} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none">
                                <option>Développement Web</option>
                                <option>Branding & Identité</option>
                                <option>Création de Contenu</option>
                                <option>Shooting & DA</option>
                                <option>FX & Post-Production</option>
                                <option>Stratégie Digitale</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-zinc-500">Message</label>
                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} required className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="Parlez-nous de votre projet..." />
                        </div>
                        <Button type="submit" className="w-full py-6 text-lg rounded-xl bg-green-600 hover:bg-green-700 shadow-[0_0_20px_rgba(22,163,74,0.4)]">
                            Envoyer sur WhatsApp
                        </Button>
                    </form>
                </div>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6 bg-[#020202]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs">ABM</div>
                 <span className="font-bold text-lg">ABM MEDIA</span>
            </div>
            <div className="text-zinc-500 text-sm">© 2026 ABM Media Inc. Tous droits réservés.</div>
            <div className="flex gap-6">
                <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Instagram className="w-5 h-5"/></a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Twitter className="w-5 h-5"/></a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5"/></a>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Github className="w-5 h-5"/></a>
            </div>
        </div>
      </footer>

    </div>
  )
}