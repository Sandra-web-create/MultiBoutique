import React, { useState } from 'react';
import { X, Plus, Package, Tag, Layers, Check } from 'lucide-react';
import { Product, ProductCategory, CameroonCity, Boutique } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  activeBoutique: Boutique;
}

const CATEGORIES: ProductCategory[] = [
  'High-Tech & Smartphones',
  'Mode & Wax Camerounais',
  'Maison & Décoration',
  'Terroir & Épicerie Fine',
  'Beauté & Soins Bio',
];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  activeBoutique,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('High-Tech & Smartphones');
  const [price, setPrice] = useState<number>(25000);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [stockCount, setStockCount] = useState<number>(10);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || price <= 0) return;

    onSave({
      title,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      boutiqueId: activeBoutique.id,
      boutiqueName: activeBoutique.name,
      city: activeBoutique.city,
      quarter: activeBoutique.quarter,
      inStock: stockCount > 0,
      stockCount: Number(stockCount),
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
      description: description.trim() || 'Produit de qualité certifiée disponible en boutique.',
      specifications: {
        'Origine': `${activeBoutique.city}, Cameroun`,
        'Boutique': activeBoutique.name,
        'Garantie': 'Garantie locale 30 jours',
      },
      isNew: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#712ae2]" />
            <div>
              <h3 className="text-base font-bold text-[#0b1c30]">Ajouter un nouvel article</h3>
              <p className="text-[11px] text-slate-500">Pour la boutique {activeBoutique.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Nom du produit *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Robe de soirée en Ndop et soie"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Catégorie *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] bg-white text-slate-900"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Quantité en stock *
              </label>
              <input
                type="number"
                min="0"
                required
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] font-mono text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Prix de vente (FCFA) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="500"
                  step="500"
                  required
                  placeholder="Ex: 25000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full pr-14 pl-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] font-mono text-slate-900"
                />
                <span className="absolute right-3 top-2 text-[11px] font-bold text-slate-400">
                  FCFA
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Prix barré / d'origine (optionnel)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="500"
                  placeholder="Ex: 30000"
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full pr-14 pl-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] font-mono text-slate-900"
                />
                <span className="absolute right-3 top-2 text-[11px] font-bold text-slate-400">
                  FCFA
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              URL de la photo du produit (ou laissez vide pour visuel par défaut)
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Description de l'article *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Détails sur la confection, les tailles, les garanties..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#712ae2] text-slate-900"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0b1c30] hover:bg-[#131b2e] text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Publier le produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
