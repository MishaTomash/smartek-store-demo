import { useState, useEffect } from 'react';
import { FiX, FiArrowLeft } from 'react-icons/fi';
import type { Product } from '../../../types/Product';
import { API_URL } from '../../../config/api';
import styles from './ProductModal.module.css';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}
export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [view, setView] = useState<'details' | 'checkout' | 'success'>('details');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '', phone: '', city: '', postOffice: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setView('details');
      setActiveImageIndex(0);
      setFormData({ name: '', phone: '', city: '', postOffice: '' });
      setSubmitError(null);
    }
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [product]);
  if (!product) return null;

  const imageUrls = product.images.map((key) => `${API_URL}/uploads/${key}`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          customer: formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Не вдалося оформити замовлення');
      }

      setView('success');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Сталася помилка');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

        <div className={styles.header}>
          {view === 'checkout' ? (
            <button className={styles.backBtn} onClick={() => setView('details')}>
              <FiArrowLeft /> Назад
            </button>
          ) : (
            <h3 className={styles.title}>{product.model}</h3>
          )}
          <button className={styles.closeBtn} onClick={onClose}><FiX /></button>
        </div>

        <div className={styles.body}>

          {view === 'details' && (
            <div className={styles.detailsView}>
              <div className={styles.gallery}>
                <div className={styles.mainImage}>
                  {imageUrls.length > 0 ? (
                    <img
                      src={imageUrls[activeImageIndex]}
                      alt={product.model}
                      className={styles.mainImageImg}
                    />
                  ) : (
                    <div className={styles.mainImagePlaceholder}>Немає фото</div>
                  )}
                </div>

                {imageUrls.length > 1 && (
                  <div className={styles.thumbnails}>
                    {imageUrls.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt=""
                        onClick={() => setActiveImageIndex(i)}
                        className={`${styles.thumbnail} ${i === activeImageIndex ? styles.thumbnailActive : ''}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.info}>
                <div className={styles.specs}>
                  <p><span>Пам'ять:</span> {product.storage} ГБ</p>
                  <p><span>Акумулятор:</span> {product.batteryHealth}%</p>
                  <p><span>Колір:</span> {product.color}</p>
                  <p><span>Стан:</span> {product.condition === 'excellent' ? 'Ідеальний' : 'Хороший'}</p>
                </div>
                <div className={styles.priceBlock}>
                  <span className={styles.price}>{product.price} ₴</span>
                  <button className={styles.orderBtn} onClick={() => setView('checkout')}>
                    Замовити
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === 'checkout' && (
            <form className={styles.checkoutForm} onSubmit={handleSubmit}>
              <h4 className={styles.formTitle}>Оформлення замовлення</h4>
              <div className={styles.orderSummary}>
                <span>{product.model}</span>
                <span>{product.price} ₴</span>
              </div>

              <div className={styles.inputGroup}>
                <label>ПІБ</label>
                <input required type="text" name="name" placeholder="Іванов Іван Іванович" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Номер телефону</label>
                <input required type="tel" name="phone" placeholder="+380" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Місто</label>
                <input required type="text" name="city" placeholder="Київ" value={formData.city} onChange={handleInputChange} />
              </div>
              <div className={styles.inputGroup}>
                <label>Відділення Нової Пошти</label>
                <input required type="text" name="postOffice" placeholder="Відділення №1" value={formData.postOffice} onChange={handleInputChange} />
              </div>

              {submitError && <p style={{ color: 'red' }}>{submitError}</p>}

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Відправка...' : 'Відправити замовлення'}
              </button>
            </form>
          )}

          {view === 'success' && (
            <div className={styles.detailsView}>
              <p>Дякуємо! Ваше замовлення прийнято, скоро з вами зв'яжуться.</p>
              <button className={styles.submitBtn} onClick={onClose}>Закрити</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};