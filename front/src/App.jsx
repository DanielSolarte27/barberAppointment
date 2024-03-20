import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Appointments from "./views/Appointments/Appointments";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import Landing from "./views/Landing/Landing";
import AppointmentForm from "./views/AppointmentForm/AppointmentForm";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointmentform" element={<AppointmentForm />} />
      </Routes>
    </div>
  );
}

export default App;
