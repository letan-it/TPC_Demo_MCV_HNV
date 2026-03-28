import { useState } from 'react';
import { 
  Calendar, Beer, CheckCircle2, 
  AlertCircle, Clock, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const weeklyData = [
  { name: 'T2', bookings: 12, completed: 10 },
  { name: 'T3', bookings: 15, completed: 13 },
  { name: 'T4', bookings: 18, completed: 16 },
  { name: 'T5', bookings: 14, completed: 12 },
  { name: 'T6', bookings: 22, completed: 20 },
  { name: 'T7', bookings: 28, completed: 25 },
  { name: 'CN', bookings: 20, completed: 18 },
];

const fraudData = [
  { name: 'Hợp lệ', value: 87, color: '#22c55e' },
  { name: 'Cảnh báo', value: 10, color: '#f59e0b' },
  { name: 'Gian lận', value: 3, color: '#ef4444' },
];

const topDMs = [
  { name: 'Nguyễn Văn A', parties: 45, success: 98 },
  { name: 'Trần Thị B', parties: 42, success: 95 },
  { name: 'Lê Văn C', parties: 38, success: 92 },
  { name: 'Phạm Thị D', parties: 35, success: 90 },
  { name: 'Hoàng Văn E', parties: 32, success: 88 },
];

const recentBookings = [
  { id: 'BK001', customer: 'Nguyễn Văn A', time: '18:00', status: 'pending', beer: 50 },
  { id: 'BK002', customer: 'Trần Thị B', time: '19:30', status: 'checked-in', beer: 30 },
  { id: 'BK003', customer: 'Lê Văn C', time: '20:00', status: 'completed', beer: 100 },
  { id: 'BK004', customer: 'Phạm Thị D', time: '21:00', status: 'pending', beer: 25 },
];

export function WebDashboard() {
  const [timeRange, setTimeRange] = useState('week');

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Tổng quan hệ thống quản lý tiệc</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={timeRange === 'day' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('day')}
          >
            Ngày
          </Button>
          <Button 
            variant={timeRange === 'week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            Tuần
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            Tháng
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tổng tiệc tháng</p>
                <p className="text-3xl font-bold text-gray-900">1,245</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+12%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Hoàn thành</p>
                <p className="text-3xl font-bold text-gray-900">1,089</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+8%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Bia tiêu thụ</p>
                <p className="text-3xl font-bold text-gray-900">52.3K</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+15%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Beer className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tỷ lệ gian lận</p>
                <p className="text-3xl font-bold text-gray-900">2.3%</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDownRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">-0.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Thống kê tiệc theo tuần</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="bookings" name="Tổng booking" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" name="Hoàn thành" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Fraud Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố đánh giá</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fraudData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {fraudData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {fraudData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top DMs */}
        <Card>
          <CardHeader>
            <CardTitle>Top Digital Marketers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDMs.map((dm, index) => (
                <div key={dm.name} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-50 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{dm.name}</p>
                    <p className="text-sm text-gray-500">{dm.parties} tiệc</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{dm.success}%</p>
                    <p className="text-xs text-gray-500">thành công</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tiệc gần đây</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Xem tất cả
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{booking.customer}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {booking.time}
                        <Beer className="w-3 h-3 ml-1" />
                        {booking.beer} két
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
