import { useState } from 'react';
import { 
  Calendar, Download, TrendingUp, TrendingDown, 
  Beer, CheckCircle2, AlertCircle, MapPin, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const monthlyData = [
  { month: 'T1', bookings: 320, completed: 290, beer: 15000 },
  { month: 'T2', bookings: 280, completed: 265, beer: 13200 },
  { month: 'T3', bookings: 450, completed: 420, beer: 22500 },
  { month: 'T4', bookings: 380, completed: 360, beer: 18900 },
  { month: 'T5', bookings: 420, completed: 400, beer: 21000 },
  { month: 'T6', bookings: 510, completed: 485, beer: 25500 },
];

const dmPerformance = [
  { name: 'Nguyễn Văn A', parties: 45, success: 98, beer: 2250 },
  { name: 'Trần Thị B', parties: 42, success: 95, beer: 2100 },
  { name: 'Lê Văn C', parties: 38, success: 92, beer: 1900 },
  { name: 'Phạm Thị D', parties: 35, success: 90, beer: 1750 },
  { name: 'Hoàng Văn E', parties: 32, success: 88, beer: 1600 },
];

const regionData = [
  { name: 'Q.1', bookings: 156, completed: 148 },
  { name: 'Q.3', bookings: 134, completed: 128 },
  { name: 'Q.5', bookings: 98, completed: 92 },
  { name: 'Q.7', bookings: 87, completed: 82 },
  { name: 'Q.BT', bookings: 76, completed: 71 },
];

const fraudTrend = [
  { month: 'T1', rate: 3.2 },
  { month: 'T2', rate: 2.8 },
  { month: 'T3', rate: 2.5 },
  { month: 'T4', rate: 2.3 },
  { month: 'T5', rate: 2.1 },
  { month: 'T6', rate: 1.9 },
];

const giftDistribution = [
  { name: 'Voucher 250K', value: 450, color: '#3b82f6' },
  { name: 'Voucher 500K', value: 320, color: '#22c55e' },
  { name: 'Voucher 750K', value: 180, color: '#f59e0b' },
  { name: 'Voucher 1tr', value: 120, color: '#ef4444' },
];

export function WebReports() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo Cáo & Analytics</h1>
          <p className="text-gray-500">Phân tích dữ liệu toàn diện</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tổng booking</p>
                <p className="text-3xl font-bold text-gray-900">1,245</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+12.5%</span>
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
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+8.3%</span>
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
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+15.2%</span>
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
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">-0.8%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
          <TabsTrigger value="regional">Khu vực</TabsTrigger>
          <TabsTrigger value="fraud">Gian lận</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Booking & Hoàn thành theo tháng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="bookings" name="Booking" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="completed" name="Hoàn thành" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phân bố quà tặng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={giftDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {giftDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {giftDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất Digital Marketers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dmPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
                    <Tooltip />
                    <Bar dataKey="parties" name="Số tiệc" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="beer" name="Bia (két)" fill="#22c55e" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium">DM</th>
                      <th className="px-4 py-2 text-center text-sm font-medium">Số tiệc</th>
                      <th className="px-4 py-2 text-center text-sm font-medium">Tỷ lệ thành công</th>
                      <th className="px-4 py-2 text-center text-sm font-medium">Bia (két)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {dmPerformance.map((dm) => (
                      <tr key={dm.name}>
                        <td className="px-4 py-2 font-medium">{dm.name}</td>
                        <td className="px-4 py-2 text-center">{dm.parties}</td>
                        <td className="px-4 py-2 text-center">
                          <Badge className={`${dm.success >= 95 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {dm.success}%
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-center">{dm.beer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking theo khu vực</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="bookings" name="Tổng booking" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" name="Hoàn thành" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Xu hướng gian lận</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={fraudTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="rate" 
                        name="Tỷ lệ gian lận (%)" 
                        stroke="#ef4444" 
                        fill="#fee2e2" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phát hiện gian lận</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">Sai lệch số liệu &gt;20%</p>
                        <p className="text-sm text-red-700">12 trường hợp</p>
                      </div>
                    </div>
                    <Badge className="bg-red-200 text-red-800">Cao</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900">Check-in ngoài phạm vi</p>
                        <p className="text-sm text-yellow-700">8 trường hợp</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-200 text-yellow-800">Trung bình</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-orange-900">Check-in ngoài khung giờ</p>
                        <p className="text-sm text-orange-700">5 trường hợp</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-200 text-orange-800">Thấp</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
