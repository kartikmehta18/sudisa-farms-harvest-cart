
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { User, Edit, Save, X, ShoppingBag, Star, Download, MapPin, Gift } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  avatar?: string;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    avatar: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const savedUserData = localStorage.getItem('sudisha-user');
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('sudisha-user', JSON.stringify(userData));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.email) {
      localStorage.setItem('sudisha-user', JSON.stringify(userData));
      setIsLoggedIn(true);
      toast({
        title: "Welcome!",
        description: `Hello ${userData.name}, you're now logged in.`,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sudisha-user');
    setIsLoggedIn(false);
    setUserData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      avatar: ''
    });
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <CardTitle>Welcome to Sudisha Farms</CardTitle>
              <p className="text-muted-foreground">Please enter your details to continue</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full organic-gradient">
                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="text-xl">
                    {getInitials(userData.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-2">{userData.name}</h2>
                <p className="text-muted-foreground mb-4">{userData.email}</p>
                <Badge className="mb-4">Premium Member</Badge>
                <div className="space-y-2">
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline" 
                    className="w-full"
                  >
                    {isEditing ? <X className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                  <Button onClick={handleLogout} variant="outline" className="w-full">
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <Badge variant="secondary">5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Reviews</span>
                  </div>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Gift className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Coupons</span>
                  </div>
                  <Badge variant="secondary">2</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                {isEditing && (
                  <Button onClick={handleSave} size="sm" className="organic-gradient">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profileName">Full Name</Label>
                    <Input
                      id="profileName"
                      value={userData.name}
                      onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profileEmail">Email</Label>
                    <Input
                      id="profileEmail"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profilePhone">Phone</Label>
                    <Input
                      id="profilePhone"
                      value={userData.phone}
                      onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profileAddress">Address</Label>
                    <Input
                      id="profileAddress"
                      value={userData.address}
                      onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profileCity">City</Label>
                    <Input
                      id="profileCity"
                      value={userData.city}
                      onChange={(e) => setUserData(prev => ({ ...prev, city: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profileState">State</Label>
                    <Input
                      id="profileState"
                      value={userData.state}
                      onChange={(e) => setUserData(prev => ({ ...prev, state: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center">
                  <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">My Orders</h3>
                  <p className="text-sm text-muted-foreground">View order history</p>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">Addresses</h3>
                  <p className="text-sm text-muted-foreground">Manage addresses</p>
                </div>
              </Card>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center">
                  <Gift className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">My Coupons</h3>
                  <p className="text-sm text-muted-foreground">Available offers</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
