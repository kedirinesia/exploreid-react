import React from 'react';
import styled from 'styled-components';

const DevInfoContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 12px;
  max-width: 300px;
  z-index: 1001;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h4`
  margin: 0 0 10px 0;
  color: #4CAF50;
  font-size: 14px;
`;

const CredentialItem = styled.div`
  margin: 5px 0;
  padding: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
`;

const Label = styled.span`
  color: #FFD700;
  font-weight: bold;
`;

const Value = styled.span`
  color: #87CEEB;
  margin-left: 10px;
`;

const Note = styled.div`
  margin-top: 10px;
  padding: 8px;
  background: rgba(255, 165, 0, 0.2);
  border-radius: 5px;
  border-left: 3px solid #FFA500;
  font-size: 11px;
`;

const DevInfo = () => {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <DevInfoContainer>
      <Title>🧪 Development Mode</Title>
      
              <div style={{ marginBottom: '10px' }}>
          <strong>API Information:</strong>
        </div>
        
        <CredentialItem>
          <Label>Mode:</Label>
          <Value>Real API</Value>
        </CredentialItem>
        
        <CredentialItem>
          <Label>Backend:</Label>
          <Value>Google Apps Script</Value>
        </CredentialItem>
        
        <CredentialItem>
          <Label>Storage:</Label>
          <Value>localStorage</Value>
        </CredentialItem>
      
              <Note>
          <strong>Note:</strong> Using real Google Apps Script API. 
          All requests go directly to your backend.
        </Note>
        
        <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(156, 39, 176, 0.2)', borderRadius: '5px', border: '1px solid #9C27B0' }}>
          <strong style={{ color: '#9C27B0' }}>Debug: Authentication State Issue 🔍</strong>
          <div style={{ fontSize: '10px', marginTop: '5px', color: '#666' }}>
            • Profile click → Logout detected<br/>
            • Enhanced auth logging enabled<br/>
            • Session data debugging active<br/>
            • Check console for auth flow
          </div>
        </div>
        
        <div style={{ marginTop: '10px', padding: '8px', background: 'rgba(255, 165, 0, 0.2)', borderRadius: '5px', border: '1px solid #FFA500', fontSize: '10px' }}>
          <strong style={{ color: '#FFA500' }}>CORS Proxy Fallback:</strong><br/>
          • Primary: api.allorigins.win<br/>
          • Backup: cors.bridged.cc<br/>
          • Fallback: thingproxy.freeboard.io<br/>
          • Last: corsproxy.io
        </div>
    </DevInfoContainer>
  );
};

export default DevInfo; 