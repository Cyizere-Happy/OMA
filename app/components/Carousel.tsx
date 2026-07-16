"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface Product {
  id: string | number;
  src: string;
  alt: string;
}

interface CarouselProps {
  products: Product[];
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function Carousel({ products }: CarouselProps) {
  const [[currentIndex, direction], setPage] = useState([0, 1]);

  useEffect(() => {
    // Reset to start when products change
    setPage([0, 1]);
    
    if (!products || products.length === 0) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4500);
    return () => clearInterval(timer);
  }, [products]);

  const paginate = (newDirection: number) => {
    setPage(([prevIndex, _]) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) {
        nextIndex = products.length - 1;
      } else if (nextIndex >= products.length) {
        nextIndex = 0;
      }
      return [nextIndex, newDirection];
    });
  };

  const nextSlide = () => paginate(1);
  const prevSlide = () => paginate(-1);

  if (!products || products.length === 0) return null;

  // Safe index calculations
  const safeIndex = currentIndex >= 0 && currentIndex < products.length ? currentIndex : 0;
  const prevIndex = (safeIndex - 1 + products.length) % products.length;
  const nextIndex = (safeIndex + 1) % products.length;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      z: 1,
      x: 0,
      opacity: 1,
      scale: 1.1
    },
    exit: (direction: number) => ({
      z: 0,
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="relative flex justify-between items-center w-full h-[650px] md:h-[750px]">
      {/* Soft blue glow behind center product */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#c7e9fb] rounded-full blur-[90px] opacity-70 z-0"></div>

      {/* Left Button */}
      <button 
        onClick={prevSlide}
        className="absolute left-[2%] md:left-[5%] w-12 h-12 bg-inyange-blue text-white rounded-full flex items-center justify-center z-30 hover:scale-105 transition-transform shadow-md"
      >
        <svg className="w-5 h-5 ml-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
      </button>

      {/* Products Display Container */}
      <div className="relative w-full h-full flex justify-center items-center overflow-hidden px-12">
        
        {/* Side Product (Left) */}
        {products.length > 1 && (
          <motion.div
            key={`left-${products[prevIndex].id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-[15%] z-10 w-1/4 h-[80%] flex justify-center items-center opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer"
            onClick={prevSlide}
          >
            <Image 
              src={products[prevIndex].src} 
              alt={products[prevIndex].alt} 
              width={250} 
              height={500} 
              className="object-contain max-h-[85%]" 
            />
          </motion.div>
        )}

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {/* Main Product (Center) */}
          <motion.div
            key={`center-${products[safeIndex].id}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 160, damping: 28, mass: 1.1 },
              opacity: { duration: 0.55 },
              scale: { duration: 0.55 }
            }}
            className="absolute z-20 flex justify-center items-center w-1/3 h-full"
          >
            <Image 
              src={products[safeIndex].src} 
              alt={products[safeIndex].alt} 
              width={350} 
              height={650} 
              className="object-contain drop-shadow-2xl max-h-[95%]" 
            />
          </motion.div>
        </AnimatePresence>

        {/* Side Product (Right) */}
        {products.length > 1 && (
          <motion.div
            key={`right-${products[nextIndex].id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute right-[15%] z-10 w-1/4 h-[80%] flex justify-center items-center opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer"
            onClick={nextSlide}
          >
            <Image 
              src={products[nextIndex].src} 
              alt={products[nextIndex].alt} 
              width={250} 
              height={500} 
              className="object-contain max-h-[85%]" 
            />
          </motion.div>
        )}
      </div>

      {/* Right Button */}
      <button 
        onClick={nextSlide}
        className="absolute right-[2%] md:right-[5%] w-12 h-12 bg-inyange-blue text-white rounded-full flex items-center justify-center z-30 hover:scale-105 transition-transform shadow-md"
      >
        <svg className="w-5 h-5 mr-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  );
}
