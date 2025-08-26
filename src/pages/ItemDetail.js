import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRating } from '../context/RatingContext';
import RatingComponent from '../components/RatingComponent';
import ProductRatingSummary from '../components/ProductRatingSummary';

const DetailPage = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const HeroImage = styled.div`
  height: 60vh;
  background: ${props => `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props.image})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: end;
  position: relative;
`;

const HeroContent = styled.div`
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 3rem 0 2rem;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LocationTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: #2c3e50;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: white;
    transform: translateY(-2px);
  }
`;

const ContentSection = styled.section`
  padding: 4rem 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 2rem;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const CTASection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem;
  border-radius: 15px;
  text-align: center;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const CTAButton = styled.button`
  background: white;
  color: #667eea;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #667eea;
`;

const ItemDetail = () => {
  const { id } = useParams();
  const { refreshTrigger } = useRating();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Mock data untuk detail item
    const mockData = {
      1: {
        id: 1,
        name: "Borobudur Temple",
        description: "Candi Borobudur adalah candi Buddha terbesar di dunia dan salah satu monumen Buddha terbesar di dunia. Candi ini dibangun pada abad ke-8 dan ke-9 pada masa pemerintahan dinasti Syailendra. Borobudur memiliki arsitektur yang menakjubkan dengan relief yang menceritakan kehidupan Buddha dan ajaran-ajarannya.",
        image: "https://images.unsplash.com/photo-1555400961-f7be474d1c04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        location: "Yogyakarta",
        highlights: [
          "Situs Warisan Dunia UNESCO",
          "Candi Buddha terbesar di dunia",
          "2,672 panel relief",
          "504 arca Buddha",
          "Sunrise viewing yang spektakuler"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1555400961-f7be474d1c04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        bestTime: "April - Oktober",
        duration: "2-3 jam",
        difficulty: "Mudah"
      },
      2: {
        id: 2,
        name: "Raja Ampat",
        description: "Raja Ampat atau Empat Raja adalah kepulauan yang berlokasi di barat bagian Kepala Burung Papua. Secara administrasi, gugusan kepulauan ini berada di bawah Kabupaten Raja Ampat, Provinsi Papua Barat. Raja Ampat dikenal sebagai surga bawah laut dengan keanekaragaman hayati laut terkaya di dunia.",
        image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        location: "Papua Barat",
        highlights: [
          "75% spesies karang dunia",
          "1,300+ spesies ikan",
          "Manta ray dan hiu paus",
          "Diving terbaik di dunia",
          "Pulau Piaynemo yang ikonik"
        ],
        gallery: [
          "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        bestTime: "Oktober - April",
        duration: "3-7 hari",
        difficulty: "Menengah"
      }
    };

    // Simulate API call
    setTimeout(() => {
      setItem(mockData[id] || mockData[1]);
      setLoading(false);
    }, 1000);
  }, [id]);



  if (loading) {
    return (
      <DetailPage>
        <LoadingSpinner>
          Memuat informasi destinasi... 🌴
        </LoadingSpinner>
      </DetailPage>
    );
  }

  if (!item) {
    return (
      <DetailPage>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Destinasi tidak ditemukan</h2>
            <Link to="/">Kembali ke Beranda</Link>
          </div>
        </Container>
      </DetailPage>
    );
  }

  return (
    <DetailPage>
      <HeroImage image={item.image}>
        <BackButton to="/">
          ← Kembali
        </BackButton>
        <HeroContent>
          <Container>
            <LocationTag>
              📍 {item.location}
            </LocationTag>
            <Title>{item.name}</Title>
          </Container>
        </HeroContent>
      </HeroImage>

      <ContentSection>
        <Container>
          <ContentGrid>
            <MainContent>
              <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>
                Tentang Destinasi Ini
              </h2>
              <Description>{item.description}</Description>
              
              <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
                🌟 Highlights
              </h3>
              <HighlightsList>
                {item.highlights.map((highlight, index) => (
                  <li key={index}>
                    ✓ {highlight}
                  </li>
                ))}
              </HighlightsList>

              <h3 style={{ color: '#2c3e50', marginBottom: '1rem', marginTop: '2rem' }}>
                📸 Galeri
              </h3>
              <ImageGallery>
                {item.gallery.map((img, index) => (
                  <GalleryImage key={index} src={img} alt={`${item.name} ${index + 1}`} />
                ))}
              </ImageGallery>
            </MainContent>

            <Sidebar>
              <InfoCard>
                <h3>ℹ️ Informasi Praktis</h3>
                <HighlightsList>
                  <li>🗓️ Waktu Terbaik: {item.bestTime}</li>
                  <li>⏱️ Durasi: {item.duration}</li>
                  <li>🎯 Tingkat Kesulitan: {item.difficulty}</li>
                </HighlightsList>
              </InfoCard>

              {/* Rating Summary */}
              <InfoCard>
                <h3>⭐ Rating & Ulasan</h3>
                <ProductRatingSummary 
                  productId={id} 
                  windowWidth={windowWidth}
                  refreshTrigger={refreshTrigger}
                />
              </InfoCard>

              <CTASection>
                <h3>Siap Berpetualang?</h3>
                <p>
                  Jangan lewatkan kesempatan untuk mengeksplorasi keindahan 
                  {item.name} yang menakjubkan!
                </p>
                <CTAButton>
                  Rencanakan Perjalanan 🗺️
                </CTAButton>
              </CTASection>
            </Sidebar>
          </ContentGrid>

          {/* Rating Section */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
            marginTop: '3rem',
            overflow: 'hidden'
          }}>
            {/* Rating Component */}
            <RatingComponent 
              productId={id}
              productName={item?.name || "Destinasi"}
            />
          </div>
        </Container>
      </ContentSection>
    </DetailPage>
  );
};

export default ItemDetail;
