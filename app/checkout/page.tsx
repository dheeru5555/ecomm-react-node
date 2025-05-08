'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    sameAsShipping: true,
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      sameAsShipping: checked,
    });
  };
  
  // Handle shipping form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle payment form submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process payment and order (in a real app this would call an API)
    setTimeout(() => {
      setFormStep(3); // Move to confirmation step
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Clear cart after successful order
      clearCart();
    }, 1500);
  };
  
  // Handle order confirmation
  const handleFinishOrder = () => {
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase.",
    });
    
    router.push('/');
  };
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0 && formStep !== 3) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              formStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {formStep > 1 ? <Check size={20} /> : 1}
            </div>
            <span className="text-sm mt-1">Shipping</span>
          </div>
          
          <div className="w-full mx-4 h-1 bg-muted">
            <div 
              className="h-full bg-primary transition-all" 
              style={{ width: formStep >= 2 ? '100%' : '0%' }}
            />
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              formStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {formStep > 2 ? <Check size={20} /> : 2}
            </div>
            <span className="text-sm mt-1">Payment</span>
          </div>
          
          <div className="w-full mx-4 h-1 bg-muted">
            <div 
              className="h-full bg-primary transition-all" 
              style={{ width: formStep >= 3 ? '100%' : '0%' }}
            />
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              formStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              {formStep > 3 ? <Check size={20} /> : 3}
            </div>
            <span className="text-sm mt-1">Confirmation</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Shipping Information Step */}
          {formStep === 1 && (
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mr-2"
                    onClick={() => router.push('/cart')}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <div>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>Enter your shipping details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AL">Alabama</SelectItem>
                            <SelectItem value="AK">Alaska</SelectItem>
                            <SelectItem value="AZ">Arizona</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="CO">Colorado</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="GA">Georgia</SelectItem>
                            <SelectItem value="HI">Hawaii</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            {/* Add more states as needed */}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
          
          {/* Payment Information Step */}
          {formStep === 2 && (
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mr-2"
                    onClick={() => setFormStep(1)}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <div>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Complete your purchase securely</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsShipping"
                        checked={formData.sameAsShipping}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label htmlFor="sameAsShipping">
                        Billing address same as shipping
                      </Label>
                    </div>
                    
                    {!formData.sameAsShipping && (
                      <div className="space-y-4 pt-2">
                        <h3 className="text-sm font-medium">Billing Address</h3>
                        {/* Billing address form fields would go here */}
                        <p className="text-muted-foreground text-sm">
                          For demo purposes, we're using the shipping address for billing.
                        </p>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div>
                      <Tabs defaultValue="card" className="w-full">
                        <TabsList className="w-full grid grid-cols-2">
                          <TabsTrigger value="card">Credit Card</TabsTrigger>
                          <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="card" className="space-y-4 pt-4">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              placeholder="John Doe"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="cardExpiry">Expiration Date</Label>
                              <Input
                                id="cardExpiry"
                                name="cardExpiry"
                                placeholder="MM/YY"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cardCvc">CVC</Label>
                              <Input
                                id="cardCvc"
                                name="cardCvc"
                                placeholder="123"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="paypal" className="pt-4">
                          <div className="flex flex-col items-center justify-center py-8">
                            <div className="mb-4 text-center">
                              <p className="text-muted-foreground">
                                You will be redirected to PayPal to complete your purchase securely.
                              </p>
                            </div>
                            <Button variant="outline" className="w-full">
                              Continue with PayPal
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button type="submit" className="w-full">
                      Place Order
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
          
          {/* Order Confirmation Step */}
          {formStep === 3 && (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <Check className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
                <CardDescription>
                  Thank you for your purchase. Your order has been received.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Order Reference</h3>
                    <p className="font-mono">#KM{Math.floor(Math.random() * 1000000)}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Shipping Address</h3>
                    <p className="text-muted-foreground">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium">Estimated Delivery</h3>
                    <p className="text-muted-foreground">
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
                        'en-US',
                        { weekday: 'long', month: 'long', day: 'numeric' }
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" onClick={handleFinishOrder}>
                  Continue Shopping
                </Button>
                <Button variant="outline" className="w-full">
                  View Order Details
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}