import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, MapPin, Truck, MessageCircle, Check } from 'lucide-react';
import { Product } from '../types';
import { formatFCFA, getWhatsAppOrderLink } from '../utils/formatters';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  vendorPhone?: string;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  vendorPhone = '+237699123456',
}) => {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  const whatsAppLink = getWhatsAppOrderLink(
    vendorPhone,
    product.title,
    product.price * quantity,
    product.boutiqueName
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 z-10 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 rounded-full shadow-sm transition-colors cursor-pointer"
          aria-label="Fermer l'aperçu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image & Gallery */}
        <div className="md:w-1/2 bg-slate-100 relative min-h-[260px] md:min-h-full flex items-center justify-center overflow-hidden">
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="p-8 text-center text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium">{product.title}</p>
            </div>
          )}

          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#712ae2]" />
            <span>Disponible à {product.city} ({product.quarter})</span>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Vendor Metadata & Category */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-slate-700">{product.boutiqueName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Marchand vérifié
              </span>
            </div>

            {/* Product Title */}
            <h2 className="text-xl font-bold text-[#0b1c30] leading-snug mb-2">
              {product.title}
            </h2>

            {/* Price & Rating */}
            <div className="flex items-center justify-between py-2 border-b border-slate-100 mb-4">
              <div>
                <span className="text-2xl font-extrabold text-[#0b1c30] font-mono tabular-nums">
                  {formatFCFA(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-xs text-slate-400 line-through font-mono tabular-nums">
                    {formatFCFA(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-900 font-mono">{product.rating.toFixed(1)}</span>
                <span className="text-slate-400">({product.reviewsCount} avis)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Specifications list */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Caractéristiques & Garantie
                </h4>
                <div className="space-y-1.5 text-xs">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-slate-600">
                      <span className="font-medium text-slate-500">{key}:</span>
                      <span className="font-semibold text-slate-800 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Delivery Note */}
            <div className="flex items-center gap-2 text-xs text-slate-600 mb-5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Livré en <strong>24h à Douala & Yaoundé</strong>. Paiement possible en espèces ou MoMo à la réception.
              </span>
            </div>
          </div>

          {/* Bottom Actions: Quantity + Add to Cart + WhatsApp */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity stepper */}
              <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-mono font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0b1c30] hover:bg-[#131b2e] text-white disabled:bg-slate-200 disabled:cursor-not-allowed'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Article ajouté !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    <span>Ajouter au panier ({formatFCFA(product.price * quantity)})</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Negotiation */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-4 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Commander directement via WhatsApp avec la boutique</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
