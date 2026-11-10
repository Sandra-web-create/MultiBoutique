import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, User, Truck, CreditCard, ArrowLeft } from 'lucide-react';
import { CartItem, CameroonCity, Order } from '../types';
import { formatFCFA } from '../utils/formatters';
import { CITIES } from '../data/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedCity, setSelectedCity] = useState<CameroonCity>('Douala');
  const [quarter, setQuarter] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'orange_money' | 'cash_delivery'>('cash_delivery');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 50000 ? 0 : 2000;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !quarter) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `CM-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        customerName,
        customerPhone,
        city: selectedCity,
        quarter,
        landmark: landmark || 'Non spécifié',
        paymentMethod,
        items: [...items],
        totalAmount: total,
        deliveryFee,
        status: 'preparation',
      };

      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 z-10 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#0b1c30]">
              {completedOrder ? 'Confirmation de commande' : 'Finaliser ma commande'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto">
          {completedOrder ? (
            /* Order Success State */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#0b1c30]">
                  Commande enregistrée avec succès !
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  Référence : <span className="font-bold text-slate-900">{completedOrder.id}</span>
                </p>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Destinataire :</span>
                  <span className="font-bold text-slate-800">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Téléphone :</span>
                  <span className="font-mono font-bold text-slate-800">{completedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Adresse :</span>
                  <span className="font-medium text-slate-800">
                    {completedOrder.city}, {completedOrder.quarter} ({completedOrder.landmark})
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Mode de règlement :</span>
                  <span className="font-bold text-[#712ae2] uppercase">
                    {completedOrder.paymentMethod === 'momo'
                      ? 'MTN Mobile Money'
                      : completedOrder.paymentMethod === 'orange_money'
                      ? 'Orange Money'
                      : 'Espèces à la livraison'}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-[#0b1c30]">
                  <span>Total commande :</span>
                  <span className="font-mono text-emerald-700">{formatFCFA(completedOrder.totalAmount)}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800 text-xs text-left flex items-start gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  Le coursier de la boutique prendra contact avec vous sur le <strong>{completedOrder.customerPhone}</strong> pour confirmation de localisation avant la livraison.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#0b1c30] text-white rounded-lg text-xs font-bold hover:bg-[#131b2e] transition-colors cursor-pointer"
              >
                Retour aux achats
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#712ae2]" />
                  Informations de contact
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Jean-Paul Kamga"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Numéro WhatsApp / Téléphone *
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-mono">+237</span>
                      <input
                        type="tel"
                        required
                        placeholder="6xx xx xx xx"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-12 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] font-mono text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  Adresse de livraison au Cameroun
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Ville *
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value as CameroonCity)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] bg-white text-slate-900"
                    >
                      {CITIES.filter((c) => c !== 'Toutes les villes').map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Quartier *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Akwa, Bastos, Ndokoti..."
                      value={quarter}
                      onChange={(e) => setQuarter(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Point de repère / Précisions
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Face Boulangerie Saker, à côté de la pharmacie"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] text-slate-900"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#0b1c30]" />
                  Mode de règlement
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Cash on delivery */}
                  <label
                    className={`p-3 border rounded-xl cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === 'cash_delivery'
                        ? 'border-[#0b1c30] bg-slate-50 ring-1 ring-[#0b1c30]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash_delivery'}
                      onChange={() => setPaymentMethod('cash_delivery')}
                      className="sr-only"
                    />
                    <div className="text-xs font-bold text-slate-900 mb-1">
                      Espèces à la livraison
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Réglez au coursier après vérification
                    </span>
                  </label>

                  {/* MTN Mobile Money */}
                  <label
                    className={`p-3 border rounded-xl cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'momo'}
                      onChange={() => setPaymentMethod('momo')}
                      className="sr-only"
                    />
                    <div className="text-xs font-bold text-amber-800 mb-1 flex items-center justify-between">
                      MTN MoMo
                      <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded">Instantané</span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Paiement direct par push USSD
                    </span>
                  </label>

                  {/* Orange Money */}
                  <label
                    className={`p-3 border rounded-xl cursor-pointer flex flex-col justify-between transition-all ${
                      paymentMethod === 'orange_money'
                        ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'orange_money'}
                      onChange={() => setPaymentMethod('orange_money')}
                      className="sr-only"
                    />
                    <div className="text-xs font-bold text-orange-800 mb-1 flex items-center justify-between">
                      Orange Money
                      <span className="text-[9px] bg-orange-200 text-orange-900 px-1 rounded">Sécurisé</span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Validation par code secret
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Articles ({items.length}) :</span>
                  <span className="font-mono font-medium">{formatFCFA(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Livraison express à domicile :</span>
                  <span className="font-mono font-medium">
                    {deliveryFee === 0 ? <span className="text-emerald-700 font-bold">Offerte</span> : formatFCFA(deliveryFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-[#0b1c30]">
                  <span>Total à payer :</span>
                  <span className="font-mono text-[#712ae2]">{formatFCFA(total)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#0b1c30] hover:bg-[#131b2e] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:bg-slate-300"
              >
                {isSubmitting ? (
                  <span>Validation de la commande en cours...</span>
                ) : (
                  <span>Confirmer la commande ({formatFCFA(total)})</span>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
