import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MerchantDashboard } from './components/MerchantDashboard';
import { Footer } from './components/Footer';

// 5 Main Pages
import { HomePage } from './pages/HomePage';
import { BoutiquePage } from './pages/BoutiquePage';
import { SearchPage } from './pages/SearchPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AccountPage } from './pages/AccountPage';

import { Check, X } from 'lucide-react';
import { Boutique } from './types';

import { supabase } from './supabase';

const AppContent: React.FC = () => {
  const { 
    cartItems, 
    updateCartQuantity, 
    removeFromCart, 
    isCartOpen, 
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    addOrder,
    toastMessage,
    hideToast,
    boutiques,
    products,
    orders,
    addProduct,
    deleteProduct,
    toggleStock,
    updateOrderStatus
  } = useApp();

  // Mode Marchand (Seller space)
  const [isMerchantMode, setIsMerchantMode] = useState(false);
  const [activeMerchantBoutique, setActiveMerchantBoutique] = useState<Boutique>(boutiques[0]);

  if (isMerchantMode) {
    return (
      <MerchantDashboard
        boutiques={boutiques}
        activeBoutique={activeMerchantBoutique}
        onSelectActiveBoutique={setActiveMerchantBoutique}
        products={products}
        orders={orders}
        onAddProduct={addProduct}
        onDeleteProduct={deleteProduct}
        onToggleStock={toggleStock}
        onUpdateOrderStatus={updateOrderStatus}
        onExitDashboard={() => setIsMerchantMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={hideToast}
            className="text-slate-400 hover:text-white p-0.5 ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Bar (Desktop Header + Fixed Mobile Bottom Bar) */}
      <Navigation />

      {/* Main Routed Content: Exactly 5 Main Pages */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accueil" element={<Navigate to="/" replace />} />
          <Route path="/boutiques" element={<BoutiquePage />} />
          <Route path="/recherche" element={<SearchPage />} />
          <Route path="/favoris" element={<FavoritesPage />} />
          <Route path="/compte" element={<AccountPage onOpenMerchantDashboard={() => setIsMerchantMode(true)} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer (Visible on desktop and tablet) */}
      <Footer
        onOpenVendorModal={() => setIsMerchantMode(true)}
        onOpenTrackingModal={() => {}}
        onNavigateSection={() => {}}
      />

      {/* Shopping Bag Drawer (Accessible from all 5 pages) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal (Accessible from all 5 pages) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={(order) => {
          addOrder(order);
        }}
      />
    </div>
  );
};

export default function App() {
  useEffect(() => {
    console.log(" TEST SUPABASE : démarrage ");

  const testerConnexion = async () => {

    console.log("TEST SUPABASE : fonction appelée ");
    const { data, error } = await supabase

      .from("boutiques")

      .select("*")

      .limit(1);

    if (error) {

      console.error("Erreur Supabase :", error.message);

    } else {

      console.log("Connexion Supabase réussie !", data);

    }

  };

  testerConnexion();

}, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
