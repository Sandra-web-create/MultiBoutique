import React from 'react';
import { Search, ShieldCheck, Truck, Smartphone, Sparkles, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';
import { CameroonCity, ProductCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: CameroonCity;
  onSelectCity: (city: CameroonCity) => void;
  onSelectCategory: (cat: ProductCategory) => void;
  onScrollToCatalogue: () => void;
  totalProductsCount: number;
  totalBoutiquesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCity,
  onSelectCity,
  onSelectCategory,
  onScrollToCatalogue,
  totalProductsCount,
  totalBoutiquesCount,
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-12 sm:pb-16 bg-[#f8f9ff] overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Working Search (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Kicker - Clean unboxed metadata with separators */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 tracking-wide uppercase">
              <span className="text-[#712ae2] font-bold">Plateforme Officielle</span>
              <span aria-hidden="true">·</span>
              <span>Douala & Yaoundé</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#059669]">Marchands 100% Vérifiés</span>
            </div>

            {/* Display Hero Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0b1c30] leading-[1.15] text-balance">
              Le meilleur du commerce camerounais en un seul endroit.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Achetez en toute sérénité auprès de boutiques certifiées de Douala, Yaoundé, Bafoussam et Garoua. Smartphones scellés, haute couture en wax & Ndop, café Grand Cru et décoration d’ébène livrés chez vous.
            </p>

            {/* Multi-Filter Search Bar */}
            <div className="p-2 bg-white rounded-xl shadow-md border border-slate-200 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Rechercher par produit, marque ou boutique..."
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-transparent rounded-lg focus:outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:flex-initial">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                  <select
                    value={selectedCity}
                    onChange={(e) => onSelectCity(e.target.value as CameroonCity)}
                    className="w-full sm:w-auto pl-7 pr-3 py-2.5 text-xs font-semibold bg-slate-50 text-slate-700 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#712ae2] cursor-pointer appearance-none"
                  >
                    <option value="Toutes les villes">Toutes les villes</option>
                    <option value="Douala">Douala (Akwa, Bonanjo...)</option>
                    <option value="Yaoundé">Yaoundé (Bastos, Mokolo...)</option>
                    <option value="Bafoussam">Bafoussam (Ouest)</option>
                    <option value="Garoua">Garoua (Grand Nord)</option>
                  </select>
                </div>

                <button
                  onClick={onScrollToCatalogue}
                  className="px-5 py-2.5 bg-[#0b1c30] hover:bg-[#131b2e] text-white text-xs font-bold rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer shrink-0"
                >
                  Explorer
                </button>
              </div>
            </div>

            {/* Quick Category Discovery Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">Recherches fréquentes :</span>
              <button
                onClick={() => {
                  onSelectCategory('High-Tech & Smartphones');
                  onScrollToCatalogue();
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-md border border-slate-200 transition-colors cursor-pointer"
              >
                Smartphones Douala
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Mode & Wax Camerounais');
                  onScrollToCatalogue();
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-md border border-slate-200 transition-colors cursor-pointer"
              >
                Veste Ndop Yaoundé
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Terroir & Épicerie Fine');
                  onScrollToCatalogue();
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 rounded-md border border-slate-200 transition-colors cursor-pointer"
              >
                Café Oku & Poivre Penja
              </button>
            </div>

            {/* Key Value Guarantees Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Livraison 24h</h4>
                  <p className="text-[11px] text-slate-500">Douala & Yaoundé à domicile</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-[#712ae2] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">MTN & Orange Money</h4>
                  <p className="text-[11px] text-slate-500">Paiement sécurisé ou espèces</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Marchands vérifiés</h4>
                  <p className="text-[11px] text-slate-500">Enregistrés au RCCM camerounais</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Focal Point with Real Generated Photography (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              {/* Main Campaign Image */}
              <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={HERO_IMAGE}
                  alt="MultiBoutiques Cameroun - Marché moderne et boutiques partenaires"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/90 via-[#0b1c30]/30 to-transparent pointer-events-none" />

                {/* Overlay Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#0b1c30] px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#712ae2]" />
                  <span>Saison 2026 : Collections Locales</span>
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">
                    Place de marché fédérée
                  </p>
                  <p className="text-base sm:text-lg font-bold">
                    {totalBoutiquesCount} Boutiques agréées · {totalProductsCount} Articles disponibles
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-200">
                    <span>Douala Akwa & Bonapriso</span>
                    <span>·</span>
                    <span>Yaoundé Bastos</span>
                    <span>·</span>
                    <span>Bafoussam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
