'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

// Mock filter data
const categories = [
  { id: 'scrub-tops', name: 'Scrub Tops' },
  { id: 'scrub-bottoms', name: 'Scrub Bottoms' },
  { id: 'lab-coats', name: 'Lab Coats' },
  { id: 'accessories', name: 'Accessories' },
];

const colors = [
  { id: 'navy', name: 'Navy' },
  { id: 'light-blue', name: 'Light Blue' },
  { id: 'black', name: 'Black' },
  { id: 'gray', name: 'Gray' },
  { id: 'white', name: 'White' },
  { id: 'teal', name: 'Teal' },
  { id: 'pink', name: 'Pink' },
  { id: 'purple', name: 'Purple' },
];

const sizes = [
  { id: 'xs', name: 'XS' },
  { id: 'sm', name: 'S' },
  { id: 'm', name: 'M' },
  { id: 'l', name: 'L' },
  { id: 'xl', name: 'XL' },
  { id: 'xxl', name: 'XXL' },
];

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleColorChange = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId)
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handleSizeChange = (sizeId: string) => {
    setSelectedSizes(prev => 
      prev.includes(sizeId)
        ? prev.filter(id => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([20, 80]);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          {(selectedCategories.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
        
        <Accordion type="multiple" defaultValue={['categories', 'price', 'colors', 'sizes']} className="space-y-2">
          <AccordionItem value="categories">
            <AccordionTrigger className="font-medium">Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="price">
            <AccordionTrigger className="font-medium">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2 px-1">
                <Slider
                  defaultValue={[20, 80]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="colors">
            <AccordionTrigger className="font-medium">Colors</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {colors.map(color => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`color-${color.id}`} 
                      checked={selectedColors.includes(color.id)}
                      onCheckedChange={() => handleColorChange(color.id)}
                    />
                    <div className="flex items-center gap-1.5">
                      <div 
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ 
                          backgroundColor: 
                            color.id === 'navy' ? '#001f3f' : 
                            color.id === 'light-blue' ? '#add8e6' :
                            color.id === 'black' ? '#000000' :
                            color.id === 'gray' ? '#808080' :
                            color.id === 'white' ? '#ffffff' :
                            color.id === 'teal' ? '#008080' :
                            color.id === 'pink' ? '#ffc0cb' :
                            color.id === 'purple' ? '#800080' : 
                            color.id
                        }}
                      />
                      <Label htmlFor={`color-${color.id}`} className="cursor-pointer text-sm">
                        {color.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="sizes">
            <AccordionTrigger className="font-medium">Sizes</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {sizes.map(size => (
                  <div key={size.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`size-${size.id}`} 
                      checked={selectedSizes.includes(size.id)}
                      onCheckedChange={() => handleSizeChange(size.id)}
                    />
                    <Label htmlFor={`size-${size.id}`} className="cursor-pointer">
                      {size.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="hidden lg:block">
        <Button className="w-full">Apply Filters</Button>
      </div>
    </div>
  );
}