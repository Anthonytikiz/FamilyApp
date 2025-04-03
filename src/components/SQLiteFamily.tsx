// src/components/SQLiteFamily.tsx
import { useEffect, useState } from 'react';
import initSqlJs, { Database } from 'sql.js';

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  parentId?: number;
}

const SQLiteFamily = () => {
  const [db, setDb] = useState<Database>();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Initialiser la base de données
  useEffect(() => {
    const initializeDB = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (file) => `https://sql.js.org/dist/${file}`
        });

        const database = new SQL.Database();
        
        // Créer la table si elle n'existe pas
        database.exec(`
          CREATE TABLE IF NOT EXISTS family (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            parent_id INTEGER
          );
        `);

        setDb(database);
        refreshMembers(database);
      } catch (error) {
        console.error('Error initializing database:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDB();
  }, []);

  // Rafraîchir la liste des membres
  const refreshMembers = (database?: Database) => {
    const currentDB = database || db;
    if (!currentDB) return;

    const result = currentDB.exec('SELECT * FROM family');
    if (result.length > 0) {
      const columns = result[0].columns;
      const members = result[0].values.map((row) => ({
        id: row[columns.indexOf('id')] as number,
        name: row[columns.indexOf('name')] as string,
        role: row[columns.indexOf('role')] as string,
        parentId: row[columns.indexOf('parent_id')] as number | undefined
      }));
      setMembers(members);
    }
  };

  // Ajouter un nouveau membre
  const addMember = () => {
    if (!db || !newName || !newRole) return;

    try {
      db.exec(
        `INSERT INTO family (name, role) VALUES ('${newName}', '${newRole}')`
      );
      setNewName('');
      setNewRole('');
      refreshMembers();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  // Sauvegarder la base de données
  const saveDatabase = () => {
    if (!db) return;
    const data = db.export();
    localStorage.setItem('familyDB', JSON.stringify(Array.from(data)));
  };

  // Charger la base de données
  const loadDatabase = async () => {
    if (!db) return;
    const savedData = localStorage.getItem('familyDB');
    if (savedData) {
      const data = new Uint8Array(JSON.parse(savedData));
      db.close();
      const SQL = await initSqlJs();
      const newDB = new SQL.Database(data);
      setDb(newDB);
      refreshMembers(newDB);
    }
  };

  if (isLoading) {
    return <div>Chargement de la base de données...</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestion Familiale</h1>
      
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nom"
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Rôle"
          className="p-2 border rounded"
        />
        <button 
          onClick={addMember}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={saveDatabase}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Sauvegarder
        </button>
        <button
          onClick={loadDatabase}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Charger
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="p-2 border">{member.id}</td>
              <td className="p-2 border">{member.name}</td>
              <td className="p-2 border">{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SQLiteFamily;