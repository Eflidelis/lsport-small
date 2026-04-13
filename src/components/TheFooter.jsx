import React from "react";
import { Link } from "react-router-dom";
import "./TheFooter.scss";

import logo2 from "../assets/logo2.png";

const VK_URL = "https://m.vk.com/lsport_net";
const TG_URL = "https://t.me/business_lsport";

const TheFooter = () => {
  return (
    <footer className="footer">
      {/* ФУТЕР ТЕПЕРЬ ВНУТРИ КОНТЕЙНЕРА КАК ВСЕ БЛОКИ */}
      <div className="container">
        <div className="footer__content">
          {/* Верх */}
          <div className="footer__top">
            <div className="footer__brand">
              <img src={logo2} alt="LSport" className="footer__logo" />
              <span className="footer__brandName">LSport</span>
            </div>

            <div className="footer__socials">
              <a
                href={VK_URL}
                target="_blank"
                rel="noreferrer"
                className="footer__socialBtn"
                aria-label="VK"
                title="VK"
              >
                VK
              </a>

              <a
                href={TG_URL}
                target="_blank"
                rel="noreferrer"
                className="footer__socialBtn"
                aria-label="Telegram"
                title="Telegram"
              >
                TG
              </a>
            </div>
          </div>

          <div className="footer__divider" />

          {/* Низ */}
          <div className="footer__bottom">
            <div className="footer__card">
              <div className="footer__cardText">текст-заглушка</div>
              <div className="footer__copyright">
                © 2025 LSport. Все права защищены
              </div>
            </div>

            <div className="footer__col">
              <div className="footer__title">О нас</div>
              <Link to="/about-company" className="footer__link">О компании</Link>
              <Link to="/clients" className="footer__link">Клиенты</Link>
              <Link to="/it-accreditation" className="footer__link">IT-аккредитация</Link>
            </div>

            <div className="footer__col">
              <div className="footer__title">Документы</div>
              <Link to="/offer" className="footer__link">Оферта</Link>
              <Link to="/privacy-policy" className="footer__link">Политика обработки ПД</Link>
              <Link to="/cookie-policy" className="footer__link">Политика cookie</Link>
            </div>

            <div className="footer__col">
              <div className="footer__title">Другое</div>
              <Link to="/knowledge-base" className="footer__link">База знаний</Link>
              <Link to="/api-docs" className="footer__link">Документация API</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TheFooter;
