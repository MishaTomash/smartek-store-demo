import { useState } from "react";
import { Button } from "../UI/Button/Button";
import styles from "./Header.module.css";
import { FaInstagram, FaTiktok, FaTelegramPlane } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import type { ModalType } from "../../types/ModalType";

interface HeaderProps {
  setActiveModal: (modal: ModalType) => void;
}
export const Header = ({ setActiveModal }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToCatalog = () => {
    setIsMenuOpen(false);
    const catalogElement = document.getElementById("catalog");
    if (catalogElement) {
      const offset = 100;
      const elementPosition = catalogElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const openModal = (modal: ModalType) => {
    setIsMenuOpen(false);
    setActiveModal(modal);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>TechShop</span>
        </div>

        <nav className={styles.navigation}>
          <button onClick={scrollToCatalog} className={styles.navList}>
            Каталог
          </button>
          <button
            onClick={() => openModal("warranty")}
            className={styles.navList}
          >
            Гарантія
          </button>
          <button
            onClick={() => openModal("delivery")}
            className={styles.navList}
          >
            Доставка
          </button>
        </nav>

        <div className={styles.actions}>
          <div className={styles.socials}>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <FaTelegramPlane />
            </a>
          </div>
          <Button
            className={styles.contactBtn}
            onClick={() => openModal("contact")}
          >
            Написати менеджеру
          </Button>

          <button
            className={styles.burgerBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <button onClick={scrollToCatalog} className={styles.mobileNavList}>
            Каталог
          </button>
          <button
            onClick={() => openModal("warranty")}
            className={styles.mobileNavList}
          >
            Гарантія
          </button>
          <button
            onClick={() => openModal("delivery")}
            className={styles.mobileNavList}
          >
            Доставка
          </button>

          <div className={styles.mobileSocials}>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <FaTiktok />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <FaTelegramPlane />
            </a>
          </div>

          <Button
            className={styles.contactBtn}
            onClick={() => openModal("contact")}
          >
            Написати менеджеру
          </Button>
        </div>
      )}
    </>
  );
};
