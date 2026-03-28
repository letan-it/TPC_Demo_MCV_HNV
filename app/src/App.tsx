import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AppLayout } from './app/AppLayout';
import { WebLayout } from './web/WebLayout';
import { AppDashboard } from './app/pages/AppDashboard';
import { AppCheckin } from './app/pages/AppCheckin';
import { AppAudit } from './app/pages/AppAudit';
import { AppVoucher } from './app/pages/AppVoucher';
import { AppPhotos } from './app/pages/AppPhotos';
import { AppLogin } from './app/pages/AppLogin';
import { WebDashboard } from './web/pages/WebDashboard';
import { WebBookings } from './web/pages/WebBookings';
import { WebQC } from './web/pages/WebQC';
import { WebReports } from './web/pages/WebReports';
import { WebInventory } from './web/pages/WebInventory';
import { WebLogin } from './web/pages/WebLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - Chọn giao diện */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Mobile App Routes cho DM */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="login" element={<AppLogin />} />
          <Route path="dashboard" element={<AppDashboard />} />
          <Route path="checkin" element={<AppCheckin />} />
          <Route path="audit" element={<AppAudit />} />
          <Route path="voucher" element={<AppVoucher />} />
          <Route path="photos" element={<AppPhotos />} />
        </Route>
        
        {/* Web Dashboard Routes cho Admin */}
        <Route path="/web" element={<WebLayout />}>
          <Route index element={<Navigate to="/web/dashboard" replace />} />
          <Route path="login" element={<WebLogin />} />
          <Route path="dashboard" element={<WebDashboard />} />
          <Route path="bookings" element={<WebBookings />} />
          <Route path="qc" element={<WebQC />} />
          <Route path="reports" element={<WebReports />} />
          <Route path="inventory" element={<WebInventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
