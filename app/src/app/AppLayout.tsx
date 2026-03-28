import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, MapPin, ClipboardList, Ticket, Camera, LogOut, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const isLoginPage = location.pathname === '/app/login';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoginPage) {
    return <Outlet />;
  }

  const navItems = [
    { path: '/app/dashboard', icon: Home, label: 'Trang chủ' },
    { path: '/app/checkin', icon: MapPin, label: 'Check-in' },
    { path: '/app/audit', icon: ClipboardList, label: 'Audit' },
    { path: '/app/voucher', icon: Ticket, label: 'Voucher' },
    { path: '/app/photos', icon: Camera, label: 'Ảnh' },
  ];

  const showBackButton = location.pathname !== '/app/dashboard';

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* Mobile Frame */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative">
        {/* Status Bar */}
        <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center text-xs">
          <span>{currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
          <div className="flex gap-1">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Header */}
        <header className="bg-green-600 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button 
                onClick={() => navigate(-1)}
                className="p-1 hover:bg-green-700 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <div>
              <h1 className="font-bold text-lg">TPC Party</h1>
              <p className="text-xs text-green-100">DM Portal</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/app/login')}
            className="p-2 hover:bg-green-700 rounded-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto pb-20">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 px-2 py-2 sticky bottom-0 z-50">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
