import React from 'react';
// FIX: Simplifying paths. Removing the './components/' directory reference to troubleshoot file resolution error.
// We are assuming the imports should resolve directly from the `src` folder.
import ArogyamHealthcare from './components/ArogyamHealthcare.jsx';
import CallBotPage from './components/CallBotPage.jsx'; 
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;