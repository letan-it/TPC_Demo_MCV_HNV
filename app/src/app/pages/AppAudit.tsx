import { useState } from 'react';
import { Beer, AlertTriangle, CheckCircle2, Minus, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export function AppAudit() {
  const [bookingAmount] = useState(50);
  const [actualAmount, setActualAmount] = useState(23);
  const [qcAmount] = useState(23);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const difference = actualAmount - bookingAmount;
  const differencePercent = (Math.abs(difference) / bookingAmount) * 100;
  const hasLargeDifference = differencePercent > 20;

  const handleSave = () => {
    setShowSuccess(true);
    setIsEditing(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const adjustAmount = (delta: number) => {
    setActualAmount(prev => Math.max(0, prev + delta));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Audit Bia</h2>
        <p className="text-sm text-gray-500">Nhập số lượng bia thực tế tại tiệc</p>
      </div>

      {/* Party Info */}
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-orange-900">Tiệc Nguyễn Văn A</h3>
              <p className="text-sm text-orange-700">123 Lê Lợi, Q.1, TP.HCM</p>
            </div>
            <Badge variant="secondary" className="bg-orange-200 text-orange-800">
              Đã check-in
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-800 mb-4">So sánh số liệu</h3>
          
          <div className="space-y-4">
            {/* Booking Amount */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Beer className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking</p>
                  <p className="text-xs text-gray-400">Dự kiến ban đầu</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{bookingAmount}</p>
                <p className="text-xs text-gray-500">két</p>
              </div>
            </div>

            {/* Actual Amount */}
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              hasLargeDifference ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  hasLargeDifference ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <Beer className={`w-5 h-5 ${hasLargeDifference ? 'text-red-600' : 'text-green-600'}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-700">Thực tế</p>
                  <p className="text-xs text-gray-500">Số lượng thực tế</p>
                </div>
              </div>
              <div className="text-right">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => adjustAmount(-1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center active:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <Input
                      type="number"
                      value={actualAmount}
                      onChange={(e) => setActualAmount(Number(e.target.value))}
                      className="w-20 text-center text-xl font-bold"
                    />
                    <button 
                      onClick={() => adjustAmount(1)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center active:bg-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className={`text-2xl font-bold ${hasLargeDifference ? 'text-red-600' : 'text-green-600'}`}>
                      {actualAmount}
                    </p>
                    <p className="text-xs text-gray-500">két</p>
                  </div>
                )}
              </div>
            </div>

            {/* QC Final Amount */}
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700">QC Final</p>
                  <p className="text-xs text-gray-500">Số cuối cùng</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">{qcAmount}</p>
                <p className="text-xs text-gray-500">két</p>
              </div>
            </div>
          </div>

          {/* Difference Alert */}
          {hasLargeDifference && (
            <Alert className="mt-4 bg-red-50 border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <AlertDescription className="text-red-800">
                Sai lệch {differencePercent.toFixed(0)}%! Cần xác nhận từ QC.
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Hủy
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Lưu
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsEditing(true)}
              >
                Cập nhật số liệu
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      {showSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <AlertDescription className="text-green-800">
            Đã cập nhật số liệu thành công!
          </AlertDescription>
        </Alert>
      )}

      {/* Note */}
      <div className="text-center text-xs text-gray-500">
        <p>Lưu ý: Số QC Final là số cuối cùng được phê duyệt</p>
      </div>
    </div>
  );
}
