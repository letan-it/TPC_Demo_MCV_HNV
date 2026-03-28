import { useNavigate } from 'react-router-dom';
import { Smartphone, Monitor, PartyPopper, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-900 flex flex-col items-center justify-center p-4">
      {/* Logo & Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <PartyPopper className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          TPC Party Management
        </h1>
        <p className="text-green-100 text-lg">
          Hệ Thống Quản Lý Tiệc Toàn Diện
        </p>
      </div>

      {/* Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Mobile App Card */}
        <Card className="bg-white/95 backdrop-blur hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => navigate('/app/login')}>
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Mobile App
              </h2>
              <p className="text-gray-600 mb-4">
                Dành cho Digital Marketer (DM)
              </p>
              <ul className="text-sm text-gray-500 text-left space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Check-in tại tiệc (GPS)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Audit số lượng bia
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Kích hoạt voucher (QR)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Chụp ảnh chứng minh
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:translate-x-1 transition-transform">
                Truy Cập App
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Web Dashboard Card */}
        <Card className="bg-white/95 backdrop-blur hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => navigate('/web/login')}>
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Monitor className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Web Dashboard
              </h2>
              <p className="text-gray-600 mb-4">
                Dành cho Admin & Quản Lý
              </p>
              <ul className="text-sm text-gray-500 text-left space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Quản lý booking
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Phê duyệt QC (Pass/Reject)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Báo cáo & Analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Quản lý tồn kho
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:translate-x-1 transition-transform">
                Truy Cập Web
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-green-100 text-sm">
        <p>TPC - BIZSOLUTION © 2026</p>
        <p className="mt-1">www.erp.tpcso.com | contact@tpc-bizsolution.com</p>
      </div>
    </div>
  );
}
