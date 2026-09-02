import type { Product } from '../../../types/Product';
import { API_URL } from '../../../config/api';
import styles from './ProductCart.module.css';

interface ProductCartProps {
    product: Product;
}

const conditionMap = {
    excellent: { text: 'Ідеальний', class: 'conditionExcellent' as const },
    good: { text: 'Хороший', class: 'conditionGood' as const },
    fair: { text: 'Задовільний', class: 'conditionFair' as const },
};

const getBatteryIcon = (health: number) => (health >= 70 ? '🔋' : '🪫');

export const ProductCart = ({ product }: ProductCartProps) => {
    const condition = conditionMap[product.condition];
    const coverImage = product.images[0]
        ? `${API_URL}/uploads/${product.images[0]}`
        : null;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.warranty}>{product.warranty}</div>
                <div className={`${styles.availability} ${styles[product.availability]}`}>
                    <span className={styles.dot}>●</span>
                    {product.availability === 'in_stock' ? 'в наявності' : 'немає в наявності'}
                </div>
            </div>

            <div className={styles.imagePlaceholder}>
                {coverImage ? (
                    <img src={coverImage} alt={product.model} className={styles.image} />
                ) : (
                    <div className={styles.imagePlaceholderBase}>📱</div>
                )}
            </div>

            <div className={styles.mainInfo}>
                <h3 className={styles.modelTitle}>{product.model}</h3>
                <p className={styles.specs}>{product.storage} ГБ · {product.color}</p>
            </div>

            <div className={styles.statusRow}>
                <div className={`${styles.condition} ${styles[condition.class]}`}>
                    {condition.text}
                </div>
                <div className={styles.battery}>
                    {getBatteryIcon(product.batteryHealth)} {product.batteryHealth}%
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.price}>{product.price.toLocaleString('uk-UA')} ₴</div>
                <span className={styles.detailsLink}>Деталі →</span>
            </div>
        </div>
    );
};