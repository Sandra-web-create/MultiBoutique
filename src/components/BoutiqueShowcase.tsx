import React from 'react';
import { Store, Star, ShieldCheck, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import { Boutique } from '../types';

interface BoutiqueShowcaseProps {
  boutiques: Boutique[];
  selectedBoutiqueId: string | null;
  onSelectBoutique: (boutiqueId: string | null) => void;
  onOpenVendorModal: () => void;
}

export const BoutiqueShowcase: React.FC<BoutiqueShowcaseProps> = ({
  boutiques,
  selectedBoutiqueId,
  onSelectBoutique,
  onOpenVendorModal,
}) => {
  return (
    <section id="boutiques" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-[#712ae2] uppercase tracking-wider mb-1">
              Réseau de Commerçants Vérifiés
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              Boutiques Partenaires Réputées
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Chaque vendeur est audité physiquement et certifié par MultiBoutiques. Sélectionnez une boutique pour afficher son catalogue exclusif.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {selectedBoutiqueId && (
              <button
                onClick={() => onSelectBoutique(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Afficher toutes les boutiques
              </button>
            )}
            <button
              onClick={onOpenVendorModal}
              className="text-xs font-bold text-[#0b1c30] hover:text-[#712ae2] border border-slate-200 hover:border-[#712ae2] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Store className="w-3.5 h-3.5" />
              Rejoindre comme vendeur
            </button>
          </div>
        </div>

        {/* Boutiques Grid (Single Elevation Depth, zero nested boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boutiques.map((boutique) => {
            const isSelected = selectedBoutiqueId === boutique.id;

            return (
              <div
                key={boutique.id}
                className={`relative rounded-xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#712ae2] bg-slate-50/80 ring-2 ring-[#712ae2]/20 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Bar of Card: Category & Location */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-medium text-slate-600 truncate max-w-[170px]">
                      {boutique.category}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700 shrink-0">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {boutique.city}
                    </span>
                  </div>

                  {/* Boutique Title & Verified Badge */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-[#0b1c30] group-hover:text-[#712ae2]">
                      {boutique.name}
                    </h3>
                    {boutique.verified && (
                      <span
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 shrink-0"
                        title="Vendeur certifié avec RCCM vérifié"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Vérifié
                      </span>
                    )}
                  </div>

                  {/* Quarter / Address */}
                  <p className="text-xs text-slate-500 mb-3">
                    {boutique.quarter}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {boutique.description}
                  </p>
                </div>

                {/* Rating & Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900 font-mono">{boutique.rating.toFixed(1)}</span>
                    <span className="text-slate-400 text-[11px]">({boutique.reviewsCount} avis)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${boutique.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      title="Contacter le marchand sur WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => onSelectBoutique(isSelected ? null : boutique.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#712ae2] text-white hover:bg-[#581c87]'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? 'Catalogue actif' : 'Voir les articles'}
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
