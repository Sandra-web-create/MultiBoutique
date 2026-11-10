import React, { useState } from 'react';
import { X, Store, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CameroonCity, ProductCategory } from '../types';
import { CITIES } from '../data/mockData';

interface VendorRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (boutiqueName: string) => void;
}

export const VendorRegisterModal: React.FC<VendorRegisterModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [boutiqueName, setBoutiqueName] = useState('');
  const [city, setCity] = useState<CameroonCity>('Douala');
  const [quarter, setQuarter] = useState('');
  const [rccm, setRccm] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Mode & Wax Camerounais');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boutiqueName || !whatsapp) return;

    setSubmitted(true);
    onSuccess(boutiqueName);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 z-10">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#712ae2]" />
            <h3 className="text-base font-bold text-[#0b1c30]">
              Ouvrir ma boutique sur MultiBoutiques
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
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Dossier Vendeur Transmis !
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Merci <strong>{boutiqueName}</strong>. Notre équipe d’audit commercial à {city} va vérifier vos pièces et vous contacter sur WhatsApp (<strong>+237 {whatsapp}</strong>) sous 24h ouvrées.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-left space-y-1">
                <p>✓ Badge Marchand Vérifié après validation RCCM / NUI</p>
                <p>✓ Intégration directe aux paiements MTN MoMo & Orange Money</p>
                <p>✓ Réseau de coursiers express Douala & Yaoundé mis à disposition</p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#0b1c30] text-white rounded-lg text-xs font-bold hover:bg-[#131b2e] transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Vendez vos produits à des milliers de clients à travers tout le Cameroun. Bénéficiez de la logistique de livraison et des paiements mobiles sécurisés.
              </p>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Nom commercial de la boutique *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Douala Luxe Wax, Kribi Terroir..."
                  value={boutiqueName}
                  onChange={(e) => setBoutiqueName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Ville principale *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as CameroonCity)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] bg-white text-slate-900"
                  >
                    {CITIES.filter((c) => c !== 'Toutes les villes').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Quartier / Emplacement
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Akwa, Bastos, Marché Congo..."
                    value={quarter}
                    onChange={(e) => setQuarter(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Numéro RCCM ou NUI (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="RC/DLA/2024/..."
                    value={rccm}
                    onChange={(e) => setRccm(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Numéro WhatsApp Pro *
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-mono">+237</span>
                    <input
                      type="tel"
                      required
                      placeholder="6xx xx xx xx"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full pl-12 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] font-mono text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Catégorie d’articles dominante *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] bg-white text-slate-900"
                >
                  <option value="High-Tech & Smartphones">High-Tech & Smartphones</option>
                  <option value="Mode & Wax Camerounais">Mode & Wax Camerounais</option>
                  <option value="Maison & Décoration">Maison & Décoration</option>
                  <option value="Terroir & Épicerie Fine">Terroir & Épicerie Fine</option>
                  <option value="Beauté & Soins Bio">Beauté & Soins Bio</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Vos informations sont protégées. L’adhésion donne accès à la vitrine vendeur, aux encaissements sécurisés et à la logistique partenaire.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0b1c30] hover:bg-[#131b2e] text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Envoyer ma demande d'ouverture
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
