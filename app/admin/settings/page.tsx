'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'dheemit Scrubs',
    storeEmail: 'contact@dheemit.com',
    storePhone: '(555) 123-4567',
    storeAddress: '123 Medical Ave, New York, NY 10001',
    currency: 'USD',
    taxRate: '8.5',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    lowStockAlert: true,
    customerReviews: false,
    marketingEmails: true,
  });

  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreSettings({
      ...storeSettings,
      [name]: value,
    });
  };

  const handleNotificationToggle = (setting: string, checked: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: checked,
    });
  };

  const handleSaveStoreSettings = () => {
    // In a real app, this would save to a database
    toast({
      title: 'Settings saved',
      description: 'Your store settings have been updated successfully.',
    });
  };

  const handleSaveNotificationSettings = () => {
    // In a real app, this would save to a database
    toast({
      title: 'Notification settings saved',
      description: 'Your notification preferences have been updated.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your store settings and preferences
        </p>
      </div>

      <Tabs defaultValue="store" className="space-y-4">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Update your store details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    value={storeSettings.storeName}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email Address</Label>
                  <Input
                    id="storeEmail"
                    name="storeEmail"
                    type="email"
                    value={storeSettings.storeEmail}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input
                    id="storePhone"
                    name="storePhone"
                    value={storeSettings.storePhone}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    name="currency"
                    value={storeSettings.currency}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Address</Label>
                <Textarea
                  id="storeAddress"
                  name="storeAddress"
                  value={storeSettings.storeAddress}
                  onChange={handleStoreSettingsChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  name="taxRate"
                  value={storeSettings.taxRate}
                  onChange={handleStoreSettingsChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveStoreSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure which notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when a new order is placed
                  </p>
                </div>
                <Switch
                  id="orderConfirmation"
                  checked={notificationSettings.orderConfirmation}
                  onCheckedChange={(checked) => handleNotificationToggle('orderConfirmation', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderShipped">Order Shipped</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when an order is shipped
                  </p>
                </div>
                <Switch
                  id="orderShipped"
                  checked={notificationSettings.orderShipped}
                  onCheckedChange={(checked) => handleNotificationToggle('orderShipped', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderDelivered">Order Delivered</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when an order is delivered
                  </p>
                </div>
                <Switch
                  id="orderDelivered"
                  checked={notificationSettings.orderDelivered}
                  onCheckedChange={(checked) => handleNotificationToggle('orderDelivered', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="lowStockAlert">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when product inventory is low
                  </p>
                </div>
                <Switch
                  id="lowStockAlert"
                  checked={notificationSettings.lowStockAlert}
                  onCheckedChange={(checked) => handleNotificationToggle('lowStockAlert', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="customerReviews">Customer Reviews</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for new customer reviews
                  </p>
                </div>
                <Switch
                  id="customerReviews"
                  checked={notificationSettings.customerReviews}
                  onCheckedChange={(checked) => handleNotificationToggle('customerReviews', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive marketing and promotional email notifications
                  </p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => handleNotificationToggle('marketingEmails', checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how your admin panel looks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      <span className="h-4 w-4 rounded-full bg-primary mr-2" />
                      Light
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <span className="h-4 w-4 rounded-full bg-slate-900 mr-2" />
                      Dark
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <span className="h-4 w-4 rounded-full bg-[conic-gradient(from_0deg,white_0%,black_50%,white_100%)] mr-2" />
                      System
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Density</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      Compact
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Default
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Comfortable
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced settings for your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Database Backup</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline">Export Data</Button>
                  <Button variant="outline">Import Data</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>API Access</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline">Generate API Key</Button>
                  <Button variant="outline">View Documentation</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Danger Zone</Label>
                <div className="rounded-md border border-destructive p-4">
                  <h4 className="text-sm font-medium text-destructive">Reset Store Data</h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">
                    This action will reset all store data and cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">
                    Reset Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}