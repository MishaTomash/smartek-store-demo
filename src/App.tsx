import { useState } from "react";
import { Hero } from "./components/sections/Hero/Hero";
import { CatalogSection } from "./components/sections/CatalogSection/CatalogSection";
import { TrustSection } from "./components/sections/TrustSection/TrustSection";
import { Footer } from "./components/Footer/Footer";
import { GlobalModals } from "./components/GlobalModals/GlobalModals";
import type { ModalType } from "./types/ModalType";
import { Header } from "./components/Header/Header";
import  { ProductModal } from "./components/UI/ProductModal/ProductModal";
import type { Product } from "./types/Product";

function App() {
  const [activeModal, setactiveModal] = useState<ModalType>(null);
  const closeModal = () => setactiveModal(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div>
      <Header setActiveModal={setactiveModal}></Header>
      <main style={{ paddingTop: '80px' }}>
        <Hero></Hero>
        <CatalogSection onProductClick={setSelectedProduct} />
        <TrustSection setActiveModal={setactiveModal} />
      </main>
      <Footer setActiveModal={setactiveModal} />

      <GlobalModals activeModal={activeModal} closeModal={closeModal} />

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  )
}

export default App
