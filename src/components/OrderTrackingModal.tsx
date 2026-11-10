import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, PackageCheck } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
}) => {
  const [trackingInput, setTrackingInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(
    recentOrders.length > 0 ? recentOrders[0] : null
  );

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackingInput.trim().toUpperCase();
    if (!query) return;

    const found = recentOrders.find((o) => o.id.toUpperCase() === query);
    if (found) {
      setSearchedOrder(found);
    } else {
      // Create a realistic simulated active order for demo search
      setSearchedOrder({
        id: query.startsWith('CM-') ? query : `CM-${query}`,
        createdAt: 'Aujourd’hui à 11:30',
        customerName: 'Client MultiBoutiques',
        customerPhone: '+237 699 XX XX XX',
        city: 'Douala',
        quarter: 'Akwa Nord',
        landmark: 'Face Hôtel Prince de Galles',
        paymentMethod: 'cash_delivery',
        items: [],
        totalAmount: 45000,
        deliveryFee: 0,
        status: 'out_for_delivery',
      });
    }
  };

  const currentOrder = searchedOrder || (recentOrders.length > 0 ? recentOrders[0] : null);

  const steps = [
    { title: 'Commande reçue par la boutique', time: '10:15', done: true },
    { title: 'Article vérifié & emballé', time: '11:00', done: true },
    { title: 'Pris en charge par coursier express', time: '12:30', done: true },
    {
      title: 'En cours de livraison dans votre quartier',
      time: 'En cours (Livraison prévue avant 17h)',
      done: true,
      current: true,
    },
    { title: 'Remise en main propre & règlement', time: 'En attente', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 z-10">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#0b1c30]" />
            <h3 className="text-base font-bold text-[#0b1c30]">
              Suivi de Livraison Express
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Lookup Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Ex: CM-849201"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] font-mono text-slate-900"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0b1c30] text-white rounded-lg text-xs font-bold hover:bg-[#131b2e] transition-colors cursor-pointer"
            >
              Suivre
            </button>
          </form>

          {/* Quick Demo Selector if orders exist */}
          {recentOrders.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
              <span>Vos commandes récentes :</span>
              {recentOrders.map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => setSearchedOrder(ord)}
                  className="font-mono text-xs font-semibold px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded transition-colors cursor-pointer"
                >
                  {ord.id}
                </button>
              ))}
            </div>
          )}

          {currentOrder ? (
            <div className="space-y-4">
              {/* Order Banner */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                    N° de Référence
                  </span>
                  <span className="text-sm font-extrabold font-mono text-[#0b1c30]">
                    {currentOrder.id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Destination</span>
                  <span className="text-xs font-bold text-slate-800">
                    {currentOrder.city} ({currentOrder.quarter})
                  </span>
                </div>
              </div>

              {/* Delivery Steps Timeline */}
              <div className="space-y-3 pl-2 pt-2">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 relative">
                    {idx < steps.length - 1 && (
                      <div className="absolute left-2.5 top-5 w-0.5 h-7 bg-slate-200" />
                    )}

                    <div className="z-10 mt-0.5">
                      {step.done ? (
                        step.current ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white ring-4 ring-emerald-100">
                            <Clock className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-200 border-2 border-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 pb-2">
                      <p className={`text-xs font-bold ${step.current ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-slate-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Agent Note */}
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800 text-xs flex items-center gap-2.5">
                <PackageCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Coursier partenaire assigné. Vous serez appelé par téléphone 15 minutes avant l'arrivée.
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-slate-400 text-xs">
              Saisissez votre référence de commande reçue par SMS pour afficher le statut en temps réel.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
