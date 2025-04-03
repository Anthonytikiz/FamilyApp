import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Euro, Plus, ChevronRight } from 'lucide-react';

interface Contribution {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  paidCount: number;
  totalCount: number;
}

const contributions: Contribution[] = [
  {
    id: '1',
    title: 'Cotisation Mensuelle Mars 2024',
    amount: 50,
    dueDate: '31 Mars 2024',
    paidCount: 15,
    totalCount: 20
  },
  {
    id: '2',
    title: 'Événement Familial',
    amount: 100,
    dueDate: '15 Avril 2024',
    paidCount: 8,
    totalCount: 20
  }
];

function Contributions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Cotisations</h1>
        <button 
          onClick={() => navigate('/contributions/add')}
          className="bg-indigo-600 text-white p-2 rounded-full shadow-md"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Solde total</span>
            <span className="text-xl font-bold">150€</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 w-3/4 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-4">
          {contributions.map((contribution) => (
            <div key={contribution.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{contribution.title}</h3>
                    <p className="text-sm text-gray-500">Date limite: {contribution.dueDate}</p>
                    <p className="text-sm text-gray-500">
                      {contribution.paidCount} payés sur {contribution.totalCount}
                    </p>
                  </div>
                  <span className="font-semibold text-indigo-600">{contribution.amount}€</span>
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${(contribution.paidCount / contribution.totalCount) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => navigate(`/contributions/${contribution.id}/pay`)}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Payer
                  </button>
                  <button
                    onClick={() => navigate(`/contributions/${contribution.id}`)}
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contributions;