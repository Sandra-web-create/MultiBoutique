import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Store, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';
import { Product } from '../types';

export const FavoritesPage: React.FC = () => {
  const { products, favoriteIds, toggleFavorite, addToCart, showToast } = useApp();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  const handleAddAllToCart = () => {
    favoriteProducts.forEach((p) => {
      if (p.inStock) {
        addToCart(p, 1);
      }
    });
    showToast(`${favoriteProducts.length} article(s) favori(s) ajouté(s) au panier !`);
  };

  const handleClearAll = () => {
    favoriteIds.forEach((id) => toggleFavorite(id));
    showToast('Liste des favoris vidée');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Ma Liste de Souhaits</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
            Mes Articles Favoris ({favoriteProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Retrouvez facilement les créations et produits enregistrés auprès de vos boutiques camerounaises favorites.
          </p>
        </div>

        {favoriteProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearAll}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vider la liste</span>
            </button>

            <button
              onClick={handleAddAllToCart}
              className="px-4 py-2 bg-[#0b1c30] hover:bg-[#131b2e] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Tout ajouter au panier</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of Favorite Products */}
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-500">
            <Heart className="w-8 h-8 text-rose-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Votre liste de favoris est vide
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Parcourez le catalogue et cliquez sur le cœur ❤️ sur n'importe quel article pour le conserver ici et le commander plus tard.
          </p>
          <div className="pt-2">
            <Link
              to="/recherche"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b1c30] hover:bg-[#131b2e] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <span>Découvrir le catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
