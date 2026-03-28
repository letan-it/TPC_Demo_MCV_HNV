import { useNavigate } from 'react-router-dom';
import { 
  MapPin, ClipboardList, Ticket, Camera, 
  Calendar, Clock, Beer, ChevronRight,
  AlertCircle, CheckCircle2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AppDashboard() {
  const navigate = useNavigate();

  const todayParties = [
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Lê Lợi, Q.1, TP.HCM',
      time: '18:00',
      beerCount: 50,
      status: 'pending',
      gift: 'Voucher 500K'
    },
    {
      id: 2,
      customer: 'Trần Thị B',
      phone: '0912345678',
      address: '456 Nguyễn Huệ, Q.1, TP.HCM',
      time: '19:30',
      beerCount: 30,
      status: 'checked-in',
      gift: 'Voucher 300K'
    },
    {
      id: 3,
      customer: 'Lê Văn C',
      phone: '0923456789',
      address: '789 Đồng Khởi, Q.1, TP.HCM',
      time: '20:00',
      beerCount: 100,
      status: 'completed',
      gift: 'Voucher 1tr'
    }
  ];

  const quickActions = [
    { icon: MapPin, label: 'Check-in', path: '/app/checkin', color: 'bg-blue-500' },
    { icon: ClipboardList, label: 'Audit', path: '/app/audit', color: 'bg-orange-500' },
    { icon: Ticket, label: 'Voucher', path: '/app/voucher', color: 'bg-purple-500' },
    { icon: Camera, label: 'Chụp ảnh', path: '/app/photos', color: 'bg-pink-500' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Chờ thực hiện</Badge>;
      case 'checked-in':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Đã check-in</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Hoàn thành</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'checked-in':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5 text-white">
        <p className="text-green-100 text-sm">Xin chào,</p>
        <h2 className="text-xl font-bold">DM Nguyễn Văn A</h2>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-200" />
            <span className="text-sm">{new Date().toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-200" />
            <span className="text-sm">{new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-xs text-blue-700">Tiệc hôm nay</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-green-600">12</p>
            <p className="text-xs text-green-700">Đã hoàn thành</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-purple-600">98%</p>
            <p className="text-xs text-purple-700">Tỷ lệ thành công</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Thao tác nhanh</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-transform`}>
                <action.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Parties */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Tiệc hôm nay</h3>
          <button className="text-sm text-green-600 font-medium flex items-center gap-1">
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {todayParties.map((party) => (
            <Card key={party.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(party.status)}
                    <div>
                      <h4 className="font-semibold text-gray-800">{party.customer}</h4>
                      <p className="text-sm text-gray-500">{party.phone}</p>
                    </div>
                  </div>
                  {getStatusBadge(party.status)}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="line-clamp-1">{party.address}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{party.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Beer className="w-4 h-4 text-gray-400" />
                        <span>{party.beerCount} két</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-purple-600">
                      <Ticket className="w-4 h-4" />
                      <span className="text-xs font-medium">{party.gift}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
