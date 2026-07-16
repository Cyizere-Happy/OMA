"use client";

import { useState } from "react";
import Image from "next/image";
import { Carousel, Product } from "./components/Carousel";
import { AnimatedSection, AnimatedChild } from "./components/AnimatedSection";

const juiceProducts: Product[] = [
  { id: "j1", src: "/Juices/Juices/0000.png", alt: "Juice 0" },
  { id: "j2", src: "/Juices/Juices/0001.png", alt: "Juice 1" },
  { id: "j3", src: "/Juices/Juices/0002.png", alt: "Juice 2" },
  { id: "j4", src: "/Juices/Juices/0003.png", alt: "Juice 3" },
  { id: "j5", src: "/Juices/Juices/0004.png", alt: "Juice 4" },
  { id: "j6", src: "/Juices/Juices/0005.png", alt: "Juice 5" },
  { id: "j7", src: "/Juices/Juices/0006 (1).png", alt: "Juice 6" },
];

const yogurtProducts: Product[] = [
  { id: "y1", src: "/Yorgurt/Yorgurt/0001 (1).png", alt: "Yogurt 1" },
  { id: "y2", src: "/Yorgurt/Yorgurt/0002 (1).png", alt: "Yogurt 2" },
  { id: "y3", src: "/Yorgurt/Yorgurt/0003 (1).png", alt: "Yogurt 3" },
  { id: "y4", src: "/Yorgurt/Yorgurt/0004 (1).png", alt: "Yogurt 4" },
  { id: "y5", src: "/Yorgurt/Yorgurt/0005 (2).png", alt: "Yogurt 5" },
  { id: "y6", src: "/Yorgurt/Yorgurt/0006 (2).png", alt: "Yogurt 6" },
];

const milkProducts: Product[] = [
  { id: "m1", src: "/Low fat milk.png", alt: "Low Fat Milk" },
  { id: "m2", src: "/Low fat milk-bw.png", alt: "Milk BW" },
  { id: "m3", src: "/Low fat milk.png", alt: "Whole Milk" }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"Milk" | "Milk Products" | "Juice" | "Water">("Juice");

  const getActiveProducts = () => {
    switch (activeTab) {
      case "Juice": return juiceProducts;
      case "Milk Products": return yogurtProducts;
      case "Milk": return milkProducts;
      default: return juiceProducts;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Section containing both Navbar and Hero to share the background */}
      <div className="relative w-full h-[650px] md:h-[850px] flex flex-col justify-between pb-24 md:pb-32">
        {/* Hero Background covering the full top area */}
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src="/wqety.jpg"
            alt="Football, Friends"
            fill
            className="object-cover object-[center_15%] opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* 1. Floating Navbar */}
        <header className="relative w-[90%] max-w-[1600px] mx-auto bg-inyange-blue rounded-b-[40px] md:rounded-b-[60px] shadow-lg z-50 pt-5 pb-5">
          <div className="w-full flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="border-[3px] border-white rounded-[50px] px-10 py-1">
                <span className="text-white font-voyager font-bold text-3xl tracking-widest uppercase">INYANGE</span>
              </div>
            </div>
            <nav className="w-full max-w-[850px] mx-auto flex flex-wrap justify-between text-white font-gill font-semibold text-[12px] tracking-wider uppercase px-4 md:px-0">
              <a href="#" className="text-yellow-400 smooth-hover">HOME</a>
              <a href="#" className="hover:text-yellow-400 smooth-hover">OUR BRANDS</a>
              <a href="#" className="hover:text-yellow-400 smooth-hover">RECIPES</a>
              <a href="#" className="hover:text-yellow-400 smooth-hover">ABOUT</a>
              <a href="#" className="hover:text-yellow-400 smooth-hover">EDITORIAL PAGE</a>
              <a href="#" className="hover:text-yellow-400 smooth-hover">REACH OUT</a>
            </nav>
          </div>
        </header>

        {/* 2. Hero Text */}
        <div className="relative z-10 w-full max-w-[850px] mx-auto px-4 md:px-0 mt-auto mb-16 md:mb-24">
          <h1 className="text-4xl md:text-[55px] lg:text-[65px] text-white font-gothic leading-[0.9] uppercase drop-shadow-2xl tracking-tight max-w-2xl">
            Football,<br/>Friends, and<br/>Inyange
          </h1>
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
                  Experience Rwanda's pure essence through our premium<br/>selection of dairy, juices, and essential hydration.
                </p>
              </AnimatedChild>
              <AnimatedChild delay={0.22} from="bottom">
                <div className="bg-[#EAEAE2] rounded-full inline-flex p-1.5 mb-6 space-x-1">
                  <button onClick={() => setActiveTab("Milk")} className={`px-8 py-2 rounded-full font-calibre font-bold text-lg smooth-hover transition-all ${activeTab === 'Milk' ? 'bg-inyange-green text-inyange-blue shadow-sm' : 'text-inyange-blue hover:bg-white/50'}`}>Milk</button>
                  <button onClick={() => setActiveTab("Milk Products")} className={`px-8 py-2 rounded-full font-calibre font-bold text-lg smooth-hover transition-all ${activeTab === 'Milk Products' ? 'bg-inyange-green text-inyange-blue shadow-sm' : 'text-inyange-blue hover:bg-white/50'}`}>Milk Products</button>
                  <button onClick={() => setActiveTab("Juice")} className={`px-8 py-2 rounded-full font-calibre font-bold text-lg smooth-hover transition-all ${activeTab === 'Juice' ? 'bg-inyange-green text-inyange-blue shadow-sm' : 'text-inyange-blue hover:bg-white/50'}`}>Juice</button>
                  <button onClick={() => setActiveTab("Water")} className={`px-8 py-2 rounded-full font-calibre font-bold text-lg smooth-hover transition-all ${activeTab === 'Water' ? 'bg-inyange-green text-inyange-blue shadow-sm' : 'text-inyange-blue hover:bg-white/50'}`}>Water</button>
                </div>
              </AnimatedChild>
            </div>

            <AnimatedChild delay={0.3} from="bottom">
              <div className="w-full max-w-[1400px] mx-auto mt-0">
                <Carousel products={getActiveProducts()} />
              </div>
            </AnimatedChild>
          </div>

        </AnimatedSection>

        {/* 4. Our Picks */}
        <AnimatedSection as="section" className="pt-16 pb-24 bg-[#E8E8DF] relative sticky top-0 z-[10]">
          {/* Fruits anchored to Our Picks but positioned into Our Brand Range above */}
          <AnimatedChild delay={0.1} from="left" className="absolute left-[2%] top-[-200px] z-[5] pointer-events-none">
            <Image src="/apple.png" alt="Apples" width={180} height={360} className="object-contain" />
          </AnimatedChild>
          <AnimatedChild delay={0.2} from="right" className="absolute right-0 top-[-240px] z-[5] pointer-events-none translate-x-[45%]">
            <Image src="/brand-orange.png" alt="Orange" width={500} height={500} className="object-contain drop-shadow-lg" />
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
        <AnimatedSection as="section" className="bg-inyange-blue relative flex flex-col justify-end sticky top-0 z-[20]">
          <AnimatedChild delay={0} from="bottom">
            <div className="w-full max-w-[700px] mx-auto relative flex justify-center h-[410px] md:h-[460px]">
              <div className="absolute bottom-0 w-[120%] md:w-full h-[500px] md:h-[550px] z-30 pointer-events-none">
                <Image src="/girl.png" alt="Girl Drinking Milk" fill className="object-contain object-bottom drop-shadow-xl" />
              </div>
            </div>
          </AnimatedChild>

          <div className="bg-[#0ea5e9] py-4 w-full overflow-hidden relative z-20">
            <div className="flex whitespace-nowrap animate-scroll items-center">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-inyange-green font-gothic text-3xl md:text-4xl uppercase px-4">Trusted By People Worldwide</span>
                  <span className="text-white font-gothic text-3xl md:text-4xl uppercase px-4">Trusted By People Worldwide</span>
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 6. The Pride of Rwanda's Beverage Industry */}
        <AnimatedSection as="section" className="bg-inyange-green py-24 relative sticky top-0 z-[30]">
          <div className="max-w-[850px] mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center gap-12">
            <AnimatedChild delay={0} from="left" className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-5xl md:text-[60px] font-gothic text-white uppercase leading-[0.9] tracking-tight mb-6">
                The Pride<br/>Of Rwanda's<br/>Beverage<br/>Industry
              </h2>
              <p className="text-gray-900 font-calibre font-medium text-[15px] leading-relaxed max-w-[360px]">
                Inyange Industries is a leading food processing company in Rwanda, manufacturing a wide range of products under its household brand name—"Inyange". Known for high-quality mineral water, fruit juices, and dairy products, we have become the regional standard for modern and hygienic production.
              </p>
            </AnimatedChild>
            <AnimatedChild delay={0.2} from="right" className="w-full md:w-1/2 relative">
              <div className="w-full aspect-[4/4.5] relative rounded-[40px] overflow-hidden shadow-xl">
                <Image src="/freepik__enhance__29647.jpg" alt="Mother and child pouring milk" fill className="object-cover object-center" />
              </div>
            </AnimatedChild>
          </div>

        </AnimatedSection>

        {/* 7 & 8. Vision, Mission & Leaders Wrapper */}
        <div className="sticky top-0 z-[40] bg-white relative">
          <AnimatedChild delay={0.2} from="left" className="absolute left-0 top-[-150px] z-30 pointer-events-none translate-x-[-25%]">
            <Image src="/mango.png" alt="Mango" width={400} height={400} className="object-contain drop-shadow-xl" />
          </AnimatedChild>
          
          {/* 7. Vision & Mission */}
          <AnimatedSection as="section" className="pt-12 pb-4">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[760px]">
            <AnimatedChild delay={0} from="left">
              <div className="bg-[#f6f3e1] rounded-[24px] p-6 md:p-8 flex flex-col relative overflow-hidden shadow-sm">
                <div className="flex justify-between w-full items-center mb-4">
                  <h3 className="text-3xl md:text-[38px] font-gothic text-inyange-blue uppercase leading-none">Vision</h3>
                  <svg className="w-14 h-14 text-inyange-blue stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5c-4 0-7 4.5-7 4.5s3 4.5 7 4.5 7-4.5 7-4.5-3-4.5-7-4.5z" />
                    <circle cx="12" cy="12" r="2.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V4M7 8.5L5.5 5.5M17 8.5L18.5 5.5" />
                  </svg>
                </div>
                <p className="text-[#0089c4] font-calibre font-medium text-[15px] leading-snug">
                  To be the leading East and Central African dairy and beverage brand, producing high quality products while enhancing shareholder value.
                </p>
              </div>
            </AnimatedChild>
            <AnimatedChild delay={0.15} from="right">
              <div className="bg-[#f6f3e1] rounded-[24px] p-6 md:p-8 flex flex-col relative overflow-hidden shadow-sm">
                <div className="flex justify-between w-full items-center mb-4">
                  <h3 className="text-3xl md:text-[38px] font-gothic text-inyange-blue uppercase leading-none">Mission</h3>
                  <svg className="w-14 h-14 text-inyange-blue stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l6-6m0 0h-4m4 0v4" />
                  </svg>
                </div>
                <p className="text-[#0089c4] font-calibre font-medium text-[15px] leading-snug">
                  To secure the highest value for all stakeholders while enriching lives through nutritious and tasty dairy and beverage choices.
                </p>
              </div>
            </AnimatedChild>
          </div>
        </AnimatedSection>

        {/* 8. Visionary Leaders */}
        <AnimatedSection as="section" className="pt-10 pb-16 relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <AnimatedChild delay={0} from="bottom">
              <h2 className="text-[40px] md:text-[54px] font-gothic text-inyange-blue uppercase mb-4 tracking-tight">Visionary Leaders</h2>
            </AnimatedChild>
            <AnimatedChild delay={0.1} from="bottom">
              <p className="text-[#556980] font-calibre font-medium text-[15px] max-w-[850px] mx-auto mb-10 leading-relaxed">
                Inyange Industries is a leading food processing company in Rwanda, manufacturing a wide range of products<br className="hidden md:block" />
                under its household brand name—"Inyange". Known for high-quality mineral water, fruit juices, and dairy<br className="hidden md:block" />
                products, we have become the regional standard for modern and hygienic production.
              </p>
            </AnimatedChild>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {[
                { img: "/black-man-posing.jpg", name: "John Doe" },
                { img: "/confident-business-woman-portrait-smiling-face.jpg", name: "Jane Doe" },
                { img: "/african-teenage-girl-portrait-happy-smiling-face.jpg", name: "Jane Doe" },
                { img: "/headshot-portrait-security-guard-work-smiling.jpg", name: "John Doe" }
              ].map((leader, idx) => (
                <AnimatedChild key={idx} delay={0.1 + idx * 0.1} from="bottom">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 md:w-[130px] md:h-[130px] rounded-full overflow-hidden mb-4 shadow-lg">
                      <Image src={leader.img} alt={leader.name} width={130} height={130} className="object-cover w-full h-full" />
                    </div>
                    <span className="text-inyange-blue font-calibre font-medium text-[15px]">{leader.name}</span>
                  </div>
                </AnimatedChild>
              ))}
            </div>
          </div>

        </AnimatedSection>
        </div>

        {/* 9. From Our Newsroom */}
        <AnimatedSection as="section" className="py-20 bg-[#0ea5e9] sticky top-0 z-[50] relative">
          <AnimatedChild delay={0.2} from="right" className="absolute right-0 top-[-100px] z-30 pointer-events-none translate-x-[35%]">
            <Image src="/021.png" alt="Orange Slices" width={450} height={450} className="object-contain drop-shadow-xl" />
          </AnimatedChild>

          <div className="container mx-auto px-4 text-center">
            <AnimatedChild delay={0} from="bottom">
              <h2 className="text-5xl md:text-[65px] font-gothic text-inyange-green uppercase leading-none mb-20 tracking-tight">From Our Newsroom</h2>
            </AnimatedChild>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1050px] mx-auto text-left">
              {[
                {
                  img: "/photo-1550583724-b2692b85b150.webp",
                  title: "Sustainable Farming: Our Commitment to the Future",
                  desc: "Inyange remains at the forefront of agricultural innovation, supporting local farmers with modern techniques."
                },
                {
                  img: "/photo-1488521787991-ed7bbaae773c.webp",
                  title: "Awarded Best Beverage Producer of the Year",
                  desc: "We are honored to receive the 2023 Excellence Award for our consistent quality and safety standards."
                },
                {
                  img: "/photo-1550989460-0adf9ea622e2.webp",
                  title: "New Fortified Milk Range: Nutrition Redefined",
                  desc: "Introducing our latest product line designed to meet the growing nutritional needs of the East African market."
                },
                {
                  img: "/photo-1500382017468-9049fed747ef.webp",
                  title: "Community Outreach: Supporting Local Schools",
                  desc: "Our recent initiative provided nutritional dairy products to school children across Rwanda villages."
                }
              ].map((news, idx) => (
                <AnimatedChild key={idx} delay={0.1 + idx * 0.1} from="bottom">
                  <div className="bg-white rounded-[20px] overflow-hidden flex flex-col shadow-lg smooth-hover hover:-translate-y-2">
                    <div className="h-[200px] md:h-[230px] relative w-full">
                      <Image src={news.img} alt={news.title} fill className="object-cover" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-calibre font-bold text-gray-700 text-[15px] mb-2 leading-tight">{news.title}</h3>
                      <p className="text-gray-500 text-[13px] font-calibre leading-snug">{news.desc}</p>
                    </div>
                  </div>
                </AnimatedChild>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 10. Want To Get In Touch? */}
        <AnimatedSection as="section" className="pt-24 pb-20 bg-white sticky top-0 z-[60]">
          <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <AnimatedChild delay={0} from="bottom">
              <h2 className="text-5xl md:text-[75px] font-gothic text-inyange-blue uppercase mb-6 leading-[0.9] tracking-tight">
                Want To Get<br/>In Touch?
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
      <AnimatedSection as="footer" className="bg-[#0072a6] pt-20 pb-48 sticky top-0 z-[70]">
        <div className="max-w-[1000px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 text-white font-calibre text-[15px] leading-relaxed">
          <AnimatedChild delay={0} from="bottom" className="col-span-2 md:col-span-1 pr-4">
            <h4 className="uppercase text-white text-[16px] mb-6">Inyange Industries</h4>
            <p className="text-white/80">
              Food Processing & Dairy /<br/>Beverages.
            </p>
          </AnimatedChild>
          <AnimatedChild delay={0.1} from="bottom">
            <h4 className="text-white text-[16px] mb-6">Explore</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leaders</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </AnimatedChild>
          <AnimatedChild delay={0.2} from="bottom">
            <h4 className="text-white text-[16px] mb-6">Connect</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
            </ul>
          </AnimatedChild>
          <AnimatedChild delay={0.3} from="bottom">
            <h4 className="text-white text-[16px] mb-6">Company</h4>
            <p className="text-white/80">
              Operating<br/>since<br/>1997.
            </p>
          </AnimatedChild>
        </div>
      </AnimatedSection>
    </div>
  );
}
