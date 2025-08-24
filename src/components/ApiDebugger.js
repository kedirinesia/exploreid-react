import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DebuggerContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 11px;
  max-width: 400px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1002;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Courier New', monospace;
`;

const Title = styled.h4`
  margin: 0 0 10px 0;
  color: #4CAF50;
  font-size: 12px;
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

const LogEntry = styled.div`
  margin: 5px 0;
  padding: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border-left: 3px solid #4CAF50;
`;

const LogEntryError = styled(LogEntry)`
  border-left-color: #f44336;
`;

const LogEntryWarning = styled(LogEntry)`
  border-left-color: #ff9800;
`;

const LogEntryInfo = styled(LogEntry)`
  border-left-color: #2196f3;
`;

const Timestamp = styled.span`
  color: #888;
  font-size: 9px;
`;

const ApiDebugger = () => {
  const [logs, setLogs] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [maxLogs, setMaxLogs] = useState(50);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Intercept console methods to capture API logs
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    const addLog = (level, ...args) => {
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      
      const logEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        level,
        message,
        fullArgs: args
      };

      setLogs(prev => {
        const newLogs = [logEntry, ...prev].slice(0, maxLogs);
        return newLogs;
      });
    };

    console.log = (...args) => {
      if (args.some(arg => typeof arg === 'string' && (arg.includes('🔗') || arg.includes('🧪') || arg.includes('Mock API')))) {
        addLog('info', ...args);
      }
      originalLog.apply(console, args);
    };

    console.warn = (...args) => {
      if (args.some(arg => typeof arg === 'string' && arg.includes('Mock API'))) {
        addLog('warning', ...args);
      }
      originalWarn.apply(console, args);
    };

    console.error = (...args) => {
      if (args.some(arg => typeof arg === 'string' && arg.includes('API'))) {
        addLog('error', ...args);
      }
      originalError.apply(console, args);
    };

    // Cleanup function
    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, [maxLogs]);

  const clearLogs = () => {
    setLogs([]);
  };

  const getLogEntryStyle = (level) => {
    switch (level) {
      case 'error':
        return LogEntryError;
      case 'warning':
        return LogEntryWarning;
      case 'info':
        return LogEntryInfo;
      default:
        return LogEntry;
    }
  };

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <DebuggerContainer>
      <Title>
        🔍 API Debugger
        <ToggleButton onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'}
        </ToggleButton>
      </Title>
      
      {isVisible && (
        <>
          <div style={{ marginBottom: '10px', fontSize: '10px' }}>
            <button 
              onClick={clearLogs}
              style={{ 
                background: '#f44336', 
                color: 'white', 
                border: 'none', 
                padding: '2px 6px', 
                borderRadius: '3px',
                fontSize: '9px',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
            <span style={{ marginLeft: '10px' }}>
              {logs.length} logs
            </span>
          </div>
          
          {logs.length === 0 ? (
            <div style={{ color: '#888', fontStyle: 'italic' }}>
              No API calls logged yet...
            </div>
          ) : (
            logs.map(log => {
              const LogComponent = getLogEntryStyle(log.level);
              return (
                <LogComponent key={log.id}>
                  <Timestamp>[{log.timestamp}]</Timestamp>
                  <div style={{ color: log.level === 'error' ? '#f44336' : log.level === 'warning' ? '#ff9800' : '#4CAF50' }}>
                    {log.level.toUpperCase()}
                  </div>
                  <div style={{ wordBreak: 'break-word' }}>
                    {log.message}
                  </div>
                </LogComponent>
              );
            })
          )}
        </>
      )}
    </DebuggerContainer>
  );
};

export default ApiDebugger; 