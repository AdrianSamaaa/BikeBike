import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Package,
  Wrench,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Menu,
  LogOut,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { useData } from '../context/DataContext';
import { Badge } from './ui/badge';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { BradsLogoSmall } from './decorative/BradsLogoSmall';

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { products, repairs, user, logout } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate alerts
  const lowStockCount = products.filter(p => p.stock <= p.lowStockThreshold).length;
  const pendingRepairs = repairs.filter(r => r.status === 'Waiting').length;
  const overdueRepairs = repairs.filter(r => {
    const today = new Date().toISOString().split('T')[0];
    return r.estimatedCompletion < today && r.status !== 'Completed';
  }).length;

  const totalAlerts = lowStockCount + pendingRepairs + overdueRepairs;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Sales &\nInventory', href: '/sales', icon: Package },
    { name: 'Repairs', href: '/repairs', icon: Wrench },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Admin', href: '/admin', icon: Settings, adminOnly: true },
  ];

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(item => {
    if (item.adminOnly && user?.role !== 'Admin') {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-blue-800 flex">
      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-60 bg-blue-500 transform transition-transform duration-200 ease-in-out lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4">
          <BradsLogoSmall className="mb-6" />
          <nav className="space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-6 py-4 rounded transition-colors font-medium whitespace-pre-line
                    ${isActive
                      ? 'bg-sky-400 text-white'
                      : 'text-white hover:bg-blue-400'
                    }
                  `}
                >
                  <span className="text-base">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="bg-blue-700 border-b border-blue-600 sticky top-0 z-50">
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:bg-blue-600"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
                <h1 className="text-2xl font-semibold text-white">
                  {filteredNavigation.find(n => n.href === location.pathname)?.name.replace('\n', ' ') || 'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/">
                  <Button variant="ghost" size="icon" className="relative text-yellow-300 hover:bg-blue-600 hover:text-yellow-200">
                    <Bell className="h-6 w-6" />
                    {totalAlerts > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600">
                        {totalAlerts}
                      </Badge>
                    )}
                  </Button>
                </Link>

                <Button
                  onClick={handleLogout}
                  className="bg-sky-400 hover:bg-sky-500 text-white font-semibold px-6"
                >
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}