import React from 'react';
import { Home, Store, Search, Heart, User, ShoppingBag, ShieldCheck, Truck, MapPin } from 'lucide-react';
import { NavLink as RouterNavLink, Link, useLocation as useRouterLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Navigation: React.FC = () => {
  const { cartItems, setIsCartOpen, favoriteIds, userProfile } = useApp();
  const location = useRouterLocation();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalFavoritesCount = favoriteIds.length;

  const navItems = [
    { to: '/', label: 'Accueil', icon: Home },
    { to: '/boutiques', label: 'Boutique', icon: Store },
    { to: '/recherche', label: 'Recherche', icon: Search },
    { to: '/favoris', label: 'Favoris', icon: Heart, badge: totalFavoritesCount },
    { to: '/compte', label: 'Compte', icon: User },
  ];

  return (
    <>
      {/* Desktop / Tablet Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(11,28,48,0.04)]">
        {/* Top Info Strip */}
        <div className="bg-[#0b1c30] text-slate-300 text-xs py-1.5 px-4 hidden sm:block border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                Livraison express Douala & Yaoundé 24h
              </span>
              <span>·</span>
              <span>Paiement sécurisé MTN MoMo, Orange Money & Espèces</span>
              <span>·</span>
              <span className="text-emerald-400 font-medium inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Boutiques vérifiées
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400">Hubs : Douala Akwa · Yaoundé Bastos</span>
              <span>·</span>
              <RouterNavLink to="/compte" className="text-slate-200 hover:text-white transition-colors">
                {userProfile.isLoggedIn ? `Connecté : ${userProfile.name}` : 'Espace Client'}
              </RouterNavLink>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group focus:outline-none">
            <div className="w-9 h-9 rounded-lg bg-[#0b1c30] group-hover:bg-[#712ae2] transition-colors flex items-center justify-center text-white shadow-xs">
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
          </Link>

          {/* 5 Main Page Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));

              return (
                <RouterNavLink
                  key={item.to}
                  to={item.to}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#0b1c30] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full ${
                      isActive ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </RouterNavLink>
              );
            })}
          </nav>

          {/* Right Action: Shopping Bag */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#0b1c30] hover:bg-[#131b2e] text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer focus:outline-none"
              aria-label={`Panier d'achats avec ${totalCartCount} articles`}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Panier</span>
              <span className="bg-[#712ae2] text-white font-mono text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (5 Main Pages) */}
      <nav 
        aria-label="Navigation mobile principale"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-slate-200 h-16 px-2 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.06)]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));

          return (
            <RouterNavLink
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors select-none ${
                isActive ? 'text-[#712ae2] font-extrabold' : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#712ae2]' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white font-mono text-[9px] font-bold px-1 rounded-full min-w-[15px] text-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight leading-none">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#712ae2] mt-0.5" />
              )}
            </RouterNavLink>
          );
        })}
      </nav>
    </>
  );
};
