"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface Product {
  id: string | number;
  src: string;
  alt: string;
  color?: string;
}

interface CarouselProps {
  products: Product[];
  imageClassName?: string;
  onActiveColorChange?: (color: string) => void;
}

export function Carousel({ products, imageClassName = "", onActiveColorChange }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const paginate = (newDirection: number) => {
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) {
        nextIndex = products.length - 1;
      } else if (nextIndex >= products.length) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  };

  const nextSlide = () => paginate(1);
  const prevSlide = () => paginate(-1);

  const safeIndex = currentIndex >= 0 && currentIndex < products?.length ? currentIndex : 0;
  const activeColor = products?.[safeIndex]?.color || '#c7e9fb';

  useEffect(() => {
    if (onActiveColorChange) {
      onActiveColorChange(activeColor);
    }
  }, [activeColor, onActiveColorChange]);

  if (!products || products.length === 0) return null;

  const getPosition = (idx: number) => {
    if (products.length === 1) return 'center';
    
    const distance = (idx - safeIndex + products.length) % products.length;
    
    if (distance === 0) return 'center';
    if (distance === 1) return 'right';
    if (distance === products.length - 1) return 'left';
    
    if (distance > 1 && distance <= Math.floor(products.length / 2)) {
      return 'hiddenRight';
    }
    return 'hiddenLeft';
  };

  const itemVariants = {
    center: {
      x: "0%",
      scale: 1,
      opacity: 1,
      zIndex: 20,
      filter: "grayscale(0%)",
    },
    left: {
      x: "-65%",
      scale: 0.65,
      opacity: 0.4,
      zIndex: 10,
      filter: "grayscale(100%)",
    },
    right: {
      x: "65%",
      scale: 0.65,
      opacity: 0.4,
      zIndex: 10,
      filter: "grayscale(100%)",
    },
    hiddenLeft: {
      x: "-130%",
      scale: 0.3,
      opacity: 0,
      zIndex: 0,
      filter: "grayscale(100%)",
    },
    hiddenRight: {
      x: "130%",
      scale: 0.3,
      opacity: 0,
      zIndex: 0,
      filter: "grayscale(100%)",
    }
  };

  return (
    <div className="relative flex justify-between items-center w-full h-[380px] md:h-[440px]">
      {/* Dynamic glow behind center product */}
      <div 
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-[80px] opacity-60 z-0 transition-colors duration-700"
        style={{ backgroundColor: activeColor }}
      ></div>

      {/* Left Button */}
      <button 
        onClick={prevSlide}
        className="absolute left-[2%] md:left-[16%] w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex items-center justify-center z-30 hover:scale-105 transition-all duration-700 shadow-md"
        style={{ backgroundColor: activeColor }}
      >
        <svg className="w-5 h-5 ml-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
      </button>

      {/* Products Display Container */}
      <div className="relative w-full h-full flex justify-center items-center overflow-hidden px-12" style={{clipPath: 'none'}}>
        {products.map((product, idx) => {
          const pos = getPosition(idx);
          return (
            <motion.div
              key={product.id}
              animate={pos}
              variants={itemVariants}
              initial={false}
              transition={{ type: "spring", stiffness: 180, damping: 25, mass: 1.1 }}
              className={`absolute top-0 bottom-0 left-0 right-0 m-auto flex justify-center items-center w-[60%] md:w-[35%] h-full ${pos === 'left' || pos === 'right' ? 'cursor-pointer hover:opacity-80' : ''} ${pos === 'hiddenLeft' || pos === 'hiddenRight' ? 'pointer-events-none' : ''}`}
              onClick={() => {
                if (pos === 'left') prevSlide();
                if (pos === 'right') nextSlide();
              }}
            >
              <Image 
                src={product.src} 
                alt={product.alt} 
                width={350} 
                height={650} 
                className={`object-contain drop-shadow-2xl max-h-[95%] ${imageClassName}`} 
              />
            </motion.div>
          );
        })}
      </div>

      {/* Right Button */}
      <button 
        onClick={nextSlide}
        className="absolute right-[2%] md:right-[16%] w-10 h-10 md:w-12 md:h-12 text-white rounded-full flex items-center justify-center z-30 hover:scale-105 transition-all duration-700 shadow-md"
        style={{ backgroundColor: activeColor }}
      >
        <svg className="w-5 h-5 mr-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  );
}
