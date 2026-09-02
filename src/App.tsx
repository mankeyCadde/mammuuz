import React, { useState, useEffect } from 'react';
import {
  ScreenType,
  UserAccount,
  Product,
  CartItem,
  Order,
  ProductColor,
  AccountTab,
} from './types';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer, ToastMessage } from './components/Toast';

// Screen Components
import { HomeScreen } from './components/home/HomeScreen';
import { ShopScreen } from './components/shop/ShopScreen';
import { CategoriesScreen } from './components/shop/CategoriesScreen';
import { ProductDetailScreen } from './components/shop/ProductDetailScreen';
import { CartScreen } from './components/shop/CartScreen';
import { WishlistScreen } from './components/shop/WishlistScreen';
import { CheckoutScreen } from './components/checkout/CheckoutScreen';
import { OrderConfirmationScreen } from './components/checkout/OrderConfirmationScreen';
import { AccountScreen } from './components/AccountScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { ResetPasswordScreen } from './components/auth/ResetPasswordScreen';
import { AboutScreen } from './components/pages/AboutScreen';
import { ContactScreen } from './components/pages/ContactScreen';
import { FaqScreen } from './components/pages/FaqScreen';
import { PrivacyPolicyScreen } from './components/pages/PrivacyPolicyScreen';
import { TermsScreen } from './components/pages/TermsScreen';
import { NotFoundScreen } from './components/pages/NotFoundScreen';

// Mock Data
import {
  PRODUCTS,
  INITIAL_USER,
  INITIAL_ORDERS,
} from './data/products';

import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [user, setUser] = useState<UserAccount>(INITIAL_USER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedColor: PRODUCTS[0].colors?.[0],
    },
    {
      product: PRODUCTS[4],
      quantity: 1,
      selectedColor: PRODUCTS[4].colors?.[0],
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    PRODUCTS[1],
    PRODUCTS[3],
  ]);

  // Browsing state
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Top Prototype Switcher toolbar state
  const [isSwitcherVisible, setIsSwitcherVisible] = useState(true);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const addToast = (
    title: string,
    description?: string,
    type: 'success' | 'info' | 'error' = 'success'
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Handlers
  const handleLoginSuccess = (userData: Partial<UserAccount>) => {
    setUser((prev) => ({
      ...prev,
      ...userData,
      isLoggedIn: true,
    }));
    setCurrentScreen('home');
    addToast('Welcome Back', `Authenticated as ${userData.email || 'Patron'}`);
  };

  const handleRegisterSuccess = (userData: Partial<UserAccount>) => {
    setUser((prev) => ({
      ...prev,
      ...userData,
      isLoggedIn: true,
    }));
    setCurrentScreen('home');
    addToast('Account Created', 'Welcome to the Maamuuz Collector Circle.');
  };

  const handleSignOut = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    setCurrentScreen('login');
    addToast('Signed Out', 'You have securely signed out of your account.', 'info');
  };

  const handleUpdateProfile = (updated: Partial<UserAccount>) => {
    setUser((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, color?: ProductColor) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor?.name === color?.name
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || (product.colors && product.colors[0]),
        },
      ];
    });
    addToast('Added to Bag', `${product.name} (Qty: ${quantity})`);
  };

  const handleBuyNow = (product: Product, quantity = 1, color?: ProductColor) => {
    handleAddToCart(product, quantity, color);
    setCurrentScreen('checkout');
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item Removed', 'Artifact removed from shopping bag.', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
    addToast('Bag Cleared', 'All artifacts removed from your shopping bag.', 'info');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlistItems.some((p) => p.id === product.id);
    if (exists) {
      setWishlistItems((prev) => prev.filter((p) => p.id !== product.id));
      addToast('Removed from Wishlist', `${product.name} removed from saved list.`, 'info');
    } else {
      setWishlistItems((prev) => [...prev, product]);
      addToast('Saved to Wishlist', `${product.name} added to your private registry.`);
    }
  };

  const handleMoveAllWishlistToCart = () => {
    wishlistItems.forEach((product) => {
      handleAddToCart(product, 1);
    });
    setWishlistItems([]);
    addToast('Wishlist Moved', 'All saved items transferred to your shopping bag.');
  };

  // Checkout Handlers
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setSelectedOrder(newOrder);
    setCartItems([]);
    setCurrentScreen('order_confirmation');
  };

  // Navigation Helpers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product_detail');
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentScreen('shop');
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setCurrentScreen('account');
  };

  // Total calculations
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isAuthScreen =
    currentScreen === 'login' ||
    currentScreen === 'register' ||
    currentScreen === 'forgot_password' ||
    currentScreen === 'reset_password';

  return (
    <div className="min-h-screen bg-[#f1fbff] text-[#131d21] flex flex-col font-['Inter'] selection:bg-[#0060a9] selection:text-white">
      {/* Interactive Screen Switcher Bar (Provides instant 1-click inspection of all requested screens) */}
      <aside
        aria-label="Screen Navigator"
        className="bg-[#181f21] border-b border-white/10 px-4 py-2 text-white z-50 sticky top-0"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#00b894]" />
            <span className="font-semibold tracking-wide text-white/90">
              Maamuuz Screens ({currentScreen}):
            </span>
            <button
              onClick={() => setIsSwitcherVisible(!isSwitcherVisible)}
              className="text-[#9ba1a3] hover:text-white flex items-center gap-1 text-[11px] ml-2 cursor-pointer"
            >
              {isSwitcherVisible ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              <span>{isSwitcherVisible ? 'Hide' : 'Expand All'}</span>
            </button>
          </div>

          {isSwitcherVisible && (
            <div className="flex flex-wrap items-center gap-1.5 font-medium">
              {[
                { id: 'home', label: '1. Home' },
                { id: 'shop', label: '2. Shop' },
                { id: 'categories', label: '3. Categories' },
                { id: 'product_detail', label: '4. Product Details' },
                { id: 'cart', label: '5. Cart' },
                { id: 'checkout', label: '6. Checkout' },
                { id: 'order_confirmation', label: '7. Confirmation' },
                { id: 'wishlist', label: '8. Wishlist' },
                { id: 'account', label: '9. Account' },
                { id: 'login', label: '10. Sign In' },
                { id: 'register', label: '11. Register' },
                { id: 'forgot_password', label: '12. Forgot Pwd' },
                { id: 'reset_password', label: '13. Reset Pwd' },
                { id: 'about', label: '14. About' },
                { id: 'contact', label: '15. Contact' },
                { id: 'faq', label: '16. FAQ' },
                { id: 'privacy', label: '17. Privacy' },
                { id: 'terms', label: '18. Terms' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentScreen(s.id as ScreenType)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    currentScreen === s.id
                      ? 'bg-[#0060a9] text-white font-bold shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-[#c1c8ca]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Primary Global Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onCategorySelect={handleSelectCategory}
        user={user}
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSignOut={handleSignOut}
      />

      {/* Main Dynamic Screen View */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'home' && (
          <HomeScreen
            products={PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            onSelectCategory={handleSelectCategory}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'shop' && (
          <ShopScreen
            products={PRODUCTS}
            initialCategory={selectedCategory}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistItems={wishlistItems}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'categories' && (
          <CategoriesScreen
            onSelectCategory={handleSelectCategory}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'product_detail' && (
          <ProductDetailScreen
            product={selectedProduct}
            allProducts={PRODUCTS}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistItems.some((p) => p.id === selectedProduct.id)}
            onSelectProduct={handleSelectProduct}
            onNavigate={setCurrentScreen}
            onAddToast={addToast}
          />
        )}

        {currentScreen === 'cart' && (
          <CartScreen
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onNavigate={setCurrentScreen}
            onProceedToCheckout={() => setCurrentScreen('checkout')}
            onSelectProduct={handleSelectProduct}
            onAddToast={addToast}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutScreen
            items={cartItems}
            user={user}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={setCurrentScreen}
            onAddToast={addToast}
          />
        )}

        {currentScreen === 'order_confirmation' && selectedOrder && (
          <OrderConfirmationScreen
            order={selectedOrder}
            onNavigate={setCurrentScreen}
            onViewOrderDetails={handleViewOrderDetails}
          />
        )}

        {currentScreen === 'wishlist' && (
          <WishlistScreen
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onMoveAllToCart={handleMoveAllWishlistToCart}
            onClearWishlist={() => setWishlistItems([])}
            onSelectProduct={handleSelectProduct}
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'account' && (
          <AccountScreen
            user={user}
            orders={orders}
            onNavigate={setCurrentScreen}
            onSignOut={handleSignOut}
            onUpdateProfile={handleUpdateProfile}
            onAddToast={addToast}
            selectedOrder={selectedOrder}
            onSelectOrder={setSelectedOrder}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onNavigate={setCurrentScreen}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentScreen === 'register' && (
          <RegisterScreen
            onNavigate={setCurrentScreen}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}

        {currentScreen === 'forgot_password' && (
          <ForgotPasswordScreen
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'reset_password' && (
          <ResetPasswordScreen
            onNavigate={setCurrentScreen}
            onAddToast={addToast}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'contact' && (
          <ContactScreen
            onNavigate={setCurrentScreen}
            onAddToast={addToast}
          />
        )}

        {currentScreen === 'faq' && (
          <FaqScreen
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'privacy' && (
          <PrivacyPolicyScreen
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'terms' && (
          <TermsScreen
            onNavigate={setCurrentScreen}
          />
        )}

        {currentScreen === 'not_found' && (
          <NotFoundScreen
            onNavigate={setCurrentScreen}
          />
        )}
      </main>

      {/* Global Brand Footer */}
      {!isAuthScreen && (
        <Footer
          onNavigate={setCurrentScreen}
          onCategorySelect={handleSelectCategory}
          onAddToast={addToast}
        />
      )}

      {/* Product Quick View Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewFullDetails={handleSelectProduct}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onNavigateToCart={() => setCurrentScreen('cart')}
        onNavigateToCheckout={() => setCurrentScreen('checkout')}
      />

      {/* Interactive Feedback Toasts */}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
      />
    </div>
  );
}
