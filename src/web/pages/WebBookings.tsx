import { useState } from 'react';
import { 
  Search, Plus, Filter, Download, Calendar, 
  Beer, Phone, Clock, 
  MoreHorizontal, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const bookings = [
  {
    id: 'BK001',
    customer: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Lê Lợi, Q.1, TP.HCM',
    date: '28/03/2026',
    time: '18:00',
    beer: 50,
    gift: 'Voucher 500K',
    status: 'pending',
    dm: 'Chưa phân công',
    createdAt: '25/03/2026'
  },
  {
    id: 'BK002',
    customer: 'Trần Thị B',
    phone: '0912345678',
    address: '456 Nguyễn Huệ, Q.1, TP.HCM',
    date: '28/03/2026',
    time: '19:30',
    beer: 30,
    gift: 'Voucher 300K',
    status: 'assigned',
    dm: 'Nguyễn Văn X',
    createdAt: '26/03/2026'
  },
  {
    id: 'BK003',
    customer: 'Lê Văn C',
    phone: '0923456789',
    address: '789 Đồng Khởi, Q.1, TP.HCM',
    date: '28/03/2026',
    time: '20:00',
    beer: 100,
    gift: 'Voucher 1tr',
    status: 'checked-in',
    dm: 'Trần Thị Y',
    createdAt: '24/03/2026'
  },
  {
    id: 'BK004',
    customer: 'Phạm Thị D',
    phone: '0934567890',
    address: '321 Hai Bà Trưng, Q.1, TP.HCM',
    date: '29/03/2026',
    time: '18:30',
    beer: 25,
    gift: 'Voucher 250K',
    status: 'completed',
    dm: 'Lê Văn Z',
    createdAt: '27/03/2026'
  },
  {
    id: 'BK005',
    customer: 'Hoàng Văn E',
    phone: '0945678901',
    address: '654 Nguyễn Trãi, Q.5, TP.HCM',
    date: '29/03/2026',
    time: '19:00',
    beer: 75,
    gift: 'Voucher 750K',
    status: 'rejected',
    dm: '-',
    createdAt: '26/03/2026'
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Chờ xử lý</Badge>;
    case 'assigned':
      return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Đã phân công</Badge>;
    case 'checked-in':
      return <Badge variant="secondary" className="bg-purple-100 text-purple-700">Đã check-in</Badge>;
    case 'completed':
      return <Badge variant="secondary" className="bg-green-100 text-green-700">Hoàn thành</Badge>;
    case 'rejected':
      return <Badge variant="secondary" className="bg-red-100 text-red-700">Từ chối</Badge>;
    default:
      return null;
  }
};

export function WebBookings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Bookings</h1>
          <p className="text-gray-500">Danh sách và quản lý các booking tiệc</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Tạo Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Tạo Booking Mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tên khách hàng</label>
                  <Input placeholder="Nhập tên" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Số điện thoại</label>
                  <Input placeholder="090xxxxxxx" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Địa điểm</label>
                <Input placeholder="Nhập địa chỉ" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ngày</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Giờ</label>
                  <Input type="time" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Số két bia</label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quà tặng</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quà" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v250">Voucher 250K</SelectItem>
                      <SelectItem value="v500">Voucher 500K</SelectItem>
                      <SelectItem value="v1m">Voucher 1tr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Tạo Booking
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, SĐT, mã booking..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ xử lý</SelectItem>
                  <SelectItem value="assigned">Đã phân công</SelectItem>
                  <SelectItem value="checked-in">Đã check-in</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                  <SelectItem value="rejected">Từ chối</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Mã</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Khách hàng</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Thờigian</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Số lượng</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">DM</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Trạng thái</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-mono font-medium text-gray-900">{booking.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{booking.customer}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {booking.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <p className="flex items-center gap-1 text-gray-700">
                          <Calendar className="w-3 h-3" />
                          {booking.date}
                        </p>
                        <p className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-3 h-3" />
                          {booking.time}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <p className="flex items-center gap-1 text-gray-700">
                          <Beer className="w-3 h-3" />
                          {booking.beer} két
                        </p>
                        <p className="text-gray-500">{booking.gift}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${booking.dm === 'Chưa phân công' ? 'text-gray-400' : 'text-gray-700'}`}>
                        {booking.dm}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem>Phân công DM</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Hủy booking</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Hiển thị {filteredBookings.length} / {bookings.length} booking
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" disabled>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
