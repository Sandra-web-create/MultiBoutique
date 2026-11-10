import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Store, MapPin, Star, ShieldCheck, Phone, MessageCircle, 
  ArrowLeft, Package, Clock, Filter, Check 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';
import { Product, ProductCategory, CameroonCity } from '../types';
import { CITIES } from '../data/mockData';

const CATEGORIES: ProductCategory[] = [
  'Toutes les catégories',
  'High-Tech & Smartphones',
  'Mode & Wax Camerounais',
  'Maison & Décoration',
  'Terroir & Épicerie Fine',
  'Beauté & Soins Bio',
];

export const BoutiquePage: React.FC = () => {
  const { boutiques, products, addToCart } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const boutiqueIdParam = searchParams.get('id');

  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string | null>(boutiqueIdParam);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Toutes les catégories');
  const [selectedCity, setSelectedCity] = useState<CameroonCity>('Toutes les villes');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (boutiqueIdParam) {
      setSelectedBoutiqueId(boutiqueIdParam);
    }
  }, [boutiqueIdParam]);

  // The active boutique if selected
  const activeBoutique = boutiques.find((b) => b.id === selectedBoutiqueId) || null;

  // Products filtered for the active boutique, or by category & city
  const displayedProducts = products.filter((p) => {
    if (activeBoutique) {
      const matchBoutique = p.boutiqueId === activeBoutique.id;
      const matchCat = selectedCategory === 'Toutes les catégories' || p.category === selectedCategory;
      return matchBoutique && matchCat;
    }

    const matchCity = selectedCity === 'Toutes les villes' || p.city === selectedCity;
    const matchCat = selectedCategory === 'Toutes les catégories' || p.category === selectedCategory;
    return matchCity && matchCat;
  });

  // Boutiques list filtered by city & category
  const filteredBoutiques = boutiques.filter((b) => {
    const matchCity = selectedCity === 'Toutes les villes' || b.city === selectedCity;
    const matchCat = selectedCategory === 'Toutes les catégories' || b.category === selectedCategory;
    return matchCity && matchCat;
  });

  const handleSelectBoutique = (id: string | null) => {
    setSelectedBoutiqueId(id);
    if (id) {
      setSearchParams({ id });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* If viewing a single boutique's storefront */}
      {activeBoutique ? (
        <div className="space-y-6">
          {/* Back button */}
          <button
            onClick={() => handleSelectBoutique(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à toutes les boutiques</span>
          </button>

          {/* Boutique Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {activeBoutique.category}
                  </span>
                  <span>·</span>
                  <span className="text-emerald-700 bg-emerald-50 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {activeBoutique.badge}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">
                  {activeBoutique.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <MapPin className="w-4 h-4 text-[#712ae2]" />
                    {activeBoutique.city} ({activeBoutique.quarter})
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {activeBoutique.deliveryTime}
                  </span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold font-mono text-slate-900">{activeBoutique.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({activeBoutique.reviewsCount} avis clients)</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {activeBoutique.description}
                </p>
              </div>

              {/* Contact Button */}
              <div className="shrink-0 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://wa.me/${activeBoutique.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contacter sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Category filter within this boutique */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold text-[#0b1c30]">
              Articles de {activeBoutique.name} ({displayedProducts.length})
            </h2>

            <div className="flex items-center gap-1 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#0b1c30] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Boutique Products Grid */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={setQuickViewProduct}
                  onAddToCart={addToCart}
                  vendorPhone={activeBoutique.phone}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200 p-8">
              <Package className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs">Aucun article dans cette catégorie pour cette boutique.</p>
            </div>
          )}
        </div>
      ) : (
        /* View all boutiques & categories */
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="text-xs font-bold text-[#712ae2] uppercase tracking-wider mb-1">
              Réseau de Commerçants Locaux
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              Boutiques et Catégories de Produits
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Explorez les meilleures boutiques vérifiées du Cameroun ou filtrez par catégorie d'articles.
            </p>
          </div>

          {/* Category Quick Filter Strip */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Filtrer par catégorie :
              </span>

              {/* City selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Ville :</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value as CameroonCity)}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#712ae2]"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0b1c30] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Boutiques Directory */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#0b1c30] flex items-center gap-2">
              <Store className="w-5 h-5 text-[#712ae2]" />
              <span>Liste des Boutiques Partenaires ({filteredBoutiques.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBoutiques.map((boutique) => {
                const boutiqueProductCount = products.filter((p) => p.boutiqueId === boutique.id).length;

                return (
                  <div
                    key={boutique.id}
                    onClick={() => handleSelectBoutique(boutique.id)}
                    className="bg-white rounded-xl p-5 border border-slate-200 hover:border-[#712ae2] hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#712ae2]" />
                          {boutique.city}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold font-mono text-slate-900">{boutique.rating.toFixed(1)}</span>
                          <span className="text-slate-400 text-[11px]">({boutique.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#712ae2] transition-colors mb-1">
                        {boutique.name}
                      </h3>

                      <p className="text-xs text-slate-500 mb-2">
                        {boutique.quarter}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                        {boutique.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        {boutiqueProductCount} article(s) en rayon
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectBoutique(boutique.id);
                        }}
                        className="px-3 py-1 bg-[#0b1c30] group-hover:bg-[#712ae2] text-white rounded-lg font-bold transition-colors cursor-pointer"
                      >
                        Visiter la boutique
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Products Across These Boutiques */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-lg font-bold text-[#0b1c30]">
              Articles disponibles ({displayedProducts.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={setQuickViewProduct}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};
