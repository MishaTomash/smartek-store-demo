import { FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import { Modal } from '../UI/Modal/Modal';
import type { ModalType } from '../../types/ModalType';
import styles from './GlobalModals.module.css';

interface GlobalModalsProps {
    activeModal: ModalType;
    closeModal: () => void;
};

export const GlobalModals = ({ activeModal, closeModal }: GlobalModalsProps) => {
    return (<>
        <Modal isOpen={activeModal === "warranty"} onClose={closeModal} title="Гарантія">
            <p>Ми надаємо <strong>14 днів гарантії</strong> на всі вживані пристрої для повної перевірки працездатності.</p>
            <br />
            <p>Кожен iPhone перед продажем проходить ретельну діагностику за 30+ параметрами: перевіряється дисплей, камери, акумулятор, Face ID та всі внутрішні модулі. Ми гарантуємо, що ви отримаєте 100% оригінальний та справний пристрій.</p>
        </Modal>

        <Modal isOpen={activeModal === 'delivery'} onClose={closeModal} title="Доставка та оплата">
            <p>Відправляємо замовлення щодня через <strong>Нову Пошту</strong> по всій території України.</p>
            <br />
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Відправка накладеним платежем (оплата після огляду).</li>
                <li>Можливість повної оплати на реквізити IBAN.</li>
                <li>Пакуємо надійно, щоб пристрій приїхав у повній безпеці.</li>
            </ul>
        </Modal>

        <Modal isOpen={activeModal === 'reviews'} onClose={closeModal} title="Відгуки клієнтів">
            <p>Сотні задоволених клієнтів вже обрали нас!</p>
            <br />
            <p>Ми публікуємо реальні відгуки та відео розпакувань у нашому Instagram. Переходьте за посиланням нижче, щоб переконатися в нашій надійності.</p>
            <div className={styles.messengerButtons} style={{ marginTop: '20px' }}>
                <a href="https://www.instagram.com/smartek.ua?igsh=MTVobmhoOWMxODl0dw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className={`${styles.messBtn} ${styles.igBtn}`}>
                    <FaInstagram /> Дивитись відгуки в Instagram
                </a>
            </div>
        </Modal>

        <Modal isOpen={activeModal === 'contact'} onClose={closeModal} title="Зв'язок з нами">
            <div className={styles.contactModalContent}>
                <p className={styles.schedule}>
                    ⏳ <strong>Графік роботи менеджерів:</strong><br />
                    Щодня з 10:00 до 20:00.<br />
                    <span style={{ fontSize: '13px', color: '#7A756B' }}>Запити, залишені вночі, обробляються зранку в порядку черги.</span>
                </p>

                <div className={styles.faq}>
                    <h4>Часті запитання:</h4>
                    <ul>
                        <li><strong>Чи є торг?</strong> — Ціни фіксовані, але є подарунки за відгук.</li>
                        <li><strong>Чи можна обміняти (Trade-in)?</strong> — Так, ми оцінюємо ваш старий iPhone.</li>
                        <li><strong>Як замовити?</strong> — Напишіть нам у месенджер модель, яку обрали.</li>
                    </ul>
                </div>

                <div className={styles.messengerButtons}>
                    <a href="https://t.me/manager_smartek_ua" target="_blank" rel="noreferrer" className={`${styles.messBtn} ${styles.tgBtn}`}>
                        <FaTelegramPlane /> Написати в Telegram
                    </a>
                    <a href="https://www.instagram.com/smartek.ua?igsh=MTVobmhoOWMxODl0dw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className={`${styles.messBtn} ${styles.igBtn}`}>
                        <FaInstagram /> Написати в Instagram
                    </a>
                </div>
            </div>
        </Modal>
        
        <Modal isOpen={activeModal === 'availability'} onClose={closeModal} title="Наявність товару">
            <p>Всі iPhone, представлені в нашому каталозі, <strong>є в наявності</strong> та готові до відправки.</p>
            <br />
            <p>Асортимент оновлюється щодня. Якщо ви шукаєте конкретну модель, колір або обсяг пам'яті, якого зараз немає на вітрині — просто напишіть нашому менеджеру, і ми підберемо ідеальний пристрій під ваш запит!</p>
        </Modal>
    </>)
}