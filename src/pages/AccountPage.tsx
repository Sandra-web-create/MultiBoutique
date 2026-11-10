import React, { useState } from 'react';
import { 
  User, Package, Settings, LogIn, LogOut, CheckCircle2, 
  MapPin, Phone, Mail, Clock, Truck, Store, ShieldCheck, ArrowRight, MessageCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatFCFA } from '../utils/formatters';
import { CameroonCity, Order } from '../types';
import { CITIES } from '../data/mockData';

export const AccountPage: React.FC<{ onOpenMerchantDashboard: () => void }> = ({ onOpenMerchantDashboard }) => {
  const { userProfile, updateUserProfile, loginUser, logoutUser, orders, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings' | 'auth'>('profile');

  // Edit profile state
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [city, setCity] = useState<CameroonCity>(userProfile.city);
  const [quarter, setQuarter] = useState(userProfile.quarter);
  const [landmark, setLandmark] = useState(userProfile.landmark);

  // Auth form state (for non-logged in or testing)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // Settings state
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsReceipts, setSmsReceipts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone,
      city,
      quarter,
      landmark,
    });
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authPhone) return;

    if (authMode === 'register') {
      loginUser(authName || 'Client MultiBoutiques', authPhone);
    } else {
      loginUser('Samuel Kamga', authPhone);
    }
    setActiveTab('profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Header Profile Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0b1c30] text-white flex items-center justify-center text-xl font-bold font-mono">
            {userProfile.isLoggedIn ? userProfile.name.charAt(0) : '?'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#0b1c30]">
                {userProfile.isLoggedIn ? userProfile.name : 'Espace Utilisateur'}
              </h1>
              {userProfile.isLoggedIn && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Client Vérifié
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {userProfile.isLoggedIn
                ? `+237 ${userProfile.phone} · ${userProfile.city} (${userProfile.quarter})`
                : 'Connectez-vous pour consulter vos commandes et adresses'}
            </p>
          </div>
        </div>

        {/* Action: Espace Marchand & Auth toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenMerchantDashboard}
            className="px-3.5 py-2 bg-[#712ae2] hover:bg-[#581c87] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>Accéder à l'Espace Marchand</span>
          </button>

          {userProfile.isLoggedIn ? (
            <button
              onClick={logoutUser}
              className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('auth')}
              className="px-3.5 py-2 bg-[#0b1c30] text-white text-xs font-bold rounded-xl"
            >
              Connexion
            </button>
          )}
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-[#0b1c30] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profil Client</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-[#0b1c30] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Historique des Commandes ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-[#0b1c30] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Paramètres</span>
        </button>

        <button
          onClick={() => setActiveTab('auth')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'auth'
              ? 'bg-[#0b1c30] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <LogIn className="w-4 h-4" />
          <span>Connexion / Inscription</span>
        </button>
      </div>

      {/* TAB 1: Profile Client */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Coordonnées et Adresse de Livraison
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ces informations sont transmises au coursier partenaire lors de vos commandes.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Numéro WhatsApp / Téléphone
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-mono">+237</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-3 py-2 text-xs border border-slate-300 rounded-lg font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ville principale
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as CameroonCity)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
                >
                  {CITIES.filter((c) => c !== 'Toutes les villes').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quartier
                </label>
                <input
                  type="text"
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Point de repère pour le coursier
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Ex: Face Boulangerie Saker, carrefour Total..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0b1c30] hover:bg-[#131b2e] text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Enregistrer mes modifications
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Historique des Commandes */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Mes Commandes Enregistrées ({orders.length})
            </h2>
            <p className="text-xs text-slate-500">
              Mises à jour en direct depuis les boutiques partenaires
            </p>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => {
              const statusLabel =
                ord.status === 'preparation'
                  ? '⏳ En préparation par la boutique'
                  : ord.status === 'dispatched'
                  ? '📦 Remis au coursier'
                  : ord.status === 'out_for_delivery'
                  ? '🛵 En cours de livraison dans votre quartier'
                  : '✓ Livré avec succès';

              const statusColor =
                ord.status === 'delivered'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200';

              return (
                <div key={ord.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-[#0b1c30]">
                        {ord.id}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-xs text-slate-500">
                        {new Date(ord.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${statusColor}`}>
                      {statusLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block mb-1 font-medium">Lieu de livraison</span>
                      <span className="font-semibold text-slate-800 block">{ord.city}, {ord.quarter}</span>
                      <span className="text-slate-500 text-[11px] block">Repère : {ord.landmark}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block mb-1 font-medium">Mode de paiement</span>
                      <span className="font-bold text-[#712ae2] uppercase block">
                        {ord.paymentMethod === 'momo'
                          ? 'MTN Mobile Money'
                          : ord.paymentMethod === 'orange_money'
                          ? 'Orange Money'
                          : 'Espèces à la livraison'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 block mb-1 font-medium">Montant total</span>
                      <span className="text-base font-extrabold font-mono text-slate-900 tabular-nums">
                        {formatFCFA(ord.totalAmount)}
                      </span>
                    </div>
                  </div>

                  {ord.items.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <span className="font-bold text-slate-700">Articles : </span>
                      {ord.items.map((it) => `${it.product.title} (x${it.quantity})`).join(', ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Paramètres */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Préférences de Compte & Notifications
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Gérez la réception des confirmations de commande et l'assistance WhatsApp.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Notifications de suivi sur WhatsApp</span>
                <span className="text-slate-500 block text-[11px]">Recevez les alertes de départ de colis et le contact du livreur</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="rounded text-[#712ae2] focus:ring-[#712ae2] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Reçus SMS & Factures électroniques</span>
                <span className="text-slate-500 block text-[11px]">Envoi instantané du récépissé sur votre numéro MTN ou Orange</span>
              </div>
              <input
                type="checkbox"
                checked={smsReceipts}
                onChange={(e) => setSmsReceipts(e.target.checked)}
                className="rounded text-[#712ae2] focus:ring-[#712ae2] cursor-pointer"
              />
            </label>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">Devise d'affichage</span>
              <span className="text-slate-600 font-mono text-xs">Franc CFA d'Afrique Centrale (XAF / FCFA)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Connexion / Inscription */}
      {activeTab === 'auth' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-[#0b1c30]">
              {authMode === 'login' ? 'Connexion à MultiBoutiques' : 'Créer un Compte Client'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Accédez à vos commandes et sauvegardez vos boutiques préférées.
            </p>
          </div>

          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
                authMode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Se connecter
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
                authMode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              S’inscrire
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nom & Prénom
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Alain Nkomo"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Numéro de téléphone camerounais
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-slate-400 font-mono">+237</span>
                <input
                  type="tel"
                  required
                  placeholder="6xx xx xx xx"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  className="w-full pl-12 pr-3 py-2 border border-slate-300 rounded-lg font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0b1c30] hover:bg-[#131b2e] text-white font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              {authMode === 'login' ? 'Accéder à mon compte' : 'Créer mon compte'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
