"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Carousel, Product } from "./components/Carousel";
import { AnimatedSection, AnimatedChild } from "./components/AnimatedSection";

const juiceProducts: Product[] = [
  { id: "j1", src: "/Juices/Juices/0000.png", alt: "Passion Fruit Juice", color: "#cbaacb" }, // Purple
  { id: "j2", src: "/Juices/Juices/0001.png", alt: "Orange Juice", color: "#ffb347" }, // Orange
  { id: "j3", src: "/Juices/Juices/0002.png", alt: "Mango Juice", color: "#ffcc5c" }, // Yellow/Orange
  { id: "j4", src: "/Juices/Juices/0003.png", alt: "Guava Juice", color: "#dcedc1" }, // Pale Green
  { id: "j5", src: "/Juices/Juices/0004.png", alt: "Cocktail Juice", color: "#ffb6b9" }, // Pink/Red
  { id: "j6", src: "/Juices/Juices/0005.png", alt: "Apple Juice", color: "#a8e6cf" }, // Fresh Green
  { id: "j7", src: "/Juices/Juices/0006 (1).png", alt: "Pineapple Juice", color: "#ffeb99" }, // Yellow
];

//changes
const yogurtProducts: Product[] = [
  { id: "y1", src: "/Yorgurt/Yorgurt/0001 (1).png", alt: "Strawberry Yogurt", color: "#ffc6d9" }, // Strawberry (Pink)
  { id: "y2", src: "/Yorgurt/Yorgurt/0002 (1).png", alt: "Vanilla Yogurt", color: "#b3e5be" }, // Vanilla (Green)
  { id: "y3", src: "/Yorgurt/Yorgurt/0003 (1).png", alt: "Strawberry Yogurt", color: "#ffc6d9" }, // Strawberry (Pink)
  { id: "y4", src: "/Yorgurt/Yorgurt/0004 (1).png", alt: "Apricot Yogurt", color: "#ffdca8" }, // Apricot (Orange)
  { id: "y5", src: "/Yorgurt/Yorgurt/0005 (2).png", alt: "Vanilla Yogurt", color: "#b3e5be" }, // Vanilla (Green)
  { id: "y6", src: "/Yorgurt/Yorgurt/0006 (2).png", alt: "Apricot Yogurt", color: "#ffdca8" }, // Apricot (Orange)
];

const milkProducts: Product[] = [
  { id: "m1", src: "/Low fat milk.png", alt: "Low Fat Milk", color: "#38bdf8" }, // Bright Sky Blue
  { id: "m2", src: "/Low fat milk-bw.png", alt: "Milk BW", color: "#e2e3e5" }, // Grey
  { id: "m3", src: "/Low fat milk.png", alt: "Whole Milk", color: "#38bdf8" } // Bright Sky Blue
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"Milk" | "Milk Products" | "Juice" | "Water">("Juice");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCarouselColor, setActiveCarouselColor] = useState<string>('#c7e9fb');

  const targetRef = useRef<HTMLDivElement>(null);
  const newsCarouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (newsCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = newsCarouselRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
      }
    };
    
    const carousel = newsCarouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      // Run once to set initial state
      handleScroll();
    }
    return () => {
      if (carousel) carousel.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollNews = (dir: 'left' | 'right') => {
    if (newsCarouselRef.current) {
      const child = newsCarouselRef.current.children[0] as HTMLElement;
      const scrollAmount = child ? child.offsetWidth + 24 : newsCarouselRef.current.clientWidth / 3;
      newsCarouselRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-3%", "0%"]);
  const x3 = useTransform(scrollYProgress, [0, 1], ["-1%", "-4%"]);

  const heroSlides = [
    {
      img: "/wqety.jpg",
      alt: "Football, Friends",
      text: <>Football,<br />Friends, and<br />Inyange</>,
      alignment: "object-top"
    },
    {
      img: "/feast_hq.png",
      alt: "Feast of Food",
      text: <>Food, Drinks,<br />And Smiles<br />Shared Together</>,
      alignment: "object-top"
    },
    {
      img: "/friends_hq.png",
      alt: "Friends Drinking",
      text: <>Refresh<br />Your Soul With<br />Every Sip</>,
      alignment: "object-center"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getActiveProducts = () => {
    switch (activeTab) {
      case "Juice": return juiceProducts;
      case "Milk Products": return yogurtProducts;
      case "Milk": return milkProducts;
      default: return juiceProducts;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-clip">
      {/* Top Section containing both Navbar and Hero to share the background */}
      <div className="relative w-full h-[100svh] max-h-[1080px] min-h-[500px] flex flex-col justify-between pb-16 md:pb-32">
        {/* Hero Background covering the full top area */}
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={slide.img}
                alt={slide.alt}
                fill
                className={`object-cover ${slide.alignment} w-full h-full opacity-90`}
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* 1. Floating Navbar */}
        <AnimatedChild from="top" delay={0.2} className="absolute top-0 w-full flex justify-center z-50">
          <header className="relative w-[95%] md:w-[90%] max-w-[1600px] bg-inyange-blue rounded-b-xl shadow-lg py-2 md:py-2.5 px-5 md:px-8">
          <div className="w-full flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image src="/inyange-logo.jpeg" alt="Inyange Logo" width={160} height={50} className="object-contain w-[100px] md:w-[130px]" />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 lg:space-x-8 text-white font-gill font-semibold text-[10px] lg:text-[11px] tracking-wider uppercase px-4">
              <a href="#" className="flex items-center text-yellow-400 smooth-hover">HOME</a>
              <a href="#" className="flex items-center hover:text-yellow-400 smooth-hover group">
                OUR BRANDS
                <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
              <a href="#" className="flex items-center hover:text-yellow-400 smooth-hover">RECIPES</a>
              <a href="#" className="flex items-center hover:text-yellow-400 smooth-hover group">
                ABOUT
                <svg className="w-3 h-3 lg:w-4 lg:h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
              <a href="#" className="flex items-center hover:text-yellow-400 smooth-hover">EDITORIAL PAGE</a>
              <a href="#" className="flex items-center hover:text-yellow-400 smooth-hover">REACH OUT</a>
            </nav>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-5 text-white flex-shrink-0">
              <button className="hover:text-yellow-400 transition-colors">
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button className="hover:text-yellow-400 transition-colors">
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation Dropdown */}
          {isMobileMenuOpen && (
            <nav className="md:hidden flex flex-col items-center mt-4 space-y-4 pb-4 text-white font-gill font-semibold text-[14px] tracking-wider uppercase border-t border-white/10 pt-6">
              <a href="#" className="text-yellow-400 smooth-hover">HOME</a>
              <a href="#" className="hover:text-yellow-400 smooth-hover flex items-center">
                OUR BRANDS
                <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
              <a href="#" className="hover:text-yellow-400 smooth-hover">RECIPES</a>
              <a href="#" className="hover:text-yellow-400 smooth-hover flex items-center">
                ABOUT
                <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
              <a href="#" className="hover:text-yellow-400 smooth-hover">EDITORIAL PAGE</a>
              <a href="#" className="hover:text-yellow-400 smooth-hover">REACH OUT</a>

              <div className="flex items-center space-x-6 pt-4 border-t border-white/10 w-3/4 justify-center">
                <button className="hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button className="hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </nav>
          )}
        </header>
        </AnimatedChild>

        {/* 2. Hero Text */}
        <div className="relative z-10 w-full max-w-[850px] mx-auto px-4 md:px-0 mt-auto mb-16 md:mb-24 min-h-[140px] md:min-h-[220px]">
          {heroSlides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute bottom-0 left-4 md:left-0 transition-all duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
            >
              <h1 className="text-4xl md:text-[55px] lg:text-[65px] text-white font-gothic leading-[0.9] uppercase tracking-tight max-w-2xl animate-text-glow">
                {slide.text}
              </h1>
            </div>
          ))}
        </div>
      </div>

      <main className="flex-1 w-full flex flex-col">

        {/* 3. Our Brand Range */}
        <AnimatedSection as="section" className="pt-10 pb-6 bg-white relative" delay={0}>
          <div className="w-full relative z-10">
            <div className="max-w-[850px] mx-auto px-4 md:px-0 text-center w-full">
              <AnimatedChild delay={0} from="bottom">
                <h2 className="text-5xl md:text-[65px] font-gothic text-inyange-blue uppercase leading-none tracking-tight mb-3">Our Brand Range</h2>
              </AnimatedChild>
              <AnimatedChild delay={0.12} from="bottom">
                <p className="text-[#5a6b7c] font-calibre font-medium text-lg mb-10 max-w-[600px] mx-auto">
                  Experience Rwanda's pure essence through our premium<br />selection of dairy, juices, and essential hydration.
                </p>
              </AnimatedChild>
              <AnimatedChild delay={0.22} from="bottom">
                <div className="bg-[#EAEAE2] rounded-[2rem] sm:rounded-full flex flex-wrap justify-center w-fit mx-auto p-2 mb-6 gap-2 sm:gap-0 sm:space-x-1 lg:space-x-2">
                  <button onClick={() => setActiveTab("Milk")} className={`px-5 sm:px-10 lg:px-12 py-2 rounded-full font-calibre font-bold text-[15px] sm:text-[18px] smooth-hover transition-colors duration-700 ${activeTab === 'Milk' ? 'text-white shadow-sm' : 'text-inyange-blue hover:bg-white/50'}`} style={activeTab === 'Milk' ? { backgroundColor: activeCarouselColor } : {}}>Milk</button>
                  <button onClick={() => setActiveTab("Milk Products")} className={`px-5 sm:px-10 lg:px-12 py-2 rounded-full font-calibre font-bold text-[15px] sm:text-[18px] smooth-hover transition-colors duration-700 ${activeTab === 'Milk Products' ? 'text-white shadow-sm' : 'text-inyange-blue hover:bg-white/50'}`} style={activeTab === 'Milk Products' ? { backgroundColor: activeCarouselColor } : {}}>Milk Products</button>
                  <button onClick={() => setActiveTab("Juice")} className={`px-5 sm:px-10 lg:px-12 py-2 rounded-full font-calibre font-bold text-[15px] sm:text-[18px] smooth-hover transition-colors duration-700 ${activeTab === 'Juice' ? 'text-white shadow-sm' : 'text-inyange-blue hover:bg-white/50'}`} style={activeTab === 'Juice' ? { backgroundColor: activeCarouselColor } : {}}>Juice</button>
                  <button onClick={() => setActiveTab("Water")} className={`px-5 sm:px-10 lg:px-12 py-2 rounded-full font-calibre font-bold text-[15px] sm:text-[18px] smooth-hover transition-colors duration-700 ${activeTab === 'Water' ? 'text-white shadow-sm' : 'text-inyange-blue hover:bg-white/50'}`} style={activeTab === 'Water' ? { backgroundColor: activeCarouselColor } : {}}>Water</button>
                </div>
              </AnimatedChild>
            </div>

            <AnimatedChild delay={0.3} from="bottom">
              <div className="w-full max-w-[1400px] mx-auto mt-0">
                <Carousel
                  products={getActiveProducts()}
                  onActiveColorChange={setActiveCarouselColor}
                  imageClassName={
                    activeTab === "Juice" ? "scale-[1.25]" :
                      activeTab === "Milk Products" ? "scale-[1.4]" :
                        activeTab === "Milk" ? "scale-[0.85]" :
                          ""
                  }
                />
              </div>
            </AnimatedChild>
          </div>

        </AnimatedSection>

        {/* 4. Our Picks */}
        <AnimatedSection as="section" className="pt-16 pb-24 bg-[#E8E8DF] relative z-[10]">
          {/* Fruits anchored to Our Picks but positioned into Our Brand Range above */}
          <AnimatedChild delay={0.1} from="left" className="absolute left-0 lg:left-[3%] top-[-50px] md:top-[-90px] lg:top-[-190px] z-[5] pointer-events-none">
            <Image unoptimized src="/apple.png" alt="Apples" width={260} height={520} className="object-contain w-[90px] md:w-[150px] lg:w-[210px] h-auto" />
          </AnimatedChild>
          <AnimatedChild delay={0.2} from="right" className="absolute right-0 top-[-50px] md:top-[-100px] lg:top-[-220px] z-[5] pointer-events-none translate-x-[40%] md:translate-x-[45%] lg:translate-x-[47%]">
            <Image unoptimized src="/brand-orange.png" alt="Orange" width={550} height={550} className="object-contain drop-shadow-lg w-[170px] md:w-[300px] lg:w-[550px] h-auto" />
          </AnimatedChild>

          <div className="max-w-[850px] mx-auto px-4 md:px-0 text-center w-full relative z-10">
            <AnimatedChild delay={0} from="bottom">
              <h2 className="text-5xl md:text-[65px] font-gothic text-inyange-blue uppercase leading-none tracking-tight mb-3">Our Picks</h2>
            </AnimatedChild>
            <AnimatedChild delay={0.1} from="bottom">
              <p className="text-[#5a6b7c] font-calibre font-medium text-lg mb-14">
                Signature recipes crafted to elevate your everyday meals.
              </p>
            </AnimatedChild>

            {/* Mobile Infinite Scroll Marquee */}
            <div className="md:hidden w-[calc(100%+2rem)] overflow-hidden pb-8 -mx-4">
              <div className="flex w-max animate-scroll [animation-duration:25s] hover:[animation-play-state:paused]">
                {[
                  { img: "/recipe_bread.webp", title: "Classic Banana Bread", desc: "Perfectly moist homemade treat" },
                  { img: "/recipe_soup.webp", title: "French Onion Soup", desc: "Delicious classic comfort" },
                  { img: "/recipe_fish.webp", title: "Lemon Basil Fish", desc: "Fresh and zesty grilled fillet" },
                  { img: "/recipe_chowder.webp", title: "Chicken Corn Chowder", desc: "Creamy and hearty delight" },
                  // Duplicate for seamless scroll
                  { img: "/recipe_bread.webp", title: "Classic Banana Bread", desc: "Perfectly moist homemade treat" },
                  { img: "/recipe_soup.webp", title: "French Onion Soup", desc: "Delicious classic comfort" },
                  { img: "/recipe_fish.webp", title: "Lemon Basil Fish", desc: "Fresh and zesty grilled fillet" },
                  { img: "/recipe_chowder.webp", title: "Chicken Corn Chowder", desc: "Creamy and hearty delight" }
                ].map((recipe, idx) => (
                  <AnimatedChild key={idx} delay={0} from="fade" className="w-[280px] sm:w-[320px] px-2 flex-shrink-0">
                    <div className="bg-white rounded-[30px] rounded-b-xl px-3 py-3 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform h-full">
                      <div className="w-[85%] aspect-square relative mb-3">
                        <Image src={recipe.img} alt={recipe.title} fill className="object-cover rounded-full" />
                      </div>
                      <h3 className="bg-inyange-blue text-inyange-green font-calibre font-bold uppercase text-[10px] tracking-wide w-full text-center py-1.5 rounded-full mb-1.5">{recipe.title}</h3>
                      <p className="text-inyange-blue font-calibre font-medium text-[10px] text-center leading-tight pb-1">{recipe.desc}</p>
                    </div>
                  </AnimatedChild>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-3">
              {[
                { img: "/recipe_bread.webp", title: "Classic Banana Bread", desc: "Perfectly moist homemade treat" },
                { img: "/recipe_soup.webp", title: "French Onion Soup", desc: "Delicious classic comfort" },
                { img: "/recipe_fish.webp", title: "Lemon Basil Fish", desc: "Fresh and zesty grilled fillet" },
                { img: "/recipe_chowder.webp", title: "Chicken Corn Chowder", desc: "Creamy and hearty delight" }
              ].map((recipe, idx) => (
                <AnimatedChild key={idx} delay={0.1 + idx * 0.1} from="bottom">
                  <div className="bg-white rounded-[30px] rounded-b-xl px-3 py-3 flex flex-col items-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform">
                    <div className="w-[85%] aspect-square relative mb-3">
                      <Image src={recipe.img} alt={recipe.title} fill className="object-cover rounded-full" />
                    </div>
                    <h3 className="bg-inyange-blue text-inyange-green font-calibre font-bold uppercase text-[10px] tracking-wide w-full text-center py-1.5 rounded-full mb-1.5">{recipe.title}</h3>
                    <p className="text-inyange-blue font-calibre font-medium text-[10px] text-center leading-tight pb-1">{recipe.desc}</p>
                  </div>
                </AnimatedChild>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 5. Trusted By People Worldwide */}
        <AnimatedSection as="section" className="bg-inyange-blue relative flex flex-col justify-end z-[20] pt-12 md:pt-24">
          <AnimatedChild delay={0.3} from="pop-up">
            <div className="w-full max-w-[750px] mx-auto relative flex justify-center h-[220px] md:h-[380px]">
              <div className="absolute bottom-0 w-[95%] sm:w-[85%] md:w-[90%] h-[350px] sm:h-[450px] md:h-[600px] z-30 pointer-events-none">
                <Image src="/girl.png" alt="Girl Drinking Milk" fill className="object-contain object-bottom drop-shadow-xl" />
              </div>
            </div>
          </AnimatedChild>

          <div ref={targetRef} className="bg-white py-8 md:py-16 w-full overflow-hidden relative z-20 flex flex-col justify-center min-h-[100svh] gap-y-4 md:gap-y-6 border-t-8 border-inyange-blue/10">
            {/* Row 1 */}
            <motion.div style={{ x: x1 }} className="flex whitespace-nowrap items-center w-max gap-x-4 md:gap-x-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-x-4 md:gap-x-6">
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-inyange-green leading-[0.8] tracking-tighter uppercase">Trusted</span>
                  <div className="w-[70px] h-[70px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] rounded-[1rem] md:rounded-[2rem] overflow-hidden relative shadow-md flex-shrink-0">
                    <Image src="/slide1.png" alt="Food" fill className="object-cover" />
                  </div>
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-[#0ea5e9] leading-[0.8] tracking-tighter uppercase">By</span>
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-inyange-blue leading-[0.8] tracking-tighter uppercase">People</span>
                  <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] lg:w-[170px] lg:h-[170px] rounded-[1rem] md:rounded-[2rem] overflow-hidden relative shadow-md flex-shrink-0">
                    <Image src="/slide3.png" alt="Food" fill className="object-cover" />
                  </div>
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-inyange-green leading-[0.8] tracking-tighter uppercase">Worldwide</span>
                </div>
              ))}
            </motion.div>
            
            {/* Row 2 */}
            <motion.div style={{ x: x2 }} className="flex whitespace-nowrap items-center w-max gap-x-4 md:gap-x-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-x-4 md:gap-x-6">
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-[#0ea5e9] leading-[0.8] tracking-tighter uppercase">Worldwide</span>
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-inyange-blue leading-[0.8] tracking-tighter uppercase">Trusted</span>
                  <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] lg:w-[170px] lg:h-[170px] rounded-[1rem] md:rounded-[2rem] overflow-hidden relative shadow-md flex-shrink-0">
                    <Image src="/freepik__enhance__29647.jpg" alt="Food" fill className="object-cover" />
                  </div>
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-inyange-green leading-[0.8] tracking-tighter uppercase">By</span>
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-[#0ea5e9] leading-[0.8] tracking-tighter uppercase">People</span>
                  <div className="w-[70px] h-[70px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] rounded-[1rem] md:rounded-[2rem] overflow-hidden relative shadow-md flex-shrink-0">
                    <Image src="/feast_hq.png" alt="Food" fill className="object-cover" />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Row 3 */}
            <motion.div style={{ x: x3 }} className="flex whitespace-nowrap items-center w-max gap-x-4 md:gap-x-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-x-4 md:gap-x-6">
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-inyange-blue leading-[0.8] tracking-tighter uppercase">People</span>
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-inyange-green leading-[0.8] tracking-tighter uppercase">Worldwide</span>
                  <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] lg:w-[170px] lg:h-[170px] rounded-[1rem] md:rounded-[2rem] overflow-hidden relative shadow-md flex-shrink-0">
                    <Image src="/friends_hq.png" alt="Food" fill className="object-cover" />
                  </div>
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-[#0ea5e9] leading-[0.8] tracking-tighter uppercase">Trusted</span>
                  <span className="text-[60px] md:text-[140px] lg:text-[160px] font-gothic text-inyange-blue leading-[0.8] tracking-tighter uppercase">By</span>
                  <div className="w-[70px] h-[70px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] rounded-[1rem] md:rounded-[2rem] overflow-hidden relative shadow-md flex-shrink-0">
                    <Image src="/friends_hq.png" alt="Food" fill className="object-cover" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* 6. The Pride of Rwanda's Beverage Industry */}
        <AnimatedSection as="section" className="bg-inyange-green py-12 md:py-24 relative z-[30]">
          <div className="max-w-[850px] mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <AnimatedChild delay={0} from="left" className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-4xl md:text-[60px] font-gothic text-white uppercase leading-[0.9] tracking-tight mb-4 md:mb-6">
                The Pride<br />Of Rwanda's<br />Beverage<br />Industry
              </h2>
              <p className="text-gray-900 font-calibre font-medium text-[13px] md:text-[15px] leading-relaxed max-w-[360px]">
                Inyange Industries is a leading food processing company in Rwanda, manufacturing a wide range of products under its household brand name—"Inyange". Known for high-quality mineral water, fruit juices, and dairy products, we have become the regional standard for modern and hygienic production.
              </p>
            </AnimatedChild>
            <AnimatedChild delay={0.2} from="right" className="w-full md:w-1/2 relative">
              <div className="w-full aspect-[16/9] md:aspect-[4/4.5] relative rounded-[20px] md:rounded-[40px] overflow-hidden shadow-xl">
                <Image src="/freepik__enhance__29647.jpg" alt="Mother and child pouring milk" fill className="object-cover object-center" />
              </div>
            </AnimatedChild>
          </div>
        </AnimatedSection>

        {/* 7 & 8. Vision, Mission & Leaders Wrapper */}
        <div className="z-[40] bg-white relative">
          <AnimatedChild delay={0.2} from="left" className="absolute left-0 top-[-60px] md:top-[-100px] lg:top-[-150px] z-30 pointer-events-none translate-x-[-30%] md:translate-x-[-25%] lg:translate-x-[-25%]">
            <Image unoptimized src="/mango.png" alt="Mango" width={400} height={400} className="object-contain drop-shadow-xl w-[160px] md:w-[250px] lg:w-[400px] h-auto" />
          </AnimatedChild>

          {/* 7. Vision & Mission */}
          <AnimatedSection as="section" className="pt-20 md:pt-12 pb-8 md:pb-4">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8 max-w-[760px]">
              <AnimatedChild delay={0} from="left">
                <div className="bg-[#f6f3e1] rounded-[16px] md:rounded-[24px] p-6 md:p-8 flex flex-col relative overflow-hidden shadow-sm h-full">
                  <div className="flex justify-between w-full items-center mb-2 md:mb-4">
                    <h3 className="text-2xl md:text-[38px] font-gothic text-inyange-blue uppercase leading-none">Vision</h3>
                    <svg className="w-8 h-8 md:w-14 md:h-14 text-inyange-blue stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5c-4 0-7 4.5-7 4.5s3 4.5 7 4.5 7-4.5 7-4.5-3-4.5-7-4.5z" />
                      <circle cx="12" cy="12" r="2.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V4M7 8.5L5.5 5.5M17 8.5L18.5 5.5" />
                    </svg>
                  </div>
                  <p className="text-[#0089c4] font-calibre font-medium text-[11px] md:text-[15px] leading-snug">
                    To be the leading East and Central African dairy and beverage brand, producing high quality products while enhancing shareholder value.
                  </p>
                </div>
              </AnimatedChild>
              <AnimatedChild delay={0.15} from="right">
                <div className="bg-[#f6f3e1] rounded-[16px] md:rounded-[24px] p-6 md:p-8 flex flex-col relative overflow-hidden shadow-sm h-full">
                  <div className="flex justify-between w-full items-center mb-2 md:mb-4">
                    <h3 className="text-2xl md:text-[38px] font-gothic text-inyange-blue uppercase leading-none">Mission</h3>
                    <svg className="w-8 h-8 md:w-14 md:h-14 text-inyange-blue stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l6-6m0 0h-4m4 0v4" />
                    </svg>
                  </div>
                  <p className="text-[#0089c4] font-calibre font-medium text-[11px] md:text-[15px] leading-snug">
                    To secure the highest value for all stakeholders while enriching lives through nutritious and tasty dairy and beverage choices.
                  </p>
                </div>
              </AnimatedChild>
            </div>
          </AnimatedSection>

          {/* 8. Visionary Leaders */}
          <AnimatedSection as="section" className="pt-8 md:pt-10 pb-24 md:pb-16 relative">
            <div className="container mx-auto px-4 text-center relative z-10">
              <AnimatedChild delay={0} from="bottom">
                <h2 className="text-[28px] md:text-[54px] font-gothic text-inyange-blue uppercase mb-2 md:mb-4 tracking-tight">Visionary Leaders</h2>
              </AnimatedChild>
              <AnimatedChild delay={0.1} from="bottom">
                <p className="hidden md:block text-[#556980] font-calibre font-medium text-[15px] max-w-[850px] mx-auto mb-10 leading-relaxed">
                  Inyange Industries is a leading food processing company in Rwanda, manufacturing a wide range of products<br className="hidden md:block" />
                  under its household brand name—"Inyange". Known for high-quality mineral water, fruit juices, and dairy<br className="hidden md:block" />
                  products, we have become the regional standard for modern and hygienic production.
                </p>
              </AnimatedChild>

              <div className="flex flex-wrap justify-center gap-4 md:gap-12 mt-4 md:mt-0">
                {[
                  { img: "/black-man-posing.jpg", name: "John Doe" },
                  { img: "/confident-business-woman-portrait-smiling-face.jpg", name: "Jane Doe" },
                  { img: "/african-teenage-girl-portrait-happy-smiling-face.jpg", name: "Jane Doe" },
                  { img: "/headshot-portrait-security-guard-work-smiling.jpg", name: "John Doe" }
                ].map((leader, idx) => (
                  <AnimatedChild key={idx} delay={0.1 + idx * 0.1} from="bottom">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-[130px] md:h-[130px] rounded-full overflow-hidden mb-2 md:mb-4 shadow-lg">
                        <Image src={leader.img} alt={leader.name} width={130} height={130} className="object-cover w-full h-full" />
                      </div>
                      <span className="text-inyange-blue font-calibre font-medium text-[12px] md:text-[15px]">{leader.name}</span>
                    </div>
                  </AnimatedChild>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* 9. From Our Newsroom */}
        <AnimatedSection as="section" className="py-10 md:py-20 bg-[#0ea5e9] z-[50] relative">
          <AnimatedChild delay={0.2} from="right" className="absolute right-0 top-[-80px] md:top-[-100px] lg:top-[-150px] z-30 pointer-events-none translate-x-[30%] md:translate-x-[30%] lg:translate-x-[35%]">
            <Image unoptimized src="/021.png" alt="Orange Slices" width={450} height={450} className="object-contain drop-shadow-xl w-[160px] md:w-[280px] lg:w-[450px] h-auto" />
          </AnimatedChild>

          <div className="container mx-auto px-4 text-center">
            <AnimatedChild delay={0} from="bottom">
              <h2 className="text-4xl md:text-[65px] font-gothic text-white uppercase leading-none mb-8 md:mb-20 tracking-tight">From Our Newsroom</h2>
            </AnimatedChild>

            <div ref={newsCarouselRef} className="flex overflow-hidden snap-x snap-mandatory hide-scrollbar gap-6 max-w-[1050px] mx-auto text-left pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                {
                  img: "/photo-1550583724-b2692b85b150.webp",
                  title: "Inyange summer essentials: 5 ways to hydrate, snack, and enjoy"
                },
                {
                  img: "/photo-1488521787991-ed7bbaae773c.webp",
                  title: "How Inyange is delivering jobs and economic activity across Rwanda"
                },
                {
                  img: "/photo-1550989460-0adf9ea622e2.webp",
                  title: "Sustainable farming practices for a greener future"
                },
                {
                  img: "/photo-1500382017468-9049fed747ef.webp",
                  title: "Community outreach: Providing dairy products to school children"
                },
                {
                  img: "/freepik__enhance__29647.jpg",
                  title: "New fortified milk hits the shelves this summer"
                },
                {
                  img: "/feast_hq.png",
                  title: "Awarded best producer in East Africa for 2025"
                }
              ].map((news, idx) => (
                <AnimatedChild key={idx} delay={0.1 + idx * 0.1} from="bottom" className="w-[85vw] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] flex-shrink-0 snap-start">
                  <div className="flex flex-col group cursor-pointer w-full">
                    <div className="h-[200px] md:h-[260px] relative w-full rounded-[1.5rem] overflow-hidden mb-4 md:mb-6 shadow-md">
                      <Image src={news.img} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                      <span className="absolute bottom-4 left-5 text-white font-calibre font-bold text-[16px] md:text-[18px]">News</span>
                    </div>
                    <h3 className="font-calibre font-medium text-inyange-blue text-[16px] md:text-[20px] leading-tight group-hover:text-white transition-colors px-2">{news.title}</h3>
                  </div>
                </AnimatedChild>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="max-w-[1050px] mx-auto mt-8 md:mt-12 flex items-center justify-between px-2">
              {/* Dots */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-inyange-blue"></div>
                <div className="w-3 h-3 rounded-full bg-inyange-blue/30"></div>
                <div className="w-3 h-3 rounded-full bg-inyange-blue/30"></div>
                <div className="w-3 h-3 rounded-full bg-inyange-blue/30"></div>
                <div className="w-3 h-3 rounded-full bg-inyange-blue/30"></div>
                <div className="w-3 h-3 rounded-full bg-inyange-blue/30"></div>
              </div>
              
              {/* Arrows */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => scrollNews('left')} 
                  disabled={!canScrollLeft}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors z-10 ${canScrollLeft ? 'bg-inyange-blue/20 hover:bg-inyange-blue text-inyange-blue hover:text-white cursor-pointer' : 'bg-inyange-blue/10 text-inyange-blue/40 cursor-not-allowed'}`}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={() => scrollNews('right')} 
                  disabled={!canScrollRight}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors z-10 ${canScrollRight ? 'bg-inyange-blue text-white hover:bg-white hover:text-inyange-blue cursor-pointer' : 'bg-inyange-blue/50 text-white/50 cursor-not-allowed'}`}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 10. Want To Get In Touch? */}
        <AnimatedSection as="section" className="pt-24 pb-20 bg-white relative z-[60]">
          <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <AnimatedChild delay={0} from="bottom">
              <h2 className="text-5xl md:text-[75px] font-gothic text-inyange-blue uppercase mb-6 leading-[0.9] tracking-tight">
                Want To Get<br />In Touch?
              </h2>
            </AnimatedChild>
            <AnimatedChild delay={0.12} from="fade">
              <p className="text-[#556980] font-calibre font-medium max-w-[650px] mx-auto mb-12 text-[15px] leading-relaxed">
                Whether you're a customer, a potential partner, or looking for a career, we're here to listen and grow together. Reach out to our dedicated support teams today.
              </p>
            </AnimatedChild>
            <AnimatedChild delay={0.22} from="bottom">
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-[600px]">
                <button className="flex-1 py-4 px-8 rounded-[14px] bg-[#cfdf1b] text-inyange-blue font-calibre font-bold uppercase tracking-[0.15em] text-[12px] smooth-hover hover:opacity-90 whitespace-nowrap">
                  Contact Us Now
                </button>
                <button className="flex-1 py-4 px-8 rounded-[14px] border border-[#a2bfd3] text-inyange-blue font-calibre font-bold uppercase tracking-[0.15em] text-[12px] smooth-hover hover:bg-blue-50 whitespace-nowrap">
                  Join Us Now
                </button>
              </div>
            </AnimatedChild>
          </div>
        </AnimatedSection>
      </main>

      {/* 11. Footer */}
      <AnimatedSection as="footer" className="bg-inyange-blue pt-12 md:pt-20 pb-48 relative z-[70]">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-10 md:gap-y-12 text-white font-calibre text-[13px] md:text-[15px] leading-relaxed">
          <AnimatedChild delay={0} from="bottom" className="col-span-2 md:col-span-1 pr-4">
            <h4 className="uppercase text-white text-[14px] md:text-[16px] mb-4 md:mb-6">Inyange Industries</h4>
            <p className="text-white/80">
              Food Processing & Dairy /<br />Beverages.
            </p>
          </AnimatedChild>
          <AnimatedChild delay={0.1} from="bottom">
            <h4 className="text-white text-[14px] md:text-[16px] mb-4 md:mb-6">Explore</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leaders</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </AnimatedChild>
          <AnimatedChild delay={0.2} from="bottom">
            <h4 className="text-white text-[14px] md:text-[16px] mb-4 md:mb-6">Connect</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
            </ul>
          </AnimatedChild>
          <AnimatedChild delay={0.3} from="bottom">
            <h4 className="text-white text-[14px] md:text-[16px] mb-4 md:mb-6">Company</h4>
            <p className="text-white/80">
              Operating<br />since<br />1997.
            </p>
          </AnimatedChild>
        </div>
      </AnimatedSection>
    </div>
  );
}
