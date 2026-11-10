import React from 'react';
import { Link } from 'react-router-dom';
import { Store, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenVendorModal: () => void;
  onOpenTrackingModal: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenVendorModal,
  onOpenTrackingModal,
}) => {
  return (
    <footer id="garanties" className="bg-[#0b1c30] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Purpose (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/20">
                <Store className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Multi<span className="text-[#712ae2]">Boutiques</span>
                <span className="text-emerald-400 ml-1.5 text-xs font-bold uppercase tracking-wider">Cameroun</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Première plateforme fédérée de boutiques vérifiées au Cameroun. Nous connectons les commerçants, créateurs et producteurs d’excellence avec les acheteurs de Douala, Yaoundé et de toutes les régions.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Service client WhatsApp :{' '}
                  <a
                    href="https://wa.me/237677142427"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-semibold underline-offset-2 hover:underline transition-colors"
                  >
                    +237 677 14 24 27
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@multiboutiques.cm</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Hubs logistiques : Douala Akwa & Yaoundé Bastos</span>
              </div>
            </div>
          </div>

          {/* Hubs Régionaux */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Villes Couvertes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Douala (Akwa, Bonanjo, Bonapriso)</li>
              <li>Yaoundé (Bastos, Omnisports, Mokolo)</li>
              <li>Bafoussam & Ouest</li>
              <li>Garoua & Grand Nord</li>
              <li>Kribi & Sud</li>
              <li>Bamenda & Nord-Ouest</li>
            </ul>
          </div>

          {/* 5 Pages Principales */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  1. Accueil
                </Link>
              </li>
              <li>
                <Link to="/boutiques" className="hover:text-white transition-colors">
                  2. Boutiques & Catégories
                </Link>
              </li>
              <li>
                <Link to="/recherche" className="hover:text-white transition-colors">
                  3. Recherche & Filtres
                </Link>
              </li>
              <li>
                <Link to="/favoris" className="hover:text-white transition-colors">
                  4. Mes Favoris
                </Link>
              </li>
              <li>
                <Link to="/compte" className="hover:text-white transition-colors">
                  5. Espace Compte Client
                </Link>
              </li>
            </ul>
          </div>

          {/* Commerçants */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Espace Vendeurs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenVendorModal}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer text-left"
                >
                  Ouvrir l'Espace Marchand
                </button>
              </li>
              <li>Charte qualité vendeur</li>
              <li>Intégration MTN & Orange Money</li>
              <li>Réseau de coursiers affiliés</li>
              <li>Paiement garanti après livraison</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Trust Indicators & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Paiements certifiés via MTN Mobile Money, Orange Money Cameroun & Espèces</span>
          </div>

          <p className="font-mono text-[11px]">
            © 2026 MultiBoutiques Cameroun. Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  );
};
