import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout';
import Index from './pages/Index';
import StatisticsPage from './pages/StatisticsPage';

import ThePossibilities from './components/ThePossibilities';
import TheNavigation from './components/TheNavigation';
import TheRegionalStatistics from './components/TheRegionalStatistics';

import ScrollToTop from "./components/ScrollToTop";

// страницы футера
import AboutCompany from "./pages/AboutCompany";
import Clients from "./pages/Clients";
import ItAccreditation from "./pages/ItAccreditation";
import Offer from "./pages/Offer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import KnowledgeBase from "./pages/KnowledgeBase";
import ApiDocs from "./pages/ApiDocs";

// обработчик ошибок
import "./api/axiosErrorHandler";

// страницы ошибок
import Error404 from "./components/errors/Error404";
import Error500 from "./components/errors/Error500";
import NetworkError from "./components/errors/NetworkError";

function App() {
  const location = useLocation();
  console.log('App rendered');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const block = params.get("scroll");
    if (!block) return;

    setTimeout(() => {
      const el = document.getElementById(block);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, [location.search]);

  return (
    <DefaultLayout>
      <TheNavigation />
      <ScrollToTop />

      <Routes>
        {/* Главная */}
        <Route path="/" element={<Index />} />

        {/* Публичные страницы */}
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/possibilities" element={<ThePossibilities />} />
        <Route path="/regional-statistics" element={<TheRegionalStatistics />} />

        {/* Страницы из футера */}
        <Route path="/about-company" element={<AboutCompany />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/it-accreditation" element={<ItAccreditation />} />

        <Route path="/offer" element={<Offer />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />

        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/api-docs" element={<ApiDocs />} />

        {/* страницы ошибок */}
        <Route path="/error/500" element={<Error500 />} />
        <Route path="/error/network" element={<NetworkError />} />

        {/* 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
