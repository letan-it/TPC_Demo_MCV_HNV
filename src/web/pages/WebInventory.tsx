import { useState } from 'react';
import { 
  Plus, Search, AlertTriangle,
  Ticket, Gift, Download, History, CheckCircle2, ArrowRightLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const vouchers = [
  { id: 'VC250', name: 'Voucher 250K', total: 1000, allocated: 450, used: 320, remaining: 230 },
  { id: 'VC500', name: 'Voucher 500K', total: 800, allocated: 380, used: 280, remaining: 140 },
  { id: 'VC750', name: 'Voucher 750K', total: 500, allocated: 220, used: 150, remaining: 130 },
  { id: 'VC1M', name: 'Voucher 1tr', total: 300, allocated: 150, used: 100, remaining: 50 },
];

const physicalGifts = [
  { id: 'PG001', name: 'Ly thủy tinh Heineken', stock: 500, allocated: 200, minStock: 100 },
  { id: 'PG002', name: 'Mũ lưỡi trai', stock: 300, allocated: 150, minStock: 50 },
  { id: 'PG003', name: 'Áo thun', stock: 200, allocated: 80, minStock: 30 },
  { id: 'PG004', name: 'Bật lửa', stock: 1000, allocated: 400, minStock: 200 },
];

const recentTransactions = [
  { id: 'TX001', type: 'allocate', item: 'Voucher 500K', quantity: 50, to: 'Nguyễn Văn A', date: '28/03/2026 10:30' },
  { id: 'TX002', type: 'use', item: 'Voucher 250K', quantity: 1, by: 'Trần Thị B', date: '28/03/2026 09:15' },
  { id: 'TX003', type: 'import', item: 'Ly thủy tinh', quantity: 100, date: '27/03/2026 16:00' },
  { id: 'TX004', type: 'allocate', item: 'Mũ lưỡi trai', quantity: 20, to: 'Lê Văn C', date: '27/03/2026 14:20' },
];

export function WebInventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('vouchers');

  const filteredVouchers = vouchers.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGifts = physicalGifts.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (remaining: number, total: number) => {
    const percent = (remaining / total) * 100;
    if (percent > 30) return { label: 'Đủ hàng', color: 'bg-green-100 text-green-700' };
    if (percent > 10) return { label: 'Sắp hết', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Cảnh báo', color: 'bg-red-100 text-red-700' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Tồn Kho</h1>
          <p className="text-gray-500">Voucher và quà tặng vật lý</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Nhập kho
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nhập kho mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loại</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="voucher">Voucher</SelectItem>
                      <SelectItem value="gift">Quà vật lý</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sản phẩm</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn sản phẩm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vc250">Voucher 250K</SelectItem>
                      <SelectItem value="vc500">Voucher 500K</SelectItem>
                      <SelectItem value="ly">Ly thủy tinh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Số lượng</label>
                  <Input type="number" placeholder="0" />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Nhập kho
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700">Tổng voucher</p>
                <p className="text-2xl font-bold text-blue-900">2,600</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Đã cấp phát</p>
                <p className="text-2xl font-bold text-green-900">1,200</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700">Đã sử dụng</p>
                <p className="text-2xl font-bold text-purple-900">850</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700">Quà vật lý</p>
                <p className="text-2xl font-bold text-orange-900">2,000</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="vouchers">
            <Ticket className="w-4 h-4 mr-2" />
            Voucher
          </TabsTrigger>
          <TabsTrigger value="gifts">
            <Gift className="w-4 h-4 mr-2" />
            Quà vật lý
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="w-4 h-4 mr-2" />
            Lịch sử
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vouchers" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm voucher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Voucher Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVouchers.map((voucher) => {
              const status = getStockStatus(voucher.remaining, voucher.total);
              const usedPercent = (voucher.used / voucher.total) * 100;
              
              return (
                <Card key={voucher.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{voucher.name}</h3>
                        <p className="text-sm text-gray-500">Mã: {voucher.id}</p>
                      </div>
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{voucher.total}</p>
                        <p className="text-xs text-gray-500">Tổng</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{voucher.allocated}</p>
                        <p className="text-xs text-gray-500">Đã cấp</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{voucher.remaining}</p>
                        <p className="text-xs text-gray-500">Còn lại</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tiến độ sử dụng</span>
                        <span className="font-medium">{usedPercent.toFixed(0)}%</span>
                      </div>
                      <Progress value={usedPercent} className="h-2" />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                        Cấp phát
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <History className="w-4 h-4 mr-2" />
                        Lịch sử
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="gifts" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm quà tặng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Gift Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGifts.map((gift) => {
              const isLowStock = gift.stock < gift.minStock;
              
              return (
                <Card key={gift.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{gift.name}</h3>
                        <p className="text-sm text-gray-500">Mã: {gift.id}</p>
                      </div>
                      {isLowStock ? (
                        <Badge className="bg-red-100 text-red-700">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Sắp hết
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700">Đủ hàng</Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${isLowStock ? 'text-red-600' : 'text-blue-600'}`}>
                          {gift.stock}
                        </p>
                        <p className="text-xs text-gray-500">Tồn kho</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{gift.allocated}</p>
                        <p className="text-xs text-gray-500">Đã cấp</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-600">{gift.minStock}</p>
                        <p className="text-xs text-gray-500">Tối thiểu</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Plus className="w-4 h-4 mr-2" />
                        Nhập kho
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                        Cấp phát
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Giao dịch gần đây</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'allocate' ? 'bg-blue-100' :
                        tx.type === 'use' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        {tx.type === 'allocate' && <ArrowRightLeft className="w-5 h-5 text-blue-600" />}
                        {tx.type === 'use' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        {tx.type === 'import' && <Plus className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {tx.type === 'allocate' && 'Cấp phát'}
                          {tx.type === 'use' && 'Sử dụng'}
                          {tx.type === 'import' && 'Nhập kho'}
                          {' '}
                          {tx.quantity}x {tx.item}
                        </p>
                        <p className="text-sm text-gray-500">
                          {tx.to && `Đến: ${tx.to}`}
                          {tx.by && `Bởi: ${tx.by}`}
                          {' • '}{tx.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={
                      tx.type === 'allocate' ? 'bg-blue-100 text-blue-700' :
                      tx.type === 'use' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }>
                      {tx.type === 'allocate' && 'Cấp phát'}
                      {tx.type === 'use' && 'Sử dụng'}
                      {tx.type === 'import' && 'Nhập kho'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
