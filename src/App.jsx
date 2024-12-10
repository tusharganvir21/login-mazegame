import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/LoginPage";
import Register from "./components/RegistrationPage";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Game from "./components/Game";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0f172a] text-gray-200">
        {/* Navbar */}
        <Navbar />

        {/* Main Content with Routes */}
        <main className="flex-grow flex flex-col px-4 sm:px-6 md:px-8 lg:px-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12">
          <Footer />
        </footer>
      </div>
    </Router>
  );
};

export default App;
