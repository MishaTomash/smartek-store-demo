import { Button } from '../../UI/Button/Button';
import styles from './Hero.module.css';
import { IphoneModel } from '../../3D/IphoneModel';

export const Hero = () => {
    return (
        <section className={styles.hero}>

            <div className={styles.textContent}>

                <div className={styles.topBadge}>
                    <span className={styles.greenDot}>●</span>
                    Перевірені iPhone · Гарантія 14 днів
                </div>


                <h1 className={styles.title}>
                    Твій новий
                    <br />
                    <span className={styles.accent}>
                        iPhone
                    </span> вже тут
                </h1>


                <p className={styles.description}>
                    Оригінальні iPhone б/у з перевіркою
                    стану, акумулятора та всіх функцій.
                </p>


                <div className={styles.stats}>
                    <div>
                        <strong>100%</strong>
                        <span>оригінал</span>
                    </div>

                    <div>
                        <strong>14 днів</strong>
                        <span>гарантія</span>
                    </div>

                    <div>
                        <strong>24/7</strong>
                        <span>підтримка</span>
                    </div>
                </div>


                <div className={styles.actions}>
                    <Button>
                        Переглянути каталог
                    </Button>

                    
                </div>

            </div>


            <div className={styles.modelContainer}>

                <div className={styles.phoneGlow}></div>

                <IphoneModel />

                <div className={styles.modelLabel}>
                    iPhone 15 pro max
                </div>

            </div>

        </section>
    )
}