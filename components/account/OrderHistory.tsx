'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock orders data
const orders = [
  {
    id: 'ORD-12345',
    date: '2023-11-15',
    status: 'Delivered',
    total: 89.97,
    items: 3,
  },
  {
    id: 'ORD-12344',
    date: '2023-10-28',
    status: 'Shipped',
    total: 159.98,
    items: 4,
  },
  {
    id: 'ORD-12343',
    date: '2023-09-12',
    status: 'Delivered',
    total: 42.99,
    items: 1,
  },
  {
    id: 'ORD-12342',
    date: '2023-08-21',
    status: 'Delivered',
    total: 124.95,
    items: 2,
  },
];

export default function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredOrders = orders.filter(
    (order) => order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getBadgeVariant = (status: string) => {
    switch(status) {
      case 'Delivered':
        return 'success';
      case 'Shipped':
        return 'info';
      case 'Processing':
        return 'warning';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          {filteredOrders.length === 0 && (
            <TableCaption>No orders found.</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(order.status) as any}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}