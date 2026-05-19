"use client"

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence, useMotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Play, Globe, Palette, Video, ArrowRight, ArrowLeft,
  Eye, Heart, Lightbulb, Layers, Rocket, Quote,
  Facebook, Instagram, Camera, Clapperboard, 
  BrainCircuit, Send, ChevronDown, Check, Paintbrush, CreditCard, LayoutDashboard, Search, ShieldCheck, Box
} from "lucide-react"
import { useRef, useState, useEffect, MouseEvent as ReactMouseEvent } from "react"

// --- TYPES & INTERFACES ---
interface SelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  stats: { views: string; engagement: string };
}

interface ProcessStepItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  initials: string;
  text: string;
}

interface FormDataState {
  name: string;
  email: string;
  mainService: string;
  siteType: string;
  scale: string;
  projectFiles: string;
  figmaDesign: boolean;
  onlinePayment: boolean;
  adminDash: boolean;
  saasModule: boolean;
  seoMonthly: boolean;
  maintenanceMonthly: boolean;
  message: string;
}

// --- COMPOSANT SELECT CUSTOM ---
const CustomSelect = ({ options, value, onChange, placeholder }: SelectProps) => {
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
        className={`w-full h-16 bg-zinc-950/80 border rounded-xl px-6 flex items-center justify-between cursor-pointer transition-all duration-300 backdrop-blur-md ${
          isOpen ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-white/10 hover:border-white/20'
        }`}
      >
        <span className={`text-base transition-colors duration-300 ${value ? 'text-white' : 'text-zinc-500'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-zinc-950/95 border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            <div className="max-h-[250px] overflow-y-auto py-1.5">
              {options.map((option: string) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="px-6 py-3.5 hover:bg-zinc-900/80 cursor-pointer flex items-center justify-between group transition-colors duration-200"
                >
                  <span className={`text-sm tracking-wide transition-colors ${value === option ? 'text-blue-400 font-semibold' : 'text-zinc-400 group-hover:text-white'}`}>
                    {option}
                  </span>
                  {value === option && <Check className="w-4 h-4 text-blue-400" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPOSANTS DE STRUCTURE ---
const ServiceCard = ({ service, index, isHovered, onHover, onLeave }: { service: ServiceItem, index: number, isHovered: boolean, onHover: () => void, onLeave: () => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.215, 0.610, 0.355, 1.000] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-default h-full flex flex-col justify-between overflow-hidden ${
        isHovered ? "bg-zinc-900/60 border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.08)] scale-[1.02]" : "bg-zinc-900/20 border-white/5"
      }`}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.06), transparent 80%)`
        }}
      />
      <div>
        <div className="mb-6 inline-flex p-3.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:scale-110">
          <service.icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 whitespace-pre-line font-light">
          {service.description}
        </p>
      </div>
      <div className="mt-10 flex items-center text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-all duration-300">
         Découvrir 
         <ArrowRight className="w-3.5 h-3.5 ml-2 -rotate-45 group-hover:rotate-0 group-hover:text-blue-400 transition-all duration-300" />
      </div>
    </motion.div>
  )
}

const ProjectCard = ({ project, index, className }: { project: ProjectItem, index: number, className: string }) => {
  const isVideo = project.thumbnail.toLowerCase().endsWith('.mp4') || project.thumbnail.toLowerCase().endsWith('.mov');

  return (
    <motion.div
        className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-zinc-950 border border-white/5 ${className}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6 }}
    >
        <div className="absolute inset-0 overflow-hidden z-0">
            {isVideo ? (
                <video src={project.thumbnail} className="w-full h-full object-cover opacity-70 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 ease-out" muted loop autoPlay playsInline />
            ) : (
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-70 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/60 to-transparent transition-all duration-500 group-hover:via-black/80" />
            {isVideo && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2.5 rounded-full border border-white/10 z-20 shadow-lg">
                    <Video className="w-3.5 h-3.5 text-white" />
                </div>
            )}
        </div>
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
            <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-2.5 block">{project.category}</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight leading-tight group-hover:text-blue-100 transition-colors">{project.title}</h3>
                
                <div className="h-0 overflow-hidden opacity-0 group-hover:h-12 group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 border-t border-white/10">
                    <div className="flex items-center gap-4 md:gap-6 pt-4 text-xs font-medium uppercase tracking-wider text-zinc-400">
                      <span className="flex items-center gap-1.5 text-zinc-300"><Eye className="w-4 h-4 text-blue-500" /> {project.stats.views} Vues</span>
                      <span className="w-1 h-1 bg-zinc-700 rounded-full"/>
                      <span className="flex items-center gap-1.5 text-zinc-300"><Heart className="w-4 h-4 text-blue-500" /> {project.stats.engagement} Engagement</span>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

const ProcessStep = ({ step, index, isLast }: { step: ProcessStepItem, index: number, isLast: boolean }) => (
    <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        className="flex gap-6 relative group"
    >
        {!isLast && (
            <div className="absolute left-6 top-14 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/30 to-transparent group-hover:from-blue-500 transition-colors duration-500" />
        )}
        <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-zinc-950 border border-white/10 group-hover:border-blue-500/50 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 shadow-xl group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-500">
            <step.icon className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
        </div>
        <div className="pb-12 pt-1.5">
            <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{step.title}</h4>
            <p className="text-zinc-400 leading-relaxed max-w-md font-light text-sm">{step.description}</p>
        </div>
    </motion.div>
)

const TestimonialCard = ({ testimonial, index }: { testimonial: TestimonialItem, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6, scale: 1.01 }}
        className={`bg-zinc-950/40 border border-white/5 p-8 md:p-10 rounded-3xl relative flex flex-col justify-between hover:border-blue-500/20 shadow-2xl transition-all duration-400 backdrop-blur-md ${
          index === 1 ? "md:translate-y-6 border-blue-500/10 bg-zinc-900/10" : ""
        }`}
    >
        <Quote className="absolute top-8 right-8 w-12 h-12 text-blue-500/[0.03] pointer-events-none" />
        <div>
            <p className="text-zinc-300 text-[15px] md:text-base leading-relaxed font-light tracking-wide italic mb-8">
              "{testimonial.text}"
            </p>
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {testimonial.initials}
            </div>
            <div>
                <div className="text-white font-medium text-base tracking-tight">{testimonial.name}</div>
                <div className="text-blue-400 text-[11px] font-bold uppercase tracking-widest mt-0.5">{testimonial.role}</div>
            </div>
        </div>
    </motion.div>
)

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -50 : 50 })
}

// --- COMPOSANT PRINCIPAL ---
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<string>("services")
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  
  // Suivi de la souris pour animer l'arrière-plan du Hero
  const heroMouseX = useMotionValue(0)
  const heroMouseY = useMotionValue(0)

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    mainService: "Développement Web", 
    siteType: "Site Vitrine", 
    scale: "Basque (1-5 sections) - Images fournies par vos soins (Standard Inclus)", 
    projectFiles: "",
    figmaDesign: false,
    onlinePayment: false,
    adminDash: false,
    saasModule: false,
    seoMonthly: false,
    maintenanceMonthly: false,
    message: ""
  })

  const categoriesABM = [
    "Développement Web",
    "Branding & Identité",
    "Création de Contenu",
    "Shooting & DA",
    "FX & Post-Production",
    "Stratégie Digitale"
  ]

  const navItems = [
    { name: 'Services', id: 'services' },
    { name: 'Projets', id: 'work' },
    { name: 'Process', id: 'process' },
    { name: 'À propos', id: 'about' }
  ]

  // Liste exhaustive de tous les logos de partenaires
  const partnersLogos = [
    { src: "/logos_00.png", alt: "Logo 00" },
    { src: "/logos_01.png", alt: "Logo 01" },
    { src: "/itkanongblue.png", alt: "Itkan Consulting Services" },
    { src: "/logos_03.png", alt: "Logo 03" },
    { src: "/logos_06.png", alt: "Logo 06" },
    { src: "/logos_07.png", alt: "Logo 07" },
    { src: "/logos_08.png", alt: "Logo 08" },
    { src: "/logos_09.png", alt: "Logo 09" },
    { src: "/logos_10.png", alt: "Logo 10" },
    { src: "/logos_11.png", alt: "Logo 11" },
    { src: "/logos_12.png", alt: "Logo 12" },
    { src: "/nutriest.png", alt: "Nutribeast" },
    
  ]

  // On duplique la liste pour créer un effet de boucle fluide infini sans coupure
  const doublePartners = [...partnersLogos, ...partnersLogos]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setDirection(1)
    setStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setDirection(-1)
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const phoneNumber = "21658639342"
      
      let text = `*🚀 NOUVEAU BRIEF PROJET PREMIUM - ABM MEDIA*
    
👤 *Prospect :* ${formData.name}
📧 *Email :* ${formData.email}
🛠 *Service Sélectionné :* ${formData.mainService}

`

      if (formData.mainService === "Développement Web") {
        text += `⚙ *CONFIGURATION TECHNIQUE WEB :*
• *Type de produit :* ${formData.siteType}
• *Envergure / Sections :* ${formData.scale}
• *Fichiers / Ressources :* ${formData.projectFiles || "Aucun lien fourni"}

💎 *MODULES & OPTIONS CONFIGURÉES :*
${formData.figmaDesign ? '✅ Maquette UI/UX Figma Sur-Mesure\n' : ''}${formData.onlinePayment ? '✅ Passerelle de Paiement Sécurisé\n' : ''}${formData.adminDash ? '✅ Interface d\'administration Back-Office\n' : ''}${formData.saasModule ? '✅ Infrastructure Multi-Tenant / SaaS\n' : ''}${formData.seoMonthly ? '🔄 SEO & Référencement Mensuel\n' : ''}${formData.maintenanceMonthly ? '🔄 Maintenance & Hébergement Cloud\n' : ''}`
      }

      text += `\n📝 *Notes additionnelles :*
"${formData.message || 'Aucun message complémentaire.'}"`

      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const scrollToSection = (id: string) => {
      setActiveSection(id)
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function handleHeroMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    heroMouseX.set(clientX - left)
    heroMouseY.set(clientY - top)
  }

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0])
  const bigTextY = useTransform(smoothProgress, [0, 1], ["0%", "-8%"])

  const services: ServiceItem[] = [
    { icon: Globe, title: "Développement Web", description: "Plateformes digitales sur mesure, pensées pour convertir. Sites optimisés, performants et alignés avec votre vision." },
    { icon: Palette, title: "Branding & Identité", description: "Construction de marques fortes et mémorables. Identité visuelle et storytelling pour renforcer votre crédibilité." },
    { icon: Video, title: "Création de Contenu", description: "Vidéos, visuels et formats social media stratégiques conçus pour attirer, engager et hacker votre croissance." },
    { icon: Camera, title: "Shooting & DA", description: "Direction artistique, mises en scène et shootings photo/vidéo professionnels pour valoriser votre image de marque." },
    { icon: Clapperboard, title: "FX & Post-Production", description: "Montage dynamique, motion design et effets visuels modernes pour maximiser l'impact sur les réseaux." },
    { icon: BrainCircuit, title: "Stratégie Digitale", description: "Accompagnement personnalisé basé sur l'analyse et la performance pour accélérer votre croissance concrète." },
  ]

  const projects: ProjectItem[] = [
    { id: 1, title: "Nutribeast Store Concept", category: "Retail Design & Branding", thumbnail: "/nutri TOUR.mov", stats: { views: "25k", engagement: "94%" } },
    { id: 2, title: "Velar Tour Experience", category: "Web Design UI/UX", thumbnail: "/IMG_1006.JPG", stats: { views: "42k", engagement: "89%" } },
    { id: 3, title: "ABE Energy Campaign", category: "Production Vidéo & FX", thumbnail: "/ABE.mp4", stats: { views: "150k+", engagement: "98%" } },
    { id: 4, title: "Unviral Growth Strategy", category: "Data-Driven Marketing", thumbnail: "/Unviral.mp4", stats: { views: "50k+", engagement: "96%" } },
    { id: 5, title: "Streetwear Lifestyle", category: "Shooting Studio", thumbnail: "/_DSC0518.JPG", stats: { views: "35k", engagement: "95%" } },
    { id: 6, title: "Education Lifestyle Reels", category: "Social Media Content", thumbnail: "/1 video anas.mp4", stats: { views: "200k+", engagement: "99%" } },
    { id: 7, title: "DUKA Brand Launch", category: "Motion Design & Branding", thumbnail: "/DUKA.MP4", stats: { views: "85k", engagement: "93%" } },
  ]

  const stats = [
    { icon: BrainCircuit, value: "20+", label: "Projets Terminés" },
    { icon: BrainCircuit, value: "15+", label: "Clients Heureux" },
    { icon: BrainCircuit, value: "1M+", label: "Vues Totales" },
    { icon: BrainCircuit, value: "90%", label: "Satisfaction" },
  ]

  const processSteps: ProcessStepItem[] = [
      { icon: Lightbulb, title: "Découverte", description: "Nous analysons en profondeur l'essence de votre marque, vos objectifs et votre audience." },
      { icon: Layers, title: "Stratégie & Design", description: "Nos architectes créent le plan pendant que les designers façonnent l'identité visuelle." },
      { icon: Video, title: "Production", description: "C'est ici que la magie opère : développement, tournage, montage et création." },
      { icon: Rocket, title: "Lancement & Croissance", description: "Déploiement du projet et suivi des performances pour un ROI maximal." }
  ]

  const testimonials: TestimonialItem[] = [
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

  // Variantes pour l'apparition progressive (Stagger) du titre du Hero
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  }

  const titleLetterVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030304] text-white overflow-x-hidden font-sans selection:bg-blue-500/30 relative">
      
      {/* INJECTION STYLES ET ANIMATIONS DES CARROUSELS ET DES EFFETS LUMINEUX */}
      <style jsx global>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes waveGlow {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.25; filter: blur(40px); }
          50% { transform: translateY(-46%) scale(1.1); opacity: 0.45; filter: blur(25px); }
        }
        @keyframes subtlePulse {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(59,130,246,0.15)); }
          50% { filter: drop-shadow(0 0 35px rgba(37,99,235,0.35)); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes infiniteScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .text-blue-glow {
          text-shadow: 0 0 50px rgba(59, 130, 246, 0.3);
        }
        .wave-container::before {
          content: "";
          position: absolute;
          top: 0; left: 25%; right: 25%; height: 50px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent);
          animation: waveGlow 6s ease-in-out infinite;
          z-index: -1;
          pointer-events: none;
        }
        .site-logo-animation {
          background: linear-gradient(90deg, #fff 0%, #3b82f6 50%, #fff 100%);
          background-size: 200% auto;
          animation: shimmer 5s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .animate-infinite-slider {
          display: flex;
          width: max-content;
          animation: infiniteScroll 35s linear infinite;
        }
        .animate-infinite-slider:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- ARRIÈRE-PLAN GLOBAL --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vw] h-[80vh] bg-gradient-to-b from-blue-950/10 via-transparent to-transparent rounded-full blur-[150px] mix-blend-screen"></div>
        <div className="absolute top-[20%] left-[25%] w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[120px]" />

        <motion.div style={{ y: bigTextY }} className="absolute inset-0 flex items-center justify-center select-none overflow-hidden opacity-[0.012] z-10">
            <span className="text-[42vw] font-black text-white leading-none tracking-tighter whitespace-nowrap blur-[2px]">LEGACY</span>
        </motion.div>
      </div>

      {/* --- NAVBAR PREMIUM AVEC LOGO ANIMÉ --- */}
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center wave-container"
      >
        <div className={`flex items-center justify-between px-8 py-4 rounded-2xl transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-3xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] w-full max-w-6xl" : "bg-zinc-950/40 border border-white/5 backdrop-blur-md w-full max-w-[1500px]"}`}>
            
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="flex flex-col leading-none">
                    <span className="text-2xl font-black tracking-tighter site-logo-animation uppercase transition-transform duration-300 group-hover:scale-102">abm</span>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.25em] mt-0.5 group-hover:text-blue-400 transition-colors duration-300">media</span>
                </div>
            </div>
            
            <div 
              className="hidden md:flex items-center gap-1 bg-black/40 rounded-full p-1.5 border border-white/5 backdrop-blur-md relative"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {navItems.map((item) => {
                const isSelected = activeSection === item.id;
                const isHovered = hoveredNav === item.id;
                return (
                  <button 
                    key={item.name} 
                    onClick={() => scrollToSection(item.id)} 
                    onMouseEnter={() => setHoveredNav(item.id)}
                    className="px-5 py-2 rounded-full text-sm font-medium relative transition-colors duration-300 z-10 text-zinc-400 hover:text-white"
                  >
                    {(isSelected || isHovered) && (
                      <motion.span
                        layoutId="navbar-active-bg"
                        className={`absolute inset-0 rounded-full -z-10 ${isSelected ? 'bg-white/10 shadow-inner' : 'bg-white/5'}`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.name}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center gap-2 mr-1 pr-4 border-r border-white/10">
                    <a href="https://www.instagram.com/abmmedia_?" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-zinc-900 hover:text-white transition-all duration-300 text-zinc-400"><Instagram className="w-4 h-4" /></a>
                    <a href="https://www.facebook.com/share/" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-zinc-900 hover:text-white transition-all duration-300 text-zinc-400"><Facebook className="w-4 h-4" /></a>
                </div>
                <Button onClick={() => scrollToSection('contact')} className="rounded-xl h-11 px-7 bg-white text-black hover:bg-zinc-200 font-bold text-sm transition-all duration-300 shadow-md active:scale-95">Démarrer</Button>
            </div>
        </div>
      </motion.nav>

      {/* --- HERO SECTION REVISITÉE & ULTRA-ANIMÉE --- */}
      <motion.section 
        ref={heroRef} 
        style={{ opacity: heroOpacity }} 
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 z-10 pt-20 group/hero"
      >
        {/* Projecteur réactif aux mouvements de souris */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${heroMouseX}px ${heroMouseY}px, rgba(59, 130, 246, 0.04), transparent 70%)`
          }}
        />

        <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center justify-center h-full">
            <motion.div 
              initial={{ opacity: 0, y: -15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} 
              className="mb-8 flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/10 bg-blue-500/[0.03] backdrop-blur-xl"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400">AGENCE DIGITALE PREMIUM</span>
            </motion.div>

            {/* Animation de texte avancée (stagger effect) */}
            <motion.h1 
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
              className="text-[11vw] sm:text-[10.5vw] md:text-[115px] font-black tracking-tighter leading-[0.92] text-center mb-12 uppercase select-none font-sans"
            >
                <motion.span variants={titleLetterVariants} className="text-white font-extrabold opacity-95 block mb-2">WE BUILD</motion.span>
                <motion.span 
                  variants={titleLetterVariants}
                  className="text-blue-glow text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white bg-[length:200%_auto] inline-block pb-4 pt-1"
                  style={{ animation: 'gradientFlow 6s ease infinite, subtlePulse 4s ease-in-out infinite' }}
                >
                  LEGACIES.
                </motion.span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="text-base md:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-16 font-light tracking-wide px-4"
            >
              Your vision. Our inspiration. ABM Media engineers cultural moments through strategy, storytelling and digital production built to influence, engage and convert.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none px-6"
            >
                <Button onClick={() => scrollToSection('contact')} className="h-16 px-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all duration-300 w-full sm:w-auto active:scale-98 shadow-[0_4px_30px_rgba(37,99,235,0.2)]">
                  <Play className="w-4 h-4 mr-2 fill-white stroke-none" /> Démarrer maintenant
                </Button>
                <Button onClick={() => scrollToSection('work')} variant="outline" className="h-16 px-12 rounded-full border-white/10 text-white font-bold text-base bg-white/[0.02] hover:bg-white/10 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm">
                  Notre Portfolio <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </motion.div>
        </div>
      </motion.section>

      {/* --- STATS SECTION --- */}
      <section id="about" className="border-b border-white/5 bg-[#050507] relative z-20">
         <div className="max-w-[1400px] mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center group cursor-default">
                    <span className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 font-semibold group-hover:text-zinc-300 transition-colors duration-300">{stat.label}</span>
                </div>
            ))}
         </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 px-6 relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
              <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 block">Expertises</span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Nos Services</h2>
              <p className="text-zinc-500 text-sm max-w-md font-light leading-relaxed">De la stratégie à la production créative de pointe, nous maîtrisons chaque maillon de votre impact digital.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} isHovered={hoveredService === index} onHover={() => setHoveredService(index)} onLeave={() => setHoveredService(null)} />
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section id="process" className="py-32 px-6 bg-[#08080a] border-y border-white/5 relative z-20">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
                <div className="lg:w-1/3 lg:sticky lg:top-32">
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 block">Méthodologie</span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Notre Process</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed font-light mb-10 max-w-sm">Une structure agile, transparente et itérative pour garantir le succès de votre projet, de l'idée au déploiement.</p>
                    <Button onClick={() => scrollToSection('contact')} className="h-14 px-8 rounded-xl bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800 transition-colors font-bold text-sm">Lancer un projet</Button>
                </div>
                <div className="lg:w-2/3 w-full pl-2">
                    {processSteps.map((step, index) => (
                        <ProcessStep key={step.title} step={step} index={index} isLast={index === processSteps.length - 1} />
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* --- PROJETS WORK SECTION --- */}
      <section id="work" className="py-32 px-6 relative z-20">
        <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
                <div>
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 block">Réalisations</span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-2">Projets Récents</h2>
                </div>
                <p className="text-zinc-500 text-sm max-w-xs font-light leading-relaxed"> Une sélection de travaux combinant design millimétré, performance technique et impact culturel.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[340px] md:auto-rows-[380px]">
                <ProjectCard project={projects[0]} index={0} className="md:col-span-8" />
                <ProjectCard project={projects[1]} index={1} className="md:col-span-4" />
                <ProjectCard project={projects[2]} index={2} className="md:col-span-4" />
                <ProjectCard project={projects[3]} index={3} className="md:col-span-4" />
                <ProjectCard project={projects[4]} index={4} className="md:col-span-4" />
                <ProjectCard project={projects[5]} index={5} className="md:col-span-7" />
                <ProjectCard project={projects[6]} index={6} className="md:col-span-5" />
            </div>
        </div>
      </section>

      {/* --- CARROUSEL DÉROULANT INFINI ET ULTRA-VISIBLE DES PARTENAIRES --- */}
      <section className="py-24 border-t border-white/5 bg-zinc-950/40 relative z-20 overflow-hidden">
        <div className="w-full">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400 text-center mb-16 px-4">
              ILS NOUS FONT CONFIANCE POUR ÉCRIRE LEUR HISTOIRE DIGITALE
            </p>
            
            {/* Conteneur du ruban de défilement sans fin */}
            <div className="relative w-full flex overflow-x-hidden mask-gradient">
              {/* Effet d'ombrage fondu sur les côtés pour faire ressortir les logos au centre */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030304] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030304] to-transparent z-10 pointer-events-none" />

              <div className="animate-infinite-slider gap-6 px-4">
                {doublePartners.map((partner, index) => (
                    <div 
                      key={index}
                      className="group flex items-center justify-center p-6 h-28 w-48 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-blue-500/30 hover:bg-zinc-900/80 hover:scale-[1.04]"
                    >
                      <img 
                        src={partner.src} 
                        alt={partner.alt} 
                        className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 group-hover:filter-none transition-all duration-300 filter brightness-110 contrast-105" 
                      />
                    </div>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* --- SECTION AVIS DISPOSITION ASYMÉTRIQUE --- */}
      <section className="py-32 px-6 bg-[#050507] border-t border-white/5 relative z-20">
         <div className="max-w-[1300px] mx-auto">
            <div className="mb-24 flex flex-col items-center text-center">
                <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 block">Témoignages</span>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Ce qu'ils disent de nous</h2>
                <div className="w-12 h-[1px] bg-blue-500/30 mt-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:pb-12">
                {testimonials.map((t, i) => (
                    <TestimonialCard key={t.name} testimonial={t} index={i} />
                ))}
            </div>
         </div>
      </section>

      {/* --- CONTACT & CONFIGURATEUR BRIEF --- */}
      <section id="contact" className="py-32 px-6 bg-black relative z-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 block">Configurateur</span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Lancer mon Brief</h2>
            <p className="text-zinc-500 text-sm font-light max-w-sm mx-auto">Configurez vos besoins en quelques clics et transmettez le dossier directement sur notre ligne d'onboarding.</p>
          </div>

          <div className="bg-zinc-900/20 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
            
            <div className="flex gap-2 mb-12 max-w-xs mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`} />
              ))}
            </div>

            <form onSubmit={handleWhatsAppSubmit}>
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 && (
                  <motion.div
                    key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold mb-6 text-white/90">Informations de base</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Votre nom / Entreprise *" className="w-full h-16 bg-zinc-950/80 border border-white/10 rounded-xl px-6 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300" />
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="Votre adresse email *" className="w-full h-16 bg-zinc-950/80 border border-white/10 rounded-xl px-6 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">Quel service principal recherchez-vous ?</label>
                      <CustomSelect options={categoriesABM} value={formData.mainService} placeholder="Sélectionnez un service" onChange={(value) => setFormData(p => ({ ...p, mainService: value }))} />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-white/90">Spécifications techniques</h3>
                    
                    {formData.mainService === "Développement Web" ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">Nature de votre produit Web</label>
                            <CustomSelect options={["Site Vitrine", "Application Web / SaaS", "E-Commerce", "Landing Page Haute Conversion", "Sur-mesure Complexe"]} value={formData.siteType} placeholder="Type de site" onChange={(val) => setFormData(p => ({ ...p, siteType: val }))} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">Volume de la plateforme (Sections / Pages)</label>
                            <CustomSelect options={["Basque (1-5 sections) - Images fournies par vos soins (Standard Inclus)", "Intermédiaire (5-15 sections) - Architecture Avancée (Ajustement Tarifaire)", "Grande Envergure (15+ sections) / Écosystème complexe (Ajustement Tarifaire)"]} value={formData.scale} placeholder="Envergure du projet" onChange={(val) => setFormData(p => ({ ...p, scale: val }))} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">Lien vers vos éléments de projet (Figma, Drive, Documents... Optionnel)</label>
                          <input type="text" name="projectFiles" value={formData.projectFiles} onChange={handleInputChange} placeholder="https://figma.com/... ou https://drive.google.com/..." className="w-full h-16 bg-zinc-950/80 border border-white/10 rounded-xl px-6 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-all duration-300" />
                        </div>

                        <div className="space-y-3 pt-2">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1 block mb-2">Modules & Extensions Requis :</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { id: "figmaDesign", label: "Maquette UI/UX Figma Sur-Mesure", icon: Paintbrush },
                              { id: "onlinePayment", label: "Passerelle de Paiement Sécurisé", icon: CreditCard },
                              { id: "adminDash", label: "Interface d'administration Back-Office", icon: LayoutDashboard },
                              { id: "saasModule", label: "Infrastructure Multi-Tenant / SaaS", icon: Box },
                              { id: "seoMonthly", label: "SEO & Référencement Mensuel", icon: Search },
                              { id: "maintenanceMonthly", label: "Maintenance & Hébergement Cloud", icon: ShieldCheck }
                            ].map((opt) => {
                              const checked = formData[opt.id as keyof FormDataState] as boolean;
                              return (
                                <div 
                                  key={opt.id}
                                  onClick={() => setFormData(p => ({ ...p, [opt.id]: !checked }))}
                                  className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer select-none transition-all duration-300 ${checked ? 'bg-blue-600/10 border-blue-500 text-white' : 'bg-zinc-950/40 border-white/5 text-zinc-400 hover:border-white/10'}`}
                                >
                                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${checked ? 'bg-blue-600 border-blue-500 text-white' : 'border-zinc-700 bg-zinc-900'}`}>
                                    {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                  </div>
                                  <opt.icon className={`w-4 h-4 ${checked ? 'text-blue-400' : 'text-zinc-500'}`} />
                                  <span className="text-xs font-medium tracking-wide">{opt.label}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-10 text-center border border-dashed border-white/5 rounded-xl bg-zinc-950/30">
                        <p className="text-sm text-zinc-400 max-w-sm mx-auto font-light leading-relaxed">Briefing Créatif standard configuré pour le service : <span className="text-blue-400 font-semibold">{formData.mainService}</span>. Passez à l'étape suivante pour ajouter vos notes.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold mb-4 text-white/90">Finalisation du Brief</h3>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider pl-1">Message ou exigences spécifiques complémentaires</label>
                      <textarea name="message" rows={5} value={formData.message} onChange={handleInputChange} placeholder="Décrivez les objectifs clés de votre marque, les délais souhaités, les inspirations..." className="w-full p-6 bg-zinc-950/80 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none" />
                    </div>
                    <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 flex gap-4 items-start">
                      <Send className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">En cliquant sur Transmettre, votre brief complet sera structuré automatiquement et envoyé directement à notre équipe technique via WhatsApp pour un examen immédiat sous 24h.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                {step > 1 ? (
                  <button type="button" onClick={prevStep} className="h-14 px-8 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-semibold text-sm flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Retour
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button type="button" onClick={nextStep} className="h-14 px-8 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-md flex items-center gap-2 ml-auto">
                    Continuer <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="submit" className="h-14 px-10 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2 ml-auto">
                    Transmettre le Brief <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-white/5 bg-[#030304] text-zinc-500 text-xs relative z-20">
         <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-sm uppercase tracking-tighter">abm media</span>
              <span>© {new Date().getFullYear()} — Premium digital architecture.</span>
            </div>
            <div className="flex gap-6">
               <a href="#services" className="hover:text-white transition-colors">Services</a>
               <a href="#work" className="hover:text-white transition-colors">Projets</a>
               <a href="#process" className="hover:text-white transition-colors">Process</a>
               <a href="#contact" className="hover:text-white transition-colors">Onboarding</a>
            </div>
         </div>
      </footer>
    </div>
  )
}