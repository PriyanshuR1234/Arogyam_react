import React from 'react';
import ArogyamHealthcare from './components/ArogyamHealthcare';
import CallBotPage from './components/CallBotPage';
import DoctorProfile from './components/DoctorProfile';
import HospitalLocation from './components/HospitalLocation';
import StoryDetail from './components/StoryDetail';
import BookAppointment from './components/BookAppointment';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // BrowserRouter provides the routing context needed for useNavigate
    <BrowserRouter>
      <div className="App">
        {/* Routes defines the mapping between URL paths and components */}
        <Routes>
          {/* Main Landing Page: Accessible at the root path "/" */}
          <Route path="/" element={<ArogyamHealthcare />} />

          {/* AI Callbot Page: Accessible at the "/callbot" path */}
          <Route path="/callbot" element={<CallBotPage />} />

          {/* Doctor Profile Page: Accessible at "/doctor/:id" */}
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/hospital/:id" element={<HospitalLocation />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;