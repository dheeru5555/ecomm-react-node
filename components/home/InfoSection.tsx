import { Check, Clock, Truck, CreditCard } from 'lucide-react';

const features = [
  {
    icon: <Check className="h-10 w-10 text-primary" />,
    title: 'Quality Materials',
    description: 'Premium fabrics that are durable, comfortable, and easy to care for.'
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: 'Built for Long Shifts',
    description: 'Designed with healthcare professionals in mind for all-day comfort.'
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'Fast Shipping',
    description: 'Free shipping on orders over $75 with quick delivery nationwide.'
  },
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: 'Secure Checkout',
    description: 'Multiple payment options with encrypted, secure transactions.'
  }
];

export default function InfoSection() {
  return (
    <section className="py-12 md:py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Why Choose dheemit</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The perfect combination of style, comfort, and functionality
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}