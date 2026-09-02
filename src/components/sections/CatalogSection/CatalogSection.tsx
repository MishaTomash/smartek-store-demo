import { useState, useEffect } from "react";
import { ProductCart } from "../../UI/ProductCart/ProductCart";
import type { Product } from "../../../types/Product";
import { API_URL } from "../../../config/api";
import styles from './CatalogSection.module.css';

interface CatalogSectionProps {
  onProductClick: (product: Product) => void;
}

const generationFilters = ['Всі', 'SE', '6', '6S', '7', '8', 'X', 'XR', 'XS', '11', '12', '13', '14', '15', '16'];

export const CatalogSection = ({ onProductClick }: CatalogSectionProps) => {
  const [activeFilter, setActiveFilter] = useState('Всі');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const query = activeFilter !== 'Всі' ? `?generation=${encodeURIComponent(activeFilter)}` : '';
        const response = await fetch(`${API_URL}/api/products${query}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Не вдалося завантажити товари');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [activeFilter]);

  return (
    <section id="catalog" className={styles.catalogSection}>
      <div className={styles.container}>
        <div className={styles.filterBar}>
          {generationFilters.map(filter => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilter : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className={styles.productGrid}>
          {isLoading && <p className={styles.emptyState}>Завантаження...</p>}

          {!isLoading && error && (
            <p className={styles.emptyState}>Помилка: {error}</p>
          )}

          {!isLoading && !error && products.length === 0 && (
            <p className={styles.emptyState}>Немає товарів за цим фільтром</p>
          )}

          {!isLoading && !error && products.map((product) => (
            <div
              key={product._id}
              onClick={() => onProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <ProductCart product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};