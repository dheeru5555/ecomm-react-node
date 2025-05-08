'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg',
    title: 'Premium Medical Scrubs',
    description: 'Designed for comfort during long shifts',
    cta: 'Shop Collection'
  },
  {
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg',
    title: 'New Arrivals',
    description: 'Discover our latest styles and colors',
    cta: 'View New Items'
  },
  {
    image: 'https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg',
    title: 'Essential Lab Coats',
    description: 'Professional attire for clinical settings',
    cta: 'Explore Lab Coats'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fadeIn">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 animate-fadeIn animation-delay-200">
                {slide.description}
              </p>
              <div className="animate-fadeIn animation-delay-400">
                <Link href="/products">
                  <Button size="lg" className="group">
                    {slide.cta}
                    <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}