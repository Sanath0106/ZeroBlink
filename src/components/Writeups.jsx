import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Writeups = () => {
  // Check unlock state immediately before any rendering
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem('zb_unlocked') === 'true';
  });

  const [flagInput, setFlagInput] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // SHA-256 hash of ZB{s1l3nt_k1ll3rs}
  const CORRECT_HASH = 'e86c4a5223da3c91f73669d1f74427749cbf57f1b9ac96ca696b94f13df6d1ba';

  const fullText = '> INITIALIZING DECRYPTION PROTOCOLS... ERROR: KEY NOT FOUND.\n> SYSTEM LOCKED_';

  useEffect(() => {
    // Skip animations if already unlocked
    if (isUnlocked) return;

    // Typing animation
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Fake API call - flag hidden in Network tab!
    const fetchFakeData = async () => {
      try {
        await fetch('/api/v1/system/status', {
          method: 'GET',
          headers: {
            'X-API-Key': 'zeroblink_v1',
            'X-Request-ID': Math.random().toString(36).substring(7),
            Accept: 'application/json',
          },
        }).catch(() => {});
      } catch (err) {
        // Silent fail
      }
    };

    setTimeout(fetchFakeData, 1200);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [isUnlocked, fullText]);

  // SHA-256 hash function
  const sha256 = async (message) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChecking(true);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 800));

    const inputHash = await sha256(flagInput);

    if (inputHash === CORRECT_HASH) {
      setIsUnlocked(true);
      localStorage.setItem('zb_unlocked', 'true');
    } else {
      setError('ACCESS DENIED: INVALID KEY');
    }

    setIsChecking(false);
    setFlagInput('');
  };

  // LOCKED STATE - Flag Challenge
  if (!isUnlocked) {
    return (
      <section
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <div
          style={{
            border: '3px solid var(--alert-color)',
            padding: '50px 60px',
            maxWidth: '900px',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            boxShadow: '0 0 50px rgba(255, 0, 60, 0.3)',
            position: 'relative',
          }}
        >
          {/* Animated corner brackets */}
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              width: '30px',
              height: '30px',
              borderTop: '3px solid var(--accent-color)',
              borderLeft: '3px solid var(--accent-color)',
              animation: 'pulse 2s infinite',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '30px',
              height: '30px',
              borderTop: '3px solid var(--accent-color)',
              borderRight: '3px solid var(--accent-color)',
              animation: 'pulse 2s infinite',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              bottom: '-2px',
              left: '-2px',
              width: '30px',
              height: '30px',
              borderBottom: '3px solid var(--accent-color)',
              borderLeft: '3px solid var(--accent-color)',
              animation: 'pulse 2s infinite',
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '30px',
              height: '30px',
              borderBottom: '3px solid var(--accent-color)',
              borderRight: '3px solid var(--accent-color)',
              animation: 'pulse 2s infinite',
            }}
          ></div>

          <h1
            style={{
              color: 'var(--alert-color)',
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              marginBottom: '30px',
              textAlign: 'center',
              textShadow: '0 0 20px rgba(255, 0, 60, 0.5)',
              letterSpacing: '5px',
            }}
          >
            SYSTEM OFFLINE
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              color: '#00ff41',
              marginBottom: '30px',
              textAlign: 'left',
              minHeight: '200px',
              lineHeight: '1.8',
            }}
          >
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word', minHeight: '60px' }}>
              {typedText}
              {showCursor && typedText.length < fullText.length ? '█' : ''}
            </pre>
            <br />
            <p style={{ color: '#888', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', marginTop: '20px' }}>
              Our operatives are currently deployed. Mission logs will be uploaded upon their return.
            </p>
          </div>

          <div
            style={{
              borderTop: '2px dashed var(--secondary-color)',
              paddingTop: '30px',
              marginTop: '30px',
            }}
          >
            <p
              style={{
                color: 'var(--accent-color)',
                marginBottom: '20px',
                fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
              }}
            >
              &gt; ENTER ACCESS KEY TO UNLOCK:
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                placeholder="ZB{...}"
                disabled={isChecking}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: '#000',
                  border: '2px solid var(--accent-dim)',
                  color: 'var(--accent-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                  outline: 'none',
                  marginBottom: '20px',
                  boxShadow: 'inset 0 0 20px rgba(0, 255, 65, 0.1)',
                  transition: 'all 0.3s ease',
                }}
              />

              <button
                type="submit"
                disabled={isChecking || !flagInput}
                style={{
                  width: '100%',
                  padding: '20px',
                  backgroundColor: 'transparent',
                  border: '2px solid var(--accent-color)',
                  color: 'var(--accent-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                  cursor: isChecking || !flagInput ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontWeight: 'bold',
                  opacity: isChecking || !flagInput ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
                }}
                className={!isChecking && flagInput ? 'glitch-hover' : ''}
              >
                {isChecking ? '⟳ VERIFYING...' : '▶ AUTHENTICATE'}
              </button>
            </form>

            {error && (
              <div
                style={{
                  marginTop: '25px',
                  padding: '20px',
                  backgroundColor: 'rgba(255, 0, 60, 0.15)',
                  border: '2px solid var(--alert-color)',
                  color: 'var(--alert-color)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                ⚠ {error}
              </div>
            )}

            <div
              style={{
                marginTop: '30px',
                fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                color: '#666',
                textAlign: 'center',
                padding: '15px',
                border: '1px dashed #333',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              💡 <span style={{ color: '#888' }}>Hint: Monitor network traffic for system diagnostics...</span>
            </div>
          </div>
        </div>

        <Link
          to="/"
          style={{
            marginTop: '40px',
            padding: '15px 40px',
            border: '2px solid var(--accent-dim)',
            color: 'var(--accent-color)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            transition: 'all 0.3s ease',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
          className="glitch-hover"
        >
          ← RETURN TO BASE
        </Link>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </section>
    );
  }

  // UNLOCKED STATE - Events Table
  return (
    <section className="container" style={{ padding: '50px 20px', minHeight: '80vh' }}>
      <div
        style={{
          textAlign: 'center',
          marginBottom: '50px',
          animation: 'fadeIn 1s ease',
        }}
      >
        <h1
          style={{
            color: 'var(--accent-color)',
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            marginBottom: '10px',
          }}
        >
          ACCESS GRANTED
        </h1>
        <p style={{ color: '#888', fontFamily: 'var(--font-mono)' }}>
          &gt; MISSION ARCHIVES UNLOCKED<span className="blink">_</span>
        </p>
      </div>

      {/* Events Table */}
      <div style={{ marginBottom: '60px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '30px',
            borderBottom: '2px solid var(--accent-dim)',
            paddingBottom: '10px',
          }}
        >
          <span className="text-accent">/</span> EVENTS
        </h2>

        <div
          style={{
            border: '1px solid var(--accent-dim)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 80px 180px',
              padding: '15px 20px',
              backgroundColor: 'rgba(0, 255, 65, 0.1)',
              borderBottom: '1px solid var(--accent-dim)',
              fontWeight: 'bold',
              color: 'var(--accent-color)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
            }}
          >
            <span>EVENT</span>
            <span style={{ textAlign: 'center' }}>YEAR</span>
            <span style={{ textAlign: 'right' }}>RANK</span>
          </div>

          {/* Table Rows */}
          <EventRow event="DecodeX" year="2025" rank="12th / 30" />
          <EventRow event="CyberTEA 3.0 CTF" year="2025" rank="8th / 100" />
          <EventRow event="CryoVault PES" year="2025" rank="46th / 300" />
          <EventRow event="Shaastra CTF - IIT Madras" year="2025" rank="27th / 367" />
          <EventRow event="University CTF 2025: Tinsel Trouble" year="2025" rank="100th (Top 3 India)" />
          <EventRow event="ISEA ISAP CTF - IIT Madras" year="2025" rank="59th / 500" />
          <EventRow event="ASIS CTF Finals" year="2025" rank="100th" />
          <EventRow event="BackdoorCTF" year="2025" rank="146th" />
          <EventRow event="CyKor CTF" year="2025" rank="79th" />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

const EventRow = ({ event, year, rank }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 80px 180px',
      padding: '15px 20px',
      borderBottom: '1px solid #222',
      fontFamily: 'var(--font-mono)',
      fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
    }}
  >
    <span style={{ color: '#fff' }}>{event}</span>
    <span style={{ textAlign: 'center', color: '#888' }}>{year}</span>
    <span style={{ textAlign: 'right', color: 'var(--accent-color)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{rank}</span>
  </div>
);

export default Writeups;
