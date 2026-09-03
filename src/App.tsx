import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { StylistModal } from './components/StylistModal';
import { HomeView } from './views/HomeView';
import { NewArrivalsView } from './views/NewArrivalsView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { CollectionsView } from './views/CollectionsView';

const GlobalModals: React.FC = () => {
  const {
    isOrderLookupOpen,
    setIsOrderLookupOpen,
    lookupInitialQuery,
    isStylistOpen,
    setIsStylistOpen,
    stylistProduct,
  } = useCart();

  return (
    <>
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <SizeGuideModal />
      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
        initialQuery={lookupInitialQuery}
      />
      <StylistModal
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        defaultProductId={stylistProduct.id}
        defaultProductName={stylistProduct.name}
      />
    </>
  );
};

const MainContent: React.FC = () => {
  const { activeTab } = useCart();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'new-arrivals' && <NewArrivalsView />}
        {activeTab === 'shop' && <NewArrivalsView />}
        {activeTab === 'product-detail' && <ProductDetailView />}
        {activeTab === 'checkout' && <CheckoutView />}
        {activeTab === 'collections' && <CollectionsView />}
      </div>
    </main>
  );
};

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#fdf8f8] text-[#1c1b1b] flex flex-col font-sans">
        <Header />
        <div className="flex-1">
          <MainContent />
        </div>
        <Footer />
        
        {/* Global Drawers & Modals */}
        <GlobalModals />
      </div>
    </CartProvider>
  );
}
