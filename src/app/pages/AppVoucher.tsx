import { useState } from 'react';
import { QrCode, Scan, CheckCircle2, Ticket, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Badge } from '@/components/ui/badge';

export function AppVoucher() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [voucherCode, setVoucherCode] = useState('');
  const [activatedVouchers, setActivatedVouchers] = useState<string[]>([]);

  const handleScan = () => {
    setScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setScanning(false);
      setScanResult('success');
      setVoucherCode('VC-' + Math.random().toString(36).substr(2, 8).toUpperCase());
    }, 2000);
  };

  const handleManualInput = () => {
    if (voucherCode.length >= 6) {
      setScanResult('success');
    }
  };

  const handleActivate = () => {
    if (voucherCode && !activatedVouchers.includes(voucherCode)) {
      setActivatedVouchers([...activatedVouchers, voucherCode]);
      setScanResult('idle');
      setVoucherCode('');
    }
  };

  const handleCancel = () => {
    setScanResult('idle');
    setVoucherCode('');
    setScanning(false);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Kích Hoạt Voucher</h2>
        <p className="text-sm text-gray-500">Quét QR hoặc nhập mã voucher</p>
      </div>

      {/* Party Info */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-purple-900">Tiệc Nguyễn Văn A</h3>
              <p className="text-sm text-purple-700">Voucher: 500K</p>
            </div>
            <Badge variant="secondary" className="bg-purple-200 text-purple-800">
              {activatedVouchers.length} Đã kích hoạt
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Scanner */}
      {!scanning && scanResult === 'idle' && (
        <Card>
          <CardContent className="p-6">
            {/* QR Scanner Placeholder */}
            <div 
              onClick={handleScan}
              className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform relative overflow-hidden"
            >
              {/* Scanner Frame */}
              <div className="absolute inset-4 border-2 border-green-400/50 rounded-xl">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-400"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-400"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-400"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-400"></div>
              </div>
              
              <Scan className="w-16 h-16 text-green-400 mb-4" />
              <p className="text-white font-medium">Chạm để quét QR</p>
              <p className="text-gray-400 text-sm mt-1">Đưa mã QR vào khung hình</p>
            </div>

            {/* Manual Input */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 text-center mb-3">Hoặc nhập mã thủ công</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Nhập mã voucher"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  className="flex-1"
                />
                <Button onClick={handleManualInput} variant="outline">
                  <QrCode className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scanning Animation */}
      {scanning && (
        <Card>
          <CardContent className="p-6">
            <div className="aspect-square bg-gray-900 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-4 border-2 border-green-400/50 rounded-xl"></div>
              
              {/* Scanning Line */}
              <div className="absolute w-full h-1 bg-green-400 shadow-lg animate-scan"></div>
              
              <RefreshCw className="w-12 h-12 text-green-400 animate-spin mb-4" />
              <p className="text-white font-medium">Đang quét...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan Result */}
      {scanResult === 'success' && (
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Voucher hợp lệ!</h3>
              <p className="text-sm text-green-600">Có thể kích hoạt</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Mã voucher:</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(voucherCode)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-2xl font-mono font-bold text-green-800 tracking-wider">
                {voucherCode}
              </p>
              <div className="mt-3 pt-3 border-t border-green-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giá trị:</span>
                  <span className="font-semibold text-green-800">500.000đ</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Hạn sử dụng:</span>
                  <span className="font-semibold text-green-800">31/12/2026</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleActivate}
              >
                <Ticket className="w-4 h-4 mr-2" />
                Kích Hoạt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activated Vouchers List */}
      {activatedVouchers.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Đã kích hoạt hôm nay</h3>
            <div className="space-y-2">
              {activatedVouchers.map((code) => (
                <div 
                  key={code} 
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-mono font-medium text-green-800">{code}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-200 text-green-800">
                    Đã kích hoạt
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Note */}
      <div className="text-center text-xs text-gray-500">
        <p>Mỗi voucher chỉ kích hoạt 1 lần duy nhất</p>
        <p className="mt-1">Hệ thống kiểm tra real-time</p>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
