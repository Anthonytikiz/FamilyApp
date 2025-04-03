import React, { useState } from 'react';
import { UserPlus, Users, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FamilyMember {
  id: string;
  name: string;
  role: string;
  image: string;
  children?: FamilyMember[];
}

const familyData: FamilyMember = {
  id: '1',
  name: 'Jean et Marie Martin',
  role: 'Grands-Parents',
  image: 'https://images.unsplash.com/photo-1509506489701-dfe23b067808?w=800&auto=format&fit=crop&q=60',
  children: [
    {
      id: '2',
      name: 'Pierre et Sophie Martin',
      role: 'Parents',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=60',
      children: [
        {
          id: '4',
          name: 'Lucas Martin',
          role: 'Enfant',
          image: 'https://images.unsplash.com/photo-1545696968-1a5245650b36?w=800&auto=format&fit=crop&q=60'
        },
        {
          id: '5',
          name: 'Emma Martin',
          role: 'Enfant',
          image: 'https://images.unsplash.com/photo-1516668557604-c8e814e8a184?w=800&auto=format&fit=crop&q=60'
        }
      ]
    },
    {
      id: '3',
      name: 'Marc et Julie Martin',
      role: 'Oncle et Tante',
      image: 'https://images.unsplash.com/photo-1519075653253-b0a21f28090b?w=800&auto=format&fit=crop&q=60',
      children: [
        {
          id: '6',
          name: 'Thomas Martin',
          role: 'Cousin',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60'
        }
      ]
    }
  ]
};

function FamilyMemberCard({ member }: { member: FamilyMember }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = member.children && member.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
        <div className="relative h-48">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm opacity-90">{member.role}</p>
          </div>
        </div>
      </div>

      {hasChildren && (
        <div className="relative mt-4 flex flex-col items-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-4 transform transition-transform ${
              expanded ? 'rotate-180' : ''
            }`}
          >
            <ChevronDown className="h-5 w-5" />
          </button>
          
          {expanded && (
            <>
              <div className="w-px h-8 bg-indigo-200"></div>
              <div className="flex gap-6 mt-4">
                {member.children.map((child) => (
                  <div key={child.id} className="relative">
                    <div className="absolute -top-8 left-1/2 w-px h-8 bg-indigo-200 transform -translate-x-1/2"></div>
                    <FamilyMemberCard member={child} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function FamilyTree() {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Arbre Généalogique</h1>
        <button 
          onClick={() => navigate('/add-member')}
          className="bg-indigo-600 text-white p-2 rounded-full shadow-md"
        >
          <UserPlus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-indigo-50 rounded-lg p-4 flex items-center space-x-3">
          <Users className="h-5 w-5 text-indigo-600" />
          <span className="text-sm text-indigo-700">
            Appuyez sur les flèches pour explorer les branches familiales
          </span>
        </div>

        <div className="overflow-x-auto pb-8">
          <div className="inline-block min-w-full p-4">
            <FamilyMemberCard member={familyData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamilyTree;