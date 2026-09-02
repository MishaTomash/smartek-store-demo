import { FaInstagram, FaTiktok, FaTelegramPlane } from "react-icons/fa";
import styles from "./Footer.module.css";
import type { ModalType } from "../../types/ModalType";

interface Footerprops {
  setActiveModal: (modal: ModalType) => void;
}

export const Footer = ({ setActiveModal }: Footerprops) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.leftCol}>
            <div className={styles.logo}>
              <span className={styles.logoText}>TechShop</span>
            </div>

            <p className={styles.description}>
              Оригінальні смартфони Б/У. Перевірені вручну, гарантія 14 днів,
              відправка по Україні щодня.
            </p>

            <div className={styles.socialsBlock}>
              <h4 className={styles.blockTitle}>МИ В СОЦМЕРЕЖАХ</h4>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialBtn}>
                  <FaInstagram />
                </a>
                <a href="#" className={styles.socialBtn}>
                  <FaTiktok />
                </a>
                <a href="#" className={styles.socialBtn}>
                  <FaTelegramPlane />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <h4 className={styles.blockTitle}>КОНТАКТИ</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="tel:+380000000000">+38 000 000 00 00</a>
              </li>
              <li
                onClick={() => {
                  setActiveModal("contact");
                }}
                className={styles.linkUnderline}
              >
                Залишити заявку
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomRow}>
          <span className={styles.copyright}>
            © {currentYear} TechShop Demo
          </span>
        </div>
      </div>
    </footer>
  );
};
