import React from 'react';
import { Calendar, MapPin, Plus } from 'lucide-react';

function News() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Actualités</h1>
        <button className="bg-indigo-600 text-white p-2 rounded-full shadow-md">
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=60"
            alt="Famille"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">Réunion de Famille</h2>
            <div className="flex items-center mt-2 text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">25 Mars 2024</span>
            </div>
            <div className="flex items-center mt-1 text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">Maison Familiale</span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Grande réunion familiale prévue pour célébrer l'anniversaire de Grand-mère. 
              Apportez vos plats préférés !
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&auto=format&fit=crop&q=60"
            alt="Bébé"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">Naissance</h2>
            <div className="flex items-center mt-2 text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">10 Février 2024</span>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Bienvenue à notre nouveau membre de la famille ! 
              La maman et le bébé se portent bien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;