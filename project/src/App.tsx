import React, { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FundraiserApplicationPage from './pages/FundraiserApplicationPage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import UploadProofPage from './pages/UploadProofPage';
import DonatePage from './pages/DonatePage';
import MyNFTPage from './pages/MyNFTPage';
import ProjectProgressPage from './pages/ProjectProgressPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'apply':
        return <FundraiserApplicationPage />;
      case 'dashboard':
        return <OrganizerDashboard onNavigate={setCurrentPage} />;
      case 'upload':
        return <UploadProofPage />;
      case 'donate':
        return <DonatePage />;
      case 'nft':
        return <MyNFTPage />;
      case 'progress':
        return <ProjectProgressPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;