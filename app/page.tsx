"use client"

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Play, Globe, Palette, Video, ArrowRight,
  Mail, Phone, MapPin, Briefcase, Users, Target, Award,
  TrendingUp, Eye, Heart, Lightbulb, Layers, Rocket, Quote, Menu,
  Facebook, Instagram, Linkedin, Camera, Clapperboard, 
  BrainCircuit, Send, ChevronDown, Check
} from "lucide-react"
import { useRef, useState, useEffect } from "react"

// --- COMPOSANT SELECT "ROULANT" ---
const CustomSelect = ({ options, value, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-16 bg-zinc-950 border rounded-xl px-6 flex items-center justify-between cursor-pointer transition-all duration-300 ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-white/10 hover:border-white/20'}`}
      >
        <span className={`text-lg ${value ? 'text-white' : 'text-zinc-500'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <div className="max-h-[300px] overflow-y-auto scrollbar-hide py-2">
              {options.map((option: string) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="px-6 py-3 hover:bg-zinc-900 cursor-pointer flex items-center justify-between group transition-colors"
                >
                  <span className={`text-sm ${value === option ? 'text-blue-400 font-medium' : 'text-zinc-300 group-hover:text-white'}`}>
                    {option}
                  </span>
                  {value === option && <Check className="w-4 h-4 text-blue-500" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPOSANTS INTERNES ---

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

const ProjectCard = ({ project, index, onHover, onLeave, className }: any) => {
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
                <video src={project.thumbnail} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700" muted loop autoPlay playsInline />
            ) : (
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/40 to-transparent" />
            {isVideo && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 z-20">
                    <Video className="w-4 h-4 text-white" />
                </div>
            )}
        </div>
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
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
    <partnership.icon className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
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

// --- MAIN COMPONENT ---

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", service: "Développement Web", message: "" })
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const handleInputChange = (e: any) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }))
  }

  const handleWhatsAppSubmit = (e: any) => {
      e.preventDefault()
      const phoneNumber = "21658639342"
      const text = `*Nouvelle Demande via Site Web*%0A%0A👤 *Nom:* ${formData.name}%0A📧 *Email:* ${formData.email}%0A🛠 *Service:* ${formData.service}%0A📝 *Message:* ${formData.message}`
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
  }

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroY = useTransform(smoothProgress, [0, 1], ["0%", "40%"]) 
  const bigTextY = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]) 
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])

  const services = [
    { icon: Globe, title: "Développement Web", description: "Plateformes digitales sur mesure, pensées pour convertir. Sites optimisés, performants et alignés avec votre vision." },
    { icon: Palette, title: "Branding & Identité", description: "Construction de marques fortes et mémorables. Identité visuelle et storytelling pour renforcer votre crédibilité." },
    { icon: Video, title: "Création de Contenu", description: "Vidéos, visuels et formats social media stratégiques conçus pour attirer, engager et convertir votre audience." },
    { icon: Camera, title: "Shooting & DA", description: "Direction artistique, mises en scène et shootings photo/vidéo professionnels pour valoriser votre image de marque." },
    { icon: Clapperboard, title: "FX & Post-Production", description: "Montage dynamique, motion design et effets visuels modernes pour maximiser l'impact sur les réseaux." },
    { icon: BrainCircuit, title: "Stratégie Digitale", description: "Accompagnement personnalisé basé sur l'analyse et la performance pour accélérer votre croissance concrète." },
  ]
  const serviceOptions = services.map(s => s.title);

  const clients = [
      { name: "Nutribeast", logo: "/logos_01.gif", scale: 1.2 },
      { name: "ITKAN", logo: "/itkanongblue.png", scale: 1 },
      { name: "DUKA", logo: "/logos_07.gif", scale: 1.2 },
      { name: "SS Logo", logo: "/logos_03.gif", scale: 1 },
      { name: "Zaitouna", logo: "/logo.png", scale: 1 },
  ]

  const projects = [
    { id: 1, title: "Nutribeast Store Concept", category: "Retail Design & Branding", thumbnail: "/nutri TOUR.mov", stats: { views: "25k", engagement: "94%" } },
    { id: 2, title: "Velar Tour Experience", category: "Web Design UI/UX", thumbnail: "/IMG_1006.JPG", stats: { views: "42k", engagement: "89%" } },
    { id: 3, title: "ABE Energy Campaign", category: "Production Vidéo & FX", thumbnail: "/ABE.mp4", stats: { views: "150k+", engagement: "98%" } },
    { id: 4, title: "Unviral Growth Strategy", category: "Data-Driven Marketing", thumbnail: "/Unviral.mp4", stats: { views: "50k+", engagement: "96%" } },
    { id: 5, title: "Streetwear Lifestyle", category: "Shooting Studio", thumbnail: "/_DSC0518.JPG", stats: { views: "35k", engagement: "95%" } },
    { id: 6, title: "Education Lifestyle Reels", category: "Social Media Content", thumbnail: "/1 video anas.mp4", stats: { views: "200k+", engagement: "99%" } },
    { id: 7, title: "DUKA Brand Launch", category: "Motion Design & Branding", thumbnail: "/DUKA.MP4", stats: { views: "85k", engagement: "93%" } },
  ]

  const partnerships = [
    { icon: Briefcase, title: "Expertise Pluridisciplinaire", description: "Une équipe complète : Devs, Créatifs et Stratèges unis pour votre croissance." },
    { icon: Target, title: "Approche Orientée ROI", description: "Nous ne cherchons pas juste le 'beau', nous visons la performance et la conversion." },
    { icon: Award, title: "Standards Internationaux", description: "Une qualité de production alignée sur les tendances mondiales actuelles." },
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
      {
        name: "Yassine Bradai", role: "Fondateur, Duka.tn", initials: "YB",
        text: "ABM Media a parfaitement compris la vision de Duka.tn : construire une marque premium, crédible et orientée qualité. Chaque détail a été pensé pour refléter ce positionnement et élever notre image digitale."
      },
      {
        name: "Houssem BEYA C.", role: "CEO & Founder, ITKAN Consulting Service", initials: "HB",
        text: "Collaborating with ABM Media on itkanconsulting.com was a great experience. They understood our vision from day one and translated it into a clean, credible, and high-value digital presence aligned with our consulting standards."
      },
      {
        name: "Coach Mohamed Haddad", role: "Founder, NutriBeast", initials: "MH",
        text: "ABM Media really understood NutriBeast’s vibe. The designs, content, and social media strategy helped us look more consistent, stronger, and more professional online."
      }
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

            <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center gap-2 mr-2 pr-4 border-r border-white/10">
                    <a href="https://www.instagram.com/abmmedia_?igsh=ZXdmYWp4M3pscmlk" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-orange-500 hover:text-white transition-all duration-300 text-zinc-400">
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/share/1QPqbBYruR/?mibextid=wwXIfr" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white transition-all duration-300 text-zinc-400">
                        <Facebook className="w-5 h-5" />
                    </a>
                </div>
                <Button onClick={() => scrollToSection('contact')} className="rounded-xl h-11 px-8 bg-white text-black hover:bg-zinc-200 font-bold text-sm transition-all duration-300 transform hover:scale-105">
                    Démarrer
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
            <img src="/teamwork.JPG" alt="Background" className="w-full h-full object-cover opacity-20 scale-110 grayscale" />
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
      </motion.section>

      {/* STATS */}
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

      {/* SERVICES */}
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

      {/* PROCESS */}
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

      {/* WORK */}
      <section id="work" className="py-32 px-6 bg-zinc-900/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 text-center">
            <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white">Créations Récentes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[350px] md:auto-rows-[450px]">
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

      {/* CLIENTS MARQUEE - MODIFIÉ TAILLE PLUS GRANDE */}
      <section className="py-24 border-y border-white/5 bg-[#050505] overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
             <span className="text-blue-500 font-bold tracking-[0.3em] text-xs uppercase mb-2">Ils nous ont fait confiance</span>
             <h3 className="text-white text-xl md:text-2xl font-medium">Les leaders qui passent au niveau supérieur</h3>
        </div>
        <div className="relative w-full flex overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-full z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none"></div>
          <motion.div className="flex gap-20 items-center whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }}>
                {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
                    <div key={i} className="relative group flex items-center justify-center min-w-[250px]">
                        <img 
                          src={client.logo} 
                          alt={client.name} 
                          className={`h-20 w-auto object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0`} 
                          style={{ transform: `scale(${client.scale})` }} 
                        />
                    </div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* WHY US - MODIFIÉ AVEC IMAGE ABOUT.JPG */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                {/* Image Side */}
                <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700"></div>
                    <img 
                        src="/about.jpg" 
                        alt="Team ABM" 
                        className="relative rounded-2xl border border-white/10 shadow-2xl w-full object-cover h-[500px] grayscale group-hover:grayscale-0 transition-all duration-700" 
                    />
                </div>
                {/* Text Side */}
                <div>
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Notre ADN</span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">Plus qu'une agence,<br/>un partenaire de croissance.</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        Dans un monde saturé de bruit, nous créons du signal. Notre approche hybride mêle data, psychologie du consommateur et créativité artistique pour délivrer des résultats mesurables.
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {partnerships.map((partnership, index) => (
                    <PartnershipCard key={index} partnership={partnership} index={index} />
                ))}
            </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 bg-zinc-900/30 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
                <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Témoignages</span>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">Ce qu'ils disent de nous</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} testimonial={testimonial} index={index} />
                ))}
            </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="text-center mb-10">
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4 block">Let's talk business</span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">Prêt à dominer votre marché ?</h2>
                    <p className="text-zinc-400">Remplissez le formulaire ci-dessous pour démarrer une collaboration exclusive.</p>
                </div>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Nom complet</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full h-16 bg-zinc-950 border border-white/10 rounded-xl px-6 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 ml-1">Email professionnel</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@company.com" className="w-full h-16 bg-zinc-950 border border-white/10 rounded-xl px-6 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Service intéressé</label>
                        <CustomSelect options={serviceOptions} value={formData.service} onChange={handleServiceChange} placeholder="Sélectionnez un service" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">Parlez-nous de votre projet</label>
                        <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Objectifs, budget, délais..." className="w-full h-40 bg-zinc-950 border border-white/10 rounded-xl p-6 text-white placeholder:text-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all resize-none" required />
                    </div>
                    <Button type="submit" className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                        Envoyer ma demande <Send className="w-5 h-5 ml-2" />
                    </Button>
                    <p className="text-center text-zinc-500 text-xs mt-4">En cliquant sur envoyer, vous serez redirigé vers WhatsApp pour finaliser l'échange.</p>
                </form>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
                <div className="max-w-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">ABM</div>
                        <span className="text-xl font-bold text-white">ABM MEDIA</span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-6">Agence digitale nouvelle génération. Nous transformons les marques en mouvements culturels grâce à une stratégie audacieuse et une production visuelle haut de gamme.</p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all"><Instagram className="w-4 h-4" /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all"><Facebook className="w-4 h-4" /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all"><Linkedin className="w-4 h-4" /></a>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-20">
                    <div>
                        <h4 className="text-white font-bold mb-6">Menu</h4>
                        <ul className="space-y-4 text-zinc-400 text-sm">
                            <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => scrollToSection('services')}>Services</li>
                            <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => scrollToSection('work')}>Projets</li>
                            <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => scrollToSection('process')}>Process</li>
                            <li className="hover:text-blue-400 cursor-pointer transition-colors" onClick={() => scrollToSection('about')}>À propos</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Légal</h4>
                        <ul className="space-y-4 text-zinc-400 text-sm">
                            <li className="hover:text-white cursor-pointer">Mentions Légales</li>
                            <li className="hover:text-white cursor-pointer">Confidentialité</li>
                            <li className="hover:text-white cursor-pointer">CGV</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-zinc-400 text-sm">
                            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /> contact@abm-media.com</li>
                            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-blue-500" /> +216 58 639 342</li>
                            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> Sousse, Tunisie</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
                <p>&copy; {new Date().getFullYear()} ABM Media. All rights reserved.</p>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span>Systems Operational</span></div>
            </div>
        </div>
      </footer>
    </div>
  )
}