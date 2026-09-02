import { FiStar, FiCheck, FiTruck, FiShield } from "react-icons/fi";
import styles from './TrustSection.module.css';
import type { ModalType } from "../../../types/ModalType";

interface TrustSectionProps {
    setActiveModal: (modal: ModalType) => void;
}

export const TrustSection = ({ setActiveModal }: TrustSectionProps) => {
    return (
        <section className={styles.trustSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>ЧОМУ НАМ ДОВІРЯЮТЬ</h2>

                <div className={styles.grid}>
                    <div className={styles.topRow}>
                        <button className={styles.card} onClick={() => setActiveModal('reviews')}>
                            <div className={styles.iconCircle}><FiStar /></div>
                            <span className={styles.featureTitle}>Відгуки</span>
                        </button>
                        <button className={styles.card} onClick={() => setActiveModal('availability')}>
                            <div className={styles.iconCircle}><FiCheck /></div>
                            <span className={styles.featureTitle}>Наявність</span>
                        </button>
                        <button className={styles.card} onClick={() => setActiveModal('delivery')}>
                            <div className={styles.iconCircle}><FiTruck /></div>
                            <span className={styles.featureTitle}>Доставка</span>
                        </button>
                        <button className={`${styles.card} ${styles.wideCard}`} onClick={() => setActiveModal('warranty')}>
                            <div className={styles.iconCircle}><FiShield /></div>
                            <span className={styles.featureTitle}>Гарантія</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}