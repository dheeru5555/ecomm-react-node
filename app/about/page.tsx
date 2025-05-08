'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About dheemit</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to provide healthcare professionals with premium quality scrubs that combine comfort, functionality, and style.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2020, dheemit was born from a simple observation: healthcare professionals deserve better workwear. Our founder, a medical professional herself, was frustrated with the limited options available in the market - scrubs that were either uncomfortable, poorly fitted, or lacking in style.
            </p>
            <p className="text-muted-foreground mb-4">
              What started as a small passion project has grown into a trusted brand serving healthcare professionals across the country. We work directly with medical professionals to design and test our products, ensuring they meet the real needs of the people wearing them day in and day out.
            </p>
            <p className="text-muted-foreground">
              Today, dheemit continues to innovate and expand our product line, always with our core mission in mind: to support the healthcare community with exceptional products they can feel good wearing.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg" 
              alt="Medical professionals in scrubs" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mb-16 bg-muted py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Mission & Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-muted-foreground">
                We use premium fabrics and maintain rigorous quality control standards to ensure our scrubs are durable, comfortable, and long-lasting.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Designed for Professionals</h3>
              <p className="text-muted-foreground">
                Every product is designed with input from healthcare professionals to ensure functionality, comfort, and practicality for long shifts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to reducing our environmental impact through responsible manufacturing practices and eco-friendly packaging.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Dr. Priya Sharma",
              role: "Founder & CEO",
              image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
              bio: "Former surgeon with 15 years of experience in healthcare."
            },
            {
              name: "Rahul Patel",
              role: "Head of Design",
              image: "https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg",
              bio: "Fashion designer with a passion for functional workwear."
            },
            {
              name: "Ananya Desai",
              role: "Product Development",
              image: "https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg",
              bio: "Textile expert focused on comfort and durability."
            },
            {
              name: "Vikram Mehta",
              role: "Customer Relations",
              image: "https://images.pexels.com/photos/6749769/pexels-photo-6749769.jpeg",
              bio: "Former nurse dedicated to understanding customer needs."
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
              <p className="text-muted-foreground mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tab1">Doctors</TabsTrigger>
            <TabsTrigger value="tab2">Nurses</TabsTrigger>
            <TabsTrigger value="tab3">Medical Students</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="italic text-muted-foreground mb-4">
                    "As a surgeon, I need scrubs that can withstand long hours in the OR. dheemit scrubs are not only comfortable but also durable and professional looking. I've recommended them to all my colleagues."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="font-semibold text-primary">DR</span>
                    </div>
                    <div>
                      <p className="font-semibold">Dr. Rajesh Kumar</p>
                      <p className="text-sm text-muted-foreground">Cardiac Surgeon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="italic text-muted-foreground mb-4">
                    "The attention to detail in these scrubs is impressive. The pockets are placed perfectly, and the fabric doesn't wrinkle even after a 12-hour shift. Plus, they look great!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="font-semibold text-primary">SM</span>
                    </div>
                    <div>
                      <p className="font-semibold">Dr. Sunita Mehta</p>
                      <p className="text-sm text-muted-foreground">Pediatrician</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="italic text-muted-foreground mb-4">
                    "I've tried many brands over my 10-year nursing career, and dheemit scrubs are by far the most comfortable. The stretch fabric moves with you, and they wash beautifully."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="font-semibold text-primary">AJ</span>
                    </div>
                    <div>
                      <p className="font-semibold">Anjali Joshi</p>
                      <p className="text-sm text-muted-foreground">ICU Nurse</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="italic text-muted-foreground mb-4">
                    "The pockets! Finally scrubs with enough practical pockets that don't look bulky. I can carry everything I need during my shift without looking like I'm going camping."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="font-semibold text-primary">KP</span>
                    </div>
                    <div>
                      <p className="font-semibold">Kiran Patel</p>
                      <p className="text-sm text-muted-foreground">ER Nurse</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="italic text-muted-foreground mb-4">
                    "As a medical student on a budget, I appreciate that dheemit offers quality scrubs that are affordable and last through countless clinical rotations. Worth every rupee!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="font-semibold text-primary">NS</span>
                    </div>
                    <div>
                      <p className="font-semibold">Nikhil Singh</p>
                      <p className="text-sm text-muted-foreground">Medical Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="italic text-muted-foreground mb-4">
                    "The sizing guide was spot on, and the scrubs arrived quickly. They're so comfortable I sometimes forget to change when I get home from clinical rotations!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="font-semibold text-primary">PG</span>
                    </div>
                    <div>
                      <p className="font-semibold">Priya Gupta</p>
                      <p className="text-sm text-muted-foreground">Nursing Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary/5 py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Join the dheemit Family</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Experience the perfect blend of comfort, functionality, and style with our premium medical scrubs.
        </p>
        <Button size="lg" asChild>
          <a href="/products">Shop Our Collection</a>
        </Button>
      </section>
    </div>
  );
}