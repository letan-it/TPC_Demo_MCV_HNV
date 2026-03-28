import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function AppCheckin() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [distance] = useState(45); // meters
  const [checkinStatus, setCheckinStatus] = useState<'idle' | 'checking' | 'success'>('idle');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // Simulate getting location
    setTimeout(() => {
      setLocation({ lat: 10.7769, lng: 106.7009 });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckin = () => {
    setCheckinStatus('checking');
    setTimeout(() => {
      setCheckinStatus('success');
    }, 1500);
  };

  const targetLocation = {
    name: 'Nhà hàng Hải Sản Biển Đông',
    address: '123 Lê Lợi, Quận 1, TP.HCM',
    time: '18:00 - 22:00'
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Check-in Tiệc</h2>
        <p className="text-sm text-gray-500">Xác thực vị trí để bắt đầu</p>
      </div>

      {/* Party Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-bold text-blue-900 mb-2">{targetLocation.name}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-blue-700">
              <MapPin className="w-4 h-4" />
              <span>{targetLocation.address}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700">
              <Clock className="w-4 h-4" />
              <span>{targetLocation.time}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GPS Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Trạng thái GPS</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Đã bật</span>
            </div>
          </div>

          {location ? (
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Vị trí hiện tại</p>
                <p className="font-mono text-sm text-gray-700">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Khoảng cách đến điểm tiệc:</span>
                <span className={`font-bold text-lg ${distance <= 100 ? 'text-green-600' : 'text-red-600'}`}>
                  {distance}m
                </span>
              </div>

              {/* Distance Indicator */}
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                    distance <= 100 ? 'bg-green-500 w-full' : 'bg-red-500 w-1/3'
                  }`}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Yêu cầu: Trong bán kính 100m
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="h-48 bg-gradient-to-br from-green-100 via-blue-50 to-green-100 relative">
            {/* Simulated Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Target Location */}
                <div className="absolute -top-16 -left-20">
                  <div className="relative">
                    <MapPin className="w-10 h-10 text-red-500" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-20 bg-red-500/20 rounded-full animate-ping"></div>
                  </div>
                  <div className="bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap mt-1">
                    Điểm tiệc
                  </div>
                </div>
                
                {/* Current Location */}
                <div className="relative">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Bạn ở đây</span>
                  </div>
                </div>

                {/* Navigation Line */}
                <svg className="absolute top-0 left-0 w-40 h-40 -z-10" style={{ transform: 'translate(-50%, -50%)' }}>
                  <line x1="80" y1="80" x2="40" y2="40" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center active:scale-95 transition-transform">
                <Navigation className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Check-in Button */}
      {checkinStatus === 'success' ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <AlertDescription className="text-green-800">
            Check-in thành công! Bạn có thể bắt đầu audit.
          </AlertDescription>
        </Alert>
      ) : (
        <Button
          onClick={handleCheckin}
          disabled={!location || distance > 100 || checkinStatus === 'checking'}
          className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
        >
          {checkinStatus === 'checking' ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Đang xác thực...
            </div>
          ) : distance > 100 ? (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Quá xa điểm tiệc
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Check-in Ngay
            </div>
          )}
        </Button>
      )}

      {/* Time Warning */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Check-in: {currentTime.toLocaleTimeString('vi-VN')} | 
          Cho phép check-in trước 30 phút
        </p>
      </div>
    </div>
  );
}
