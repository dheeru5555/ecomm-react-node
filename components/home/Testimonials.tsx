'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Emergency Physician',
    image: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg',
    text: 'The scrubs from dheemit are by far the most comfortable I\'ve worn during my 12-hour shifts. The fabric is breathable and durable, and they still look new after countless washes.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Torres',
    role: 'Registered Nurse',
    image: 'https://images.pexels.com/photos/6303681/pexels-photo-6303681.jpeg',
    text: 'These scrubs fit perfectly and have just the right amount of stretch. The pockets are well-placed and spacious, which is essential for carrying all my supplies throughout the day.',
    rating: 5
  },
  {
    id: 3,
    name: 'Dr. Lisa Chen',
    role: 'Pediatrician',
    image: 'https://images.pexels.com/photos/5407038/pexels-photo-5407038.jpeg',
    text: 'I love the vibrant colors and how well they hold up. My patients love the cheerful designs, and the quality is exceptional. I\'ve recommended dheemit to all my colleagues.',
    rating: 4
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Surgical Technician',
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    text: 'The attention to detail in these scrubs is impressive. The reinforced stitching and quality fabrics mean they last much longer than other brands I\'ve tried in the past.',
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by healthcare professionals across the country
          </p>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < testimonial.rating ? 'fill-primary text-primary' : 'text-muted'} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  setAutoplay(false);
                  setTimeout(() => setAutoplay(true), 5000);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}