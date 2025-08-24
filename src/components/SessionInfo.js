import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const SessionContainer = styled.div`
  position: fixed;
  top: 80px;
  left: 20px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
`;

const InfoItem = styled.div`
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

const DebugInfo = styled.div`
  margin: 5px 0;
  padding: 5px;
  background: rgba(255, 0, 0, 0.2);
  border-radius: 5px;
  border: 1px solid #ff0000;
`;

const SessionInfo = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const session = localStorage.getItem('userSession');
      if (session) {
        try {
          setSessionData(JSON.parse(session));
        } catch (error) {
          console.error('Error parsing session data:', error);
        }
      }
    }
  }, [isAuthenticated]);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Show debug info even when not authenticated
  return (
    <SessionContainer>
      <Title>
        🔍 Session Debug
        <ToggleButton onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'}
        </ToggleButton>
      </Title>
      
      {isVisible && (
        <>
          <DebugInfo>
            <Label>Auth State:</Label>
            <Value>{isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}</Value>
          </DebugInfo>
          
          <DebugInfo>
            <Label>Loading:</Label>
            <Value>{loading ? '⏳ Loading...' : '✅ Loaded'}</Value>
          </DebugInfo>
          
          <DebugInfo>
            <Label>User:</Label>
            <Value>{user ? `👤 ${user.username} (${user.email})` : '❌ No User'}</Value>
          </DebugInfo>
          
          <DebugInfo>
            <Label>LocalStorage:</Label>
            <Value>{localStorage.getItem('userSession') ? '✅ Has Session' : '❌ No Session'}</Value>
          </DebugInfo>
          
          {isAuthenticated && sessionData && (
            <>
              <InfoItem>
                <Label>User ID:</Label>
                <Value>{sessionData.userId}</Value>
              </InfoItem>
              
              <InfoItem>
                <Label>Username:</Label>
                <Value>{sessionData.user?.username}</Value>
              </InfoItem>
              
              <InfoItem>
                <Label>Email:</Label>
                <Value>{sessionData.user?.email}</Value>
              </InfoItem>
              
              <InfoItem>
                <Label>Login Time:</Label>
                <Value>{formatTime(sessionData.loginTime)}</Value>
              </InfoItem>
              
              <InfoItem>
                <Label>Last Activity:</Label>
                <Value>{formatTime(sessionData.lastActivity)}</Value>
              </InfoItem>
              
              <InfoItem>
                <Label>Session Age:</Label>
                <Value>{getSessionAge()}</Value>
              </InfoItem>
              
              <InfoItem>
                <Label>Time Until Expiry:</Label>
                <Value>{getTimeUntilExpiry()}</Value>
              </InfoItem>
              
              <InfoItem>
                <Label>Storage Method:</Label>
                <Value>localStorage</Value>
              </InfoItem>
            </>
          )}
        </>
      )}
    </SessionContainer>
  );

  function formatTime(isoString) {
    try {
      return new Date(isoString).toLocaleString();
    } catch (error) {
      return 'Invalid date';
    }
  }

  function getSessionAge() {
    try {
      const loginTime = new Date(sessionData.loginTime);
      const now = new Date();
      const age = now - loginTime;
      const hours = Math.floor(age / (1000 * 60 * 60));
      const minutes = Math.floor((age % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } catch (error) {
      return 'Unknown';
    }
  }

  function getTimeUntilExpiry() {
    try {
      const loginTime = new Date(sessionData.loginTime);
      const now = new Date();
      const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
      const timeLeft = maxSessionAge - (now - loginTime);
      
      if (timeLeft <= 0) {
        return 'Expired';
      }
      
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } catch (error) {
      return 'Unknown';
    }
  }
};

export default SessionInfo; 