import React, { useState } from 'react';
import { 
  Users, Activity, DollarSign, Globe, 
  Search, Bell, Settings, LogOut, 
  TrendingUp, MousePointer, AlertTriangle, CheckCircle, Lock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- DONNÉES SIMULÉES (MOCK DATA) ---

const kpiData = [
  { title: "Revenu Mensuel", value: "2,450 €", change: "+12%", icon: DollarSign, color: "bg-green-100 text-green-600" },
  { title: "Utilisateurs Actifs", value: "1,204", change: "+8.1%", icon: Users, color: "bg-blue-100 text-blue-600" },
  { title: "Visites Site Web", value: "15,300", change: "+24%", icon: Globe, color: "bg-purple-100 text-purple-600" },
  { title: "Taux Conversion App", value: "4.2%", change: "+1.2%", icon: Activity, color: "bg-rose-100 text-rose-600" },
];

const trafficData = [
  { name: 'Lun', visites: 4000, clics: 240 },
  { name: 'Mar', visites: 3000, clics: 139 },
  { name: 'Mer', visites: 2000, clics: 980 },
  { name: 'Jeu', visites: 2780, clics: 390 },
  { name: 'Ven', visites: 1890, clics: 480 },
  { name: 'Sam', visites: 2390, clics: 380 },
  { name: 'Dim', visites: 3490, clics: 430 },
];

const usersData = [
  { id: 1, name: "David Able", email: "david@assofit.fr", role: "Admin", status: "Actif", plan: "Premium" },
  { id: 2, name: "Sarah Cohen", email: "sarah.c@gmail.com", role: "User", status: "Actif", plan: "Gratuit" },
  { id: 3, name: "Marc Zuk", email: "marc@meta.com", role: "User", status: "Banni", plan: "Gratuit" },
  { id: 4, name: "Julie Ferrand", email: "julie@yahoo.fr", role: "User", status: "En attente", plan: "Premium" },
  { id: 5, name: "Thomas Price", email: "tom.p@outlook.com", role: "User", status: "Actif", plan: "Gratuit" },
];

// --- COMPOSANTS INTERNES ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-6 py-4 transition-colors ${
      active 
      ? 'bg-rose-50 text-rose-600 border-r-4 border-rose-600' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ item }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${item.color}`}>
        <item.icon size={24} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {item.change}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{item.title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
  </div>
);

// --- ECRAN DE LOGIN ---
const LoginScreen = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulation API
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">AssoFit Admin</h1>
          <p className="text-slate-500">Accès réservé au personnel autorisé</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Identifiant Staff</label>
            <input 
              type="text" 
              defaultValue="admin@assofit.fr"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe</label>
            <input 
              type="password" 
              defaultValue="password"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none transition"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-bold hover:bg-rose-700 transition flex items-center justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Se connecter au Dashboard"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-400">
          Toute tentative d'intrusion sera signalée. <br/> IP: 192.168.1.42 enregistrée.
        </p>
      </div>
    </div>
  );
};

// --- VUES DU DASHBOARD ---

const DashboardView = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((item, index) => <StatCard key={index} item={item} />)}
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">Trafic Site vs App</h3>
          <select className="bg-slate-50 border-none text-sm rounded-lg p-2 text-slate-600 focus:ring-rose-500">
            <option>7 derniers jours</option>
          </select>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
              <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
              <Line type="monotone" dataKey="visites" stroke="#94A3B8" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="clics" stroke="#E11D48" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Activité Live</h3>
        <div className="space-y-6">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-rose-500 animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Nouveau match ! <span className="text-rose-500">Tennis</span></p>
                <p className="text-xs text-slate-500">Il y a {i * 5} min • Paris</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const UsersView = () => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
      <h3 className="text-lg font-bold text-slate-900">Base Utilisateurs</h3>
      <button className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-700">
        + Ajouter
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
          <tr>
            <th className="px-6 py-4">Utilisateur</th>
            <th className="px-6 py-4">Plan</th>
            <th className="px-6 py-4">Statut</th>
            <th className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {usersData.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50 transition">
              <td className="px-6 py-4">
                <div className="font-medium text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.plan === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>{user.plan}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">{user.status}</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-slate-400 hover:text-rose-600"><Settings size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function ERPAssoFit() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion

  // Si pas connecté, afficher le Login Screen
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  // Si connecté, afficher le Dashboard
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-rose-600 flex items-center gap-2">
            AssoFit
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 font-medium">ADMIN</span>
          </h1>
        </div>
        
        <nav className="flex-1 space-y-1 py-4">
          <SidebarItem icon={Activity} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={Users} label="Utilisateurs" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <SidebarItem icon={AlertTriangle} label="Modération" active={activeTab === 'moderation'} onClick={() => setActiveTab('moderation')} />
          <SidebarItem icon={MousePointer} label="Analytics Web" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
          <SidebarItem icon={Settings} label="Paramètres" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center space-x-3 text-slate-500 hover:text-red-600 w-full px-4 py-2 transition"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">David Able</p>
                <p className="text-xs text-slate-500">CEO / Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
                DA
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'users' && <UsersView />}
          {activeTab === 'analytics' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <TrendingUp size={48} className="mb-4 text-slate-300" />
              <p>Analyse des conversions Site Web ➔ App en cours...</p>
            </div>
          )}
          {activeTab === 'moderation' && (
             <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center">
                <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-bold">Tout est calme</h3>
                <p className="text-slate-500">Aucun signalement en attente.</p>
             </div>
          )}
          {activeTab === 'settings' && (
             <div className="bg-white p-8 rounded-2xl border border-slate-100">
                <h3 className="text-lg font-bold mb-4">Configuration Système</h3>
                <p className="text-slate-500">Version 1.0.0 (MVP)</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}
