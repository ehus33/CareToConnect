import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Schedule from './components/Schedule';
import Translate from './components/Translate';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/translate" element={<Translate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
