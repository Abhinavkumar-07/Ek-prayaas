import VerifyEmail from './pages/VerifyEmail';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';
import Login from './pages/Login';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
//import VerifyEmail from './pages/VerifyEmail';
import Home from './pages/Home';
import About from './pages/About';
import Initiatives from './pages/Initiatives';
import InitiativeDetail from './pages/InitiativeDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
//routes
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/initiatives/:slug" element={<InitiativeDetail />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
           <Route path="/login" element={<Login />} />

            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
