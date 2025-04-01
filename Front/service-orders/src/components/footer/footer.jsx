import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_title">
        <h3>Lucas Bareli</h3>
      </div>
      <div className="footer_links">
        <a href="/">Home</a>
        <a href="/privacy-policy">Política de Privacidade</a>
        <a href="/terms-of-service">Termos de Serviço</a>
      </div>
      <div className="footer_copy">
        &copy; {new Date().getFullYear()} Lucas Bareli. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
