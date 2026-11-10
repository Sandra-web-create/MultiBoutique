import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatFCFA } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 50000;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const deliveryFee = isFreeShipping || items.length === 0 ? 0 : 2000;
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0b1c30] flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0b1c30]">Mon Panier</h3>
                <p className="text-xs text-slate-500">{items.length} article(s) sélectionné(s)</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  {isFreeShipping ? 'Livraison offerte !' : 'Livraison express à domicile'}
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {isFreeShipping
                    ? '0 FCFA'
                    : `Encore ${formatFCFA(remainingForFree)}`}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <h4 className="text-sm font-bold text-slate-700 mb-1">Votre panier est vide</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Découvrez les articles de créateurs et commerçants de Douala, Yaoundé, Bafoussam et Garoua.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#0b1c30] text-white rounded-lg text-xs font-bold hover:bg-[#131b2e] transition-colors cursor-pointer"
                >
                  Découvrir les boutiques
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="py-3.5 flex gap-3.5 items-start">
                  {/* Thumbnail */}
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-slate-500 truncate">{product.boutiqueName}</p>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight mb-1">
                      {product.title}
                    </h4>
                    <p className="text-xs font-mono font-bold text-[#0b1c30] tabular-nums">
                      {formatFCFA(product.price)}
                    </p>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-200 rounded-md bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-semibold">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer ml-auto"
                        title="Supprimer l'article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Sous-total articles :</span>
                  <span className="font-mono font-semibold tabular-nums text-slate-900">
                    {formatFCFA(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Frais de livraison :</span>
                  <span className="font-mono font-semibold tabular-nums text-slate-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">Gratuit</span>
                    ) : (
                      formatFCFA(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-[#0b1c30]">
                  <span>Total à payer :</span>
                  <span className="font-mono text-base text-[#712ae2] tabular-nums">
                    {formatFCFA(total)}
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Règlement à la livraison ou par MTN / Orange Money</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3 px-4 bg-[#0b1c30] hover:bg-[#131b2e] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#712ae2]"
              >
                <span>Passer la commande ({formatFCFA(total)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
