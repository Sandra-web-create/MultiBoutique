import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, MessageCircle, MapPin, Check, Heart } from 'lucide-react';
import { Product } from '../types';
import { formatFCFA, getWhatsAppOrderLink } from '../utils/formatters';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  vendorPhone?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  vendorPhone = '+237699123456',
}) => {
  const { addToCart, toggleFavorite, isFavorite } = useApp();
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const favorited = isFavorite(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const whatsAppLink = getWhatsAppOrderLink(
    vendorPhone,
    product.title,
    product.price,
    product.boutiqueName
  );

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div>
        {/* Image Frame with fallback */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-400">
              <ShoppingBag className="w-8 h-8 mb-1 text-slate-300" />
              <span className="text-xs text-center font-medium">{product.title}</span>
            </div>
          )}

          {/* Quick Hover Overlay: Quick View Button */}
          <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="px-3.5 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-md hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              Aperçu rapide
            </button>
          </div>

          {/* City Badge */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#712ae2]" />
              {product.city}
            </span>
            {product.isNew && (
              <span className="bg-[#712ae2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider">
                Nouveau
              </span>
            )}
          </div>

          {/* Favorite Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-xs ${
              favorited 
                ? 'bg-rose-50 text-rose-600' 
                : 'bg-white/80 text-slate-600 hover:text-rose-600 hover:bg-white'
            }`}
            title={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
            aria-label="Ajouter aux favoris"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4">
          {/* Metadata Discipline: Clean unboxed text with separators */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 truncate">
            <span className="font-medium text-slate-600 truncate">{product.boutiqueName}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.quarter}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#712ae2] transition-colors mb-2">
            {product.title}
          </h3>

          {/* Ratings & Stock */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900 font-mono text-[11px]">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>

            <span className={`text-[11px] font-medium ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
              {product.inStock ? 'En stock' : 'Rupture'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Primary Action */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="text-base font-extrabold text-[#0b1c30] font-mono tracking-tight tabular-nums">
            {formatFCFA(product.price)}
          </div>
          {product.originalPrice && (
            <div className="text-[11px] text-slate-400 line-through tabular-nums font-mono">
              {formatFCFA(product.originalPrice)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* WhatsApp Direct Buy button */}
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer border border-emerald-200/60"
            title="Commander directement via WhatsApp"
            aria-label="Commander via WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0b1c30] hover:bg-[#1e293b] text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
