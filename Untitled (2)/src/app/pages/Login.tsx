import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Bike, Lock, Mail, Shield, Users, Settings, User } from 'lucide-react';
import { useData } from '../context/DataContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BradsBikeLogo } from '../components/decorative/BradsBikeLogo';
import { BikeIcon } from '../components/decorative/BikeIcon';
import { GearIcon } from '../components/decorative/GearIcon';

export function Login() {
  const navigate = useNavigate();
  const { login } = useData();
  const [activeTab, setActiveTab] = useState<'admin' | 'employee'>('admin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Role-based authentication
    let authenticated = false;
    let userRole: 'Admin' | 'Employee' | null = null;
    let userName = '';

    if (activeTab === 'admin') {
      if (formData.email === 'admin@bikeshop.com' && formData.password === 'admin123') {
        authenticated = true;
        userRole = 'Admin';
        userName = 'Admin User (Owner)';
      }
    } else {
      // Employee credentials
      if (formData.email === 'employee@bikeshop.com' && formData.password === 'employee123') {
        authenticated = true;
        userRole = 'Employee';
        userName = 'Mike Johnson';
      } else if (formData.email === 'mechanic@bikeshop.com' && formData.password === 'mechanic123') {
        authenticated = true;
        userRole = 'Employee';
        userName = 'Tom Anderson';
      }
    }

    if (authenticated && userRole) {
      login({
        id: Date.now().toString(),
        name: userName,
        email: formData.email,
        role: userRole,
      });
      toast.success(`Welcome back, ${userName}!`);
      navigate('/');
    } else {
      toast.error('Invalid credentials for selected role');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-black/60 opacity-50">
        <BikeIcon className="w-40 h-40" />
      </div>
      <div className="absolute bottom-10 left-5 text-black/60 opacity-50">
        <BikeIcon className="w-48 h-48" />
      </div>
      <div className="absolute top-5 right-10 text-black/80 opacity-40">
        <GearIcon className="w-32 h-32" />
      </div>
      <div className="absolute top-20 right-5 text-black/80 opacity-40">
        <GearIcon className="w-24 h-24" />
      </div>
      <div className="absolute bottom-10 right-10 text-black/60 opacity-50">
        <BikeIcon className="w-52 h-52" />
      </div>
      <div className="absolute bottom-5 right-40 text-black/80 opacity-40">
        <GearIcon className="w-28 h-28" />
      </div>

      <div className="w-full max-w-2xl space-y-6 relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <BradsBikeLogo className="h-24 w-auto" />
        </div>

        {/* Login Card with Role Tabs */}
        <Card className="bg-blue-700 border-blue-600 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-3xl">Log in</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'admin' | 'employee')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-transparent p-0 gap-3">
                <TabsTrigger
                  value="admin"
                  className="flex items-center justify-center gap-2 bg-blue-600 border-2 border-blue-800 text-white data-[state=active]:bg-blue-500 data-[state=active]:border-blue-900 py-3 rounded"
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-semibold">Admin</span>
                </TabsTrigger>
                <TabsTrigger
                  value="employee"
                  className="flex items-center justify-center gap-2 bg-blue-600 border-2 border-blue-800 text-white data-[state=active]:bg-blue-500 data-[state=active]:border-blue-900 py-3 rounded"
                >
                  <User className="h-5 w-5" />
                  <span className="font-semibold">Employee</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="space-y-6 mt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="admin-email" className="text-white text-base">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="adminowner@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white text-black border-2 border-blue-900 h-12 text-base"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="admin-password" className="text-white text-base">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white text-black border-2 border-blue-900 h-12 text-base"
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-900 h-12 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Log in'}
                  </Button>
                </form>

                {/* Admin Demo Credentials */}
                <div className="mt-4 p-4 bg-blue-600/50 rounded border border-blue-500">
                  <p className="text-xs text-white/90 mb-2">Demo Admin Credentials:</p>
                  <div className="space-y-1 text-xs text-white/80">
                    <p><span className="font-semibold">Email:</span> admin@bikeshop.com</p>
                    <p><span className="font-semibold">Password:</span> admin123</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="employee" className="space-y-6 mt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="employee-email" className="text-white text-base">Email</Label>
                    <Input
                      id="employee-email"
                      type="email"
                      placeholder="employee@bikeshop.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white text-black border-2 border-blue-900 h-12 text-base"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="employee-password" className="text-white text-base">Password</Label>
                    <Input
                      id="employee-password"
                      type="password"
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white text-black border-2 border-blue-900 h-12 text-base"
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-900 h-12 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Log in'}
                  </Button>
                </form>

                {/* Employee Demo Credentials */}
                <div className="space-y-3">
                  <div className="p-4 bg-blue-600/50 rounded border border-blue-500">
                    <p className="text-xs text-white/90 mb-2">Demo Employee Account 1:</p>
                    <div className="space-y-1 text-xs text-white/80">
                      <p><span className="font-semibold">Name:</span> Mike Johnson</p>
                      <p><span className="font-semibold">Email:</span> employee@bikeshop.com</p>
                      <p><span className="font-semibold">Password:</span> employee123</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-600/50 rounded border border-blue-500">
                    <p className="text-xs text-white/90 mb-2">Demo Employee Account 2:</p>
                    <div className="space-y-1 text-xs text-white/80">
                      <p><span className="font-semibold">Name:</span> Tom Anderson</p>
                      <p><span className="font-semibold">Email:</span> mechanic@bikeshop.com</p>
                      <p><span className="font-semibold">Password:</span> mechanic123</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}