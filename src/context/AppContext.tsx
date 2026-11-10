import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Boutique, CartItem, Order, CameroonCity } from '../types';
import { BOUTIQUES, PRODUCTS } from '../data/mockData';

interface UserProfile {
  name: string;
  phone: string;
  city: CameroonCity;
  quarter: string;
  landmark: string;
  isLoggedIn: boolean;
  email?: string;
}

interface AppContextType {
  // Products & Boutiques
  products: Product[];
  boutiques: Boutique[];
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  deleteProduct: (productId: string) => void;
  toggleStock: (productId: string) => void;

  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Favorites
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  loginUser: (name: string, phone: string) => void;
  logoutUser: () => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [boutiques, setBoutiques] = useState<Boutique[]>(BOUTIQUES);

  // Cart state with 1 initial sample item
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Favorites state (pre-populate with 2 products for nice initial discovery)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['prod-wax-jacket', 'prod-coffee-oku']);

  // Orders state (with sample Cameroon order)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'CM-849201',
      createdAt: new Date().toISOString(),
      customerName: 'Michel Tchakounte',
      customerPhone: '+237 699 45 82 10',
      city: 'Douala',
      quarter: 'Akwa Nord',
      landmark: 'Face Hôtel Prince de Galles',
      paymentMethod: 'cash_delivery',
      items: [{ product: PRODUCTS[1], quantity: 1 }],
      totalAmount: 145000,
      deliveryFee: 0,
      status: 'out_for_delivery',
    },
    {
      id: 'CM-912384',
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      customerName: 'Rosine Ngo Biboum',
      customerPhone: '+237 677 34 11 89',
      city: 'Yaoundé',
      quarter: 'Bastos',
      landmark: 'Rond-point Bastos',
      paymentMethod: 'momo',
      items: [{ product: PRODUCTS[0], quantity: 1 }],
      totalAmount: 65000,
      deliveryFee: 0,
      status: 'delivered',
    }
  ]);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Samuel Kamga',
    phone: '699 12 34 56',
    city: 'Douala',
    quarter: 'Akwa',
    landmark: 'Rue Pau, à côté de la pharmacie du Centre',
    isLoggedIn: true,
    email: 'samuel.kamga@example.cm',
  });

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const hideToast = () => setToastMessage(null);

  // Cart functions
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.title}" ajouté au panier`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  // Favorites functions
  const toggleFavorite = (productId: string) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Article retiré des favoris');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Article ajouté à vos favoris ❤️');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favoriteIds.includes(productId);

  // Orders functions
  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    clearCart();
    showToast(`Commande ${order.id} enregistrée !`);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Statut de la commande ${orderId} actualisé`);
  };

  // Products functions
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Produit "${newProduct.title}" publié avec succès !`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Produit supprimé');
  };

  const toggleStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
    showToast('Statut de stock mis à jour');
  };

  // Profile functions
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    showToast('Profil mis à jour');
  };

  const loginUser = (name: string, phone: string) => {
    setUserProfile((prev) => ({
      ...prev,
      name,
      phone,
      isLoggedIn: true,
    }));
    showToast(`Bienvenue, ${name} !`);
  };

  const logoutUser = () => {
    setUserProfile((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    showToast('Vous êtes déconnecté');
  };

  const value: AppContextType = {
    products,
    boutiques,
    addProduct,
    deleteProduct,
    toggleStock,
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    favoriteIds,
    toggleFavorite,
    isFavorite,
    orders,
    addOrder,
    updateOrderStatus,
    userProfile,
    updateUserProfile,
    loginUser,
    logoutUser,
    toastMessage,
    showToast,
    hideToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
