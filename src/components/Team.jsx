import sansynImg from '../assets/sansyn.png';
import detectiveImg from '../assets/detective.png';
import npmImg from '../assets/npm.png';
import ac3Img from '../assets/AC3@0b10111.png';
import cheriImg from '../assets/cheri.png';

const WantedCard = ({ name, role, image, bounty, isRoot, isRed }) => (
  <div
    style={{
      border: `2px solid ${isRoot || isRed ? 'var(--alert-color)' : 'var(--accent-dim)'}`,
      padding: '15px',
      margin: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '300px',
      maxWidth: '100%',
      height: '100%',
      position: 'relative',
      boxShadow: isRoot || isRed ? '0 0 20px rgba(255, 0, 60, 0.3)' : 'none',
      transition: 'all 0.3s ease',
    }}
    className="wanted-card"
  >
    <div
      style={{
        position: 'absolute',
        top: '-15px',
        background: '#000',
        padding: '0 10px',
        color: isRoot || isRed ? 'var(--alert-color)' : 'var(--accent-color)',
        fontWeight: 'bold',
        letterSpacing: '2px',
        border: `1px solid ${isRoot || isRed ? 'var(--alert-color)' : 'var(--accent-dim)'}`,
      }}
    >
      {isRoot || isRed ? 'MOST WANTED' : 'WANTED'}
    </div>

    <div
      style={{
        width: '100%',
        aspectRatio: '1/1',
        overflow: 'hidden',
        marginBottom: '15px',
        borderBottom: '1px dashed #333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)' }}
      />
    </div>

    <h3
      style={{
        fontSize: '1.8rem',
        color: '#fff',
        marginBottom: '5px',
        textTransform: 'uppercase',
      }}
    >
      {name}
    </h3>

    {bounty && (
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          color: isRoot || isRed ? 'var(--alert-color)' : 'var(--accent-color)',
          fontSize: '1.2rem',
          borderTop: '1px solid #333',
          width: '100%',
          paddingTop: '10px',
          marginTop: '5px',
        }}
      >
        BOUNTY: {bounty}
      </div>
    )}
  </div>
);

const Team = () => {
  return (
    <section id="team" className="container" style={{ padding: '50px 20px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '50px', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
        <span className="text-accent">/</span> TARGET_LIST
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        {/* First Row - Sansyn and Detective M */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
            alignItems: 'stretch',
          }}
        >
          <WantedCard name="SANSYN" role="ROOT ACCESS / LEADER" image={sansynImg} isRoot={true} />
          <WantedCard name="Detective M" role="FORENSICS / INTEL" image={detectiveImg} isRed={true} />
        </div>

        {/* Second Row - npm_rn_dev, AC3@0b10111, cheri */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
            alignItems: 'stretch',
          }}
        >
          <WantedCard name="npm_rn_dev" role="EXPLOIT / REVERSE ENG" image={npmImg} />
          <WantedCard name="AC3@0b10111" role="CRYPTO / FORENSICS" image={ac3Img} />
          <WantedCard name="cheriCoder" role="WEB / OSINT" image={cheriImg} />
        </div>
      </div>
    </section>
  );
};

export default Team;
