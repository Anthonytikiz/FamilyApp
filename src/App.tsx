import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Trees as Tree, Newspaper, CreditCard } from 'lucide-react';
import FamilyTree from './components/FamilyTree';
import Contributions from './components/Contributions';
import News from './components/News';
import AddFamilyMember from './components/AddFamilyMember';
import AddContribution from './components/AddContribution';
import ContributionPayment from './components/ContributionPayment';
import ContributionDetails from './components/ContributionDetails';

function BottomNav() {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around h-16 px-4 z-50">
      <Link to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Tree className="h-6 w-6" />
        <span>Arbre</span>
      </Link>
      <Link to="/contributions" className={`bottom-nav-item ${location.pathname === '/contributions' ? 'active' : ''}`}>
        <CreditCard className="h-6 w-6" />
        <span>Cotisations</span>
      </Link>
      <Link to="/actualites" className={`bottom-nav-item ${location.pathname === '/actualites' ? 'active' : ''}`}>
        <Newspaper className="h-6 w-6" />
        <span>Actualités</span>
      </Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 pb-16">
        <header className="bg-indigo-600 text-white px-4 py-3 flex items-center">
          <Users className="h-7 w-7" />
          <span className="ml-2 text-lg font-semibold">Famille Connect</span>
        </header>

        <main className="px-4 py-4">
          <Routes>
            <Route path="/" element={<FamilyTree />} />
            <Route path="/add-member" element={<AddFamilyMember />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/contributions/add" element={<AddContribution />} />
            <Route path="/contributions/:id" element={<ContributionDetails />} />
            <Route path="/contributions/:id/pay" element={<ContributionPayment />} />
            <Route path="/actualites" element={<News />} />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;