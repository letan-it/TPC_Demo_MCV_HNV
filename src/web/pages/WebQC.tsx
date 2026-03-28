import { useState } from 'react';
import { 
  CheckCircle2, XCircle, Eye, MapPin, Clock, 
  Camera, AlertTriangle, ChevronLeft, ChevronRight,
  Filter, Search, Download
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


const qcItems = [
  {
    id: 'QC001',
    bookingId: 'BK003',
    customer: 'Lê Văn C',
    dm: 'Trần Thị Y',
    booking: 100,
    audit: 45,
    qcFinal: 45,
    status: 'pending',
    photos: 3,
    checkinTime: '19:45',
    location: '10.7769, 106.7009',
    notes: ''
  },
  {
    id: 'QC002',
    bookingId: 'BK005',
    customer: 'Hoàng Văn E',
    dm: 'Nguyễn Văn X',
    booking: 75,
    audit: 80,
    qcFinal: 80,
    status: 'pending',
    photos: 3,
    checkinTime: '18:55',
    location: '10.7500, 106.6800',
    notes: 'Sai lệch 6.7%'
  },
  {
    id: 'QC003',
    bookingId: 'BK006',
    customer: 'Nguyễn Thị F',
    dm: 'Lê Văn Z',
    booking: 40,
    audit: 40,
    qcFinal: 40,
    status: 'approved',
    photos: 3,
    checkinTime: '20:10',
    location: '10.8000, 106.7200',
    notes: ''
  },
  {
    id: 'QC004',
    bookingId: 'BK007',
    customer: 'Trần Văn G',
    dm: 'Phạm Thị W',
    booking: 60,
    audit: 20,
    qcFinal: 20,
    status: 'rejected',
    photos: 1,
    checkinTime: '19:00',
    location: '10.7600, 106.6900',
    notes: 'Thiếu ảnh, sai lệch lớn'
  },
];

export function WebQC() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof qcItems[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredItems = qcItems.filter(item => {
    const matchesSearch = item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = qcItems.filter(i => i.status === 'pending').length;
  const approvedCount = qcItems.filter(i => i.status === 'approved').length;
  const rejectedCount = qcItems.filter(i => i.status === 'rejected').length;

  const handleViewDetail = (item: typeof qcItems[0]) => {
    setSelectedItem(item);
    setDetailOpen(true);
  };

  const getDifferencePercent = (booking: number, actual: number) => {
    return ((Math.abs(actual - booking) / booking) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QC & Approval</h1>
          <p className="text-gray-500">Kiểm duyệt và phê duyệt chất lượng</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700">Chờ duyệt</p>
                <p className="text-3xl font-bold text-yellow-800">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Đã duyệt</p>
                <p className="text-3xl font-bold text-green-800">{approvedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">Từ chối</p>
                <p className="text-3xl font-bold text-red-800">{rejectedCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertTriangle className="w-5 h-5 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Quy trình mới:</strong> Chỉ duyệt 1 lần duy nhất (Pass/Reject). Số QC là số final. 
          Nếu sai số lượng, ngưởi kiểm tra cập nhật số cột kế bên.
        </AlertDescription>
      </Alert>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã duyệt</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* QC Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Mã QC</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Booking</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">DM</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Số liệu</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Ảnh</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Trạng thái</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => {
                  const diffPercent = getDifferencePercent(item.booking, item.audit);
                  const hasLargeDiff = parseFloat(diffPercent) > 20;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="font-mono font-medium text-gray-900">{item.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{item.customer}</p>
                          <p className="text-sm text-gray-500">{item.bookingId}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-700">{item.dm}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <span className="text-gray-500">{item.booking}</span>
                            <span className="text-gray-400">→</span>
                            <span className={hasLargeDiff ? 'text-red-600 font-semibold' : 'text-green-600'}>
                              {item.audit}
                            </span>
                            <span className="text-gray-400">→</span>
                            <span className="text-purple-600 font-semibold">{item.qcFinal}</span>
                          </div>
                          {hasLargeDiff && (
                            <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs mt-1">
                              Sai lệch {diffPercent}%
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Camera className="w-4 h-4 text-gray-400" />
                          <span className={`text-sm ${item.photos < 3 ? 'text-red-600' : 'text-gray-700'}`}>
                            {item.photos}/3
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {item.status === 'pending' && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Chờ duyệt</Badge>
                        )}
                        {item.status === 'approved' && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">Đã duyệt</Badge>
                        )}
                        {item.status === 'rejected' && (
                          <Badge variant="secondary" className="bg-red-100 text-red-700">Từ chối</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDetail(item)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {item.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Hiển thị {filteredItems.length} / {qcItems.length} mục
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

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết QC - {selectedItem?.id}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">Khách hàng</label>
                  <p className="font-medium">{selectedItem.customer}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">Digital Marketer</label>
                  <p className="font-medium">{selectedItem.dm}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">So sánh số liệu</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Booking</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedItem.booking}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Audit</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedItem.audit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">QC Final</p>
                    <p className="text-2xl font-bold text-purple-600">{selectedItem.qcFinal}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">Thờigian check-in</label>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {selectedItem.checkinTime}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">Vị trí</label>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {selectedItem.location}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500">Ảnh chứng minh</label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {selectedItem.notes && (
                <div className="space-y-1">
                  <label className="text-sm text-gray-500">Ghi chú</label>
                  <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">
                    {selectedItem.notes}
                  </p>
                </div>
              )}

              {selectedItem.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setDetailOpen(false)}>
                    Đóng
                  </Button>
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                    <XCircle className="w-4 h-4 mr-2" />
                    Từ chối
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Duyệt
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
