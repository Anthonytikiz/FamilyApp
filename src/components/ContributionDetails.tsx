import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Euro } from 'lucide-react';

function ContributionDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Détails de la Cotisation</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="font-semibold text-xl">Cotisation Mensuelle</h2>
        <p className="text-3xl font-bold text-indigo-600 mt-2">50€</p>
        <p className="text-sm text-gray-500 mt-1">Date limite: 31 Mars 2024</p>
        <p className="mt-4 text-gray-600">
          Cotisation mensuelle pour les activités familiales et l'entretien de la maison familiale.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">État des Paiements</h3>
          <span className="text-sm text-indigo-600">15/20 membres</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60"
                alt="Jean Martin"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="ml-3">Jean Martin</span>
            </div>
            <span className="text-green-600">Payé</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60"
                alt="Marie Martin"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="ml-3">Marie Martin</span>
            </div>
            <span className="text-red-600">En attente</span>
          </div>
        </div>
      </div>

      <Link
        to={`/contributions/${id}/pay`}
        className="fixed bottom-20 left-4 right-4 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
      >
        <Euro className="h-5 w-5 mr-2" />
        Payer la Cotisation
      </Link>
    </div>
  );
}

export default ContributionDetails;