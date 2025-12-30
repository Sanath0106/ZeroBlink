import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '50px', fontSize: '3rem' }}>
        <span className="text-accent">/</span> ESTABLISH CONNECTION
      </h2>
      
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid var(--accent-dim)',
        padding: '40px',
        backgroundColor: 'rgba(5, 5, 5, 0.9)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* SYN Packet Animation Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '50%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)',
          animation: 'scan 2s linear infinite'
        }}></div>

        <h3 style={{ fontSize: '2rem', marginBottom: '20px', color: '#fff' }}>
          San<span className="text-accent">SYN</span>
        </h3>
        
        <div style={{ marginBottom: '30px' }}>
          <p style={{ color: '#888', marginBottom: '10px' }}>[ TEAM LEADER ]</p>
          <p style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>
            Initiating 3-way handshake...
          </p>
        </div>

        <div style={{
          border: '1px dashed var(--secondary-color)',
          padding: '20px',
          display: 'inline-block',
          marginBottom: '20px'
        }} >
          <a href="https://ctftime.org/team/415603" target="_blank" rel="noopener noreferrer" style={{ 
            fontSize: '1.5rem', 
            color: 'var(--text-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
               <path d="M4 2H20V12H14L12 14H4V2Z" fill="var(--accent-color)"/>
               <path d="M4 14V22" stroke="var(--accent-color)" strokeWidth="2"/>
             </svg> CTF TIME PROFILE
          </a>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--accent-dim)' }}>
          <span className="blink">_</span> WAITING FOR ACK
        </div>
      </div>
      
      <style>
        {`
          @keyframes scan {
            0% { left: -100%; }
            100% { left: 200%; }
          }
        `}
      </style>
    </section>
  );
};

export default Contact;
