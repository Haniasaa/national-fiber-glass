import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import WhatWeOffer from "./components/WhatWeOffer";
import About from "./components/About";
import OurDealers from "./components/OurDealers";
import Stats from "./components/Stats";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import Shades from "./pages/Shades";
import WaterTanks from "./pages/WaterTanks";
import Dustbins from "./pages/Dustbins";
import GreenNet from "./pages/GreenNet";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

/* =========================
   SCROLL TO TOP ON ROUTE CHANGE
========================= */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

/* =========================
   HOME PAGE
========================= */

function Home() {
  return (
    <>
      <Header />
      <WhatWeOffer />
      <About />
      <OurDealers />
      <Stats />
      <Reviews />
      <Contact />
      <Footer />
    </>
  );
}

/* =========================
   APP
========================= */

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      easing: "ease-out",
    });
  }, []);

  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shades"
          element={<Shades />}
        />

        <Route
          path="/water-tanks"
          element={<WaterTanks />}
        />

        <Route
          path="/dustbins"
          element={<Dustbins />}
        />

        <Route
          path="/green-net"
          element={<GreenNet />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;