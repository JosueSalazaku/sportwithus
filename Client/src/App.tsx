import { Routes, Route } from 'react-router-dom';
import Calendar from './pages/calendar';
import Home from './pages/home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}
