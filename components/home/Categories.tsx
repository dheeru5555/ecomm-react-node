import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    name: 'Scrub Tops',
    image: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg',
    link: '/category/scrub-tops'
  },
  {
    name: 'Scrub Bottoms',
    image: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg',
    link: '/category/scrub-bottoms'
  },
  {
    name: 'Lab Coats',
    image: 'https://images.pexels.com/photos/6129500/pexels-photo-6129500.jpeg',
    link: '/category/lab-coats'
  },
  {
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg',
    link: '/category/accessories'
  }
];

export default function Categories() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Shop By Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our curated collection of medical apparel
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.link}>
              <Card className="overflow-hidden group cursor-pointer h-[300px] transition-all hover:shadow-lg">
                <div className="relative h-full">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <CardContent className="absolute bottom-0 p-6 w-full text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}