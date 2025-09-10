import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #3498db;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: #bdc3c7;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: #3498db;
        }
      }
    }
  }
  
  p {
    color: #bdc3c7;
    line-height: 1.6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(52, 152, 219, 0.1);
  border: 1px solid rgba(52, 152, 219, 0.3);
  border-radius: 50%;
  color: #3498db;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #3498db;
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  color: #bdc3c7;
  
  p {
    margin: 0.5rem 0;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>🇮🇩 Explore ID</h3>
          <p>
            Platform terbaik untuk mengeksplorasi keindahan Indonesia. 
            Temukan destinasi menakjubkan, budaya yang kaya, dan kuliner lezat 
            dari Sabang sampai Merauke.
          </p>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">📘</SocialLink>
            <SocialLink href="#" aria-label="Instagram">📷</SocialLink>
            <SocialLink href="#" aria-label="Twitter">🐦</SocialLink>
            <SocialLink href="#" aria-label="YouTube">📺</SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Eksplorasi</h3>
          <ul>
            <li><a href="/destinations">Destinasi Wisata</a></li>
            <li><a href="/local-guides">Local Guides</a></li>
            <li><a href="/food">Kuliner Nusantara</a></li>
            <li><a href="/events">Event & Festival</a></li>
            <li><a href="/adventure">Petualangan</a></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Informasi</h3>
          <ul>
            <li><a href="/about">Tentang Kami</a></li>
            <li><a href="/contact">Kontak</a></li>
            <li><a href="/help">Bantuan</a></li>
            <li><a href="/privacy">Kebijakan Privasi</a></li>
            <li><a href="/terms">Syarat & Ketentuan</a></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Hubungi Kami</h3>
          <ul>
            <li>📍 Jakarta, Indonesia</li>
            <li>📞 +62 21 1234 5678</li>
            <li>✉️ info@exploreid.com</li>
            <li>🕐 Senin - Jumat: 09:00 - 18:00</li>
          </ul>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; 2024 Explore ID. Semua hak dilindungi undang-undang.</p>
        <p>Dibuat dengan ❤️ untuk Indonesia</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
