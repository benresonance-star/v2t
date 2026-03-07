import React, { useState } from 'react';
import { MicButton } from './MicButton';
import { MicButtonState } from './MicButton.types';

export const MicButtonDemo: React.FC = () => {
  const [state, setState] = useState<MicButtonState>("idle");

  const toggleListening = () => {
    setState(prev => prev === "listening" ? "idle" : "listening");
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050505',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      padding: '20px',
      fontFamily: 'sans-serif',
      color: 'white'
    }}>
      <h1 style={{ fontWeight: 300, opacity: 0.8 }}>MicButton Demo</h1>
      
      <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '20px', opacity: 0.5, fontSize: '14px' }}>Idle / Interactive</p>
          <MicButton state="idle" onClick={() => console.log('Clicked')} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '20px', opacity: 0.5, fontSize: '14px' }}>Listening (Animated)</p>
          <MicButton state="listening" onClick={toggleListening} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '20px', opacity: 0.5, fontSize: '14px' }}>Disabled</p>
          <MicButton state="disabled" />
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <button 
          onClick={toggleListening}
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Toggle Listening State: {state === "listening" ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
};
