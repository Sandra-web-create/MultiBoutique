import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, X, ArrowUpDown, Filter, 
  Store, MapPin, Tag, Check, RefreshCw 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';
import { Product, ProductCategory, CameroonCity } from '../types';
import { formatFCFA } from '../utils/formatters';
import { CITIES } from '../data/mockData';

const CATEGORIES: ProductCategory[] = [
  'Toutes les catégories',
  'High-Tech & Smartphones',
  'Mode & Wax Camerounais',
  'Maison & Décoration',
  'Terroir & Épicerie Fine',
  'Beauté & Soins Bio',
];

export const SearchPage: React.FC = () => {
  const { products, boutiques, addToCart } = useApp();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Toutes les catégories');
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<CameroonCity>('Toutes les villes');
  const [maxPrice, setMaxPrice] = useState<number>(250000);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('Toutes les catégories');
    setSelectedBoutiqueId('all');
    setSelectedCity('Toutes les villes');
    setMinPrice(0);
    setMaxPrice(250000);
    setOnlyInStock(false);
    setSortBy('recommended');
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Query text match
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.boutiqueName.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'Toutes les catégories') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Boutique filter
    if (selectedBoutiqueId !== 'all') {
      result = result.filter((p) => p.boutiqueId === selectedBoutiqueId);
    }

    // City filter
    if (selectedCity !== 'Toutes les villes') {
      result = result.filter((p) => p.city === selectedCity);
    }

    // Price range filter
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Stock
    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, query, selectedCategory, selectedBoutiqueId, selectedCity, minPrice, maxPrice, onlyInStock, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      {/* Search Header */}
      <div>
        <div className="text-xs font-bold text-[#712ae2] uppercase tracking-wider mb-1">
          Catalogue & Moteur de Recherche
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
          Recherche de Produits & Filtres Avancés
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Filtrez par catégorie, boutique officielle, gamme de prix en FCFA et disponibilité.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher par mot-clé (ex: smartphone, veste wax, café mont oku, poivre penja...)"
          className="w-full pl-12 pr-10 py-3 text-sm bg-white border border-slate-300 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-[#712ae2] text-slate-900 placeholder:text-slate-400"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-3.5 p-1 text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Panel (Category, Boutique, Prix, Ville) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-[#712ae2]" />
            <span>Critères de sélection</span>
          </div>

          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Réinitialiser les filtres</span>
          </button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* 1. Category filter */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Catégorie
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategory)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#712ae2] cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 2. Boutique filter */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-slate-400" />
              Boutique marchande
            </label>
            <select
              value={selectedBoutiqueId}
              onChange={(e) => setSelectedBoutiqueId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#712ae2] cursor-pointer"
            >
              <option value="all">Toutes les boutiques ({boutiques.length})</option>
              {boutiques.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.city})
                </option>
              ))}
            </select>
          </div>

          {/* 3. City filter */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Ville de retrait / expédition
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value as CameroonCity)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#712ae2] cursor-pointer"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* 4. Sort By */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              Trier les résultats
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#712ae2] cursor-pointer"
            >
              <option value="recommended">Pertinence / Recommandés</option>
              <option value="price-asc">Prix croissant (FCFA)</option>
              <option value="price-desc">Prix décroissant (FCFA)</option>
              <option value="rating">Meilleures évaluations</option>
            </select>
          </div>
        </div>

        {/* Price Slider & Presets */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-700">
              Plafond de prix : <strong className="font-mono text-[#712ae2]">{formatFCFA(maxPrice)}</strong>
            </span>
            <input
              type="range"
              min="5000"
              max="250000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full sm:w-64 accent-[#712ae2] cursor-pointer"
            />
          </div>

          {/* Quick Price Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">Fourchettes :</span>
            <button
              onClick={() => { setMinPrice(0); setMaxPrice(20000); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md cursor-pointer transition-colors"
            >
              &lt; 20 000 FCFA
            </button>
            <button
              onClick={() => { setMinPrice(20000); setMaxPrice(70000); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md cursor-pointer transition-colors"
            >
              20k - 70k FCFA
            </button>
            <button
              onClick={() => { setMinPrice(70000); setMaxPrice(250000); }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md cursor-pointer transition-colors"
            >
              &gt; 70 000 FCFA
            </button>
          </div>

          {/* In stock toggle */}
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="rounded text-[#712ae2] focus:ring-[#712ae2]"
            />
            <span>Articles en stock uniquement</span>
          </label>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
        <span className="font-semibold text-slate-800">
          {filteredProducts.length} article(s) trouvé(s)
        </span>
        {query && (
          <span>Résultats pour &laquo; <strong>{query}</strong> &raquo;</span>
        )}
      </div>

      {/* Results Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Aucun résultat pour cette recherche
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Vérifiez l’orthographe ou réinitialisez vos filtres de prix et de catégorie pour afficher tous les articles disponibles.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#0b1c30] text-white rounded-lg text-xs font-bold hover:bg-[#131b2e] transition-colors cursor-pointer"
          >
            Réinitialiser les filtres
          </button>
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
