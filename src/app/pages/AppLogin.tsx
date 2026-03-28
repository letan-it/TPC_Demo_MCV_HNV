import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, PartyPopper, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function AppLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-900 flex flex-col">
      {/* Status Bar */}
      <div className="text-white px-4 py-2 flex justify-between items-center text-xs">
        <span>{new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex gap-1">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-6">
          <PartyPopper className="w-14 h-14 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">TPC Party</h1>
        <p className="text-green-100 text-center">Ứng dụng cho Digital Marketer</p>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-t-3xl px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Đăng Nhập</h2>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">Số điện thoại</Label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 h-12 text-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-gray-600">Ghi nhớ đăng nhập</Label>
            </div>
            <button type="button" className="text-sm text-green-600 font-medium">
              Quên mật khẩu?
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 font-semibold"
          >
            Đăng Nhập
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Phiên bản 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
