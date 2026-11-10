import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, ShieldCheck, Truck, Smartphone, 
  Store, Star, MapPin, Check, ChevronRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';
import { Product } from '../types';
import { HERO_IMAGE } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { products, boutiques, addToCart } = useApp();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Curated subsets
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 6);
  const popularBoutiques = boutiques.slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Promotional Hero Banner */}
      <section className="relative bg-[#f8f9ff] border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <span className="text-[#712ae2] font-bold">Plateforme E-Commerce Fédérée</span>
                <span>·</span>
                <span>Cameroun 2026</span>
                <span>·</span>
                <span className="text-emerald-700 font-bold">100% Boutiques Locales</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0b1c30] leading-[1.15] text-balance">
                Le marché d’excellence des commerçants du Cameroun.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Achetez en direct auprès des boutiques réputées de <strong>Douala</strong>, <strong>Yaoundé</strong>, <strong>Bafoussam</strong> et <strong>Garoua</strong>. High-Tech garanti, mode Wax & Ndop contemporaine, café grand cru et gastronomie du terroir.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/boutiques"
                  className="px-5 py-3 bg-[#0b1c30] hover:bg-[#131b2e] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-2"
                >
                  <Store className="w-4 h-4 text-emerald-400" />
                  <span>Explorer les boutiques</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/recherche"
                  className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-all flex items-center gap-2"
                >
                  <span>Rechercher un article</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-700">Livraison 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#712ae2] shrink-0" />
                  <span className="font-semibold text-slate-700">MTN & Orange MoMo</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-700">Commerces certifiés</span>
                </div>
              </div>
            </div>

            {/* Right Column: Promotional Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={HERO_IMAGE}
                    alt="MultiBoutiques Cameroun - Vitrine commerçante"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/90 via-[#0b1c30]/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#0b1c30] px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#712ae2]" />
                    <span>Offres Spéciales Semaine Cameroun</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                      Économie & Création Locale
                    </p>
                    <p className="text-base font-bold">
                      {boutiques.length} Boutiques agréées · {products.length} Articles en ligne
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Nouveautés */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-bold text-[#712ae2] uppercase tracking-wider">
              Derniers Arrivages
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] tracking-tight">
              Nouveautés en Boutique
            </h2>
          </div>
          <Link
            to="/recherche"
            className="text-xs font-bold text-slate-700 hover:text-[#712ae2] flex items-center gap-1 group"
          >
            <span>Voir tout</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* 3. Produits Populaires */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Les Incontournables
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] tracking-tight">
              Produits Populaires au Cameroun
            </h2>
          </div>
          <Link
            to="/recherche"
            className="text-xs font-bold text-slate-700 hover:text-[#712ae2] flex items-center gap-1 group"
          >
            <span>Explorer le catalogue</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* 4. Boutiques Populaires */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-xs font-bold text-[#712ae2] uppercase tracking-wider">
              Marchands Étoilés
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] tracking-tight">
              Boutiques Populaires Partenaires
            </h2>
          </div>
          <Link
            to="/boutiques"
            className="text-xs font-bold text-slate-700 hover:text-[#712ae2] flex items-center gap-1 group"
          >
            <span>Toutes les boutiques ({boutiques.length})</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBoutiques.map((boutique) => (
            <Link
              key={boutique.id}
              to={`/boutiques?id=${boutique.id}`}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-[#712ae2] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#712ae2]" />
                    {boutique.city}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold font-mono text-slate-900">{boutique.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#712ae2] transition-colors mb-1">
                  {boutique.name}
                </h3>

                <p className="text-xs text-slate-500 mb-2">
                  {boutique.quarter}
                </p>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {boutique.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#712ae2]">
                <span>Voir le catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};
