import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Initiatives from './pages/Initiatives';
// import InitiativeDetail from './pages/InitiativeDetail'; 
import Events from './pages/Events';
// import EventDetail from './pages/EventDetail'; 
import Team from './pages/Team';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword'; // <--- IMPORTED
import NotFound from './pages/NotFound';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/initiatives" element={<Initiatives />} />
          {/* <Route path="/initiatives/:id" element={<InitiativeDetail />} /> */}
          <Route path="/events" element={<Events />} />
          {/* <Route path="/events/:id" element={<EventDetail />} /> */}
          <Route path="/team" element={<Team />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* <--- ADDED ROUTE */}
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
