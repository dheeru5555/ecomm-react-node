'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Pencil, Mail, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  orders: number;
  totalSpent: number;
  lastOrder: string;
  avatar?: string;
}

// Sample customer data
const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active',
    orders: 12,
    totalSpent: 1249.99,
    lastOrder: '2023-10-15',
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    status: 'active',
    orders: 8,
    totalSpent: 789.50,
    lastOrder: '2023-11-02',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    status: 'inactive',
    orders: 3,
    totalSpent: 299.99,
    lastOrder: '2023-08-20',
  },
  {
    id: '4',
    name: 'Lisa Wong',
    email: 'lisa.wong@example.com',
    status: 'active',
    orders: 15,
    totalSpent: 1589.75,
    lastOrder: '2023-11-10',
  },
  {
    id: '5',
    name: 'Michael Thompson',
    email: 'michael.thompson@example.com',
    status: 'active',
    orders: 6,
    totalSpent: 549.90,
    lastOrder: '2023-10-28',
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Customer',
      cell: ({ row }: any) => {
        const customer = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={customer.avatar} />
              <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{customer.name}</span>
              <span className="text-sm text-muted-foreground">{customer.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        const status = row.getValue('status');
        return (
          <Badge variant={status === 'active' ? 'default' : 'secondary'}>
            {status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'orders',
      header: 'Orders',
    },
    {
      accessorKey: 'totalSpent',
      header: 'Total Spent',
      cell: ({ row }: any) => {
        const amount = parseFloat(row.getValue('totalSpent'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);
        return formatted;
      },
    },
    {
      accessorKey: 'lastOrder',
      header: 'Last Order',
      cell: ({ row }: any) => {
        const date = new Date(row.getValue('lastOrder'));
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
    {
      id: 'actions',
      cell: ({ row }: any) => {
        const customer = row.original;
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Pencil className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Email Customer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Orders
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <Button variant="outline">
          Export
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Customers</h3>
          </div>
          <div className="text-2xl font-bold">{customers.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Customers</h3>
          </div>
          <div className="text-2xl font-bold">
            {customers.filter(c => c.status === 'active').length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Average Order Value</h3>
          </div>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(
              customers.reduce((acc, customer) => acc + customer.totalSpent, 0) / 
              customers.reduce((acc, customer) => acc + customer.orders, 0)
            )}
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={customers}
        searchKey="name"
        searchPlaceholder="Search customers..."
      />
    </div>
  );
}