import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/global.css'
import Home from './pages/home/Home.tsx'
import Signup from './pages/signup/Signup.tsx'
import Delivery from './pages/dashboard/delivery/Delivery.tsx';
import Company from './pages/dashboard/company/Company.tsx';
import Evaluate from './pages/dashboard/company/evaluate/Evaluate.tsx';
import Schedule from './pages/dashboard/company/schedule/Schedule.tsx';
import NewOrder from './pages/dashboard/company/new-order/New-order.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/delivery" element={<Delivery />} />
        <Route path="/dashboard/company" element={<Company />} />
        <Route path="/dashboard/company/evaluate/:id" element={<Evaluate />} />
        <Route path="/dashboard/company/schedule" element={<Schedule />} />
        <Route path="/dashboard/company/new-order" element={<NewOrder />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
