import React, { useState } from 'react';
import { 
  Store, Package, ShoppingBag, TrendingUp, Plus, Trash2, 
  CheckCircle2, Clock, Truck, Phone, MessageCircle, ArrowLeft, 
  SlidersHorizontal, Search, ShieldCheck, MapPin
} from 'lucide-react';
import { Product, Boutique, Order } from '../types';
import { formatFCFA } from '../utils/formatters';
import { AddProductModal } from './AddProductModal';

interface MerchantDashboardProps {
  boutiques: Boutique[];
  activeBoutique: Boutique;
  onSelectActiveBoutique: (boutique: Boutique) => void;
  products: Product[];
  orders: Order[];
  onAddProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  onDeleteProduct: (productId: string) => void;
  onToggleStock: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onExitDashboard: () => void;
}

export const MerchantDashboard: React.FC<MerchantDashboardProps> = ({
  boutiques,
  activeBoutique,
  onSelectActiveBoutique,
  products,
  orders,
  onAddProduct,
  onDeleteProduct,
  onToggleStock,
  onUpdateOrderStatus,
  onExitDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'profile'>('products');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // Products belonging to this boutique
  const boutiqueProducts = products.filter((p) => p.boutiqueId === activeBoutique.id);
  const filteredBoutiqueProducts = boutiqueProducts.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Orders containing items from this boutique or assigned
  const boutiqueOrders = orders;

  // Key metrics calculation
  const totalRevenue = boutiqueOrders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const pendingOrdersCount = boutiqueOrders.filter((o) => o.status !== 'delivered').length;
  const inStockProductsCount = boutiqueProducts.filter((p) => p.inStock).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-[#0b1c30]">
      {/* Merchant Top Bar */}
      <header className="bg-[#0b1c30] text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onExitDashboard}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Retour au site client</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#712ae2] flex items-center justify-center text-white">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold block leading-none">Espace Marchand</span>
                <span className="text-[10px] text-emerald-400 font-medium">MultiBoutiques Cameroun</span>
              </div>
            </div>
          </div>

          {/* Boutique Selector Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-[11px] text-slate-400 hidden sm:inline">Boutique active :</span>
              <select
                value={activeBoutique.id}
                onChange={(e) => {
                  const found = boutiques.find((b) => b.id === e.target.value);
                  if (found) onSelectActiveBoutique(found);
                }}
                className="text-xs font-bold text-white bg-transparent focus:outline-none cursor-pointer"
              >
                {boutiques.map((b) => (
                  <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                    {b.name} ({b.city})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onExitDashboard}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Voir ma vitrine
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Chiffre d’Affaires</p>
              <p className="text-xl font-extrabold font-mono text-[#0b1c30] mt-1 tabular-nums">
                {formatFCFA(totalRevenue)}
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Encaissé MoMo & Espèces</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Commandes en cours</p>
              <p className="text-xl font-extrabold font-mono text-[#712ae2] mt-1">
                {pendingOrdersCount}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">À emballer ou en livraison</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#712ae2] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Produits en Vente</p>
              <p className="text-xl font-extrabold font-mono text-slate-900 mt-1">
                {boutiqueProducts.length} <span className="text-xs font-normal text-slate-500">({inStockProductsCount} en stock)</span>
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Visibles sur le catalogue</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Note Marchand</p>
              <p className="text-xl font-extrabold font-mono text-amber-600 mt-1">
                {activeBoutique.rating.toFixed(1)} / 5
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">{activeBoutique.reviewsCount} avis certifiés</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#0b1c30] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Gestion des Produits ({boutiqueProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#0b1c30] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Commandes Reçues ({boutiqueOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-[#0b1c30] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Coordonnées Boutique</span>
          </button>
        </div>

        {/* TAB 1: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Rechercher parmi mes articles..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] text-slate-900"
                />
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2 bg-[#712ae2] hover:bg-[#581c87] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un article</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Article</th>
                      <th className="p-4">Catégorie</th>
                      <th className="p-4">Prix en FCFA</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Statut</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBoutiqueProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          Aucun produit trouvé pour {activeBoutique.name}. Cliquez sur "Ajouter un article" pour publier vos créations ou stocks.
                        </td>
                      </tr>
                    ) : (
                      filteredBoutiqueProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                              <p className="text-[11px] text-slate-400">{p.city} · {p.quarter}</p>
                            </div>
                          </td>

                          <td className="p-4 text-slate-600">
                            {p.category}
                          </td>

                          <td className="p-4 font-mono font-bold text-slate-900 tabular-nums">
                            {formatFCFA(p.price)}
                          </td>

                          <td className="p-4 font-mono text-slate-700">
                            {p.stockCount} unités
                          </td>

                          <td className="p-4">
                            <button
                              onClick={() => onToggleStock(p.id)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                                p.inStock
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {p.inStock ? '✓ En stock' : '✕ Rupture'}
                            </button>
                          </td>

                          <td className="p-4 text-right">
                            <button
                              onClick={() => onDeleteProduct(p.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Supprimer cet article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-200">
              {boutiqueOrders.map((ord) => {
                const customerWhatsApp = ord.customerPhone.replace(/[^0-9]/g, '');
                const cleanPhone = customerWhatsApp.startsWith('237') ? customerWhatsApp : `237${customerWhatsApp}`;
                const whatsAppDirect = `https://wa.me/${cleanPhone}?text=Bonjour%20${encodeURIComponent(ord.customerName)},%20votre%20commande%20${ord.id}%20chez%20${encodeURIComponent(activeBoutique.name)}%20est%20en%20cours%20de%20traitement.`;

                return (
                  <div key={ord.id} className="p-5 space-y-4">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[#0b1c30]">
                          {ord.id}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-xs text-slate-500">
                          {new Date(ord.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Statut :</span>
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as Order['status'])}
                          className="text-xs font-bold px-2.5 py-1 rounded-md border border-slate-300 bg-white text-slate-900 cursor-pointer focus:ring-1 focus:ring-[#712ae2]"
                        >
                          <option value="preparation">⏳ En préparation</option>
                          <option value="dispatched">📦 Remis au coursier</option>
                          <option value="out_for_delivery">🛵 En cours de livraison</option>
                          <option value="delivered">✓ Livré & Encaissé</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3.5 bg-slate-50 rounded-xl text-xs">
                      {/* Customer info */}
                      <div>
                        <p className="font-bold text-slate-700 mb-1">Destinataire</p>
                        <p className="text-slate-900 font-semibold">{ord.customerName}</p>
                        <p className="text-slate-600 font-mono">{ord.customerPhone}</p>
                        <a
                          href={whatsAppDirect}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 mt-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Écrire sur WhatsApp
                        </a>
                      </div>

                      {/* Delivery address */}
                      <div>
                        <p className="font-bold text-slate-700 mb-1">Adresse de livraison</p>
                        <p className="text-slate-800">{ord.city}, {ord.quarter}</p>
                        <p className="text-slate-500 text-[11px]">Repère : {ord.landmark}</p>
                      </div>

                      {/* Payment info */}
                      <div>
                        <p className="font-bold text-slate-700 mb-1">Règlement</p>
                        <p className="text-sm font-extrabold text-[#712ae2] font-mono tabular-nums">
                          {formatFCFA(ord.totalAmount)}
                        </p>
                        <p className="text-[11px] text-slate-600 uppercase font-medium">
                          {ord.paymentMethod === 'momo'
                            ? 'MTN MoMo'
                            : ord.paymentMethod === 'orange_money'
                            ? 'Orange Money'
                            : 'Espèces à la livraison'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Boutique Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Fiche Commerçant : {activeBoutique.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-500 block mb-0.5 font-medium">Ville & Quartier</label>
                <div className="font-bold text-slate-800">{activeBoutique.city} · {activeBoutique.quarter}</div>
              </div>

              <div>
                <label className="text-slate-500 block mb-0.5 font-medium">Catégorie Principale</label>
                <div className="font-bold text-slate-800">{activeBoutique.category}</div>
              </div>

              <div>
                <label className="text-slate-500 block mb-0.5 font-medium">Téléphone WhatsApp Commercial</label>
                <div className="font-mono font-bold text-slate-800">{activeBoutique.phone}</div>
              </div>

              <div>
                <label className="text-slate-500 block mb-0.5 font-medium">Certification</label>
                <div className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {activeBoutique.badge}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs">
              <label className="text-slate-500 block mb-1 font-medium">Délai moyen de livraison client</label>
              <div className="p-3 bg-slate-50 rounded-lg text-slate-700">
                {activeBoutique.deliveryTime}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal Add Product */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={onAddProduct}
        activeBoutique={activeBoutique}
      />
    </div>
  );
};
