import React, { useState } from 'react';
import { ShoppingBag, Search, Store, Truck, ShieldCheck, MapPin, X } from 'lucide-react';
import { CameroonCity } from '../types';
import { CITIES } from '../data/mockData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenVendorModal: () => void;
  onOpenTrackingModal: () => void;
  onOpenDashboard: () => void;
  selectedCity: CameroonCity;
  onSelectCity: (city: CameroonCity) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenVendorModal,
  onOpenTrackingModal,
  onOpenDashboard,
  selectedCity,
  onSelectCity,
  searchQuery,
  onSearchChange,
  onNavigateSection,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(11,28,48,0.04)]">
      {/* Slim Top Trust Banner */}
      {showBanner && (
        <div className="bg-[#0b1c30] text-slate-200 text-xs py-1.5 px-4 flex items-center justify-between border-b border-slate-800">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-3 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                <Truck className="w-3.5 h-3.5" />
                Livraison express 24h Douala & Yaoundé
              </span>
              <span className="hidden md:inline text-slate-500">·</span>
              <span className="hidden md:inline text-slate-300">
                Paiement sécurisé MTN MoMo, Orange Money & Espèces
              </span>
              <span className="hidden lg:inline text-slate-500">·</span>
              <span className="hidden lg:inline text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                Commerçants certifiés
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={onOpenTrackingModal}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
              >
                Suivre ma commande
              </button>
              <button
                onClick={() => setShowBanner(false)}
                className="text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
                aria-label="Fermer l'annonce"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation: Top Bar Contract (Zone 1 - Zone 2 - Zone 3) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onNavigateSection('hero')}
            className="group flex items-center gap-2.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-[#0b1c30] flex items-center justify-center text-white shadow-sm border border-slate-800 group-hover:bg-[#712ae2] transition-colors">
              <Store className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0b1c30] whitespace-nowrap">
                Multi<span className="text-[#712ae2]">Boutiques</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#059669] -mt-1">
                Cameroun
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigateSection('catalogue')}
            className="hover:text-[#0b1c30] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Produits & Offres
          </button>
          <button
            onClick={() => onNavigateSection('boutiques')}
            className="hover:text-[#0b1c30] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Boutiques Vérifiées
          </button>
          <button
            onClick={() => onNavigateSection('garanties')}
            className="hover:text-[#0b1c30] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Livraison & MoMo
          </button>
          <button
            onClick={onOpenDashboard}
            className="text-[#712ae2] hover:text-[#581c87] font-bold hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Store className="w-4 h-4" />
            Espace Marchand
          </button>
        </nav>

        {/* Zone 3: Actions (City dropdown, Search & Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* City Selector */}
          <div className="relative hidden sm:flex items-center">
            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value as CameroonCity)}
              className="pl-7 pr-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-lg border border-slate-200 cursor-pointer transition-colors focus:ring-2 focus:ring-[#712ae2] focus:outline-none appearance-none"
              title="Filtrer par ville au Cameroun"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city === 'Toutes les villes' ? '🇨🇲 Tout le Cameroun' : `📍 ${city}`}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Search Toggle or Input */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center bg-slate-100 rounded-lg px-2.5 py-1 border border-slate-200">
                <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher article, wax, tech..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-36 sm:w-48 text-xs bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="text-slate-400 hover:text-slate-600 p-0.5 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Rechercher"
                aria-label="Rechercher des produits"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Shopping Bag Button (Zone 3 Primary Action) */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-[#0b1c30] hover:bg-[#131b2e] text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#712ae2]"
            aria-label={`Panier avec ${cartCount} articles`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Panier</span>
            <span className="bg-[#712ae2] text-white font-mono text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
