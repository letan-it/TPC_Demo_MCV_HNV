import { useState } from 'react';
import { Camera, MapPin, Clock, CheckCircle2, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PhotoItem {
  id: string;
  type: 'overview' | 'beer' | 'gift';
  url: string | null;
  timestamp: string | null;
  gps: string | null;
}

export function AppPhotos() {
  const [photos, setPhotos] = useState<PhotoItem[]>([
    { id: '1', type: 'overview', url: null, timestamp: null, gps: null },
    { id: '2', type: 'beer', url: null, timestamp: null, gps: null },
    { id: '3', type: 'gift', url: null, timestamp: null, gps: null },
  ]);
  const [activeCamera, setActiveCamera] = useState<string | null>(null);

  const getPhotoTypeLabel = (type: string) => {
    switch (type) {
      case 'overview': return 'Ảnh toàn cảnh tiệc';
      case 'beer': return 'Ảnh số lượng bia';
      case 'gift': return 'Ảnh trao quà';
      default: return '';
    }
  };

  const getPhotoTypeIcon = (type: string) => {
    switch (type) {
      case 'overview': return '📸';
      case 'beer': return '🍺';
      case 'gift': return '🎁';
      default: return '📷';
    }
  };

  const handleOpenCamera = (photoId: string) => {
    setActiveCamera(photoId);
  };

  const handleCapture = (photoId: string) => {
    // Simulate capturing photo
    const mockPhotoUrl = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
        <rect width="400" height="300" fill="#${Math.floor(Math.random()*16777215).toString(16)}"/>
        <text x="200" y="150" text-anchor="middle" fill="white" font-size="20">${getPhotoTypeLabel(photos.find(p => p.id === photoId)?.type || '')}</text>
      </svg>`
    )}`;
    
    setPhotos(photos.map(p => 
      p.id === photoId 
        ? { 
            ...p, 
            url: mockPhotoUrl,
            timestamp: new Date().toLocaleString('vi-VN'),
            gps: '10.7769, 106.7009'
          }
        : p
    ));
    setActiveCamera(null);
  };

  const handleRemovePhoto = (photoId: string) => {
    setPhotos(photos.map(p => 
      p.id === photoId 
        ? { ...p, url: null, timestamp: null, gps: null }
        : p
    ));
  };

  const completedPhotos = photos.filter(p => p.url !== null).length;
  const allCompleted = completedPhotos === photos.length;

  if (activeCamera) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Camera Header */}
        <div className="bg-black/80 text-white px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setActiveCamera(null)}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="font-medium">{getPhotoTypeLabel(photos.find(p => p.id === activeCamera)?.type || '')}</span>
          <div className="w-10"></div>
        </div>

        {/* Camera Viewfinder */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-md aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-700 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-white/20"></div>
                ))}
              </div>
              
              {/* Focus Frame */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/50 rounded-lg">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
              </div>

              {/* GPS Status */}
              <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                GPS ON
              </div>
            </div>
          </div>
        </div>

        {/* Camera Controls */}
        <div className="bg-black/80 px-4 py-6">
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleCapture(activeCamera)}
              className="w-20 h-20 bg-white rounded-full border-4 border-gray-400 flex items-center justify-center active:scale-95 transition-transform"
            >
              <div className="w-16 h-16 bg-white rounded-full border-2 border-gray-800"></div>
            </button>
          </div>
          <p className="text-white text-center mt-4 text-sm">Chạm để chụp</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Chụp Ảnh Chứng Minh</h2>
        <p className="text-sm text-gray-500">Tối thiểu 3 ảnh cho mỗi tiệc</p>
      </div>

      {/* Progress */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-green-900">Tiệc Nguyễn Văn A</h3>
              <p className="text-sm text-green-700">Tiến độ chụp ảnh</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">{completedPhotos}/3</p>
              <p className="text-xs text-green-700">ảnh</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedPhotos / 3) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Grid */}
      <div className="space-y-4">
        {photos.map((photo) => (
          <Card key={photo.id} className={photo.url ? 'border-green-200' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getPhotoTypeIcon(photo.type)}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{getPhotoTypeLabel(photo.type)}</h4>
                    {photo.url && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 mt-1">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Đã chụp
                      </Badge>
                    )}
                  </div>
                </div>
                {photo.url && (
                  <button 
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {photo.url ? (
                <div className="space-y-3">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={getPhotoTypeLabel(photo.type)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {photo.timestamp}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {photo.gps}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleOpenCamera(photo.id)}
                  className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-100 hover:border-gray-400 transition-colors"
                >
                  <Camera className="w-10 h-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Chạm để chụp</span>
                </button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Button */}
      {allCompleted && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <AlertDescription className="text-green-800">
            Đã đủ ảnh! Có thể upload lên hệ thống.
          </AlertDescription>
        </Alert>
      )}

      <Button 
        className="w-full h-14 text-lg font-semibold"
        disabled={!allCompleted}
        variant={allCompleted ? 'default' : 'outline'}
      >
        <Upload className="w-5 h-5 mr-2" />
        {allCompleted ? 'Upload Ảnh' : `Cần thêm ${3 - completedPhotos} ảnh`}
      </Button>

      {/* Note */}
      <div className="text-center text-xs text-gray-500">
        <p>Tất cả ảnh đều được gắn metadata: GPS, timestamp, device ID</p>
      </div>
    </div>
  );
}
